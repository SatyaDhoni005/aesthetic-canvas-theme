import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Target,
  Download,
  Eye,
  Star,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

const DashboardSection = () => {
  const metrics = [
    {
      title: "Total Resumes Processed",
      value: "2,847",
      change: "+12.5%",
      icon: FileText,
      color: "text-primary"
    },
    {
      title: "Job Postings Active",
      value: "18",
      change: "+3",
      icon: Target,
      color: "text-accent"
    },
    {
      title: "High-Match Candidates",
      value: "456",
      change: "+8.2%",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Average Relevance Score",
      value: "72.3",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-accent"
    }
  ];

  const recentResults = [
    {
      candidate: "Sarah Johnson",
      role: "Senior Data Scientist",
      score: 94,
      status: "High",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"]
    },
    {
      candidate: "Michael Chen",
      role: "Frontend Developer",
      score: 87,
      status: "High",
      skills: ["React", "TypeScript", "Node.js", "AWS"]
    },
    {
      candidate: "Emily Davis",
      role: "Product Manager",
      score: 76,
      status: "Medium",
      skills: ["Agile", "Analytics", "Roadmapping", "SQL"]
    },
    {
      candidate: "David Wilson",
      role: "DevOps Engineer",
      score: 68,
      status: "Medium",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "High": return "bg-success text-success-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Low": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Dashboard Overview
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time insights into your recruitment pipeline and candidate matching performance.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gradient-card border shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                  <Badge variant="secondary" className="text-xs">
                    {metric.change}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {metric.value}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {metric.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Results */}
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 shadow-medium">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Recent Analysis Results</CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-foreground">{result.candidate}</h4>
                        <Badge className={getStatusColor(result.status)}>
                          {result.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{result.role}</p>
                      <div className="flex flex-wrap gap-1">
                        {result.skills.slice(0, 3).map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {result.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{result.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {result.score}
                      </div>
                      <Progress value={result.score} className="w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" size="lg">
                <FileText className="w-5 h-5 mr-3" />
                Upload Job Description
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Download className="w-5 h-5 mr-3" />
                Bulk Upload Resumes
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Star className="w-5 h-5 mr-3" />
                Create New Project
              </Button>
              
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold text-foreground mb-3">System Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">AI Engine: Online</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">Database: Connected</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-warning" />
                    <span className="text-muted-foreground">Queue: 23 pending</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;