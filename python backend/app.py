import os
from flask import Flask, request, jsonify
import pdfplumber
import docx2txt
import spacy
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from fuzzywuzzy import fuzz
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.llms import HuggingFaceHub
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langgraph.graph import Graph
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Setup: Load models and keys (from env vars)
nlp = spacy.load("en_core_web_sm")
embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2", model_kwargs={'token': os.getenv('HF_TOKEN')})
llm = HuggingFaceHub(repo_id="gpt2", huggingfacehub_api_token=os.getenv('HF_TOKEN'))  # Use a lightweight model; swap as needed

# Database Setup (SQLite for low RAM)
engine = create_engine('sqlite:///evaluations.db')
Base = declarative_base()

class Evaluation(Base):
    __tablename__ = 'evaluations'
    id = Column(Integer, primary_key=True)
    resume_id = Column(String)
    jd_id = Column(String)
    score = Column(Integer)
    verdict = Column(String)
    feedback = Column(String)
    gaps = Column(String)

Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

# Parsing Functions
def parse_resume(file_path):
    if file_path.endswith('.pdf'):
        with pdfplumber.open(file_path) as pdf:
            text = ''.join(page.extract_text() for page in pdf.pages)
    elif file_path.endswith('.docx'):
        text = docx2txt.process(file_path)
    doc = nlp(text)
    skills = [ent.text for ent in doc.ents if ent.label_ == 'SKILL']  # Customize entities as needed
    return text, skills

def parse_jd(text):
    doc = nlp(text)
    skills = [ent.text for ent in doc.ents if ent.label_ == 'SKILL']
    return text, skills

# Relevance Analysis
def hard_match(resume_skills, jd_skills):
    matches = sum(fuzz.partial_ratio(r, j) > 80 for r in resume_skills for j in jd_skills)  # Fuzzy matching
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([resume_skills, jd_skills])
    return cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]  # TF-IDF score

def semantic_match(resume_text, jd_text):
    resume_emb = embeddings.embed_query(resume_text)
    jd_emb = embeddings.embed_query(jd_text)
    return cosine_similarity([resume_emb], [jd_emb])[0][0]

def calculate_score(hard_score, semantic_score):
    score = int(60 * hard_score + 40 * semantic_score)  # Weighted as per PDF
    if score > 80:
        verdict = "High"
    elif score > 50:
        verdict = "Medium"
    else:
        verdict = "Low"
    return score, verdict

def generate_feedback(resume_text, jd_text, gaps):
    prompt = PromptTemplate(input_variables=["resume", "jd", "gaps"], template="Provide feedback for resume: {resume} against JD: {jd}. Missing: {gaps}")
    chain = LLMChain(llm=llm, prompt=prompt)
    return chain.run(resume=resume_text, jd=jd_text, gaps=gaps)

# LangGraph Pipeline (simple workflow)
def analysis_pipeline(resume_path, jd_text):
    resume_text, resume_skills = parse_resume(resume_path)
    jd_text_parsed, jd_skills = parse_jd(jd_text)
    
    hard_score = hard_match(' '.join(resume_skills), ' '.join(jd_skills))
    semantic_score = semantic_match(resume_text, jd_text_parsed)
    score, verdict = calculate_score(hard_score, semantic_score)
    gaps = [s for s in jd_skills if all(fuzz.partial_ratio(s, rs) < 80 for rs in resume_skills)]
    feedback = generate_feedback(resume_text, jd_text_parsed, ', '.join(gaps))
    
    return {"score": score, "verdict": verdict, "feedback": feedback, "gaps": ', '.join(gaps)}

# Flask App
app = Flask(__name__)

@app.route('/upload_resume', methods=['POST'])
def upload_resume():
    resume = request.files['resume']
    jd_text = request.form['jd_text']  # Or upload JD file
    resume_path = 'temp_resume.' + resume.filename.split('.')[-1]  # Save temporarily
    resume.save(resume_path)
    
    result = analysis_pipeline(resume_path, jd_text)
    
    # Store in DB
    session = Session()
    eval_entry = Evaluation(resume_id=resume.filename, jd_id="sample_jd", score=result['score'], verdict=result['verdict'], feedback=result['feedback'], gaps=result['gaps'])
    session.add(eval_entry)
    session.commit()
    session.close()
    
    os.remove(resume_path)  # Clean up
    return jsonify(result)

@app.route('/get_results', methods=['GET'])
def get_results():
    session = Session()
    results = session.query(Evaluation).all()
    session.close()
    return jsonify([{"id": e.id, "score": e.score, "verdict": e.verdict} for e in results])  # Simplified

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Local test only; low RAM usage