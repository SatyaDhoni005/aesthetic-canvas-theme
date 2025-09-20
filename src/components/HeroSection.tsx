import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Target, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0 bg-black/5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Automated Resume
            <span className="block text-accent-glow">Relevance Check</span>
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Transform your recruitment process with AI-powered resume analysis. 
            Get instant relevance scores, skill gap analysis, and actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Upload className="w-5 h-5 mr-2" />
              Upload Resumes
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <FileText className="w-5 h-5 mr-2" />
              Add Job Description
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-primary-foreground mb-2">Smart Matching</h3>
            <p className="text-primary-foreground/80 text-sm">
              AI-powered semantic analysis beyond keyword matching for accurate relevance scoring.
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-primary-foreground mb-2">Instant Results</h3>
            <p className="text-primary-foreground/80 text-sm">
              Process thousands of resumes in minutes with detailed scoring and feedback.
            </p>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6 text-center">
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-primary-foreground mb-2">Detailed Reports</h3>
            <p className="text-primary-foreground/80 text-sm">
              Comprehensive analysis with skill gaps, improvements, and suitability verdicts.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;