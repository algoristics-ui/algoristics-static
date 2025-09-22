import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, 
  Search,
  Plus,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  BookOpen
} from "lucide-react";
import { OrganizationHeader } from "@/components/OrganizationHeader";
import InstructorMobileBottomNav from "@/components/responsive/InstructorMobileBottomNav";

const OrganizationStudentsPage = () => {
  const { user } = useAuth();
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  const students = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@stanford.edu",
      avatar: "/placeholder.svg",
      enrollmentDate: "Jan 2024",
      coursesCompleted: 5,
      coursesActive: 2,
      overallProgress: 78,
      status: "Active"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      email: "m.rodriguez@stanford.edu",
      avatar: "/placeholder.svg",
      enrollmentDate: "Feb 2024",
      coursesCompleted: 3,
      coursesActive: 3,
      overallProgress: 65,
      status: "Active"
    },
    {
      id: 3,
      name: "Emily Johnson",
      email: "emily.j@stanford.edu",
      avatar: "/placeholder.svg",
      enrollmentDate: "Dec 2023",
      coursesCompleted: 8,
      coursesActive: 1,
      overallProgress: 92,
      status: "Active"
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@stanford.edu",
      avatar: "/placeholder.svg",
      enrollmentDate: "Mar 2024",
      coursesCompleted: 1,
      coursesActive: 4,
      overallProgress: 34,
      status: "Inactive"
    }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <OrganizationHeader orgData={orgData} />
      <div className={`container mx-auto px-4 sm:px-6 max-w-6xl ${user?.role === 'instructor' ? 'pb-20 md:pb-6' : 'pb-6'}`} style={{ paddingTop: '80px' }}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 md:mb-6 gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base">Manage student enrollment and progress</p>
        </div>
              <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Students
              </Button>
            </div>

            {/* Quick Actions */}
            <Card className="mb-6">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="flex items-center space-x-2">
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                  <Button 
                    variant="outline" 
                    className="h-14 sm:h-16 md:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2"
                    onClick={() => navigate(`/${orgData.acronym}/add-students`)}
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs sm:text-sm leading-tight">Add Students</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-14 sm:h-16 md:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2"
                    onClick={() => navigate(`/${orgData.acronym}/courses`)}
                  >
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs sm:text-sm leading-tight">View Courses</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-14 sm:h-16 md:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2"
                    onClick={() => navigate(`/${orgData.acronym}/certificates`)}
                  >
                    <Award className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs sm:text-sm leading-tight">Certificates</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-14 sm:h-16 md:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2"
                    onClick={() => navigate(`/${orgData.acronym}/analytics`)}
                  >
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                    <span className="text-xs sm:text-sm leading-tight text-center">Student Progress</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6">
              <Card>
                <CardHeader className="pb-3 px-4 sm:px-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                      Total Students
                    </CardTitle>
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: orgData.primaryColor }}>
                    12,500
                  </div>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3 px-4 sm:px-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                      Active This Month
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: orgData.primaryColor }}>
                    9,847
                  </div>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3 px-4 sm:px-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                      Certificates Earned
                    </CardTitle>
                    <Award className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: orgData.primaryColor }}>
                    2,847
                  </div>
                </CardHeader>
              </Card>
              
              <Card>
                <CardHeader className="pb-3 px-4 sm:px-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                      Avg. Completion Rate
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: orgData.primaryColor }}>
                    89%
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search students..." className="pl-9" />
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">Filter</Button>
                    <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">Export</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Students List */}
            <Card>
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl">All Students</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Manage and track student progress</CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-3 sm:p-4 border border-border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="font-semibold truncate text-sm sm:text-base">{student.name}</h3>
                          <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span className="break-all">{student.email}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 sm:space-x-6 mt-3 lg:mt-0">
                        <div className="text-center">
                          <div className="text-xs sm:text-sm font-medium">{student.coursesCompleted}</div>
                          <div className="text-xs text-muted-foreground">Completed</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-xs sm:text-sm font-medium">{student.coursesActive}</div>
                          <div className="text-xs text-muted-foreground">Active</div>
                        </div>
                        
                        <div className="text-center min-w-16">
                          <div className="text-xs sm:text-sm font-medium">{student.overallProgress}%</div>
                          <div className="text-xs text-muted-foreground">Progress</div>
                        </div>
                        
                        <Badge 
                          variant={student.status === 'Active' ? 'default' : 'secondary'}
                          className={student.status === 'Active' ? 'text-white' : ''}
                          style={student.status === 'Active' ? { backgroundColor: orgData.primaryColor } : {}}
                        >
                          {student.status}
                        </Badge>
                        
                        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2 mt-3 lg:mt-0">
                          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs sm:text-sm"
                            style={{ 
                              borderColor: orgData.primaryColor,
                              color: orgData.primaryColor 
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
        </Card>
      </div>
      
      {/* Mobile Bottom Navigation - only show for instructors */}
      {user?.role === 'instructor' && <InstructorMobileBottomNav currentPage="students" />}
    </div>
  );
};

export default OrganizationStudentsPage;