import { 

  Lock,
  Key,
  CheckCircle2,
  UserCheck,
  FileText,
  Activity,
  Zap,
  XCircle
} from "lucide-react";


import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Search, 
  Building2, 
  Users, 
  Calendar,
  Globe,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  BookOpen,
  Filter,
  MoreVertical,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Settings
} from "lucide-react";

const OrganizationsPage = () => {
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
    }
  ];

  const orgTabs = [
    {
      name: "All Organizations",
      state: "active" 
    },
    {
      name: "Enterprise",
      state: "active" 
    },
    {
      name: "Trial",
      state: "active" 
    },
    {
      name: "New Partners",
      state: "active" 
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

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "excellent":
  //     case "enabled":
  //     case "active":
  //     case "compliant":
  //       return "bg-green-500/10 text-green-700 border-green-200";
  //     case "normal":
  //     case "configured":
  //       return "bg-blue-500/10 text-blue-700 border-blue-200";
  //     case "warning":
  //       return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
  //     case "critical":
  //       return "bg-red-500/10 text-red-700 border-red-200";
  //     default:
  //       return "bg-gray-500/10 text-gray-700 border-gray-200";
  //   }
  // };

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


//Organization settings
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Mock data for organizations with enhanced branding details
  const organizations = [
    // Enterprise Organizations
    {
      id: "1",
      name: "Stanford University",
      type: "University",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      headerImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&h=300&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop",
      footerLogo: "/placeholder.svg",
      industry: "Higher Education",
      status: "Active",
      subscription: "Enterprise",
      students: 12500,
      instructors: 450,
      courses: 120,
      joinedDate: "2023-01-15",
      contactName: "Dr. Sarah Wilson",
      contactEmail: "admin@stanford.edu",
      contactPhone: "+1 (650) 723-2300",
      website: "https://stanford.edu",
      customUrl: "stanford.learningplatform.com",
      lastActive: "2024-01-10",
      primaryColor: "#8C1515",
      secondaryColor: "#B1040E",
      completionRate: 89,
      totalRevenue: 15650,
      growth: 12,
      location: "Stanford, CA"
    },
    {
      id: "2",
      name: "Global Bank Corp",
      type: "Corporate",
      logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      headerImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=300&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop",
      footerLogo: "/placeholder.svg",
      industry: "Financial Services",
      status: "Active",
      subscription: "Enterprise",
      students: 8750,
      instructors: 125,
      courses: 85,
      joinedDate: "2022-11-08",
      contactName: "Jennifer Kim",
      contactEmail: "learning@globalbank.com",
      contactPhone: "+1 (212) 555-0123",
      website: "https://globalbank.com",
      customUrl: "globalbank.learningplatform.com",
      lastActive: "2024-01-11",
      primaryColor: "#1B365D",
      secondaryColor: "#2D5A87",
      completionRate: 94,
      totalRevenue: 22750,
      growth: 8,
      location: "New York, NY"
    },
    {
      id: "3",
      name: "MediCore Healthcare",
      type: "Healthcare",
      logo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face",
      headerImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=300&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&h=1080&fit=crop",
      footerLogo: "/placeholder.svg",
      industry: "Healthcare",
      status: "Active",
      subscription: "Enterprise",
      students: 6250,
      instructors: 95,
      courses: 110,
      joinedDate: "2023-05-12",
      contactName: "Dr. Robert Chen",
      contactEmail: "training@medicore.com",
      contactPhone: "+1 (312) 555-0198",
      website: "https://medicore.com",
      customUrl: "medicore.learningplatform.com",
      lastActive: "2024-01-09",
      primaryColor: "#0D7377",
      secondaryColor: "#14A085",
      completionRate: 87,
      totalRevenue: 18900,
      growth: 15,
      location: "Chicago, IL"
    },
    
    // Trial Organizations
    {
      id: "4",
      name: "City Community College",
      type: "College",
      logo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      headerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=300&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=1920&h=1080&fit=crop",
      footerLogo: "/placeholder.svg",
      industry: "Education",
      status: "Trial",
      subscription: "Trial",
      students: 2400,
      instructors: 120,
      courses: 65,
      joinedDate: "2024-01-05",
      contactName: "Dr. Lisa Martinez",
      contactEmail: "admin@citycc.edu",
      contactPhone: "+1 (555) 987-6543",
      website: "https://citycc.edu",
      customUrl: "citycc.learningplatform.com",
      lastActive: "2024-01-08",
      primaryColor: "#228B22",
      secondaryColor: "#32CD32",
      completionRate: 76,
      totalRevenue: 0,
      growth: 45,
      location: "Los Angeles, CA"
    },
    {
      id: "5",
      name: "StartUp Academy",
      type: "Corporate",
      logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      headerImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=300&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1920&h=1080&fit=crop",
      footerLogo: "/placeholder.svg",
      industry: "Technology",
      status: "Trial",
      subscription: "Trial",
      students: 350,
      instructors: 15,
      courses: 25,
      joinedDate: "2024-01-12",
      contactName: "Alex Rodriguez",
      contactEmail: "learning@startupacademy.com",
      contactPhone: "+1 (415) 555-0167",
      website: "https://startupacademy.com",
      customUrl: "startup.learningplatform.com",
      lastActive: "2024-01-11",
      primaryColor: "#FF6B35",
      secondaryColor: "#F7931E",
      completionRate: 82,
      totalRevenue: 0,
      growth: 67,
      location: "Austin, TX"
    },
    {
      id: "6",
      name: "Regional Hospital Network",
      type: "Healthcare",
      logo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      headerImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=300&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=1080&fit=crop",
      footerLogo: "/placeholder.svg",
      industry: "Healthcare",
      status: "Trial",
      subscription: "Trial",
      students: 1850,
      instructors: 45,
      courses: 38,
      joinedDate: "2023-12-18",
      contactName: "Dr. Maria Santos",
      contactEmail: "education@regionalhospital.org",
      contactPhone: "+1 (503) 555-0142",
      website: "https://regionalhospital.org",
      customUrl: "rhn.learningplatform.com",
      lastActive: "2024-01-10",
      primaryColor: "#2E8B57",
      secondaryColor: "#3CB371",
      completionRate: 69,
      totalRevenue: 0,
      growth: 38,
      location: "Portland, OR"
    },

    // New Partners (recently joined)
    {
      id: "7",
      name: "TechCorp Training",
      type: "Corporate",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      headerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=300&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop",
      footerLogo: "/placeholder.svg",
      industry: "Technology",
      status: "Active",
      subscription: "Professional",
      students: 850,
      instructors: 25,
      courses: 45,
      joinedDate: "2024-01-02",
      contactName: "Mike Johnson",
      contactEmail: "training@techcorp.com",
      contactPhone: "+1 (555) 123-4567",
      website: "https://techcorp.com",
      customUrl: "techcorp.learningplatform.com",
      lastActive: "2024-01-09",
      primaryColor: "#0066CC",
      secondaryColor: "#004499",
      completionRate: 92,
      totalRevenue: 8950,
      growth: 18,
      location: "San Francisco, CA"
    },
    {
      id: "8",
      name: "Future Manufacturing",
      type: "Manufacturing",
      logo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      headerImage: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1200&h=300&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1920&h=1080&fit=crop",
      footerLogo: "/placeholder.svg",
      industry: "Manufacturing",
      status: "Active",
      subscription: "Professional",
      students: 1200,
      instructors: 35,
      courses: 42,
      joinedDate: "2023-12-28",
      contactName: "David Thompson",
      contactEmail: "hr@futuremanufacturing.com",
      contactPhone: "+1 (216) 555-0189",
      website: "https://futuremanufacturing.com",
      customUrl: "future.learningplatform.com",
      lastActive: "2024-01-11",
      primaryColor: "#B8860B",
      secondaryColor: "#DAA520",
      completionRate: 85,
      totalRevenue: 6750,
      growth: 22,
      location: "Cleveland, OH"
    },
    {
      id: "9",
      name: "Creative Arts Institute",
      type: "Educational",
      logo: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
      headerImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=300&fit=crop",
      backgroundImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1920&h=1080&fit=crop",
      footerLogo: "/placeholder.svg",
      industry: "Arts & Design",
      status: "Active",
      subscription: "Academic",
      students: 680,
      instructors: 28,
      courses: 55,
      joinedDate: "2024-01-08",
      contactName: "Isabella Rodriguez",
      contactEmail: "admin@creativearts.edu",
      contactPhone: "+1 (305) 555-0134",
      website: "https://creativearts.edu",
      customUrl: "arts.learningplatform.com",
      lastActive: "2024-01-11",
      primaryColor: "#8A2BE2",
      secondaryColor: "#9370DB",
      completionRate: 91,
      totalRevenue: 4250,
      growth: 35,
      location: "Miami, FL"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500/10 text-green-700 dark:text-green-300";
      case "Trial": return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
      case "Inactive": return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
      case "Suspended": return "bg-red-500/10 text-red-700 dark:text-red-300";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "Enterprise": return "bg-purple-500/10 text-purple-700 dark:text-purple-300";
      case "Professional": return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
      case "Academic": return "bg-green-500/10 text-green-700 dark:text-green-300";
      case "Trial": return "bg-orange-500/10 text-orange-700 dark:text-orange-300";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || org.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesType;
  });

  // Filter functions for different tabs that also apply search
  const enterpriseOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.location.toLowerCase().includes(searchTerm.toLowerCase());
    return org.subscription === "Enterprise" && matchesSearch;
  });
  
  const trialOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.location.toLowerCase().includes(searchTerm.toLowerCase());
    return org.subscription === "Trial" && matchesSearch;
  });
  
  const newPartnerOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.location.toLowerCase().includes(searchTerm.toLowerCase());
    const joinedDate = new Date(org.joinedDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return joinedDate >= thirtyDaysAgo && matchesSearch;
  });

  // Component to render organization cards
  const renderOrganizationCard = (org: any) => (
    <Card key={org.id} className="hover:shadow-2xl transition-all duration-300 border-l-4 overflow-hidden glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant hover:-translate-y-1" style={{ borderLeftColor: org.primaryColor }}>
      {/* Header Image Section */}
      <div className="h-32 bg-gradient-to-r relative overflow-hidden" style={{ 
        backgroundImage: `url(${org.headerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="h-4 w-4 mr-2" />
                View Portal
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit Organization
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Shield className="h-4 w-4 mr-2" />
                Manage Access
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="p-6 -mt-12 relative">
        <div className="flex items-start space-x-6">
          {/* Logo */}
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-background shadow-lg" style={{ borderColor: org.primaryColor }}>
              <AvatarImage src={org.logo} alt={org.name} />
              <AvatarFallback 
                className="text-lg font-bold text-white" 
                style={{ backgroundColor: org.primaryColor }}
              >
                {getInitials(org.name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background flex items-center justify-center"
                 style={{ backgroundColor: org.status === 'Active' ? '#10b981' : org.status === 'Trial' ? '#f59e0b' : '#ef4444' }}>
              {org.status === 'Active' && <CheckCircle className="h-3 w-3 text-white" />}
              {org.status === 'Trial' && <Clock className="h-3 w-3 text-white" />}
              {org.status === 'Inactive' && <AlertTriangle className="h-3 w-3 text-white" />}
            </div>
          </div>
          
          {/* Organization Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(org.status)}>
                    {org.status}
                  </Badge>
                  <Badge variant="outline" className={getSubscriptionColor(org.subscription)}>
                    {org.subscription}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-foreground">{org.name}</h3>
                <p className="text-muted-foreground">{org.industry} • {org.type}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Globe className="h-3 w-3" />
                    <span>{org.customUrl}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{org.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Joined {new Date(org.joinedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: org.primaryColor }}>
                  {org.students.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: org.primaryColor }}>
                  {org.instructors}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: org.primaryColor }}>
                  {org.courses}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: org.primaryColor }}>
                  {org.completionRate}%
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Completion</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Overall Progress</span>
                <span>{org.completionRate}%</span>
              </div>
              <Progress value={org.completionRate} className="h-3" />
            </div>
            
            {/* Contact and Revenue Info */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{org.contactName}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>{org.contactEmail}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="h-3 w-3" />
                    <span>{org.contactPhone}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {org.totalRevenue > 0 ? (
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-green-600">
                      ${org.totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                      +{org.growth}% growth
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Trial Period</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1 text-blue-500" />
                      +{org.growth}% growth
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-6">
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button 
                size="sm" 
                asChild
                style={{ backgroundColor: org.primaryColor }}
                className="text-white hover:opacity-90 font-semibold shadow-lg"
              >
                <Link to={`/portal/${org.id}`}>
                  <Building2 className="h-4 w-4 mr-2" />
                  Manage Portal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );


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
                Organizations Management
              </h1>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-sm">
                Manage and monitor all organizations on your platform
              </p>
            </div>


                      {/* Platform Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 glass bg-white/10 border-white/20 backdrop-blur-sm shadow-elegant hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/30 flex items-center justify-center shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Total Organizations</h3>
                  <div className="text-2xl font-bold text-white mb-2">48</div>
                  <Badge className="bg-gradient-to-r from-green-400/30 to-emerald-400/30 text-green-100 border-green-300/50 font-medium">
                    Active
                  </Badge>
                </div>
              </Card>
              <Card className="p-6 glass bg-white/10 border-white/20 backdrop-blur-sm shadow-elegant hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/30 flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Active Students</h3>
                  <div className="text-2xl font-bold text-white mb-2">12,847</div>
                  <Badge className="bg-gradient-to-r from-blue-400/30 to-cyan-400/30 text-blue-100 border-blue-300/50 font-medium">
                    Growing
                  </Badge>
                </div>
              </Card>
              <Card className="p-6 glass bg-white/10 border-white/20 backdrop-blur-sm shadow-elegant hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/30 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Completion Rate</h3>
                  <div className="text-2xl font-bold text-white mb-2">88%</div>
                  <Badge className="bg-gradient-to-r from-purple-400/30 to-pink-400/30 text-purple-100 border-purple-300/50 font-medium">
                    Excellent
                  </Badge>
                </div>
              </Card>
              <Card className="p-6 glass bg-white/10 border-white/20 backdrop-blur-sm shadow-elegant hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/30 flex items-center justify-center shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Revenue</h3>
                  <div className="text-2xl font-bold text-white mb-2">$2.4M</div>
                  <Badge className="bg-gradient-to-r from-orange-400/30 to-red-400/30 text-orange-100 border-orange-300/50 font-medium">
                    Monthly
                  </Badge>
                </div>
              </Card>
            </div>

          </div>
        </div>
      </section>

      <div className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-8">



            <div className="shadow-elegant">




                {/* Organization Tabs  */}
                <Tabs defaultValue="all" className="space-y-6">
                  
                  {/* <Card className="p-6 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant">
                    <TabsList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-muted/50">
                      <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All Organizations</TabsTrigger>
                      <TabsTrigger value="enterprise" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Enterprise</TabsTrigger>
                      <TabsTrigger value="trial" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Trial</TabsTrigger>
                      <TabsTrigger value="new" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">New Partners</TabsTrigger>
                    </TabsList>
                  </Card>   */}

                  <TabsContent value="all" className="space-y-4">
                    <Card className="p-6 md:p-8 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">All Organizations</h2>
                          <p className="text-muted-foreground">Complete overview of all organizations on the platform</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button 
                            variant="outline" 
                            className="border-primary/20 hover:bg-primary/5 text-foreground hover:text-foreground font-semibold"
                            asChild
                          >
                            <Link to="/create-organization">
                              <Plus className="w-4 h-4 mr-2" />
                              Create Organization
                            </Link>
                          </Button>
                          <Badge className="bg-blue-600 text-white border-blue-700 font-semibold text-lg px-3 py-1">
                            {filteredOrganizations.length} Total
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredOrganizations.map((org) => renderOrganizationCard(org))}
                      </div>
                    </Card>
                  </TabsContent>

                  {/* <TabsContent value="enterprise" className="space-y-4">
                    <Card className="p-6 md:p-8 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">Enterprise Organizations</h2>
                          <p className="text-muted-foreground">Organizations with enterprise-level subscriptions and premium features</p>
                        </div>
                        <Badge className="bg-purple-600 text-white border-purple-700 font-semibold text-lg px-3 py-1">
                          {enterpriseOrganizations.length} Enterprise
                        </Badge>
                      </div>
                      <div className="grid gap-6">
                        {enterpriseOrganizations.map((org) => renderOrganizationCard(org))}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="trial" className="space-y-4">
                    <Card className="p-6 md:p-8 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">Trial Organizations</h2>
                          <p className="text-muted-foreground">Organizations currently evaluating our platform on trial subscriptions</p>
                        </div>
                        <Badge className="bg-orange-600 text-white border-orange-700 font-semibold text-lg px-3 py-1">
                          {trialOrganizations.length} Trials
                        </Badge>
                      </div>
                      <div className="grid gap-6">
                        {trialOrganizations.map((org) => renderOrganizationCard(org))}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="new" className="space-y-4">
                    <Card className="p-6 md:p-8 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant hover:shadow-2xl transition-all duration-300">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-2">New Partners</h2>
                          <p className="text-muted-foreground">Organizations that joined our platform in the last 30 days</p>
                        </div>
                        <Badge className="bg-green-600 text-white border-green-700 font-semibold text-lg px-3 py-1">
                          {newPartnerOrganizations.length} New
                        </Badge>
                      </div>
                      <div className="grid gap-6">
                        {newPartnerOrganizations.map((org) => renderOrganizationCard(org))}
                      </div>
                    </Card>
                  </TabsContent> */}
                </Tabs>
            </div>

      {/* Security Features */}
      {/* <Card className="shadow-elegant">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {orgTabs.map((org, index) => (
              <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 border border-border/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">{org.name}</h3>
                  </div>                 
                </div>                
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      <Card className="p-6 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant">
        <CardContent>
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-muted/50">
            {orgTabs.map((org, index) => (
               <TabsTrigger key={index} value={org.name} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{org.name}</TabsTrigger>
            ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card> 
        
          </div> {/* Close max-w-6xl */}
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;