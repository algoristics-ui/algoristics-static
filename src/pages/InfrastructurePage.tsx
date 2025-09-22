import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Database,
  Server,
  Cloud,
  Globe,
  Cpu,
  HardDrive,
  Activity,
  Wifi,
  Shield,
  Zap,
  Settings,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  BarChart3
} from "lucide-react";

const InfrastructurePage = () => {
  const infrastructureOverview = [
    {
      title: "Total Servers",
      value: "24",
      status: "operational",
      icon: Server,
      description: "Active server instances"
    },
    {
      title: "Load Balancers",
      value: "6",
      status: "healthy",
      icon: Globe,
      description: "Distributing traffic"
    },
    {
      title: "Databases",
      value: "8",
      status: "operational",
      icon: Database,
      description: "Database clusters"
    },
    {
      title: "CDN Nodes",
      value: "45",
      status: "active",
      icon: Cloud,
      description: "Global edge locations"
    }
  ];

  const serverClusters = [
    {
      name: "Web Servers",
      region: "US-East",
      instances: 8,
      status: "healthy",
      cpu: "42%",
      memory: "67%",
      disk: "34%",
      network: "892 MB/s"
    },
    {
      name: "API Servers",
      region: "US-West",
      instances: 6,
      status: "healthy",
      cpu: "35%",
      memory: "58%",
      disk: "28%",
      network: "654 MB/s"
    },
    {
      name: "Database Cluster",
      region: "EU-Central",
      instances: 4,
      status: "warning",
      cpu: "78%",
      memory: "84%",
      disk: "45%",
      network: "1.2 GB/s"
    },
    {
      name: "Analytics Cluster",
      region: "Asia-Pacific",
      instances: 3,
      status: "healthy",
      cpu: "23%",
      memory: "41%",
      disk: "56%",
      network: "234 MB/s"
    },
    {
      name: "Storage Cluster",
      region: "US-Central",
      instances: 3,
      status: "healthy",
      cpu: "19%",
      memory: "33%",
      disk: "67%",
      network: "445 MB/s"
    }
  ];

  const cloudServices = [
    {
      name: "AWS EC2",
      type: "Compute",
      status: "active",
      usage: "89%",
      cost: "$2,340/month",
      icon: Cloud
    },
    {
      name: "RDS PostgreSQL",
      type: "Database",
      status: "active",
      usage: "76%",
      cost: "$890/month",
      icon: Database
    },
    {
      name: "CloudFront CDN",
      type: "Content Delivery",
      status: "active",
      usage: "94%",
      cost: "$567/month",
      icon: Globe
    },
    {
      name: "S3 Storage",
      type: "Object Storage",
      status: "active",
      usage: "82%",
      cost: "$234/month",
      icon: HardDrive
    },
    {
      name: "ElastiCache Redis",
      type: "Caching",
      status: "active",
      usage: "67%",
      cost: "$445/month",
      icon: Zap
    },
    {
      name: "Application Load Balancer",
      type: "Load Balancing",
      status: "active",
      usage: "45%",
      cost: "$123/month",
      icon: Activity
    }
  ];

  const infrastructureAlerts = [
    {
      id: 1,
      type: "warning",
      title: "High CPU Usage",
      description: "Database cluster CPU usage has exceeded 75% for 30+ minutes",
      time: "15 minutes ago",
      service: "Database Cluster - EU-Central",
      severity: "medium"
    },
    {
      id: 2,
      type: "info",
      title: "Auto-scaling Event",
      description: "Added 2 new instances to web server cluster due to increased load",
      time: "2 hours ago",
      service: "Web Servers - US-East",
      severity: "low"
    },
    {
      id: 3,
      type: "resolved",
      title: "Storage Space Expanded",
      description: "Successfully expanded storage capacity by 500GB",
      time: "4 hours ago",
      service: "Storage Cluster - US-Central",
      severity: "low"
    },
    {
      id: 4,
      type: "critical",
      title: "Network Latency Spike",
      description: "Detected high network latency in Asia-Pacific region",
      time: "6 hours ago",
      service: "Analytics Cluster - Asia-Pacific",
      severity: "high"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "operational":
      case "active":
        return "bg-green-500/10 text-green-700 border-green-200";
      case "warning":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "critical":
      case "error":
        return "bg-red-500/10 text-red-700 border-red-200";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
      case "critical":
        return "bg-red-500/10 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "low":
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
                Infrastructure
              </h1>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-sm">
                Monitor and manage platform infrastructure and cloud resources
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Button variant="outline" className="border-white/50 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/70 font-semibold w-full sm:w-auto backdrop-blur-sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Metrics
              </Button>
              <Button className="bg-white text-primary hover:bg-white/90 hover:text-primary font-semibold px-6 md:px-8 py-3 w-full sm:w-auto">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-8">

      {/* Infrastructure Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {infrastructureOverview.map((item, index) => (
          <Card key={index} className="shadow-elegant hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground mb-1">{item.value}</p>
                <p className="text-sm font-medium text-muted-foreground mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Server Clusters */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Server Clusters</CardTitle>
          <p className="text-muted-foreground">Current status and resource utilization by cluster</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serverClusters.map((cluster, index) => (
              <div key={index} className="p-6 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 border border-border/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <Server className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{cluster.name}</h3>
                      <p className="text-sm text-muted-foreground">{cluster.region} • {cluster.instances} instances</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(cluster.status)}>
                    {cluster.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Cpu className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">CPU</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{cluster.cpu}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Memory</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{cluster.memory}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <HardDrive className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Disk</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{cluster.disk}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Wifi className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Network</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{cluster.network}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cloud Services */}
      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Cloud Services</CardTitle>
          <p className="text-muted-foreground">AWS services usage and cost breakdown</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cloudServices.map((service, index) => (
              <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 border border-border/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <p className="text-xs text-muted-foreground">{service.type}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Usage</span>
                    <span className="text-sm font-semibold text-foreground">{service.usage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300"
                      style={{ width: service.usage }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-sm text-muted-foreground">Monthly Cost</span>
                    <span className="text-sm font-bold text-foreground">{service.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Infrastructure Alerts */}
      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Infrastructure Alerts</CardTitle>
              <p className="text-muted-foreground">Recent infrastructure events and notifications</p>
            </div>
            <Button variant="outline">View All Alerts</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {infrastructureAlerts.map((alert) => (
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
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">Service: {alert.service}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
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

export default InfrastructurePage;