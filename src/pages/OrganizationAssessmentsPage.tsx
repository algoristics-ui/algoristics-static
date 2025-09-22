import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { 
  ClipboardList, 
  Search,
  Plus,
  Users,
  Clock,
  CheckCircle,
  FileText,
  BookOpen,
  BarChart3
} from "lucide-react";
import { OrganizationHeader } from "@/components/OrganizationHeader";

const OrganizationAssessmentsPage = () => {
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);
  

  const assessments = [
    {
      id: 1,
      title: "Computer Science Fundamentals Quiz",
      course: "Introduction to Computer Science",
      type: "Quiz",
      questions: 25,
      duration: "45 minutes",
      attempts: 1250,
      avgScore: 87,
      status: "Active"
    },
    {
      id: 2,
      title: "Data Science Final Project",
      course: "Data Science Fundamentals",
      type: "Project",
      questions: 1,
      duration: "2 weeks",
      attempts: 980,
      avgScore: 91,
      status: "Active"
    },
    {
      id: 3,
      title: "Machine Learning Midterm",
      course: "Advanced Machine Learning",
      type: "Exam",
      questions: 50,
      duration: "2 hours",
      attempts: 756,
      avgScore: 82,
      status: "Active"
    },
    {
      id: 4,
      title: "Web Development Portfolio",
      course: "Web Development Bootcamp",
      type: "Portfolio",
      questions: 5,
      duration: "3 weeks",
      attempts: 634,
      avgScore: 89,
      status: "Draft"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Quiz': return 'bg-blue-100 text-blue-800';
      case 'Exam': return 'bg-red-100 text-red-800';
      case 'Project': return 'bg-green-100 text-green-800';
      case 'Portfolio': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <OrganizationHeader orgData={orgData} />
      <div className="container mx-auto px-4 sm:px-6 pb-6 pt-20 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 md:mb-6 gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Assessments</h1>
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base">Manage quizzes, exams, and project assessments</p>
        </div>
        <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
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
              onClick={() => navigate(`/${orgData.acronym}/create-assessment`)}
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              <span className="text-xs sm:text-sm leading-tight text-center">Create Assessment</span>
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
              onClick={() => navigate(`/${orgData.acronym}/students`)}
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              <span className="text-xs sm:text-sm leading-tight">View Students</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 sm:h-16 md:h-20 flex flex-col items-center justify-center space-y-1 sm:space-y-2"
              onClick={() => navigate(`/${orgData.acronym}/analytics`)}
            >
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              <span className="text-xs sm:text-sm leading-tight">View Results</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search assessments..." className="pl-9" />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">Filter by Type</Button>
              <Button variant="outline" className="w-full sm:w-auto text-xs sm:text-sm">Filter by Course</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessments List */}
      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-lg sm:text-xl">All Assessments</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Manage and track assessment performance</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-3 sm:p-4 border border-border rounded-lg hover:bg-muted/50 space-y-3 lg:space-y-0">
                <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${orgData.primaryColor}15` }}>
                    <ClipboardList className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-sm sm:text-base">{assessment.title}</h3>
                      <Badge className={getTypeColor(assessment.type)}>
                        {assessment.type}
                      </Badge>
                      <Badge 
                        variant={assessment.status === 'Active' ? 'default' : 'secondary'}
                        className={assessment.status === 'Active' ? 'text-white' : ''}
                        style={assessment.status === 'Active' ? { backgroundColor: orgData.primaryColor } : {}}
                      >
                        {assessment.status}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">{assessment.course}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>{assessment.questions} questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{assessment.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{assessment.attempts} attempts</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
                  <div className="text-center sm:text-left">
                    <div className="text-base sm:text-lg font-bold" style={{ color: orgData.primaryColor }}>
                      {assessment.avgScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">Avg Score</div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                      View Results
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
    </div>
  );
};

export default OrganizationAssessmentsPage;