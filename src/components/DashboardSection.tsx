import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Target,
  Download,
  Star,
  CheckCircle2
} from "lucide-react";

const DashboardSection = () => {
  const metrics = [
    {
      title: "Ready for Analysis",
      value: "Demo",
      change: "Active",
      icon: FileText,
      color: "text-primary"
    },
    {
      title: "AI Engine Status",
      value: "Online",
      change: "Ready",
      icon: Target,
      color: "text-accent"
    },
    {
      title: "Upload Capacity",
      value: "100%",
      change: "Available",
      icon: Users,
      color: "text-success"
    },
    {
      title: "Processing Speed",
      value: "Fast",
      change: "Optimal",
      icon: TrendingUp,
      color: "text-accent"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            System Status
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your AI-powered resume analysis system is ready to process candidates.
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

        {/* Quick Actions */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-xl text-center">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" size="lg">
                <FileText className="w-5 h-5 mr-3" />
                Upload Job Description
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Download className="w-5 h-5 mr-3" />
                Upload Candidate Resumes
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Star className="w-5 h-5 mr-3" />
                Start Analysis Demo
              </Button>
              
              <div className="pt-4 border-t border-border text-center">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-muted-foreground">System Ready for Demo</span>
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