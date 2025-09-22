import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationHeader, OrganizationData } from "@/components/OrganizationHeader";
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
  GraduationCap,
  Timer
} from "lucide-react";

const CityCollegePortalPage = () => {
  const orgData: OrganizationData = {
    name: "City Community College",
    logo: "/placeholder.svg",
    headerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=300&fit=crop",
    primaryColor: "#228B22",
    secondaryColor: "#32CD32",
    customUrl: "citycc.learningplatform.com",
    location: "Los Angeles, CA",
    subtitle: "Student Success Portal",
    planType: "Trial",
    additionalBadges: [{
      text: "Community Focus",
      icon: GraduationCap,
      color: "green"
    }]
  };

  const stats = {
    students: 2400,
    instructors: 120,
    courses: 65,
    completionRate: 76
  };

  const dashboardStats = [
    { title: "Enrolled Students", value: stats.students.toLocaleString(), icon: Users, color: orgData.primaryColor, change: "+45%" },
    { title: "Available Courses", value: stats.courses.toString(), icon: BookOpen, color: orgData.primaryColor, change: "+8%" },
    { title: "Success Rate", value: `${stats.completionRate}%`, icon: TrendingUp, color: orgData.primaryColor, change: "+12%" },
    { title: "Degrees Awarded", value: "156", icon: GraduationCap, color: orgData.primaryColor, change: "+35%" }
  ];

  const recentActivities = [
    { action: "New semester enrollment opened", time: "30 minutes ago", type: "enrollment" },
    { action: "Maria Santos completed 'English Composition I'", time: "2 hours ago", type: "completion" },
    { action: "Financial aid applications processed", time: "5 hours ago", type: "administrative" },
    { action: "Fall 2024 graduation ceremony scheduled", time: "1 day ago", type: "event" }
  ];

  const topCourses = [
    { name: "English Composition I", enrolled: 245, completion: 82 },
    { name: "College Mathematics", enrolled: 198, completion: 74 },
    { name: "Introduction to Psychology", enrolled: 187, completion: 79 },
    { name: "Business Fundamentals", enrolled: 156, completion: 81 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <OrganizationHeader orgData={orgData} />

      <div className="container mx-auto px-3 md:px-6">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
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
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activities */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                    <span>Campus Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-green-50">
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

              {/* Popular Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                    <span>Popular Courses</span>
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
                          <span>Success Rate</span>
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

          <TabsContent value="academics">
            <Card>
              <CardHeader>
                <CardTitle>Academic Programs</CardTitle>
                <CardDescription>Manage degree programs and course offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Academic Management</h3>
                  <p className="text-muted-foreground mb-4">Comprehensive academic program administration</p>
                  <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    Manage Programs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Services</CardTitle>
                <CardDescription>Student enrollment, support, and success tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Student Dashboard</h3>
                  <p className="text-muted-foreground mb-4">Comprehensive student services and support</p>
                  <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    Student Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enrollment">
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Management</CardTitle>
                <CardDescription>Manage student admissions and enrollment processes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Enrollment Center</h3>
                  <p className="text-muted-foreground mb-4">Streamlined enrollment and admissions management</p>
                  <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    Manage Enrollment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Academic Reports</CardTitle>
                <CardDescription>Generate academic performance and compliance reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Reporting Dashboard</h3>
                  <p className="text-muted-foreground mb-4">Academic performance and institutional reporting</p>
                  <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    View Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CityCollegePortalPage;