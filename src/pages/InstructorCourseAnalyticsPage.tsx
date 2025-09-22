import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { OrganizationHeader } from "@/components/OrganizationHeader";
import InstructorMobileBottomNav from "@/components/responsive/InstructorMobileBottomNav";
import { 
  ArrowLeft,
  Download,
  Calendar,
  Users,
  BookOpen,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Target,
  Award,
  MessageSquare,
  Eye,
  CheckCircle,
  AlertCircle,
  Filter
} from "lucide-react";

const InstructorCourseAnalyticsPage = () => {
  const { user } = useAuth();
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  const [dateRange, setDateRange] = useState("30_days");
  const [viewType, setViewType] = useState("overview");

  // Mock analytics data
  const analytics = {
    overview: {
      totalStudents: 45,
      activeStudents: 38,
      averageProgress: 75,
      completionRate: 89,
      averageGrade: 87,
      dropoutRate: 8,
      engagementScore: 92,
      satisfactionRating: 4.8
    },
    engagement: {
      dailyActiveUsers: [
        { date: "2024-03-01", users: 28 },
        { date: "2024-03-02", users: 32 },
        { date: "2024-03-03", users: 35 },
        { date: "2024-03-04", users: 29 },
        { date: "2024-03-05", users: 41 },
        { date: "2024-03-06", users: 38 },
        { date: "2024-03-07", users: 42 }
      ],
      averageSessionTime: "45 minutes",
      pageViews: 1247,
      videoWatchTime: "12.5 hours",
      discussionPosts: 89,
      assignmentSubmissions: 156
    },
    performance: {
      moduleCompletion: [
        { module: "Introduction to ES6+", completion: 95, avgGrade: 92 },
        { module: "Async/Await and Promises", completion: 87, avgGrade: 89 },
        { module: "Advanced Object Patterns", completion: 78, avgGrade: 85 },
        { module: "Module Systems", completion: 65, avgGrade: 83 },
        { module: "Testing Strategies", completion: 42, avgGrade: 88 }
      ],
      gradeDistribution: [
        { grade: "A", count: 18, percentage: 40 },
        { grade: "B", count: 15, percentage: 33 },
        { grade: "C", count: 8, percentage: 18 },
        { grade: "D", count: 3, percentage: 7 },
        { grade: "F", count: 1, percentage: 2 }
      ],
      topPerformers: [
        { name: "Sarah Chen", grade: 98, completion: 100 },
        { name: "Michael Rodriguez", grade: 94, completion: 95 },
        { name: "Emily Johnson", grade: 92, completion: 98 }
      ],
      strugglingStudents: [
        { name: "David Kim", grade: 65, completion: 45, lastActive: "3 days ago" },
        { name: "Lisa Thompson", grade: 58, completion: 38, lastActive: "1 week ago" }
      ]
    },
    feedback: {
      overallRating: 4.8,
      totalReviews: 23,
      ratingBreakdown: [
        { stars: 5, count: 15, percentage: 65 },
        { stars: 4, count: 6, percentage: 26 },
        { stars: 3, count: 2, percentage: 9 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 }
      ],
      commonPraise: [
        "Clear explanations and examples",
        "Well-structured content",
        "Responsive instructor feedback"
      ],
      areasForImprovement: [
        "More practical exercises",
        "Additional video content",
        "Better scheduling flexibility"
      ]
    }
  };

  const StatCard = ({ title, value, change, changeType, icon: Icon, color }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className={`flex items-center space-x-1 text-xs ${
                changeType === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{change}</span>
              </div>
            )}
          </div>
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full overflow-x-hidden">
      <OrganizationHeader orgData={orgData} />
      <div className="container mx-auto px-4 sm:px-6 pb-20 md:pb-6 max-w-7xl" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`${location.pathname.replace('/analytics', '')}`)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Course Analytics</h1>
            <p className="text-muted-foreground">Monitor student progress and course performance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7_days">Last 7 days</SelectItem>
                <SelectItem value="30_days">Last 30 days</SelectItem>
                <SelectItem value="90_days">Last 90 days</SelectItem>
                <SelectItem value="semester">This semester</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={analytics.overview.totalStudents}
          change="+3 this week"
          changeType="up"
          icon={Users}
          color={orgData.primaryColor}
        />
        <StatCard
          title="Average Progress"
          value={`${analytics.overview.averageProgress}%`}
          change="+5% this week"
          changeType="up"
          icon={Target}
          color="#10b981"
        />
        <StatCard
          title="Completion Rate"
          value={`${analytics.overview.completionRate}%`}
          change="+2% this month"
          changeType="up"
          icon={CheckCircle}
          color="#f59e0b"
        />
        <StatCard
          title="Satisfaction Rating"
          value={analytics.overview.satisfactionRating}
          change="+0.3 this month"
          changeType="up"
          icon={Award}
          color="#8b5cf6"
        />
      </div>

      <Tabs value={viewType} onValueChange={setViewType} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Health Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Active Students</span>
                    <span>{analytics.overview.activeStudents}/{analytics.overview.totalStudents}</span>
                  </div>
                  <Progress value={(analytics.overview.activeStudents / analytics.overview.totalStudents) * 100} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Engagement Score</span>
                    <span>{analytics.overview.engagementScore}%</span>
                  </div>
                  <Progress value={analytics.overview.engagementScore} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Average Grade</span>
                    <span>{analytics.overview.averageGrade}%</span>
                  </div>
                  <Progress value={analytics.overview.averageGrade} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{analytics.overview.completionRate}%</div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{analytics.overview.dropoutRate}%</div>
                    <div className="text-sm text-muted-foreground">Dropout Rate</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{analytics.overview.averageGrade}%</div>
                    <div className="text-sm text-muted-foreground">Average Grade</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{analytics.overview.satisfactionRating}</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: orgData.primaryColor }}>
                    {analytics.engagement.pageViews}
                  </div>
                  <div className="text-sm text-muted-foreground">Page Views (30 days)</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {analytics.engagement.assignmentSubmissions}
                  </div>
                  <div className="text-sm text-muted-foreground">Assignment Submissions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {analytics.engagement.discussionPosts}
                  </div>
                  <div className="text-sm text-muted-foreground">Discussion Posts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Active Students</CardTitle>
                <CardDescription>Student activity over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.engagement.dailyActiveUsers.map((day, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{new Date(day.date).toLocaleDateString()}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${(day.users / analytics.overview.totalStudents) * 100}%`,
                              backgroundColor: orgData.primaryColor 
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{day.users}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>How students are interacting with content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Average Session Time</span>
                  </div>
                  <span className="font-semibold">{analytics.engagement.averageSessionTime}</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-green-500" />
                    <span>Total Page Views</span>
                  </div>
                  <span className="font-semibold">{analytics.engagement.pageViews}</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-purple-500" />
                    <span>Discussion Posts</span>
                  </div>
                  <span className="font-semibold">{analytics.engagement.discussionPosts}</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-orange-500" />
                    <span>Video Watch Time</span>
                  </div>
                  <span className="font-semibold">{analytics.engagement.videoWatchTime}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Completion Rates</CardTitle>
                <CardDescription>Progress through course modules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.performance.moduleCompletion.map((module, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{module.module}</span>
                        <span>{module.completion}%</span>
                      </div>
                      <Progress value={module.completion} />
                      <div className="text-xs text-muted-foreground">
                        Average Grade: {module.avgGrade}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>How students are performing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.performance.gradeDistribution.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Grade {grade.grade}</span>
                        <span className="text-sm text-muted-foreground">({grade.count} students)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${grade.percentage}%`,
                              backgroundColor: orgData.primaryColor 
                            }}
                          />
                        </div>
                        <span className="text-sm w-8">{grade.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-500" />
                  <span>Top Performers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.performance.topPerformers.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {student.completion}% complete
                        </div>
                      </div>
                      <Badge variant="default" style={{ backgroundColor: orgData.primaryColor }}>
                        {student.grade}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span>Students Needing Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.performance.strugglingStudents.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-orange-200 rounded-lg bg-orange-50">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {student.completion}% complete • Last active {student.lastActive}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          {student.grade}%
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          <Button variant="outline" size="sm">Contact</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Course Rating</CardTitle>
                <CardDescription>Based on {analytics.feedback.totalReviews} student reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2" style={{ color: orgData.primaryColor }}>
                    {analytics.feedback.overallRating}
                  </div>
                  <div className="flex justify-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={`text-lg ${star <= Math.floor(analytics.feedback.overallRating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {analytics.feedback.totalReviews} reviews
                  </div>
                </div>

                <div className="space-y-2">
                  {analytics.feedback.ratingBreakdown.map((rating, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm w-8">{rating.stars}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-yellow-400" 
                          style={{ width: `${rating.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm w-8">{rating.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Feedback Insights</CardTitle>
                <CardDescription>Common themes from student reviews</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-green-600 mb-3">What Students Love</h4>
                  <div className="space-y-2">
                    {analytics.feedback.commonPraise.map((praise, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{praise}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-orange-600 mb-3">Areas for Improvement</h4>
                  <div className="space-y-2">
                    {analytics.feedback.areasForImprovement.map((improvement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <InstructorMobileBottomNav currentPage="analytics" />
    </div>
  );
};

export default InstructorCourseAnalyticsPage;