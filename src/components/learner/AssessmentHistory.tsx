import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import {
  Download,
  Trophy,
  Clock,
  Target,
  TrendingUp,
  FileText,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Calendar,
  Award
} from "lucide-react";

interface AssessmentResult {
  id: string;
  title: string;
  course: string;
  type: 'quiz' | 'exam' | 'certification' | 'practice';
  score: number;
  maxScore: number;
  percentage: number;
  passingScore: number;
  status: 'passed' | 'failed' | 'pending_review';
  attempts: number;
  maxAttempts: number;
  completedDate: string;
  timeSpent: string;
  expirationDate?: string;
  certificateId?: string;
  retakeEligible: boolean;
  nextRetakeDate?: string;
  feedback?: string;
  skillsAssessed: string[];
  performanceBreakdown: {
    category: string;
    score: number;
    maxScore: number;
  }[];
}

interface PracticeTest {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: number;
  estimatedTime: string;
  averageScore: number;
  yourBestScore?: number;
  attempts: number;
  lastAttempted?: string;
  improvementAreas: string[];
}

const AssessmentHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  const assessmentResults: AssessmentResult[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals Final Exam',
      course: 'Advanced JavaScript Fundamentals',
      type: 'exam',
      score: 92,
      maxScore: 100,
      percentage: 92,
      passingScore: 70,
      status: 'passed',
      attempts: 1,
      maxAttempts: 3,
      completedDate: '2024-03-10',
      timeSpent: '45 minutes',
      certificateId: 'CERT-JS-2024-001',
      retakeEligible: false,
      skillsAssessed: ['ES6 Features', 'Async Programming', 'DOM Manipulation'],
      performanceBreakdown: [
        { category: 'ES6 Features', score: 28, maxScore: 30 },
        { category: 'Async Programming', score: 32, maxScore: 35 },
        { category: 'DOM Manipulation', score: 32, maxScore: 35 }
      ]
    },
    {
      id: '2',
      title: 'Data Science Quiz 3',
      course: 'Data Science with Python',
      type: 'quiz',
      score: 68,
      maxScore: 100,
      percentage: 68,
      passingScore: 70,
      status: 'failed',
      attempts: 2,
      maxAttempts: 3,
      completedDate: '2024-03-08',
      timeSpent: '25 minutes',
      retakeEligible: true,
      nextRetakeDate: '2024-03-15',
      feedback: 'Focus on statistical analysis and data visualization concepts.',
      skillsAssessed: ['Statistics', 'Data Visualization', 'Python Libraries'],
      performanceBreakdown: [
        { category: 'Statistics', score: 20, maxScore: 35 },
        { category: 'Data Visualization', score: 25, maxScore: 30 },
        { category: 'Python Libraries', score: 23, maxScore: 35 }
      ]
    },
    {
      id: '3',
      title: 'UX Design Principles Assessment',
      course: 'UX Design Principles',
      type: 'certification',
      score: 88,
      maxScore: 100,
      percentage: 88,
      passingScore: 80,
      status: 'passed',
      attempts: 1,
      maxAttempts: 2,
      completedDate: '2024-02-28',
      timeSpent: '60 minutes',
      expirationDate: '2025-02-28',
      certificateId: 'CERT-UX-2024-002',
      retakeEligible: false,
      skillsAssessed: ['User Research', 'Wireframing', 'Prototyping'],
      performanceBreakdown: [
        { category: 'User Research', score: 30, maxScore: 35 },
        { category: 'Wireframing', score: 28, maxScore: 30 },
        { category: 'Prototyping', score: 30, maxScore: 35 }
      ]
    }
  ];

  const practiceTests: PracticeTest[] = [
    {
      id: '1',
      title: 'JavaScript Practice Test',
      category: 'Programming',
      difficulty: 'intermediate',
      questions: 25,
      estimatedTime: '30 minutes',
      averageScore: 78,
      yourBestScore: 92,
      attempts: 5,
      lastAttempted: '2024-03-09',
      improvementAreas: ['Closures', 'Promises']
    },
    {
      id: '2',
      title: 'Data Analysis Practice Quiz',
      category: 'Data Science',
      difficulty: 'advanced',
      questions: 20,
      estimatedTime: '25 minutes',
      averageScore: 65,
      yourBestScore: 75,
      attempts: 3,
      lastAttempted: '2024-03-07',
      improvementAreas: ['Statistical Tests', 'Data Cleaning']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'pending_review': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const downloadTranscript = (assessmentId: string) => {
    // Simulate transcript download
    console.log(`Downloading transcript for assessment ${assessmentId}`);
  };

  const downloadCertificate = (certificateId: string) => {
    // Simulate certificate download
    console.log(`Downloading certificate ${certificateId}`);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="results" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="results">Assessment Results</TabsTrigger>
          <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4" style={{ color: orgData.primaryColor }} />
                  <div>
                    <div className="text-2xl font-bold">
                      {assessmentResults.filter(r => r.status === 'passed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Passed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-red-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {assessmentResults.filter(r => r.status === 'failed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Failed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {Math.round(assessmentResults.reduce((acc, r) => acc + r.percentage, 0) / assessmentResults.length)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Avg Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold">
                      {assessmentResults.filter(r => r.certificateId).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Certificates</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Results */}
          <div className="space-y-4">
            {assessmentResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{result.title}</h3>
                      <p className="text-sm text-muted-foreground">{result.course}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {result.type.toUpperCase()}
                        </Badge>
                        <Badge className={getStatusColor(result.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(result.status)}
                            <span>{result.status.replace('_', ' ').toUpperCase()}</span>
                          </div>
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ 
                        color: result.percentage >= result.passingScore ? '#10b981' : '#ef4444' 
                      }}>
                        {result.percentage}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.score}/{result.maxScore}
                      </div>
                    </div>
                  </div>

                  {/* Performance Breakdown */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-3">Performance Breakdown</h4>
                    <div className="space-y-2">
                      {result.performanceBreakdown.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm">{item.category}</span>
                          <div className="flex items-center space-x-2">
                            <Progress 
                              value={(item.score / item.maxScore) * 100} 
                              className="w-20 h-2" 
                            />
                            <span className="text-sm text-muted-foreground w-12">
                              {item.score}/{item.maxScore}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Completed:</span>
                      <div className="font-medium">{new Date(result.completedDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Time Spent:</span>
                      <div className="font-medium">{result.timeSpent}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Attempts:</span>
                      <div className="font-medium">{result.attempts}/{result.maxAttempts}</div>
                    </div>
                  </div>

                  {/* Feedback */}
                  {result.feedback && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900 mb-1">Instructor Feedback</div>
                      <div className="text-sm text-blue-800">{result.feedback}</div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => downloadTranscript(result.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Transcript
                      </Button>
                      {result.certificateId && (
                        <Button variant="outline" size="sm" onClick={() => downloadCertificate(result.certificateId!)}>
                          <Award className="h-4 w-4 mr-2" />
                          Certificate
                        </Button>
                      )}
                    </div>
                    
                    {result.retakeEligible && (
                      <Button 
                        size="sm" 
                        style={{ backgroundColor: orgData.primaryColor }}
                        className="text-white"
                      >
                        Retake Assessment
                      </Button>
                    )}
                  </div>

                  {/* Retake Information */}
                  {result.retakeEligible && result.nextRetakeDate && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Next retake available: {new Date(result.nextRetakeDate).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <div className="grid gap-4">
            {practiceTests.map((test) => (
              <Card key={test.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{test.title}</h3>
                      <p className="text-sm text-muted-foreground">{test.category}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getDifficultyColor(test.difficulty)}>
                          {test.difficulty.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {test.questions} Questions
                        </Badge>
                        <Badge variant="outline">
                          {test.estimatedTime}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      {test.yourBestScore && (
                        <div className="text-lg font-bold" style={{ color: orgData.primaryColor }}>
                          {test.yourBestScore}%
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        Avg: {test.averageScore}%
                      </div>
                    </div>
                  </div>

                  {/* Progress and Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Your Best vs Average</div>
                      <div className="space-y-1">
                        <Progress value={test.yourBestScore || 0} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Your Best: {test.yourBestScore || 0}%</span>
                          <span>Average: {test.averageScore}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="mb-2">
                        <span className="text-muted-foreground">Attempts:</span>
                        <span className="font-medium ml-2">{test.attempts}</span>
                      </div>
                      {test.lastAttempted && (
                        <div>
                          <span className="text-muted-foreground">Last Attempted:</span>
                          <span className="font-medium ml-2">
                            {new Date(test.lastAttempted).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Improvement Areas */}
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Focus Areas for Improvement</div>
                    <div className="flex flex-wrap gap-2">
                      {test.improvementAreas.map((area, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <Button variant="outline" size="sm">
                      View Analytics
                    </Button>
                    <Button 
                      size="sm" 
                      style={{ backgroundColor: orgData.primaryColor }}
                      className="text-white"
                    >
                      Take Practice Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Detailed insights into your assessment performance and learning progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <div>Performance analytics dashboard coming soon...</div>
                <div className="text-sm mt-2">
                  Track your progress, identify strengths and weaknesses, and get personalized recommendations.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssessmentHistory;