import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  BookOpen,
  Globe,
  Shield,
  Zap,
  BarChart3,
  Server,
  Activity,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import Navigation from "@/components/Navigation";

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const navigateWithScroll = useScrollNavigation();

  // Super Admin specific metrics
  const platformStats = [
    {
      title: "Total Organizations",
      value: "124",
      change: "+18%",
      changeType: "positive" as const,
      icon: Building2,
      description: "Active organizations worldwide",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Global Users",
      value: "47,853",
      change: "+24.5%",
      changeType: "positive" as const,
      icon: Users,
      description: "Across all organizations",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Monthly Revenue",
      value: "$248,950",
      change: "+32%",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "This month's earnings",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "System Uptime",
      value: "99.97%",
      change: "+0.03%",
      changeType: "positive" as const,
      icon: Activity,
      description: "Last 30 days average",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const systemMetrics = [
    {
      icon: Server,
      title: "Infrastructure Status",
      description: "All systems operational with optimal performance",
      status: "Excellent"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "SOC 2 compliant with enterprise-grade security",
      status: "Protected"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Available in 15+ countries with CDN acceleration",
      status: "Worldwide"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "99.9% uptime SLA with sub-second response times",
      status: "Optimized"
    }
  ];

  const recentOrganizations = [
    {
      name: "Harvard University",
      type: "Educational Institution",
      users: "2,847",
      plan: "Enterprise",
      status: "Active",
      growth: "+12%"
    },
    {
      name: "Google Learning",
      type: "Corporate Training",
      users: "5,234",
      plan: "Enterprise",
      status: "Active",
      growth: "+8%"
    },
    {
      name: "MIT OpenCourseWare",
      type: "Educational Institution",
      users: "3,156",
      plan: "Professional",
      status: "Active",
      growth: "+15%"
    },
    {
      name: "Microsoft Training",
      type: "Corporate Training",
      users: "4,891",
      plan: "Enterprise",
      status: "Active",
      growth: "+22%"
    }
  ];

  const quickActions = [
    {
      title: "Add New Organization",
      description: "Onboard a new organization to the platform",
      icon: Building2,
      action: () => navigateWithScroll('/create-organization'),
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "View Analytics",
      description: "Platform-wide analytics and insights",
      icon: BarChart3,
      action: () => navigateWithScroll('/analytics'),
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      title: "Manage Organizations",
      description: "View and manage all organizations",
      icon: Users,
      action: () => navigateWithScroll('/organizations'),
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
    {
      title: "System Reports",
      description: "Generate comprehensive system reports",
      icon: TrendingUp,
      action: () => navigateWithScroll('/reports'),
      color: "bg-gradient-to-br from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <Navigation />
      {/* <div style={{ background: '#ffeaea', color: '#b10000', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
        [SuperAdminDashboard] Test: This component is rendering!
      </div> */}
      {/* Hero Section - Matching main page */}
      <section className="relative pt-24 pb-12 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Platform Health & Status Cards */}
            <div className="text-center mb-8 pt-8 px-2 sm:px-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Platform Health & Status
              </h2>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-sm">
                Real-time monitoring of all platform systems and services
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {systemMetrics.map((metric, index) => (
                <Card key={index} className="p-4 sm:p-6 glass bg-white/10 border-white/20 backdrop-blur-sm shadow-elegant hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/30 flex items-center justify-center shadow-lg">
                      <metric.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{metric.title}</h3>
                    <p className="text-white/80 text-sm mb-4 leading-relaxed">
                      {metric.description}
                    </p>
                    <Badge className="bg-gradient-to-r from-green-400/30 to-emerald-400/30 text-green-100 border-green-300/50 font-medium">
                      {metric.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organizations Section */}
      <section className="py-8 md:py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Organizations Overview */}
            <div>
            <Card className="p-4 sm:p-6 md:p-8 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-3 md:space-y-0">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Top Organizations</h2>
                  <p className="text-base text-muted-foreground">Highest performing organizations this month</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-primary/20 hover:bg-primary/5 text-foreground hover:text-foreground font-semibold"
                  onClick={() => navigateWithScroll('/organizations')}
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="space-y-4">
                {recentOrganizations.map((org, index) => (
                  <div key={index} className="flex items-center p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 border border-border/10">
                    <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg flex-shrink-0">
                        <Building2 className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 mb-1">
                          <h3 className="font-bold text-foreground text-base sm:text-lg truncate">{org.name}</h3>
                          <div className="flex items-center space-x-2 flex-wrap">
                            <Badge className="bg-blue-600 text-white border-blue-700 font-semibold text-xs">
                              {org.plan}
                            </Badge>
                            <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full border border-green-200">
                              {org.growth}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
                          <span className="truncate">{org.type}</span>
                          <span className="hidden sm:inline">•</span>
                          <span className="font-medium">{org.users} users</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default SuperAdminDashboard;