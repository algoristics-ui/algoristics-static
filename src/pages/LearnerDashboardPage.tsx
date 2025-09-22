import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { MobileBottomNav } from "@/components/responsive";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Target,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Play,
  MoreVertical,
  ChevronRight,
  Star,
  CheckCircle,
  AlertCircle,
  Users,
  BarChart3,
  Award,
  Bookmark,
  Download,
  Share2,
  Menu,
  X,
  Bell,
  Settings as SettingsIcon
} from "lucide-react";

const LearnerDashboardPage = () => {
  const { user } = useAuth();
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample learner data
  const learnerStats = {
    coursesInProgress: 3,
    coursesCompleted: 12,
    totalPoints: 2450,
    currentStreak: 7,
    averageScore: 92,
    timeSpentToday: "2h 15m"
  };

  const inProgressCourses = [
    {
      id: 1,
      title: "Advanced JavaScript Fundamentals",
      instructor: "Dr. Sarah Johnson",
      progress: 75,
      lastAccessed: "2 hours ago",
      timeRemaining: "3h 20m",
      thumbnail: "/placeholder-course.jpg",
      level: "Intermediate",
      rating: 4.8,
      studentsEnrolled: 1240,
      nextDeadline: "Assignment 3 - Due in 2 days",
      category: "Programming"
    },
    {
      id: 2,
      title: "Data Science with Python",
      instructor: "Prof. Michael Chen",
      progress: 45,
      lastAccessed: "1 day ago",
      timeRemaining: "8h 45m",
      thumbnail: "/placeholder-course.jpg",
      level: "Advanced",
      rating: 4.9,
      studentsEnrolled: 890,
      nextDeadline: "Quiz 2 - Due tomorrow",
      category: "Data Science"
    },
    {
      id: 3,
      title: "UX Design Principles",
      instructor: "Emma Rodriguez",
      progress: 20,
      lastAccessed: "3 days ago",
      timeRemaining: "12h 30m",
      thumbnail: "/placeholder-course.jpg",
      level: "Beginner",
      rating: 4.7,
      studentsEnrolled: 2100,
      nextDeadline: "Project 1 - Due in 5 days",
      category: "Design"
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: "JavaScript Master",
      description: "Completed all JavaScript fundamentals",
      icon: Trophy,
      date: "2 days ago",
      points: 500
    },
    {
      id: 2,
      title: "Study Streak",
      description: "7 days consecutive learning",
      icon: Target,
      date: "Today",
      points: 100
    },
    {
      id: 3,
      title: "Top Performer",
      description: "Scored 95% on Data Analysis quiz",
      icon: Star,
      date: "1 week ago",
      points: 300
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Data Science Quiz 2",
      course: "Data Science with Python",
      deadline: "Tomorrow",
      type: "Quiz",
      urgent: true
    },
    {
      id: 2,
      title: "JavaScript Assignment 3",
      course: "Advanced JavaScript Fundamentals",
      deadline: "In 2 days",
      type: "Assignment",
      urgent: false
    },
    {
      id: 3,
      title: "UX Design Project 1",
      course: "UX Design Principles",
      deadline: "In 5 days",
      type: "Project",
      urgent: false
    }
  ];

  const recommendedCourses = [
    {
      id: 4,
      title: "React Advanced Patterns",
      instructor: "Alex Thompson",
      duration: "6 weeks",
      level: "Advanced",
      rating: 4.9,
      studentsEnrolled: 560,
      thumbnail: "/placeholder-course.jpg",
      price: "Free",
      category: "Programming"
    },
    {
      id: 5,
      title: "Machine Learning Basics",
      instructor: "Dr. Lisa Wang",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.8,
      studentsEnrolled: 1200,
      thumbnail: "/placeholder-course.jpg",
      price: "Free",
      category: "Data Science"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: orgData.primaryColor }}
              >
                {orgData.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2)}
              </div>
              <span className="font-semibold text-foreground">Learning</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.name?.charAt(0) || 'L'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-background shadow-lg">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <span className="font-semibold">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="p-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(`/${orgData.acronym}/learner/dashboard`)}>
                <BookOpen className="mr-3 h-5 w-5" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(`/${orgData.acronym}/learner/courses`)}>
                <BookOpen className="mr-3 h-5 w-5" />
                My Courses
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(`/${orgData.acronym}/learner/assessments`)}>
                <Trophy className="mr-3 h-5 w-5" />
                Assessments
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(`/${orgData.acronym}/learner/certificates`)}>
                <Award className="mr-3 h-5 w-5" />
                Certificates
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(`/${orgData.acronym}/settings`)}>
                <SettingsIcon className="mr-3 h-5 w-5" />
                Settings
              </Button>
            </nav>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 pb-6 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                Welcome back, {user?.name?.split(' ')[0] || 'Learner'}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Continue your learning journey with {orgData.name}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="hidden sm:flex">
                <TrendingUp className="w-3 h-3 mr-1" />
                {learnerStats.currentStreak} day streak
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Cards - Mobile: 2x2 grid, Tablet+: 4x1 grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${orgData.primaryColor}15` }}
                >
                  <BookOpen className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{learnerStats.coursesInProgress}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${orgData.primaryColor}15` }}
                >
                  <CheckCircle className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{learnerStats.coursesCompleted}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${orgData.primaryColor}15` }}
                >
                  <Trophy className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{learnerStats.totalPoints}</p>
                  <p className="text-xs text-muted-foreground">Points</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${orgData.primaryColor}15` }}
                >
                  <Clock className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{learnerStats.timeSpentToday}</p>
                  <p className="text-xs text-muted-foreground">Today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Courses */}
          <div className="xl:col-span-8 space-y-6 lg:space-y-8">
            {/* Continue Learning Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl lg:text-2xl font-semibold">Continue Learning</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate(`/${orgData.acronym}/learner/courses`)}>
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Course Cards - Mobile: stack, Tablet+: grid */}
              <div className="space-y-4 lg:grid lg:grid-cols-1 lg:gap-6 lg:space-y-0">
                {inProgressCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        {/* Course Thumbnail */}
                        <div className="relative sm:w-48 h-32 sm:h-auto bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: orgData.primaryColor }}
                            >
                              <Play className="w-6 h-6 text-white ml-1" />
                            </div>
                          </div>
                          <Badge className="absolute top-2 left-2" variant="secondary">
                            {course.level}
                          </Badge>
                        </div>

                        {/* Course Info */}
                        <div className="flex-1 p-4 lg:p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-base lg:text-lg mb-1 group-hover:text-primary transition-colors">
                                {course.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                by {course.instructor}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Progress */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span className="font-medium">{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>

                          {/* Course Stats */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                            <div className="flex items-center space-x-4">
                              <span>{course.timeRemaining} left</span>
                              <span>•</span>
                              <span>{course.lastAccessed}</span>
                            </div>
                          </div>

                          {/* Next Deadline */}
                          {course.nextDeadline && (
                            <div className="flex items-center text-sm">
                              <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                              <span className="text-orange-700 dark:text-orange-400">
                                {course.nextDeadline}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl lg:text-2xl font-semibold">Recommended for You</h2>
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {recommendedCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-0">
                      <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-t-lg">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: orgData.primaryColor }}
                          >
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </div>
                        <Badge className="absolute top-3 left-3" variant="secondary">
                          {course.level}
                        </Badge>
                        <Badge className="absolute top-3 right-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {course.price}
                        </Badge>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          by {course.instructor}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="xl:col-span-4 space-y-6">
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 ${deadline.urgent ? 'bg-red-500' : 'bg-blue-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{deadline.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{deadline.course}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {deadline.type}
                        </Badge>
                        <span className={`text-xs ${deadline.urgent ? 'text-red-600' : 'text-muted-foreground'}`}>
                          {deadline.deadline}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${orgData.primaryColor}15` }}
                    >
                      <achievement.icon className="w-5 h-5" style={{ color: orgData.primaryColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{achievement.date}</span>
                        <Badge variant="outline" className="text-xs">
                          +{achievement.points} pts
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate(`/${orgData.acronym}/learner/courses`)}>
                  <Search className="w-4 h-4 mr-2" />
                  Browse Courses
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate(`/${orgData.acronym}/learner/assessments`)}>
                  <Trophy className="w-4 h-4 mr-2" />
                  Take Assessment
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate(`/${orgData.acronym}/learner/certificates`)}>
                  <Award className="w-4 h-4 mr-2" />
                  View Certificates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage="dashboard" />
    </div>
  );
};

export default LearnerDashboardPage;