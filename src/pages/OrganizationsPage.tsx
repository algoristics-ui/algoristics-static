import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import Navigation from "@/components/Navigation";

const OrganizationsPage_bkp = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Organizations with actual working routes and data
  const organizations = [
    {
      id: "1",
      name: "Stanford University",
      type: "University",
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
      primaryColor: "#8C1515",
      secondaryColor: "#B1040E",
      completionRate: 89,
      totalRevenue: 15650,
      growth: 12,
      location: "Stanford, CA"
    },
    {
      id: "2",
      name: "TechCorp Training",
      type: "Corporate",
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
      primaryColor: "#0066CC",
      secondaryColor: "#004499",
      completionRate: 92,
      totalRevenue: 8950,
      growth: 18,
      location: "San Francisco, CA"
    },
    {
      id: "3",
      name: "City Community College",
      type: "College",
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
      primaryColor: "#228B22",
      secondaryColor: "#32CD32",
      completionRate: 76,
      totalRevenue: 0,
      growth: 45,
      location: "Los Angeles, CA"
    },
    {
      id: "4",
      name: "Algoristics",
      type: "Educational Technology",
      industry: "Education Technology",
      status: "Active",
      subscription: "Enterprise",
      students: 5200,
      instructors: 75,
      courses: 85,
      joinedDate: "2023-08-20",
      contactName: "John Admin",
      contactEmail: "admin@algoristics.com",
      contactPhone: "+1 (555) 234-5678",
      primaryColor: "#3B82F6",
      secondaryColor: "#1D4ED8",
      completionRate: 88,
      totalRevenue: 12450,
      growth: 25,
      location: "San Jose, CA"
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

  const getInternalOrgUrl = (orgName: string) => {
    const orgMapping: Record<string, string> = {
      "Stanford University": "/stanford",
      "TechCorp Training": "/techcorp", 
      "City Community College": "/citycollege",
      "Algoristics": "/algoristics"
    };
    
    return orgMapping[orgName] || `/org/${orgName.toLowerCase().replace(/\s+/g, '-')}`;
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
    <Card key={org.id} className="hover:shadow-lg transition-all duration-300 border border-border">
      <CardContent className="p-4 sm:p-6">
        <div className="w-full">
          {/* Organization Info */}
          <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-2 sm:space-y-0">
              <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">{org.name}</h3>
              <div className="flex items-center space-x-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {org.subscription || org.planType}
                </Badge>
                <Badge 
                  variant={org.status === 'Active' ? 'default' : org.status === 'Trial' ? 'secondary' : 'destructive'}
                  className="font-medium text-xs"
                >
                  {org.status}
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1 text-xs sm:text-sm text-muted-foreground mb-3">
              <div className="flex items-center min-w-0">
                <Building2 className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{org.industry || org.type}</span>
              </div>
              <div className="flex items-center min-w-0">
                <MapPin className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{org.location}</span>
              </div>
              <div className="flex items-center min-w-0">
                <Calendar className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">Joined {new Date(org.joinedDate || org.joinDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
              <div className="text-center min-w-0">
                <div className="text-base sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                  {org.students?.toLocaleString() || org.users}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Students</div>
              </div>
              <div className="text-center min-w-0">
                <div className="text-base sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                  {org.instructors}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Instructors</div>
              </div>
              <div className="text-center min-w-0">
                <div className="text-base sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                  {org.courses}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Courses</div>
              </div>
              <div className="text-center min-w-0">
                <div className="text-base sm:text-xl lg:text-2xl font-bold text-foreground truncate">
                  {org.completionRate || org.engagement}%
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">Completion</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col pt-4 border-t border-border space-y-3">
              <div className="space-y-2 min-w-0 w-full">
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="font-medium truncate">{org.contactName}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex flex-col space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1 min-w-0">
                      <Mail className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{org.contactEmail}</span>
                    </div>
                    <div className="flex items-center space-x-1 min-w-0">
                      <Phone className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{org.contactPhone}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3 flex-shrink-0" />
                    <Link to={getInternalOrgUrl(org.name)} className="hover:text-primary truncate">
                      Website
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/super-admin/organizations/${org.id}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/super-admin/organizations/${org.id}/edit`)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Organization
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/super-admin/organizations/${org.id}/settings`)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Manage Settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full overflow-x-hidden">
      <Navigation />
      {/* Hero Section - Matching main page */}
      <section className="relative pt-24 pb-12 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/60" />
        <div className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          
          
            {/* Organizations Management */}
            <div className="text-center mb-6 md:mb-8 pt-4 md:pt-8 px-2 md:px-4">
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
                Organizations Management
              </h2>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-sm">
                Manage and monitor all organizations on your platform
              </p>
            </div>
            
            {/* Platform Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="p-4 sm:p-6 glass bg-white/10 border-white/20 backdrop-blur-sm shadow-elegant hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/30 flex items-center justify-center shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Total Organizations</h3>
                  <div className="text-2xl font-bold text-white mb-2">{organizations.length}</div>
                  <Badge className="bg-gradient-to-r from-green-400/30 to-emerald-400/30 text-green-100 border-green-300/50 font-medium">
                    Active
                  </Badge>
                </div>
              </Card>
              <Card className="p-4 sm:p-6 glass bg-white/10 border-white/20 backdrop-blur-sm shadow-elegant hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-white/20 to-white/30 flex items-center justify-center shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Active Students</h3>
                  <div className="text-2xl font-bold text-white mb-2">{organizations.reduce((total, org) => total + org.students, 0).toLocaleString()}</div>
                  <Badge className="bg-gradient-to-r from-blue-400/30 to-cyan-400/30 text-blue-100 border-blue-300/50 font-medium">
                    Growing
                  </Badge>
                </div>
              </Card>
              <Card className="p-4 sm:p-6 glass bg-white/10 border-white/20 backdrop-blur-sm shadow-elegant hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
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
              <Card className="p-4 sm:p-6 glass bg-white/10 border-white/20 backdrop-blur-sm shadow-elegant hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
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
      </section>

      {/* Organizations Section */}
      <div className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 space-y-8">

          {/* Organizations Overview */}
          {/* <div> */}
            {/* Search and Filter Controls */}
            {/* <Card className="p-6 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant hover:shadow-2xl transition-all duration-300 mb-8">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search organizations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-border/30 bg-background/50"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40 border-border/30 bg-background/50">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card> */}

            {/* Organization Tabs */}
            <Tabs defaultValue="all" className="space-y-6">
              {/* <Card className="p-6 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant">
                <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">All Organizations</TabsTrigger>
                  <TabsTrigger value="enterprise" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Enterprise</TabsTrigger>
                  <TabsTrigger value="trial" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Trial</TabsTrigger>
                  <TabsTrigger value="new" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">New Partners</TabsTrigger>
                </TabsList>
              </Card> */}

              <TabsContent value="all" className="space-y-4">
                <Card className="p-4 sm:p-6 md:p-8 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant hover:shadow-2xl transition-all duration-300">
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
                  <div className="grid gap-6">
                    {filteredOrganizations.map((org) => renderOrganizationCard(org))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="enterprise" className="space-y-4">
                <Card className="p-4 sm:p-6 md:p-8 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant hover:shadow-2xl transition-all duration-300">
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
                <Card className="p-4 sm:p-6 md:p-8 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant hover:shadow-2xl transition-all duration-300">
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
                <Card className="p-4 sm:p-6 md:p-8 glass bg-background/90 backdrop-blur-sm border border-border/20 shadow-elegant hover:shadow-2xl transition-all duration-300">
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
              </TabsContent>
            </Tabs>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage_bkp;