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
  Download
} from "lucide-react";

const StanfordPortalPage = () => {
  const shouldOpenByDefault = useSmartSidebarDefault();
  
  const orgData: OrganizationData = {
    name: "Stanford University",
    logo: "/placeholder.svg",
    headerImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&h=300&fit=crop",
    primaryColor: "#8C1515",
    secondaryColor: "#B1040E",
    customUrl: "stanford.learningplatform.com",
    location: "Stanford, CA",
    planType: "Enterprise"
  };

  const stats = {
    students: 12500,
    instructors: 450,
    courses: 120,
    completionRate: 89
  };

  const dashboardStats = [
    { title: "Active Students", value: stats.students.toLocaleString(), icon: Users, color: orgData.primaryColor, change: "+8%" },
    { title: "Total Courses", value: stats.courses.toString(), icon: BookOpen, color: orgData.primaryColor, change: "+12%" },
    { title: "Completion Rate", value: `${stats.completionRate}%`, icon: TrendingUp, color: orgData.primaryColor, change: "+5%" },
    { title: "Certificates Issued", value: "2,847", icon: Award, color: orgData.primaryColor, change: "+15%" }
  ];

  const recentActivities = [
    { action: "New course 'Advanced Machine Learning' published", time: "2 hours ago", type: "course" },
    { action: "Sarah Chen completed 'Data Science Fundamentals'", time: "4 hours ago", type: "completion" },
    { action: "25 new students enrolled this week", time: "1 day ago", type: "enrollment" },
    { action: "Q4 completion report generated", time: "2 days ago", type: "report" }
  ];

  const topCourses = [
    { name: "Introduction to Computer Science", enrolled: 1250, completion: 92 },
    { name: "Data Science Fundamentals", enrolled: 980, completion: 87 },
    { name: "Advanced Machine Learning", enrolled: 756, completion: 84 },
    { name: "Web Development Bootcamp", enrolled: 634, completion: 91 }
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
            <Card key={index} className="hover:shadow-lg transition-shadow">
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
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activities */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                    <span>Recent Activities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
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

              {/* Top Performing Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                    <span>Top Courses</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topCourses.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium leading-tight">{course.name}</h4>
                        <Badge variant="secondary" className="text-xs">
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

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Course Management</CardTitle>
                <CardDescription>Manage all courses for Stanford University</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Course Management</h3>
                  <p className="text-muted-foreground mb-4">Detailed course management interface would be here</p>
                  <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    View All Courses
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Manage student enrollment and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Student Dashboard</h3>
                  <p className="text-muted-foreground mb-4">Student management and analytics would be displayed here</p>
                  <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    View All Students
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>Detailed performance analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground mb-4">Comprehensive analytics and reporting dashboard</p>
                  <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Documentation</CardTitle>
                <CardDescription>Generate and download various reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: orgData.primaryColor }} />
                  <h3 className="text-lg font-semibold mb-2">Report Center</h3>
                  <p className="text-muted-foreground mb-4">Access all reports and documentation</p>
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

export default StanfordPortalPage;