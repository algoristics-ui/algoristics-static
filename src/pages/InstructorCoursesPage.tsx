import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { OrganizationHeader } from "@/components/OrganizationHeader";
import InstructorMobileBottomNav from "@/components/responsive/InstructorMobileBottomNav";
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star,
  Plus,
  Edit,
  Settings,
  Eye,
  BarChart3,
  Search,
  Filter,
  TrendingUp,
  Award,
  Calendar,
  PlayCircle
} from "lucide-react";

const InstructorCoursesPage = () => {
  const { user } = useAuth();
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("my-courses");

  // Mock data for instructor's courses vs all courses
  const instructorCourses = [
    {
      id: 1,
      title: "Advanced JavaScript Fundamentals",
      description: "Master modern JavaScript concepts and patterns",
      students: 45,
      duration: "8 weeks",
      progress: 75,
      status: "active",
      category: "Programming",
      level: "Advanced",
      rating: 4.8,
      reviews: 23,
      instructor: user?.name || "Prof. Johnson",
      isOwner: true,
      lastUpdated: "2024-01-15",
      completionRate: 89,
      nextSession: "2024-03-20"
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      description: "Comprehensive guide to data structures and algorithmic thinking",
      students: 38,
      duration: "10 weeks", 
      progress: 60,
      status: "active",
      category: "Computer Science",
      level: "Intermediate",
      rating: 4.9,
      reviews: 31,
      instructor: user?.name || "Prof. Johnson",
      isOwner: true,
      lastUpdated: "2024-01-20",
      completionRate: 92,
      nextSession: "2024-03-22"
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      description: "Complete web development from frontend to backend",
      students: 52,
      duration: "12 weeks",
      progress: 25,
      status: "planning",
      category: "Web Development",
      level: "Beginner",
      rating: 4.7,
      reviews: 18,
      instructor: user?.name || "Prof. Johnson",
      isOwner: true,
      lastUpdated: "2024-02-01",
      completionRate: 0,
      nextSession: "2024-04-01"
    }
  ];

  const otherCourses = [
    {
      id: 4,
      title: "Machine Learning Basics",
      description: "Introduction to machine learning concepts and applications",
      students: 67,
      duration: "6 weeks",
      progress: 80,
      status: "active",
      category: "AI/ML",
      level: "Intermediate",
      rating: 4.6,
      reviews: 42,
      instructor: "Dr. Sarah Wang",
      isOwner: false,
      lastUpdated: "2024-01-10",
      completionRate: 85,
      nextSession: "2024-03-18"
    },
    {
      id: 5,
      title: "Database Design Principles",
      description: "Learn database design and optimization techniques",
      students: 29,
      duration: "8 weeks",
      progress: 45,
      status: "active", 
      category: "Database",
      level: "Advanced",
      rating: 4.8,
      reviews: 15,
      instructor: "Prof. Michael Chen",
      isOwner: false,
      lastUpdated: "2024-01-25",
      completionRate: 78,
      nextSession: "2024-03-25"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "planning": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "completed": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "paused": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const CourseCard = ({ course, showActions = true }: { course: any, showActions?: boolean }) => (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <CardTitle className="text-lg">{course.title}</CardTitle>
              {course.isOwner && (
                <Badge className="text-white" style={{ backgroundColor: orgData.primaryColor }}>
                  Owner
                </Badge>
              )}
            </div>
            <CardDescription className="text-sm">{course.description}</CardDescription>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
              <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
              <Badge variant="outline">{course.category}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold" style={{ color: orgData.primaryColor }}>
              {course.students}
            </div>
            <div className="text-xs text-muted-foreground">Students</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">
              {course.completionRate}%
            </div>
            <div className="text-xs text-muted-foreground">Completion</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {course.rating}
            </div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">
              {course.duration}
            </div>
            <div className="text-xs text-muted-foreground">Duration</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span>Course Progress</span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full" 
              style={{ 
                width: `${course.progress}%`,
                backgroundColor: orgData.primaryColor 
              }}
            ></div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          <div>Instructor: {course.instructor}</div>
          <div>Next Session: {new Date(course.nextSession).toLocaleDateString()}</div>
        </div>

        {showActions && (
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`${location.pathname}/${course.id}`)}
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            
            {course.isOwner ? (
              <>
                <Button 
                  size="sm" 
                  style={{ backgroundColor: orgData.primaryColor }} 
                  className="text-white"
                  onClick={() => navigate(`${location.pathname}/${course.id}/edit`)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`${location.pathname}/${course.id}/settings`)}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Settings
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" disabled>
                <Eye className="w-4 h-4 mr-1" />
                Read Only
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`${location.pathname}/${course.id}/analytics`)}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              Analytics
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full overflow-x-hidden">
      <OrganizationHeader orgData={orgData} />
      <div className="container mx-auto px-4 sm:px-6 pb-20 md:pb-6 max-w-7xl" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">My Courses</h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
              Manage your courses and view other instructor's courses
            </p>
          </div>
          <Button 
            style={{ backgroundColor: orgData.primaryColor }} 
            className="text-white w-full sm:w-auto text-sm"
            onClick={() => navigate(`${location.pathname}/new`)}
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${orgData.primaryColor}15` }}
              >
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{instructorCourses.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">My Courses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${orgData.primaryColor}15` }}
              >
                <Users className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{instructorCourses.reduce((acc, course) => acc + course.students, 0)}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${orgData.primaryColor}15` }}
              >
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                  {Math.round(instructorCourses.reduce((acc, course) => acc + course.completionRate, 0) / instructorCourses.length)}%
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Avg Completion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${orgData.primaryColor}15` }}
              >
                <Star className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              </div>
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                  {(instructorCourses.reduce((acc, course) => acc + course.rating, 0) / instructorCourses.length).toFixed(1)}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-courses">My Courses ({instructorCourses.length})</TabsTrigger>
          <TabsTrigger value="all-courses">All Courses ({otherCourses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="my-courses" className="space-y-6 mt-6">
          <div className="space-y-6">
            {instructorCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all-courses" className="space-y-6 mt-6">
          <div className="space-y-6">
            {otherCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <InstructorMobileBottomNav currentPage="courses" />
    </div>
  );
};

export default InstructorCoursesPage;