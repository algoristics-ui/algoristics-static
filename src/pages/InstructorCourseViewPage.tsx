import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Edit,
  Settings,
  BarChart3,
  PlayCircle,
  FileText,
  Calendar,
  Award,
  ArrowLeft,
  Download,
  Eye
} from "lucide-react";

const InstructorCourseViewPage = () => {
  const { user } = useAuth();
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  // Mock course data - in real app this would be fetched by courseId
  const course = {
    id: courseId,
    title: "Advanced JavaScript Fundamentals",
    description: "Master modern JavaScript concepts and patterns including ES6+, async programming, and advanced object-oriented concepts.",
    instructor: user?.name || "Prof. Johnson",
    students: 45,
    duration: "8 weeks",
    progress: 75,
    status: "active",
    category: "Programming",
    level: "Advanced",
    rating: 4.8,
    reviews: 23,
    isOwner: true,
    lastUpdated: "2024-01-15",
    completionRate: 89,
    nextSession: "2024-03-20",
    enrolledStudents: [
      { id: 1, name: "Sarah Chen", progress: 92, lastActivity: "2024-03-18" },
      { id: 2, name: "Michael Rodriguez", progress: 78, lastActivity: "2024-03-17" },
      { id: 3, name: "Emily Johnson", progress: 85, lastActivity: "2024-03-19" },
      { id: 4, name: "David Kim", progress: 71, lastActivity: "2024-03-16" },
      { id: 5, name: "Lisa Thompson", progress: 94, lastActivity: "2024-03-19" }
    ],
    modules: [
      { id: 1, title: "Introduction to ES6+", completed: true, duration: "2 hours" },
      { id: 2, title: "Async/Await and Promises", completed: true, duration: "3 hours" },
      { id: 3, title: "Advanced Object Patterns", completed: false, duration: "2.5 hours" },
      { id: 4, title: "Module Systems", completed: false, duration: "2 hours" },
      { id: 5, title: "Testing Strategies", completed: false, duration: "3 hours" }
    ],
    recentActivity: [
      { student: "Sarah Chen", action: "Completed Module 2", time: "2 hours ago" },
      { student: "Michael Rodriguez", action: "Submitted Assignment 3", time: "4 hours ago" },
      { student: "Emily Johnson", action: "Asked question in Module 3", time: "6 hours ago" }
    ]
  };

  const basePath = location.pathname.replace(`/${courseId}`, '');

  return (
    <div className="w-full overflow-x-hidden">
      <OrganizationHeader orgData={orgData} />
      <div className="container mx-auto px-4 sm:px-6 pb-20 md:pb-6 max-w-7xl" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="min-w-0">
            <Button 
              variant="ghost" 
              onClick={() => navigate(basePath)}
              className="mb-4 text-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Back to Courses
            </Button>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground text-sm sm:text-base">{course.description}</p>
          </div>
          
          {course.isOwner && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <Button 
                variant="outline"
                onClick={() => navigate(`${location.pathname}/edit`)}
                className="text-xs sm:text-sm"
              >
                <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Edit Course
              </Button>
              <Button 
                style={{ backgroundColor: orgData.primaryColor }} 
                className="text-white text-xs sm:text-sm"
                onClick={() => navigate(`${location.pathname}/settings`)}
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Settings
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{course.students}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Enrolled Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{course.completionRate}%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{course.rating}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              <div>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold">{course.progress}%</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Course Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="students" className="text-xs sm:text-sm">Students</TabsTrigger>
          <TabsTrigger value="modules" className="text-xs sm:text-sm">Modules</TabsTrigger>
          <TabsTrigger value="activity" className="text-xs sm:text-sm">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-base sm:text-lg">Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 px-4 sm:px-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold text-sm sm:text-base">{course.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Level</p>
                      <Badge className="text-xs">{course.level}</Badge>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Category</p>
                      <p className="font-semibold text-sm sm:text-base">{course.category}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Status</p>
                      <Badge variant="default" className="text-xs" style={{ backgroundColor: orgData.primaryColor }}>
                        {course.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Student Completion Rate</span>
                        <span>{course.completionRate}%</span>
                      </div>
                      <Progress value={course.completionRate} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Start Live Session
                  </Button>
                  <Button className="w-full" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => navigate(`${location.pathname}/analytics`)}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Next Session</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{new Date(course.nextSession).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students ({course.enrolledStudents.length})</CardTitle>
              <CardDescription>Monitor student progress and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.enrolledStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last activity: {student.lastActivity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold">{student.progress}% Complete</p>
                        <Progress value={student.progress} className="w-20 h-2" />
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
              <CardDescription>Manage your course content and structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        module.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {module.completed && <span className="text-white text-xs">✓</span>}
                      </div>
                      <div>
                        <p className="font-semibold">{module.title}</p>
                        <p className="text-sm text-muted-foreground">Duration: {module.duration}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest student interactions and course updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border-l-4 border-l-blue-500 bg-muted/30 rounded">
                    <div className="flex-1">
                      <p className="font-semibold">{activity.student}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <InstructorMobileBottomNav currentPage="courses" />
    </div>
  );
};

export default InstructorCourseViewPage;