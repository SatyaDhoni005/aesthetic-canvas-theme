import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Briefcase,
  Plus,
  X,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

const UploadSection = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Start Your Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your job requirements and candidate resumes to begin automated relevance checking.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Job Description Upload */}
          <Card className="shadow-medium bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary-foreground" />
                </div>
                Job Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Job Title
                </label>
                <Input
                  placeholder="e.g., Senior Data Scientist"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="border-border/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Job Description
                </label>
                <Textarea
                  placeholder="Paste your job description here or upload a file..."
                  className="min-h-32 border-border/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Required Skills
                </label>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add skill (e.g., Python, React)"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="border-border/50"
                  />
                  <Button onClick={addSkill} variant="outline" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button onClick={() => removeSkill(skill)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Or upload job description file
                </p>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resume Upload */}
          <Card className="shadow-medium bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent-foreground" />
                </div>
                Candidate Resumes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border/50 rounded-lg p-12 text-center hover:border-accent/50 transition-colors">
                <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Upload Resumes
                </h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop files here or click to browse
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports PDF, DOC, DOCX files (max 20MB each)
                </p>
                <Button size="lg" className="bg-gradient-accent">
                  <Upload className="w-5 h-5 mr-2" />
                  Select Files
                </Button>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Uploaded Files</h4>
                <div className="space-y-2">
                  {[
                    { name: "Sarah_Johnson_Resume.pdf", status: "processed" },
                    { name: "Michael_Chen_CV.docx", status: "processing" },
                    { name: "Emily_Davis_Resume.pdf", status: "queued" }
                  ].map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card/50">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.status === "processed" && (
                          <CheckCircle className="w-4 h-4 text-success" />
                        )}
                        <Badge 
                          variant={file.status === "processed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {file.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="lg">
                Start Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;