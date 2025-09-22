import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { MobileBottomNav } from "@/components/responsive";
import { 
  Trophy, 
  Clock, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Star, 
  PlayCircle,
  RotateCcw,
  Eye,
  Download,
  Share2,
  Timer,
  Target,
  Award,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  MoreVertical,
  BookOpen,
  Users,
  BarChart3,
  Zap,
  Medal,
  Flag,
  ArrowRight
} from "lucide-react";

const LearnerAssessmentsPage = () => {
  const { user } = useAuth();
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);
  
  const [selectedTab, setSelectedTab] = useState("available");
  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAssessmentStarted, setIsAssessmentStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

  // Sample assessments data
  const assessments = [
    {
      id: 1,
      title: "JavaScript Fundamentals Quiz",
      course: "Advanced JavaScript Fundamentals",
      type: "Quiz",
      duration: 30,
      questions: 15,
      attempts: 3,
      attemptsUsed: 1,
      passingScore: 80,
      status: "available",
      deadline: "2024-01-20",
      difficulty: "Intermediate",
      topics: ["Variables", "Functions", "Objects", "Arrays"],
      description: "Test your understanding of core JavaScript concepts including variables, functions, and data structures.",
      instructions: "This quiz consists of 15 multiple-choice questions. You have 30 minutes to complete it.",
      bestScore: 85,
      lastAttempt: "2024-01-15",
      totalPoints: 100,
      estimatedTime: "25-35 minutes"
    },
    {
      id: 2,
      title: "Data Analysis Project",
      course: "Data Science with Python",
      type: "Project",
      duration: 120,
      questions: 5,
      attempts: 2,
      attemptsUsed: 0,
      passingScore: 75,
      status: "available",
      deadline: "2024-01-25",
      difficulty: "Advanced",
      topics: ["Data Cleaning", "Visualization", "Statistical Analysis"],
      description: "Complete a comprehensive data analysis project using Python and pandas.",
      instructions: "Submit your Jupyter notebook with complete analysis and visualizations.",
      bestScore: null,
      lastAttempt: null,
      totalPoints: 200,
      estimatedTime: "1.5-2 hours"
    },
    {
      id: 3,
      title: "UX Design Principles Test",
      course: "UX Design Principles",
      type: "Test",
      duration: 45,
      questions: 20,
      attempts: 2,
      attemptsUsed: 2,
      passingScore: 70,
      status: "completed",
      deadline: "2024-01-10",
      difficulty: "Beginner",
      topics: ["User Research", "Prototyping", "Usability"],
      description: "Evaluate your knowledge of fundamental UX design principles.",
      instructions: "Answer all questions based on design scenarios and best practices.",
      bestScore: 92,
      lastAttempt: "2024-01-09",
      totalPoints: 120,
      estimatedTime: "40-50 minutes"
    },
    {
      id: 4,
      title: "Machine Learning Final Exam",
      course: "Machine Learning Basics",
      type: "Exam",
      duration: 90,
      questions: 30,
      attempts: 1,
      attemptsUsed: 1,
      passingScore: 85,
      status: "completed",
      deadline: "2024-01-05",
      difficulty: "Advanced",
      topics: ["Supervised Learning", "Model Evaluation", "Feature Engineering"],
      description: "Comprehensive final examination covering all machine learning concepts.",
      instructions: "This is a proctored exam. Ensure you have a stable internet connection.",
      bestScore: 94,
      lastAttempt: "2024-01-04",
      totalPoints: 250,
      estimatedTime: "1-1.5 hours"
    },
    {
      id: 5,
      title: "React Components Assignment",
      course: "React Advanced Patterns",
      type: "Assignment",
      duration: 60,
      questions: 8,
      attempts: 3,
      attemptsUsed: 0,
      passingScore: 80,
      status: "overdue",
      deadline: "2024-01-12",
      difficulty: "Advanced",
      topics: ["Component Design", "State Management", "Performance"],
      description: "Build advanced React components using modern patterns and best practices.",
      instructions: "Submit your component implementation with proper documentation.",
      bestScore: null,
      lastAttempt: null,
      totalPoints: 150,
      estimatedTime: "45-60 minutes"
    }
  ];

  const sampleQuestions = [
    {
      id: 1,
      question: "What is the correct way to declare a variable in JavaScript ES6?",
      options: [
        "var myVariable = 'value';",
        "let myVariable = 'value';",
        "const myVariable = 'value';",
        "Both B and C are correct"
      ],
      correctAnswer: 3,
      explanation: "Both let and const are correct ways to declare variables in ES6, depending on whether you need to reassign the variable."
    },
    {
      id: 2,
      question: "Which method is used to add an element to the end of an array?",
      options: [
        "push()",
        "pop()",
        "shift()",
        "unshift()"
      ],
      correctAnswer: 0,
      explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array."
    },
    {
      id: 3,
      question: "What does the 'this' keyword refer to in JavaScript?",
      options: [
        "The global object",
        "The current function",
        "The object that owns the method",
        "It depends on the context"
      ],
      correctAnswer: 3,
      explanation: "The value of 'this' in JavaScript depends on how a function is called. It can refer to different objects in different contexts."
    }
  ];

  const availableAssessments = assessments.filter(a => a.status === "available");
  const completedAssessments = assessments.filter(a => a.status === "completed");
  const overdueAssessments = assessments.filter(a => a.status === "overdue");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "overdue": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatTimeRemaining = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const AssessmentCard = ({ assessment }: { assessment: any }) => (
    <Card className="hover:shadow-lg transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {assessment.title}
              </h3>
              <Badge className={getStatusColor(assessment.status)}>
                {assessment.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{assessment.course}</p>
            <p className="text-sm text-muted-foreground">{assessment.description}</p>
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Assessment Info */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{assessment.duration} min</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span>{assessment.questions} questions</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Due {new Date(assessment.deadline).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Trophy className="w-4 h-4 text-muted-foreground" />
            <span>{assessment.totalPoints} pts</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="outline">{assessment.type}</Badge>
          <Badge className={getDifficultyColor(assessment.difficulty)}>
            {assessment.difficulty}
          </Badge>
          <Badge variant="outline">
            {assessment.attemptsUsed}/{assessment.attempts} attempts
          </Badge>
        </div>

        {/* Progress or Score */}
        {assessment.status === "completed" && assessment.bestScore && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Best Score</span>
              <span className="font-medium">{assessment.bestScore}%</span>
            </div>
            <Progress value={assessment.bestScore} className="h-2" />
          </div>
        )}

        {/* Topics */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Topics covered:</p>
          <div className="flex flex-wrap gap-1">
            {assessment.topics.map((topic: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {assessment.estimatedTime}
            {assessment.lastAttempt && (
              <span className="block">Last attempt: {new Date(assessment.lastAttempt).toLocaleDateString()}</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {assessment.status === "available" && (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{assessment.title}</DialogTitle>
                      <DialogDescription>{assessment.course}</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Instructions</h4>
                        <p className="text-sm text-muted-foreground">{assessment.instructions}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Assessment Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span>{assessment.duration} minutes</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Questions:</span>
                              <span>{assessment.questions}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Passing Score:</span>
                              <span>{assessment.passingScore}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Attempts:</span>
                              <span>{assessment.attempts}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Topics</h4>
                          <div className="flex flex-wrap gap-1">
                            {assessment.topics.map((topic: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={() => {
                          setSelectedAssessment(assessment);
                          setIsAssessmentStarted(true);
                        }}
                        style={{ backgroundColor: orgData.primaryColor }} 
                        className="text-white"
                      >
                        Start Assessment
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button 
                  size="sm" 
                  style={{ backgroundColor: orgData.primaryColor }} 
                  className="text-white"
                  onClick={() => {
                    setSelectedAssessment(assessment);
                    setIsAssessmentStarted(true);
                  }}
                >
                  <PlayCircle className="w-4 h-4 mr-1" />
                  Start
                </Button>
              </>
            )}
            {assessment.status === "completed" && (
              <>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Report
                </Button>
                {assessment.attemptsUsed < assessment.attempts && (
                  <Button size="sm" variant="outline">
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Retake
                  </Button>
                )}
              </>
            )}
            {assessment.status === "overdue" && (
              <Button size="sm" variant="destructive">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Overdue
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isAssessmentStarted && selectedAssessment) {
    return (
      <div className="min-h-screen bg-background">
        {/* Assessment Header */}
        <div className="sticky top-0 z-10 bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">{selectedAssessment.title}</h1>
                <p className="text-sm text-muted-foreground">{selectedAssessment.course}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Timer className="w-4 h-4" />
                    <span className="font-mono text-lg">{formatTimeRemaining(timeRemaining)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Time Remaining</p>
                </div>
                <Button variant="outline" onClick={() => setIsAssessmentStarted(false)}>
                  Exit
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {sampleQuestions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / sampleQuestions.length) * 100)}% Complete</span>
          </div>
          <Progress value={((currentQuestion + 1) / sampleQuestions.length) * 100} className="h-2" />
        </div>

        {/* Question Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card>
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="outline">Question {currentQuestion + 1}</Badge>
                  <Badge variant="secondary">Multiple Choice</Badge>
                </div>
                <h2 className="text-xl font-semibold mb-4">
                  {sampleQuestions[currentQuestion].question}
                </h2>
              </div>

              <RadioGroup 
                value={answers[currentQuestion]} 
                onValueChange={(value) => setAnswers(prev => ({ ...prev, [currentQuestion]: value }))}
                className="space-y-4"
              >
                {sampleQuestions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="sticky bottom-0 bg-background border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {Object.keys(answers).length} of {sampleQuestions.length} answered
                </span>
              </div>

              {currentQuestion < sampleQuestions.length - 1 ? (
                <Button 
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  style={{ backgroundColor: orgData.primaryColor }} 
                  className="text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button 
                  style={{ backgroundColor: orgData.primaryColor }} 
                  className="text-white"
                  disabled={Object.keys(answers).length < sampleQuestions.length}
                >
                  Submit Assessment
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <div className="container mx-auto px-4 sm:px-6 pb-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Assessments</h1>
          <p className="text-muted-foreground">
            Track your progress and test your knowledge
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
                  <Trophy className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedAssessments.length}</p>
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
                  <Clock className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{availableAssessments.length}</p>
                  <p className="text-xs text-muted-foreground">Available</p>
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
                  <TrendingUp className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">88%</p>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
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
                  <p className="text-2xl font-bold">1,250</p>
                  <p className="text-xs text-muted-foreground">Points Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="available" className="relative">
              Available
              {availableAssessments.length > 0 && (
                <Badge 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
                  style={{ backgroundColor: orgData.primaryColor }}
                >
                  {availableAssessments.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overdue" className="relative">
              Overdue
              {overdueAssessments.length > 0 && (
                <Badge 
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs"
                >
                  {overdueAssessments.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-6">
            <div className="space-y-4">
              {availableAssessments.length > 0 ? (
                availableAssessments.map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Available Assessments</h3>
                    <p className="text-muted-foreground mb-4">
                      You're all caught up! Check back later for new assessments.
                    </p>
                    <Button onClick={() => navigate(`/${orgData.acronym}/courses`)}>
                      Browse Courses
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedAssessments.length > 0 ? (
                completedAssessments.map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Completed Assessments</h3>
                    <p className="text-muted-foreground">
                      Complete your first assessment to see your results here.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="overdue" className="mt-6">
            <div className="space-y-4">
              {overdueAssessments.length > 0 ? (
                overdueAssessments.map((assessment) => (
                  <AssessmentCard key={assessment.id} assessment={assessment} />
                ))
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
                    <p className="text-muted-foreground">
                      You have no overdue assessments. Great job staying on track!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage="assessments" />
    </div>
  );
};

export default LearnerAssessmentsPage;