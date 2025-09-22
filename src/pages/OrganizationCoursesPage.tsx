import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { useAuth } from "@/contexts/AuthContext";
import InstructorCoursesPage from "./InstructorCoursesPage";
import { 
  BookOpen, 
  Search,
  Plus,
  Users,
  Clock,
  CheckCircle,
  ClipboardList,
  BarChart3
} from "lucide-react";
import { OrganizationHeader } from "@/components/OrganizationHeader";

const OrganizationCoursesPage = () => {
  const { user } = useAuth();
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  // If user is an instructor, show the instructor-specific courses page
  if (user?.role === 'instructor') {
    return <InstructorCoursesPage />;
  }

  const courses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      description: "Fundamental concepts of programming and computer science",
      instructor: "Prof. Sarah Johnson",
      enrolled: 1250,
      duration: "12 weeks",
      status: "Active",
      completion: 92
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Learn the basics of data analysis and machine learning",
      instructor: "Dr. Michael Chen",
      enrolled: 980,
      duration: "10 weeks",
      status: "Active",
      completion: 87
    },
    {
      id: 3,
      title: "Advanced Machine Learning",
      description: "Deep dive into ML algorithms and neural networks",
      instructor: "Prof. Lisa Wang",
      enrolled: 756,
      duration: "16 weeks",
      status: "Active",
      completion: 84
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      description: "Full-stack web development with modern frameworks",
      instructor: "Alex Rodriguez",
      enrolled: 634,
      duration: "14 weeks",
      status: "Draft",
      completion: 91
    }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <OrganizationHeader orgData={orgData} />
      <div className="container mx-auto px-4 sm:px-6 pb-6 pt-20 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 md:mb-6 gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base">Manage your organization's course catalog</p>
        </div>
              <Button 
                style={{ backgroundColor: orgData.primaryColor }} 
                className="text-white w-full sm:w-auto text-sm"
                onClick={() => navigate(`/${orgData.acronym}/new-course`)}
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Create Course
              </Button>
            </div>

            {/* Quick Actions */}
            <Card className="mb-4 sm:mb-6">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  <Button 
                    variant="outline" 
                    className="h-16 sm:h-18 md:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 text-center"
                    onClick={() => navigate(`/${orgData.acronym}/new-course`)}
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs sm:text-sm leading-tight">Create Course</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 sm:h-18 md:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 text-center"
                    onClick={() => navigate(`/${orgData.acronym}/students`)}
                  >
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs sm:text-sm leading-tight">View Students</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 sm:h-18 md:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 text-center"
                    onClick={() => navigate(`/${orgData.acronym}/create-assessment`)}
                  >
                    <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs sm:text-sm leading-tight">Create Assessment</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 sm:h-18 md:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2 text-center"
                    onClick={() => navigate(`/${orgData.acronym}/analytics`)}
                  >
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs sm:text-sm leading-tight">View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filters */}
            <Card className="mb-4 sm:mb-6">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search courses..." className="pl-9 text-sm" />
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto text-sm">Filter</Button>
                </div>
              </CardContent>
            </Card>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="px-4 sm:px-6">
                    <div className="flex flex-col space-y-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg mb-2 truncate">{course.title}</CardTitle>
                        <CardDescription className="text-xs sm:text-sm mb-3 line-clamp-2">
                          {course.description}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={course.status === 'Active' ? 'default' : 'secondary'}
                        className={course.status === 'Active' ? 'text-white self-start text-xs' : 'self-start text-xs'}
                        style={course.status === 'Active' ? { backgroundColor: orgData.primaryColor } : {}}
                      >
                        {course.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm space-y-1 sm:space-y-0">
                        <span className="text-muted-foreground">Instructor:</span>
                        <span className="font-medium truncate">{course.instructor}</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                          <span>{course.enrolled} enrolled</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      {course.status === 'Active' && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Completion Rate</span>
                            <span>{course.completion}%</span>
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
                      )}

                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1 w-full sm:w-auto text-xs sm:text-sm">
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-xs sm:text-sm"
                          style={{ 
                            borderColor: orgData.primaryColor,
                            color: orgData.primaryColor 
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationCoursesPage;