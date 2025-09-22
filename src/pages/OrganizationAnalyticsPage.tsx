import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useLocation } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BarChart3, 
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Download,
  Calendar
} from "lucide-react";
import { OrganizationHeader } from "@/components/OrganizationHeader";
import InstructorMobileBottomNav from "@/components/responsive/InstructorMobileBottomNav";

const OrganizationAnalyticsPage = () => {
  const { user } = useAuth();
  const { orgId } = useParams();
  const location = useLocation();
  const orgData = getOrganizationDataFromPath(location.pathname);
  

  const analyticsData = [
    {
      title: "Student Engagement",
      value: "87%",
      change: "+12%",
      description: "Average time spent on platform",
      icon: Users
    },
    {
      title: "Course Completion Rate",
      value: "89%",
      change: "+5%",
      description: "Students who complete courses",
      icon: BookOpen
    },
    {
      title: "Certificate Issuance",
      value: "2,847",
      change: "+23%",
      description: "Certificates issued this quarter",
      icon: Award
    },
    {
      title: "Monthly Active Users",
      value: "9,847",
      change: "+8%",
      description: "Students active in the last 30 days",
      icon: TrendingUp
    }
  ];

  const topPerformingCourses = [
    { name: "Introduction to Computer Science", completion: 92, enrolled: 1250 },
    { name: "Web Development Bootcamp", completion: 91, enrolled: 634 },
    { name: "Data Science Fundamentals", completion: 87, enrolled: 980 },
    { name: "Advanced Machine Learning", completion: 84, enrolled: 756 }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <OrganizationHeader orgData={orgData} />
      <div className={`container mx-auto px-4 sm:px-6 max-w-6xl ${user?.role === 'instructor' ? 'pb-20 md:pb-6' : 'pb-6'}`} style={{ paddingTop: '80px' }}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 md:mb-6 gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base">Detailed insights into your learning platform performance</p>
        </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Last 30 Days
                </Button>
                <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white w-full sm:w-auto text-xs sm:text-sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
              {analyticsData.map((metric, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </CardTitle>
                      <metric.icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: orgData.primaryColor }}>
                        {metric.value}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-green-600 font-medium">{metric.change}</span>
                        <span className="text-xs text-muted-foreground">vs last period</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Engagement Chart Placeholder */}
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                    <span>Weekly Engagement Trends</span>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Student activity over the past 12 weeks</CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="h-48 sm:h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground text-xs sm:text-sm">Engagement chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Courses */}
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                    <span>Top Performing Courses</span>
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Courses with highest completion rates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                  {topPerformingCourses.map((course, index) => (
                    <div key={index} className="space-y-1 sm:space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs sm:text-sm font-medium leading-tight">{course.name}</h4>
                        <div className="text-right">
                          <div className="text-xs sm:text-sm font-medium">{course.completion}%</div>
                          <div className="text-xs text-muted-foreground">{course.enrolled} students</div>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${course.completion}%`,
                            backgroundColor: orgData.primaryColor 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-sm sm:text-base">Learning Paths</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Most popular learning sequences</CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="h-24 sm:h-32 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-xs sm:text-sm">Learning paths analytics</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-sm sm:text-base">Time to Completion</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Average course completion times</CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="h-24 sm:h-32 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-xs sm:text-sm">Completion time metrics</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-sm sm:text-base">Regional Performance</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Performance by geographic region</CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="h-24 sm:h-32 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-xs sm:text-sm">Regional analytics</p>
                  </div>
                </CardContent>
              </Card>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation - only show for instructors */}
      {user?.role === 'instructor' && <InstructorMobileBottomNav currentPage="analytics" />}
    </div>
  );
};

export default OrganizationAnalyticsPage;