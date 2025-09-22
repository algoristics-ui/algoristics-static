import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  BookOpen, 
  TrendingUp,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Edit,
  Settings,
  Shield,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";

const OrganizationDetailPage = () => {
  const { orgId } = useParams();
  const navigate = useNavigate();

  // Mock organization data - in real app this would come from API
  const organization = {
    id: orgId,
    name: "Stanford University",
    type: "University",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
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
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 pb-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/super-admin/organizations")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Organizations
        </Button>
        
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback 
                className="text-white text-xl font-bold"
                style={{ backgroundColor: organization.primaryColor }}
              >
                {organization.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold mb-2">{organization.name}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Building2 className="w-4 h-4" />
                  <span>{organization.industry}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{organization.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(organization.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge 
              variant={organization.status === 'Active' ? 'default' : 'secondary'}
              className="text-sm px-3 py-1"
            >
              {organization.status}
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {organization.subscription}
            </Badge>
            <Button 
              variant="outline"
              onClick={() => navigate(`/super-admin/organizations/${orgId}/edit`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate(`/super-admin/organizations/${orgId}/settings`)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${organization.primaryColor}15` }}
              >
                <Users className="h-5 w-5" style={{ color: organization.primaryColor }} />
              </div>
              <div>
                <p className="text-2xl font-bold">{organization.students.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${organization.primaryColor}15` }}
              >
                <Users className="h-5 w-5" style={{ color: organization.primaryColor }} />
              </div>
              <div>
                <p className="text-2xl font-bold">{organization.instructors}</p>
                <p className="text-sm text-muted-foreground">Instructors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${organization.primaryColor}15` }}
              >
                <BookOpen className="h-5 w-5" style={{ color: organization.primaryColor }} />
              </div>
              <div>
                <p className="text-2xl font-bold">{organization.courses}</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${organization.primaryColor}15` }}
              >
                <BarChart3 className="h-5 w-5" style={{ color: organization.primaryColor }} />
              </div>
              <div>
                <p className="text-2xl font-bold">{organization.completionRate}%</p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organization Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Primary contact details for this organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{organization.contactName}</p>
                <p className="text-sm text-muted-foreground">Primary Contact</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{organization.contactEmail}</p>
                <p className="text-sm text-muted-foreground">Email Address</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{organization.contactPhone}</p>
                <p className="text-sm text-muted-foreground">Phone Number</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <div>
                <a 
                  href={organization.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {organization.website}
                </a>
                <p className="text-sm text-muted-foreground">Website</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{organization.customUrl}</p>
                <p className="text-sm text-muted-foreground">Learning Platform URL</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Key performance indicators and metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Course Completion Rate</span>
                <span className="text-sm text-muted-foreground">{organization.completionRate}%</span>
              </div>
              <Progress value={organization.completionRate} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-green-600">+{organization.growth}%</div>
                <div className="text-sm text-muted-foreground">Growth Rate</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">${organization.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Monthly Revenue</div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Last active: {new Date(organization.lastActive).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationDetailPage;