import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Award,
  Clock,
  CheckCircle,
  BarChart3,
  ClipboardList,
  AlertCircle,
  Megaphone,
  UserCheck
} from "lucide-react";
import { OrganizationHeader } from "@/components/OrganizationHeader";
import InstructorMobileBottomNav from "@/components/responsive/InstructorMobileBottomNav";

const OrganizationDashboardPage = () => {
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const orgData = getOrganizationDataFromPath(location.pathname);

  // Role-based dashboard stats
  const getStatsForRole = () => {
    if (user?.role === 'instructor') {
      return [
        { title: "My Students", value: "248", icon: Users, color: orgData.primaryColor, change: "+5%" },
        { title: "My Courses", value: "6", icon: BookOpen, color: orgData.primaryColor, change: "+1%" },
        { title: "Avg Completion", value: "92%", icon: TrendingUp, color: orgData.primaryColor, change: "+7%" },
        { title: "Certificates Earned", value: "189", icon: Award, color: orgData.primaryColor, change: "+12%" }
      ];
    }
    
    if (user?.role === 'org_admin') {
      return [
        { title: "Active Students", value: "12,500", icon: Users, color: orgData.primaryColor, change: "+8%" },
        { title: "Total Courses", value: "120", icon: BookOpen, color: orgData.primaryColor, change: "+12%" },
        { title: "Completion Rate", value: "89%", icon: TrendingUp, color: orgData.primaryColor, change: "+5%" },
        { title: "Certificates Issued", value: "2,847", icon: Award, color: orgData.primaryColor, change: "+15%" }
      ];
    }
    
    // Default learner stats
    return [
      { title: "Enrolled Courses", value: "8", icon: BookOpen, color: orgData.primaryColor, change: "+2%" },
      { title: "Completed Courses", value: "3", icon: CheckCircle, color: orgData.primaryColor, change: "+1%" },
      { title: "Certificates Earned", value: "2", icon: Award, color: orgData.primaryColor, change: "+1%" },
      { title: "Study Progress", value: "67%", icon: TrendingUp, color: orgData.primaryColor, change: "+12%" }
    ];
  };

  const dashboardStats = getStatsForRole();

  // Role-based news feed items
  const getNewsFeedForRole = () => {
    if (user?.role === 'instructor') {
      return [
        {
          id: 1,
          type: "student_submission",
          title: "New Assignment Submissions",
          content: "15 students have submitted their assignments for 'Advanced JavaScript'. Review and grade when ready.",
          priority: "high",
          date: "2024-03-15",
          icon: ClipboardList
        },
        {
          id: 2,
          type: "course_update",
          title: "Course Material Update",
          content: "Update your course materials for the upcoming semester. Deadline is March 20th.",
          priority: "medium",
          date: "2024-03-20",
          icon: BookOpen
        },
        {
          id: 3,
          type: "student_progress",
          title: "Student Performance Alert",
          content: "3 students in your 'Data Structures' course are falling behind. Consider reaching out for support.",
          priority: "high",
          date: "2024-03-12",
          icon: AlertCircle
        },
        {
          id: 4,
          type: "announcement",
          title: "Faculty Meeting",
          content: "Monthly faculty meeting scheduled for March 22nd at 2 PM. Agenda includes curriculum updates.",
          priority: "medium",
          date: "2024-03-22",
          icon: Megaphone
        },
        {
          id: 5,
          type: "certification",
          title: "Professional Development",
          content: "New teaching certification workshop available. Register now to enhance your instructional skills.",
          priority: "low",
          date: "2024-03-25",
          icon: Award
        }
      ];
    }
    
    if (user?.role === 'org_admin') {
      return [
        {
          id: 1,
          type: "system_alert",
          title: "System Performance Report",
          content: "Monthly system performance metrics are available. Platform uptime: 99.8%, user satisfaction: 4.7/5.",
          priority: "medium",
          date: "2024-03-15",
          icon: BarChart3
        },
        {
          id: 2,
          type: "user_management",
          title: "New Instructor Applications",
          content: "5 new instructor applications pending review. Please review credentials and approve access.",
          priority: "high",
          date: "2024-03-14",
          icon: UserCheck
        },
        {
          id: 3,
          type: "course_approval",
          title: "Course Content Review",
          content: "3 new courses awaiting admin approval before publication. Review content and learning objectives.",
          priority: "high",
          date: "2024-03-13",
          icon: BookOpen
        },
        {
          id: 4,
          type: "analytics",
          title: "Quarterly Analytics Ready",
          content: "Q1 performance analytics available. Student engagement up 23%, course completion rate improved by 8%.",
          priority: "medium",
          date: "2024-03-10",
          icon: TrendingUp
        },
        {
          id: 5,
          type: "budget",
          title: "Budget Review Meeting",
          content: "Quarterly budget review scheduled for March 25th. Prepare departmental expense reports.",
          priority: "medium",
          date: "2024-03-25",
          icon: AlertCircle
        }
      ];
    }
    
    // Default learner news feed
    return [
      {
        id: 1,
        type: "due_date",
        title: "Course Completion Due",
        content: "Complete 'Data Science Fundamentals' by March 15th to maintain your certification progress.",
        priority: "high",
        date: "2024-03-15",
        icon: AlertCircle
      },
      {
        id: 2,
        type: "new_course",
        title: "New Course Available",
        content: "Advanced Machine Learning course is now available. Enroll today to enhance your AI skills.",
        priority: "medium",
        date: "2024-03-10",
        icon: BookOpen
      },
      {
        id: 3,
        type: "assessment",
        title: "Assessment Reminder",
        content: "Midterm assessment for 'Cloud Computing' opens tomorrow. Prepare and schedule your exam.",
        priority: "high",
        date: "2024-03-12",
        icon: ClipboardList
      },
      {
        id: 4,
        type: "announcement",
        title: "Spring Break Schedule",
        content: "University will be closed from March 25-29. All online courses remain accessible during this period.",
        priority: "low",
        date: "2024-03-25",
        icon: Megaphone
      },
      {
        id: 5,
        type: "new_course",
        title: "Cybersecurity Fundamentals",
        content: "New cybersecurity course launching next week. Limited spots available, register now!",
        priority: "medium",
        date: "2024-03-18",
        icon: BookOpen
      }
    ];
  };

  const newsFeedItems = getNewsFeedForRole();

  const recentActivities = [
    { action: "New course 'Advanced Machine Learning' published", time: "2 hours ago", type: "course" },
    { action: "Sarah Chen completed 'Data Science Fundamentals'", time: "4 hours ago", type: "completion" },
    { action: "25 new students enrolled this week", time: "1 day ago", type: "enrollment" },
    { action: "Q4 completion report generated", time: "2 days ago", type: "report" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return orgData.primaryColor;
    }
  };

  // Role-based header content
  const getHeaderContent = () => {
    if (user?.role === 'instructor') {
      return {
        title: "Instructor Dashboard",
        subtitle: "Manage your courses and track student progress"
      };
    }
    
    if (user?.role === 'org_admin') {
      return {
        title: "Organization Admin Dashboard",
        subtitle: "Manage your organization, courses, and oversee platform operations"
      };
    }
    
    return {
      title: "Student Dashboard", 
      subtitle: "Track your learning progress and explore new courses"
    };
  };

  const headerContent = getHeaderContent();

  return (
    <div className="w-full min-h-screen">
      <OrganizationHeader orgData={orgData} />
      <div className={`w-full px-2 sm:px-3 md:px-4 ${user?.role === 'instructor' ? 'pb-16 sm:pb-20 md:pb-6' : 'pb-6'}`} style={{ paddingTop: '80px' }}>
        <div className="mb-3 sm:mb-4 pt-2">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground break-words">{headerContent.title}</h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground break-words leading-relaxed">{headerContent.subtitle}</p>
        </div>

            {/* News Feed Carousel */}
            <Card className={`mb-2 sm:mb-3 ${user?.role === 'instructor' ? 'hidden sm:block' : ''}`}>
              <CardHeader className="px-2 sm:px-3 md:px-4 pb-1 sm:pb-2">
                <CardTitle className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base md:text-lg">
                  <Megaphone className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: orgData.primaryColor }} />
                  <span className="text-xs sm:text-sm md:text-base break-words">Latest Updates & Announcements</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm break-words leading-relaxed">
                  Important news, course deadlines, and announcements
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:px-3 md:px-4 pt-0">
                <Carousel className="w-full">
                  <CarouselContent className="-ml-1">
                    {newsFeedItems.map((item) => (
                      <CarouselItem key={item.id} className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
                        <div className="p-0.5 sm:p-1">
                          <Card className="h-full">
                            <CardHeader className="pb-1 sm:pb-2 px-2 sm:px-3 pt-2 sm:pt-3">
                              <div className="flex items-start justify-between mb-1 sm:mb-2">
                                <div className="flex items-center space-x-1">
                                  <item.icon 
                                    className="h-2.5 w-2.5 sm:h-3 sm:w-3" 
                                    style={{ color: getPriorityColor(item.priority) }}
                                  />
                                  <Badge 
                                    variant="secondary" 
                                    className="text-xs px-1"
                                    style={{ 
                                      backgroundColor: `${getPriorityColor(item.priority)}20`,
                                      color: getPriorityColor(item.priority)
                                    }}
                                  >
                                    {item.priority.toUpperCase()}
                                  </Badge>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(item.date).toLocaleDateString()}
                                </span>
                              </div>
                              <CardTitle className="text-xs font-semibold leading-tight break-words">
                                {item.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 px-2 sm:px-3">
                              <p className="text-xs text-muted-foreground leading-relaxed break-words">
                                {item.content}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className={`mb-2 sm:mb-3 ${user?.role === 'instructor' ? 'hidden sm:block' : ''}`}>
              <CardHeader className="px-2 sm:px-3 md:px-4 pb-1 sm:pb-2">
                <CardTitle className="flex items-center space-x-2 text-sm sm:text-base md:text-lg">
                  <span className="break-words">Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-2 sm:px-3 md:px-4 pt-0">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
                  <Button 
                    variant="outline" 
                    className="h-12 sm:h-14 md:h-16 flex flex-col items-center justify-center space-y-0.5 sm:space-y-1 text-center"
                    onClick={() => navigate(`/${orgData.acronym}/courses`)}
                  >
                    <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs leading-tight break-words text-center">View Courses</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 sm:h-14 md:h-16 flex flex-col items-center justify-center space-y-0.5 sm:space-y-1 text-center"
                    onClick={() => navigate(`/${orgData.acronym}/students`)}
                  >
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs leading-tight break-words text-center">Manage Students</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 sm:h-14 md:h-16 flex flex-col items-center justify-center space-y-0.5 sm:space-y-1 text-center"
                    onClick={() => navigate(`/${orgData.acronym}/assessments`)}
                  >
                    <ClipboardList className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs leading-tight break-words text-center">Assessments</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-12 sm:h-14 md:h-16 flex flex-col items-center justify-center space-y-0.5 sm:space-y-1 text-center"
                    onClick={() => navigate(`/${orgData.acronym}/analytics`)}
                  >
                    <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs leading-tight break-words text-center">View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-1 sm:pb-2 px-2 sm:px-3 pt-2 sm:pt-3">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <CardTitle className="text-xs font-medium text-muted-foreground break-words flex-1 pr-2">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" style={{ color: stat.color }} />
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold break-all" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <Badge variant="secondary" className="text-green-700 bg-green-50 text-xs flex-shrink-0">
                        {stat.change}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader className="px-2 sm:px-3 md:px-4 pb-1 sm:pb-2">
                <CardTitle className="flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base md:text-lg">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" style={{ color: orgData.primaryColor }} />
                  <span className="break-words">Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 sm:space-y-2 px-2 sm:px-3 md:px-4 pt-0">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-2 p-1.5 sm:p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div 
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"
                      style={{ backgroundColor: orgData.primaryColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium leading-relaxed break-words">{activity.action}</p>
                      <p className="text-xs text-muted-foreground break-words">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
      </div>
      
      {/* Mobile Bottom Navigation - only show for instructors */}
      {user?.role === 'instructor' && <InstructorMobileBottomNav currentPage="dashboard" />}
    </div>
  );
};

export default OrganizationDashboardPage;