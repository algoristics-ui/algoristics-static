import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  MousePointer, 
  Target, 
  GraduationCap, 
  FileText, 
  BarChart3,
  Shield,
  Users,
  Zap,
  Globe,
  Database,
  Lock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";

const FeatureShowcase = () => {
  const navigateWithScroll = useScrollNavigation();
  
  const primaryFeatures = [
    {
      icon: Building2,
      title: "Multi-Organization Architecture",
      description: "Complete tenant isolation with role-based access control and customizable branding for each organization.",
    },
    {
      icon: GraduationCap,
      title: "Advanced Assessment Engine",
      description: "Comprehensive testing capabilities with automated grading, plagiarism detection, and adaptive questioning.",
    },
    {
      icon: BarChart3,
      title: "Learning Analytics",
      description: "Real-time insights into learner performance, engagement metrics, and predictive analytics for intervention.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 compliance, SSO integration, and advanced security features to protect sensitive educational data.",
    },
    {
      icon: MousePointer,
      title: "Intuitive Course Builder",
      description: "Drag-and-drop interface for creating engaging courses with multimedia content and interactive elements.",
    },
    {
      icon: Users,
      title: "Scalable User Management",
      description: "Efficiently manage thousands of learners with bulk operations, automated enrollment, and custom user roles.",
    }
  ];

  const capabilities = [
    { icon: Zap, label: "99.9% Uptime SLA" },
    { icon: Globe, label: "Global CDN Delivery" },
    { icon: Database, label: "Unlimited Storage" },
    { icon: Lock, label: "Bank-Grade Security" },
    { icon: Users, label: "Unlimited Users" },
    { icon: BarChart3, label: "Advanced Reporting" }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-6 mb-20">
          <Badge variant="outline" className="px-6 py-3 text-sm font-semibold">
            ✨ Platform Capabilities
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground max-w-4xl mx-auto leading-tight">
            Everything You Need for
            <span className="text-primary block">Modern Learning Management</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive features designed to meet the demands of modern educational institutions, 
            corporate training programs, and online learning initiatives.
          </p>
        </div>

        {/* Primary Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {primaryFeatures.map((feature, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 border-0 shadow-soft bg-gradient-to-br from-background to-muted/20">
              <CardHeader className="pb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl p-12 mb-20 border border-primary/10">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            Enterprise-Grade Infrastructure & Performance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="text-center space-y-4 group">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft">
                  <capability.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {capability.label}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* Bottom CTA Section */}
        <div className="text-center space-y-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12 border border-primary/10">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Ready to Transform Your Learning Programs?
          </h3>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of educational institutions and organizations already using Algoristics 
            to deliver exceptional learning experiences at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg font-semibold shadow-elegant"
              onClick={() => navigateWithScroll('/get-started')}
            >
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg font-semibold"
              onClick={() => navigateWithScroll('/consultation')}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;