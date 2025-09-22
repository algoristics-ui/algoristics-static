import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Award,
  AlertCircle,
  Calendar,
  Clock,
  Target,
  Star,
  Megaphone
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SuperAdminDashboard from "@/components/SuperAdminDashboard";

const DashboardPage = () => {
  const { user } = useAuth();

  // Render Super Admin dashboard if user is super admin
  // Note: SuperAdminDashboard will be rendered through SuperAdminLayout
  // which provides the consistent header via DashboardLayout
  if (user?.role === 'super_admin') {
    //return <SuperAdminDashboard />;
  }

  // News feed items for the carousel
  const newsFeedItems = [
    {
      id: 1,
      type: "course_due",
      title: "Course Deadline Reminder",
      content: "Advanced Data Science course assignments are due in 3 days. Complete your final project submission.",
      priority: "high",
      date: "2024-01-15",
      icon: Target
    },
    {
      id: 2,
      type: "new_course",
      title: "New Course Available",
      content: "Introduction to Machine Learning is now available. Enroll to start your AI journey.",
      priority: "medium",
      date: "2024-01-14",
      icon: BookOpen
    },
    {
      id: 3,
      type: "assessment",
      title: "Assessment Schedule",
      content: "Mid-term assessments for Q1 2024 will begin next week. Check your calendar for specific dates.",
      priority: "high",
      date: "2024-01-13",
      icon: Calendar
    },
    {
      id: 4,
      type: "announcement",
      title: "Platform Maintenance",
      content: "Scheduled maintenance this Saturday 2-4 AM EST. Platform will be temporarily unavailable.",
      priority: "low",
      date: "2024-01-12",
      icon: Megaphone
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800";
      case "medium": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      case "low": return "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800";
    }
  };

  // Role-based statistics
  const getStatsForRole = (role: string) => {
    switch (role) {
      case 'super_admin':
        return [
          {
            title: "Total Organizations",
            value: "12",
            change: "+8%",
            changeType: "positive" as const,
            icon: BookOpen,
            description: "Active organizations"
          },
          {
            title: "Global Users",
            value: "5,847",
            change: "+12.5%",
            changeType: "positive" as const,
            icon: Users,
            description: "Across all organizations"
          },
          {
            title: "Platform Usage",
            value: "94%",
            change: "+2.3%",
            changeType: "positive" as const,
            icon: Award,
            description: "System utilization"
          },
          {
            title: "Revenue",
            value: "$48,950",
            change: "+22%",
            changeType: "positive" as const,
            icon: GraduationCap,
            description: "This month"
          }
        ];
      case 'org_admin':
        return [
          {
            title: "Organization Courses",
            value: "24",
            change: "+12%",
            changeType: "positive" as const,
            icon: BookOpen,
            description: "Active learning programs"
          },
          {
            title: "Students",
            value: "1,247",
            change: "+5.2%",
            changeType: "positive" as const,
            icon: Users,
            description: "Currently enrolled"
          },
          {
            title: "Instructors",
            value: "18",
            change: "+3",
            changeType: "positive" as const,
            icon: Award,
            description: "Active instructors"
          },
          {
            title: "Completion Rate",
            value: "87%",
            change: "+3.1%",
            changeType: "positive" as const,
            icon: GraduationCap,
            description: "Average completion"
          }
        ];
      case 'instructor':
        return [
          {
            title: "My Courses",
            value: "6",
            change: "+2",
            changeType: "positive" as const,
            icon: BookOpen,
            description: "Courses I teach"
          },
          {
            title: "My Students",
            value: "143",
            change: "+8",
            changeType: "positive" as const,
            icon: Users,
            description: "Enrolled in my courses"
          },
          {
            title: "Avg. Progress",
            value: "74%",
            change: "+5.1%",
            changeType: "positive" as const,
            icon: Award,
            description: "Student progress"
          },
          {
            title: "Assessments",
            value: "12",
            change: "+3",
            changeType: "positive" as const,
            icon: GraduationCap,
            description: "Created this month"
          }
        ];
      case 'learner':
        return [
          {
            title: "Enrolled Courses",
            value: "4",
            change: "+1",
            changeType: "positive" as const,
            icon: BookOpen,
            description: "Currently taking"
          },
          {
            title: "Progress",
            value: "68%",
            change: "+12%",
            changeType: "positive" as const,
            icon: Award,
            description: "Overall completion"
          },
          {
            title: "Certificates",
            value: "3",
            change: "+1",
            changeType: "positive" as const,
            icon: GraduationCap,
            description: "Earned certificates"
          },
          {
            title: "Study Hours",
            value: "24h",
            change: "+6h",
            changeType: "positive" as const,
            icon: Clock,
            description: "This week"
          }
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole(user?.role || 'learner');

  // Role-based content
  const getRecentCoursesForRole = (role: string) => {
    switch (role) {
      case 'super_admin':
      case 'org_admin':
        return [
          {
            title: "Advanced React Development",
            students: 45,
            progress: 78,
            instructor: "Dr. Sarah Wilson",
            status: "active"
          },
          {
            title: "Data Science Fundamentals",
            students: 67,
            progress: 92,
            instructor: "Prof. Mike Johnson",
            status: "completed"
          },
          {
            title: "Machine Learning Basics",
            students: 34,
            progress: 23,
            instructor: "Dr. Lisa Chen",
            status: "active"
          }
        ];
      case 'instructor':
        return [
          {
            title: "My React Course",
            students: 24,
            progress: 68,
            instructor: "You",
            status: "active"
          },
          {
            title: "JavaScript Basics",
            students: 18,
            progress: 85,
            instructor: "You",
            status: "active"
          },
          {
            title: "Web Development",
            students: 12,
            progress: 42,
            instructor: "You",
            status: "active"
          }
        ];
      case 'learner':
        return [
          {
            title: "React Fundamentals",
            students: null,
            progress: 75,
            instructor: "Dr. Sarah Wilson",
            status: "active"
          },
          {
            title: "Python for Beginners",
            students: null,
            progress: 45,
            instructor: "Prof. Mike Johnson",
            status: "active"
          },
          {
            title: "Data Analytics",
            students: null,
            progress: 30,
            instructor: "Dr. Lisa Chen",
            status: "active"
          }
        ];
      default:
        return [];
    }
  };

  const getUpcomingEventsForRole = (role: string) => {
    switch (role) {
      case 'super_admin':
        return [
          {
            title: "Platform Review Meeting",
            time: "10:00 AM - 11:00 AM",
            date: "Today",
            type: "meeting"
          },
          {
            title: "Quarterly Business Review",
            time: "2:00 PM - 4:00 PM",
            date: "Tomorrow",
            type: "event"
          },
          {
            title: "System Maintenance",
            time: "12:00 AM - 2:00 AM",
            date: "Dec 15",
            type: "maintenance"
          }
        ];
      case 'org_admin':
        return [
          {
            title: "Instructor Training",
            time: "10:00 AM - 12:00 PM",
            date: "Today",
            type: "training"
          },
          {
            title: "Course Review Session",
            time: "2:00 PM - 3:30 PM",
            date: "Tomorrow",
            type: "meeting"
          },
          {
            title: "Student Progress Review",
            time: "1:00 PM - 2:00 PM",
            date: "Dec 15",
            type: "review"
          }
        ];
      case 'instructor':
        return [
          {
            title: "Class: React Components",
            time: "10:00 AM - 11:30 AM",
            date: "Today",
            type: "class"
          },
          {
            title: "Grade Assignments",
            time: "3:00 PM - 4:00 PM",
            date: "Today",
            type: "task"
          },
          {
            title: "Office Hours",
            time: "2:00 PM - 4:00 PM",
            date: "Tomorrow",
            type: "office_hours"
          }
        ];
      case 'learner':
        return [
          {
            title: "Assignment Due",
            time: "11:59 PM",
            date: "Today",
            type: "deadline"
          },
          {
            title: "Study Group Meeting",
            time: "7:00 PM - 8:30 PM",
            date: "Tomorrow",
            type: "study"
          },
          {
            title: "Quiz: React Basics",
            time: "10:00 AM - 11:00 AM",
            date: "Dec 15",
            type: "quiz"
          }
        ];
      default:
        return [];
    }
  };

  const recentCourses = getRecentCoursesForRole(user?.role || 'learner');
  const upcomingEvents = getUpcomingEventsForRole(user?.role || 'learner');

  const formatRole = (role: string) => {
    return role.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.name}! 👋
        </h1>
        <div className="flex items-center space-x-4 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{user ? formatRole(user.role) : 'User'}</Badge>
            <span>•</span>
            <span>{user?.organization}</span>
          </div>
        </div>
      </div>



      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="gradient-card border-0 shadow-soft hover:shadow-medium transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${stat.changeType === 'positive' ? 'text-success' : 'text-destructive'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Courses */}
        <div className="lg:col-span-2">
          <Card className="gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>{user?.role === 'learner' ? 'My Courses' : 'Recent Courses'}</span>
              </CardTitle>
              <CardDescription>
                {user?.role === 'learner' ? 'Your enrolled courses and progress' : 'Track progress across active courses'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="space-y-1">
                    <h3 className="font-medium">{course.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      {course.students && (
                        <span className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{course.students} students</span>
                        </span>
                      )}
                      <span className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>{course.instructor}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Progress value={course.progress} className="w-24" />
                      <span className="text-sm text-muted-foreground">{course.progress}%</span>
                    </div>
                  </div>
                  <Badge 
                    variant={course.status === 'active' ? 'default' : 'secondary'}
                    className={course.status === 'active' ? 'bg-success text-success-foreground' : ''}
                  >
                    {course.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                {user?.role === 'learner' ? 'View My Courses' : 'View All Courses'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card className="gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Upcoming Events</span>
              </CardTitle>
              <CardDescription>
                Your schedule for the next few days
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.date}
                      </Badge>
                    </div>
                  </div>
                  {index < upcomingEvents.length - 1 && (
                    <div className="border-b border-border/60"></div>
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View Full Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="gradient-card border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Frequently used actions to streamline your workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {user?.role !== 'learner' && (
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link to="/new-course">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-sm">New Course</span>
                </Link>
              </Button>
            )}
            
            {(user?.role === 'super_admin' || user?.role === 'org_admin' || user?.role === 'instructor') && (
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link to="/create-assessment">
                  <GraduationCap className="h-6 w-6" />
                  <span className="text-sm">Create Assessment</span>
                </Link>
              </Button>
            )}
            
            {(user?.role === 'super_admin' || user?.role === 'org_admin' || user?.role === 'instructor') && (
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link to="/add-students">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Add Students</span>
                </Link>
              </Button>
            )}
            
            {user?.role === 'learner' && (
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link to="/courses">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-sm">Browse Courses</span>
                </Link>
              </Button>
            )}
            
            {(user?.role === 'super_admin' || user?.role === 'org_admin' || user?.role === 'instructor') && (
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link to="/analytics">
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-sm">View Analytics</span>
                </Link>
              </Button>
            )}
            
            {(user?.role === 'super_admin' || user?.role === 'org_admin') && (
              <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
                <Link to="/reports">
                  <AlertCircle className="h-6 w-6" />
                  <span className="text-sm">Reports</span>
                </Link>
              </Button>
            )}
            
            <Button variant="outline" className="h-20 flex-col space-y-2" asChild>
              <Link to="/certificates">
                <Award className="h-6 w-6" />
                <span className="text-sm">{user?.role === 'learner' ? 'My Certificates' : 'Certificates'}</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;