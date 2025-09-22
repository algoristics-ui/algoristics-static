import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { MobileBottomNav } from "@/components/responsive";
import { 
  MapPin, 
  CheckCircle, 
  Circle, 
  Clock, 
  Trophy, 
  Star, 
  ArrowRight,
  ArrowDown,
  Play,
  Lock,
  Unlock,
  BookOpen,
  Target,
  Award,
  TrendingUp,
  Calendar,
  Users,
  ChevronRight,
  MoreVertical,
  Flag,
  Route,
  Compass,
  Zap,
  Medal,
  Gift
} from "lucide-react";

const LearnerPathsPage = () => {
  const { user } = useAuth();
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);
  
  const [selectedPath, setSelectedPath] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("in-progress");

  // Sample learning paths data
  const learningPaths = [
    {
      id: 1,
      title: "Full Stack Web Developer",
      description: "Complete journey from frontend to backend development",
      category: "Programming",
      difficulty: "Intermediate to Advanced",
      estimatedTime: "6-8 months",
      totalCourses: 8,
      completedCourses: 3,
      status: "in_progress",
      progress: 37.5,
      enrolledStudents: 1250,
      rating: 4.8,
      instructor: "Tech Academy Team",
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Database", "API Design"],
      nextMilestone: "React Advanced Patterns",
      badges: ["Web Development", "Full Stack", "Popular"],
      milestones: [
        {
          id: 1,
          title: "Frontend Fundamentals",
          courses: [
            { id: 1, title: "HTML & CSS Basics", status: "completed", duration: "3 weeks" },
            { id: 2, title: "JavaScript Fundamentals", status: "completed", duration: "4 weeks" },
            { id: 3, title: "Responsive Design", status: "completed", duration: "2 weeks" }
          ]
        },
        {
          id: 2,
          title: "Modern Frontend",
          courses: [
            { id: 4, title: "React Basics", status: "in_progress", duration: "4 weeks" },
            { id: 5, title: "React Advanced Patterns", status: "locked", duration: "3 weeks" },
            { id: 6, title: "State Management", status: "locked", duration: "2 weeks" }
          ]
        },
        {
          id: 3,
          title: "Backend Development",
          courses: [
            { id: 7, title: "Node.js & Express", status: "locked", duration: "4 weeks" },
            { id: 8, title: "Database Design", status: "locked", duration: "3 weeks" }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Data Science Professional",
      description: "Master data analysis, machine learning, and visualization",
      category: "Data Science",
      difficulty: "Intermediate to Advanced",
      estimatedTime: "8-10 months",
      totalCourses: 10,
      completedCourses: 5,
      status: "in_progress",
      progress: 50,
      enrolledStudents: 890,
      rating: 4.9,
      instructor: "Data Science Institute",
      skills: ["Python", "Statistics", "Machine Learning", "Data Visualization", "Big Data"],
      nextMilestone: "Advanced Machine Learning",
      badges: ["Data Science", "ML Expert", "High Demand"],
      milestones: [
        {
          id: 1,
          title: "Foundation",
          courses: [
            { id: 9, title: "Python for Data Science", status: "completed", duration: "4 weeks" },
            { id: 10, title: "Statistics Fundamentals", status: "completed", duration: "3 weeks" },
            { id: 11, title: "Data Analysis with Pandas", status: "completed", duration: "3 weeks" }
          ]
        },
        {
          id: 2,
          title: "Machine Learning",
          courses: [
            { id: 12, title: "ML Basics", status: "completed", duration: "4 weeks" },
            { id: 13, title: "Supervised Learning", status: "completed", duration: "3 weeks" },
            { id: 14, title: "Advanced ML Algorithms", status: "in_progress", duration: "4 weeks" }
          ]
        },
        {
          id: 3,
          title: "Specialization",
          courses: [
            { id: 15, title: "Deep Learning", status: "locked", duration: "5 weeks" },
            { id: 16, title: "Natural Language Processing", status: "locked", duration: "4 weeks" },
            { id: 17, title: "Computer Vision", status: "locked", duration: "4 weeks" },
            { id: 18, title: "Capstone Project", status: "locked", duration: "6 weeks" }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "UX/UI Design Mastery",
      description: "Complete design thinking and user experience journey",
      category: "Design",
      difficulty: "Beginner to Intermediate",
      estimatedTime: "4-6 months",
      totalCourses: 6,
      completedCourses: 6,
      status: "completed",
      progress: 100,
      enrolledStudents: 2100,
      rating: 4.7,
      instructor: "Design Studio Collective",
      skills: ["Design Thinking", "Prototyping", "User Research", "Visual Design", "Figma"],
      nextMilestone: null,
      badges: ["Design Expert", "Completed", "Certificate Ready"],
      milestones: [
        {
          id: 1,
          title: "Design Fundamentals",
          courses: [
            { id: 19, title: "Design Thinking Basics", status: "completed", duration: "2 weeks" },
            { id: 20, title: "User Research Methods", status: "completed", duration: "3 weeks" },
            { id: 21, title: "Information Architecture", status: "completed", duration: "2 weeks" }
          ]
        },
        {
          id: 2,
          title: "Visual & Interaction Design",
          courses: [
            { id: 22, title: "Visual Design Principles", status: "completed", duration: "3 weeks" },
            { id: 23, title: "Prototyping with Figma", status: "completed", duration: "3 weeks" },
            { id: 24, title: "Portfolio Development", status: "completed", duration: "4 weeks" }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Digital Marketing Expert",
      description: "Comprehensive digital marketing strategy and execution",
      category: "Marketing",
      difficulty: "Beginner to Intermediate",
      estimatedTime: "3-4 months",
      totalCourses: 5,
      completedCourses: 0,
      status: "not_started",
      progress: 0,
      enrolledStudents: 1800,
      rating: 4.6,
      instructor: "Marketing Pros Academy",
      skills: ["SEO", "Content Marketing", "Social Media", "Analytics", "PPC"],
      nextMilestone: "Marketing Fundamentals",
      badges: ["Marketing", "Business Skills", "ROI Focused"],
      milestones: [
        {
          id: 1,
          title: "Foundation",
          courses: [
            { id: 25, title: "Digital Marketing Strategy", status: "available", duration: "2 weeks" },
            { id: 26, title: "Content Marketing", status: "locked", duration: "3 weeks" }
          ]
        },
        {
          id: 2,
          title: "Advanced Techniques",
          courses: [
            { id: 27, title: "SEO & SEM", status: "locked", duration: "3 weeks" },
            { id: 28, title: "Social Media Marketing", status: "locked", duration: "2 weeks" },
            { id: 29, title: "Analytics & Optimization", status: "locked", duration: "3 weeks" }
          ]
        }
      ]
    }
  ];

  const inProgressPaths = learningPaths.filter(p => p.status === "in_progress");
  const completedPaths = learningPaths.filter(p => p.status === "completed");
  const availablePaths = learningPaths.filter(p => p.status === "not_started");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in_progress": return <Play className="w-5 h-5 text-blue-500" />;
      case "locked": return <Lock className="w-5 h-5 text-gray-400" />;
      case "available": return <Unlock className="w-5 h-5 text-orange-500" />;
      default: return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes("Beginner")) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (difficulty.includes("Intermediate")) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    if (difficulty.includes("Advanced")) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  const PathCard = ({ path }: { path: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                {path.title}
              </h3>
              {path.status === "completed" && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
            <div className="flex items-center space-x-2 mb-3">
              <Badge variant="outline">{path.category}</Badge>
              <Badge className={getDifficultyColor(path.difficulty)}>
                {path.difficulty}
              </Badge>
              {path.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Progress</span>
            <span className="font-medium">{Math.round(path.progress)}% complete</span>
          </div>
          <Progress value={path.progress} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
            <span>{path.completedCourses}/{path.totalCourses} courses completed</span>
            {path.nextMilestone && (
              <span>Next: {path.nextMilestone}</span>
            )}
          </div>
        </div>

        {/* Path Info */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{path.estimatedTime}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{path.rating}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{path.enrolledStudents.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span>{path.totalCourses} courses</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Skills you'll gain:</p>
          <div className="flex flex-wrap gap-1">
            {path.skills.slice(0, 4).map((skill: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {path.skills.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{path.skills.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            by {path.instructor}
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedPath(path)}
            >
              View Path
            </Button>
            {path.status === "in_progress" ? (
              <Button 
                size="sm" 
                style={{ backgroundColor: orgData.primaryColor }} 
                className="text-white"
              >
                Continue
              </Button>
            ) : path.status === "completed" ? (
              <Button size="sm" variant="outline">
                <Award className="w-4 h-4 mr-1" />
                Certificate
              </Button>
            ) : (
              <Button 
                size="sm" 
                style={{ backgroundColor: orgData.primaryColor }} 
                className="text-white"
              >
                Start Path
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PathVisualization = ({ path }: { path: any }) => (
    <div className="space-y-8">
      {/* Path Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 mb-4">
          <Route className="w-6 h-6" style={{ color: orgData.primaryColor }} />
          <h2 className="text-2xl font-bold">{path.title}</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">{path.description}</p>
        <div className="flex items-center justify-center space-x-4 mt-4">
          <Badge className={getDifficultyColor(path.difficulty)}>
            {path.difficulty}
          </Badge>
          <Badge variant="outline">{path.estimatedTime}</Badge>
          <Badge variant="outline">{path.totalCourses} courses</Badge>
        </div>
      </div>

      {/* Desktop: Timeline View, Mobile: Vertical Stack */}
      <div className="space-y-8">
        {path.milestones.map((milestone: any, milestoneIndex: number) => (
          <div key={milestone.id} className="relative">
            {/* Milestone Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
                style={{ backgroundColor: orgData.primaryColor }}
              >
                {milestoneIndex + 1}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{milestone.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {milestone.courses.length} courses
                </p>
              </div>
            </div>

            {/* Courses */}
            <div className="ml-6 pl-6 border-l-2 border-muted space-y-4">
              {milestone.courses.map((course: any, courseIndex: number) => (
                <Card 
                  key={course.id} 
                  className={`transition-all duration-200 ${
                    course.status === "completed" ? "bg-green-50 dark:bg-green-950" :
                    course.status === "in_progress" ? "bg-blue-50 dark:bg-blue-950" :
                    course.status === "available" ? "hover:shadow-md cursor-pointer" :
                    "opacity-60"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(course.status)}
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {course.status === "completed" && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Completed
                          </Badge>
                        )}
                        {course.status === "in_progress" && (
                          <Button size="sm" style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                            Continue
                          </Button>
                        )}
                        {course.status === "available" && (
                          <Button size="sm" variant="outline">
                            Start Course
                          </Button>
                        )}
                        {course.status === "locked" && (
                          <Badge variant="outline" className="opacity-60">
                            Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Connector to next milestone */}
            {milestoneIndex < path.milestones.length - 1 && (
              <div className="flex justify-center mt-8">
                <ArrowDown 
                  className="w-6 h-6 text-muted-foreground" 
                  style={{ color: orgData.primaryColor }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Completion Rewards */}
      {path.status === "completed" && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              Congratulations! Path Completed
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              You've successfully completed the {path.title} learning path
            </p>
            <div className="flex items-center justify-center space-x-2">
              <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                <Award className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
              <Button variant="outline">
                <Gift className="w-4 h-4 mr-2" />
                View Rewards
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  if (selectedPath) {
    return (
      <div className="min-h-screen bg-background pb-20 lg:pb-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6 lg:pb-8 max-w-5xl">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => setSelectedPath(null)} 
            className="mb-6"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Learning Paths
          </Button>

          <PathVisualization path={selectedPath} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <div className="container mx-auto px-4 sm:px-6 pb-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Learning Paths</h1>
          <p className="text-muted-foreground">
            Structured learning journeys to master new skills
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${orgData.primaryColor}15` }}
                >
                  <Route className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{inProgressPaths.length}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${orgData.primaryColor}15` }}
                >
                  <Trophy className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedPaths.length}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${orgData.primaryColor}15` }}
                >
                  <Target className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-xs text-muted-foreground">Skills Gained</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${orgData.primaryColor}15` }}
                >
                  <Medal className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Certificates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="mt-6">
            <div className="space-y-6">
              {inProgressPaths.length > 0 ? (
                inProgressPaths.map((path) => (
                  <PathCard key={path.id} path={path} />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Route className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Paths in Progress</h3>
                    <p className="text-muted-foreground mb-4">
                      Start a learning path to begin your structured learning journey.
                    </p>
                    <Button onClick={() => setSelectedTab("available")}>
                      Browse Available Paths
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="available" className="mt-6">
            <div className="space-y-6">
              {availablePaths.map((path) => (
                <PathCard key={path.id} path={path} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-6">
              {completedPaths.length > 0 ? (
                completedPaths.map((path) => (
                  <PathCard key={path.id} path={path} />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Completed Paths</h3>
                    <p className="text-muted-foreground">
                      Complete your first learning path to see your achievements here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage="paths" />
    </div>
  );
};

export default LearnerPathsPage;