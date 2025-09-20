# app.py
from flask import Flask, jsonify
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
import string
import sqlite3
import os
import datetime
import PyPDF2

# Download NLTK data (only needed once)
nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)

# Preload stopwords & punctuation
STOP_WORDS = set(stopwords.words("english"))
PUNCTUATION = set(string.punctuation)

DB_FILE = "evaluations.db"
PDF_FILE = "sample_resume.pdf"   # 👈 Your resume file in the same folder

# --- DB Setup ---
def init_db():
    """Initialize SQLite database if not exists."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS evaluations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT,
            score INTEGER,
            top_keywords TEXT,
            created_at TEXT
        )
    """)
    conn.commit()
    conn.close()

def save_evaluation(filename, score, top_keywords):
    """Save evaluation results to the database."""
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO evaluations (filename, score, top_keywords, created_at) VALUES (?, ?, ?, ?)",
        (filename, score, str(top_keywords), datetime.datetime.utcnow().isoformat())
    )
    conn.commit()
    conn.close()

# --- Resume Processing ---
def extract_text_from_pdf(filepath):
    """Extract text from PDF given its path."""
    reader = PyPDF2.PdfReader(filepath)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

def preprocess(text):
    """Tokenize, clean, and preprocess resume text."""
    if not text or not text.strip():
        return []

    tokens = word_tokenize(text)
    tokens = [
        t.lower() for t in tokens
        if t.lower() not in STOP_WORDS and t not in PUNCTUATION
    ]
    return tokens

def evaluate_resume(text):
    """Evaluate resume text and return metrics."""
    tokens = preprocess(text)

    if not tokens:
        return {"error": "Resume text became empty after preprocessing"}

    fdist = FreqDist(tokens)
    top_keywords = fdist.most_common(10)
    score = len(set(tokens))  # simple proxy for diversity

    return {
        "score": score,
        "top_keywords": top_keywords
    }

# --- Routes ---
@app.route("/evaluate", methods=["GET"])
def evaluate():
    if not os.path.exists(PDF_FILE):
        return jsonify({"error": f"{PDF_FILE} not found in folder"}), 400

    try:
        resume_text = extract_text_from_pdf(PDF_FILE)
        result = evaluate_resume(resume_text)

        if "error" not in result:
            save_evaluation(PDF_FILE, result["score"], result["top_keywords"])

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
