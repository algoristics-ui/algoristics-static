import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield,
  Lock,
  Key,
  AlertTriangle,
  CheckCircle2,
  Eye,
  UserCheck,
  Globe,
  FileText,
  Clock,
  Activity,
  Zap,
  XCircle
} from "lucide-react";

const SecurityPage = () => {
  const securityMetrics = [
    {
      title: "Security Score",
      value: "98%",
      status: "excellent",
      icon: Shield,
      description: "Overall security rating"
    },
    {
      title: "Active Sessions",
      value: "12,847",
      status: "normal",
      icon: Activity,
      description: "Current user sessions"
    },
    {
      title: "Failed Logins",
      value: "23",
      status: "warning",
      icon: XCircle,
      description: "Last 24 hours"
    },
    {
      title: "Compliance",
      value: "100%",
      status: "excellent",
      icon: CheckCircle2,
      description: "SOC 2 & GDPR compliant"
    }
  ];

  const securityFeatures = [
    {
      name: "Two-Factor Authentication",
      status: "enabled",
      usage: "89%",
      icon: Lock,
      description: "Users with 2FA enabled"
    },
    {
      name: "Single Sign-On",
      status: "active",
      usage: "67%",
      icon: Key,
      description: "Organizations using SSO"
    },
    {
      name: "Session Management",
      status: "active",
      usage: "100%",
      icon: Clock,
      description: "Auto-logout after inactivity"
    },
    {
      name: "Data Encryption",
      status: "enabled",
      usage: "100%",
      icon: Shield,
      description: "End-to-end encryption"
    },
    {
      name: "Audit Logging",
      status: "active",
      usage: "100%",
      icon: FileText,
      description: "All actions logged"
    },
    {
      name: "IP Restrictions",
      status: "configured",
      usage: "34%",
      icon: Globe,
      description: "Organizations with IP limits"
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "critical",
      title: "Suspicious Login Activity",
      description: "Multiple failed login attempts from IP 192.168.1.100",
      time: "5 minutes ago",
      action: "IP temporarily blocked",
      resolved: false
    },
    {
      id: 2,
      type: "warning",
      title: "Weak Password Detected",
      description: "User john.doe@company.com is using a weak password",
      time: "2 hours ago",
      action: "Password reset required",
      resolved: false
    },
    {
      id: 3,
      type: "info",
      title: "Certificate Renewal",
      description: "SSL certificate renewed successfully",
      time: "1 day ago",
      action: "Automatic renewal completed",
      resolved: true
    },
    {
      id: 4,
      type: "resolved",
      title: "DDoS Attack Mitigated",
      description: "Distributed denial of service attack blocked by firewall",
      time: "2 days ago",
      action: "Traffic filtered, service restored",
      resolved: true
    }
  ];

  const complianceStatus = [
    {
      name: "SOC 2 Type II",
      status: "compliant",
      lastAudit: "March 2024",
      nextAudit: "March 2025"
    },
    {
      name: "GDPR",
      status: "compliant",
      lastReview: "January 2024",
      nextReview: "January 2025"
    },
    {
      name: "CCPA",
      status: "compliant",
      lastReview: "February 2024",
      nextReview: "February 2025"
    },
    {
      name: "FERPA",
      status: "compliant",
      lastReview: "April 2024",
      nextReview: "April 2025"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
      case "enabled":
      case "active":
      case "compliant":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "normal":
      case "configured":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "warning":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "critical":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-red-500/10 text-red-700 border-red-200";
      case "warning":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "info":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "resolved":
        return "bg-green-500/10 text-green-700 border-green-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 pt-8 px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Security Center
              </h1>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-sm">
                Monitor platform security and compliance status
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Button variant="outline" className="border-white/50 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/70 font-semibold w-full sm:w-auto backdrop-blur-sm">
                <Eye className="w-4 h-4 mr-2" />
                View Logs
              </Button>
              <Button className="bg-white text-primary hover:bg-white/90 hover:text-primary font-semibold px-6 md:px-8 py-3 w-full sm:w-auto">
                <Shield className="w-4 h-4 mr-2" />
                Security Scan
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-8">

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <Card key={index} className="shadow-elegant hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground mb-1">{metric.value}</p>
                <p className="text-sm font-medium text-muted-foreground mb-1">{metric.title}</p>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Features */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Security Features</CardTitle>
          <p className="text-muted-foreground">Current security feature status and adoption</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 border border-border/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground">{feature.name}</h3>
                  </div>
                  <Badge className={getStatusColor(feature.status)}>
                    {feature.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{feature.description}</span>
                    <span className="text-sm font-semibold text-foreground">{feature.usage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300"
                      style={{ width: feature.usage }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Security Alerts */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Security Alerts</CardTitle>
              <p className="text-muted-foreground">Recent security events and notifications</p>
            </div>
            <Button variant="outline">View All Alerts</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 border border-border/10">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                  {alert.type === "critical" && <AlertTriangle className="w-5 h-5 text-white" />}
                  {alert.type === "warning" && <AlertTriangle className="w-5 h-5 text-white" />}
                  {alert.type === "info" && <Activity className="w-5 h-5 text-white" />}
                  {alert.type === "resolved" && <CheckCircle2 className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{alert.title}</h3>
                    <Badge className={getAlertColor(alert.type)}>
                      {alert.type}
                    </Badge>
                    {alert.resolved && (
                      <Badge className="bg-green-500/10 text-green-700 border-green-200">
                        resolved
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">Action: {alert.action}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Compliance Status</CardTitle>
          <p className="text-muted-foreground">Current compliance certifications and audit status</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceStatus.map((compliance, index) => (
              <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 border border-border/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{compliance.name}</h3>
                  <Badge className={getStatusColor(compliance.status)}>
                    {compliance.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Last Review:</span>
                    <span className="font-medium">{compliance.lastAudit || compliance.lastReview}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Review:</span>
                    <span className="font-medium">{compliance.nextAudit || compliance.nextReview}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
        
          </div> {/* Close max-w-6xl */}
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;