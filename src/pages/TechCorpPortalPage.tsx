import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider } from "@/components/ui/sidebar";
import { OrganizationPortalSidebar } from "@/components/OrganizationPortalSidebar";
import { OrganizationHeader, OrganizationData } from "@/components/OrganizationHeader";
import { useSmartSidebarDefault } from "@/hooks/useMobileDetection";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Globe,
  Mail,
  Phone,
  MapPin,
  Award,
  Clock,
  CheckCircle,
  BarChart3,
  FileText,
  Settings,
  Bell,
  Download,
  Code,
  Zap
} from "lucide-react";

const TechCorpPortalPage = () => {
  const shouldOpenByDefault = useSmartSidebarDefault();
  
  const orgData: OrganizationData = {
    name: "TechCorp Training",
    logo: "/placeholder.svg",
    headerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=300&fit=crop",
    primaryColor: "#0066CC",
    secondaryColor: "#004499",
    customUrl: "techcorp.learningplatform.com",
    location: "San Francisco, CA",
    subtitle: "Corporate Learning Hub",
    planType: "Professional",
    additionalBadges: [{
      text: "Tech Focus",
      icon: Zap,
      color: "blue"
    }]
  };

  const stats = {
    students: 850,
    instructors: 25,
    courses: 45,
    completionRate: 92
  };

  const dashboardStats = [
    { title: "Active Employees", value: "850", icon: Users, color: orgData.primaryColor, change: "+18%" },
    { title: "Training Modules", value: "45", icon: Code, color: orgData.primaryColor, change: "+22%" },
    { title: "Completion Rate", value: "92%", icon: TrendingUp, color: orgData.primaryColor, change: "+7%" },
    { title: "Skills Certified", value: "1,247", icon: Award, color: orgData.primaryColor, change: "+25%" }
  ];

  const recentActivities = [
    { action: "New DevOps certification track launched", time: "1 hour ago", type: "course" },
    { action: "Alex Rodriguez completed 'React Advanced Patterns'", time: "3 hours ago", type: "completion" },
    { action: "15 new developers onboarded", time: "6 hours ago", type: "enrollment" },
    { action: "Monthly skills assessment completed", time: "1 day ago", type: "report" }
  ];

  const topCourses = [
    { name: "React.js Fundamentals", enrolled: 156, completion: 94 },
    { name: "Node.js Backend Development", enrolled: 134, completion: 89 },
    { name: "DevOps & CI/CD", enrolled: 98, completion: 91 },
    { name: "Python for Data Science", enrolled: 87, completion: 88 }
  ];

  return (
    <SidebarProvider defaultOpen={shouldOpenByDefault}>
      <div className="min-h-screen flex w-full bg-background">
        <OrganizationPortalSidebar orgName={orgData.name} primaryColor={orgData.primaryColor} />
        
        <div className="flex-1 overflow-auto min-w-0">
          <OrganizationHeader 
            orgData={orgData} 
            stickyHeader={true} 
          />

          <div className="container mx-auto px-6">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-3xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <Badge variant="secondary" className="text-green-700 bg-green-50">
                    {stat.change}
                  </Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activities */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                    <span>Recent Training Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-50">
                      <div 
                        className="w-2 h-2 rounded-full mt-2"
                        style={{ backgroundColor: orgData.primaryColor }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Training Modules */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                    <span>Top Modules</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topCourses.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium leading-tight">{course.name}</h4>
                        <Badge 
                          variant="secondary" 
                          className="text-xs text-white"
                          style={{ backgroundColor: orgData.primaryColor }}
                        >
                          {course.enrolled}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Completion Rate</span>
                          <span>{course.completion}%</span>
                        </div>
                        <Progress value={course.completion} className="h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Training Management</CardTitle>
                <CardDescription>Manage technical training programs and certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Code className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Training Dashboard</h3>
                  <p className="text-muted-foreground mb-4">Comprehensive training module management</p>
                  <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    Manage Training
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>Employee Development</CardTitle>
                <CardDescription>Track employee learning progress and skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Employee Portal</h3>
                  <p className="text-muted-foreground mb-4">Monitor employee skill development and progress</p>
                  <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    View Employees
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Certifications</CardTitle>
                <CardDescription>Manage technical skills and certification tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Award className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Skills Matrix</h3>
                  <p className="text-muted-foreground mb-4">Track technical competencies and certifications</p>
                  <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    Skills Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Performance Reports</CardTitle>
                <CardDescription>Generate detailed performance and compliance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Reporting Center</h3>
                  <p className="text-muted-foreground mb-4">Access training metrics and compliance reports</p>
                  <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    Generate Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TechCorpPortalPage;