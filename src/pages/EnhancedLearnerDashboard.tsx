import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { MobileBottomNav } from "@/components/responsive";

// Import the new components
import ComplianceTracker from "@/components/learner/ComplianceTracker";
import AssessmentHistory from "@/components/learner/AssessmentHistory";
import RecommendationEngine from "@/components/learner/RecommendationEngine";
import AcademicCenter from "@/components/learner/AcademicCenter";
import SocialLearning from "@/components/learner/SocialLearning";
import GamificationHub from "@/components/learner/GamificationHub";

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
  Settings as SettingsIcon,
  Shield,
  Brain,
  MessageSquare,
  GraduationCap,
  Zap,
  TrendingUp as Trending
} from "lucide-react";

const EnhancedLearnerDashboard = () => {
  const { user } = useAuth();
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  // Enhanced learner stats with compliance and social metrics
  const enhancedStats = {
    coursesInProgress: 3,
    coursesCompleted: 12,
    totalPoints: 2450,
    currentStreak: 7,
    averageScore: 92,
    timeSpentToday: "2h 15m",
    complianceScore: 85,
    socialScore: 78,
    skillLevel: "Intermediate",
    nextDeadline: "3 days",
    certificationsEarned: 8,
    studyGroupsJoined: 2,
    forumReputation: 245,
    careerProgress: 65
  };

  // Quick action items based on AI recommendations and compliance
  const quickActions = [
    {
      title: "Safety Training Overdue",
      description: "High priority",
      urgency: "high",
      action: "Start",
      icon: Shield,
      color: "red"
    },
    {
      title: "Join React Study Group",
      description: "Recommended for you",
      urgency: "medium",
      action: "Join",
      icon: Users,
      color: "blue"
    },
    {
      title: "ML Practice Test",
      description: "Assessment prep",
      urgency: "medium",
      action: "Start",
      icon: Trophy,
      color: "green"
    },
    {
      title: "AI Recommendations",
      description: "3 new suggestions",
      urgency: "low",
      action: "View",
      icon: Brain,
      color: "purple"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <div className="container mx-auto px-4 sm:px-6 pb-6 max-w-7xl" role="main" aria-label="Learner Dashboard">
        {/* Enhanced Welcome Section */}
        <header className="mb-8" role="banner">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground" id="dashboard-title">
                Welcome back, {user?.email?.split('@')[0] || 'Learner'}!
              </h1>
              <p className="text-muted-foreground mt-1" aria-describedby="dashboard-title">
                {enhancedStats.currentStreak}-day streak
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" aria-label="Notifications: 3 unread notifications">
                <Bell className="w-4 h-4 mr-2" aria-hidden="true" />
                <Badge variant="destructive" className="ml-1 px-1 text-xs" aria-label="3 notifications">3</Badge>
              </Button>
              <Button variant="outline" size="sm" aria-label="View learning schedule">
                <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
                Schedule
              </Button>
            </div>
          </div>
        </header>

        {/* Enhanced Stats Grid */}
        <section className="mb-8" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">Learning Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          <Card className="hover:shadow-md transition-shadow" role="region" aria-label="Courses in progress statistics">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" style={{ color: orgData.primaryColor }} aria-hidden="true" />
                <div>
                  <div className="text-lg md:text-xl font-bold" style={{ color: orgData.primaryColor }}>
                    {enhancedStats.coursesInProgress}
                  </div>
                  <div className="text-xs text-muted-foreground">In Progress</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow" role="region" aria-label="Completed courses statistics">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
                <div>
                  <div className="text-lg md:text-xl font-bold text-green-600">
                    {enhancedStats.coursesCompleted}
                  </div>
                  <div className="text-xs text-muted-foreground">Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-lg md:text-xl font-bold text-blue-600">
                    {enhancedStats.complianceScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Compliance</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <div>
                  <div className="text-lg md:text-xl font-bold text-yellow-600">
                    {enhancedStats.averageScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Avg Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-purple-600" />
                <div>
                  <div className="text-lg md:text-xl font-bold text-purple-600">
                    {enhancedStats.socialScore}
                  </div>
                  <div className="text-xs text-muted-foreground">Social Score</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-orange-600" />
                <div>
                  <div className="text-lg md:text-xl font-bold text-orange-600">
                    {enhancedStats.currentStreak}
                  </div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </section>

        {/* Quick Actions Alert Cards */}
        <section className="mb-8" aria-labelledby="action-items-heading">
          <h2 id="action-items-heading" className="text-lg font-semibold mb-4">Action Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                role="listitem"
                className={`border-2 ${getUrgencyColor(action.urgency)} hover:shadow-md transition-shadow cursor-pointer`}
                aria-label={`${action.urgency} priority: ${action.title}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-white">
                        <action.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{action.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs"
                      aria-label={`${action.action} for ${action.title}`}
                    >
                      {action.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Comprehensive Learning Hub */}
        <section aria-labelledby="learning-hub-heading">
          <h2 id="learning-hub-heading" className="sr-only">Learning Hub Navigation</h2>
          <Tabs defaultValue="overview" className="space-y-6" aria-label="Learning hub sections">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="recommendations">AI Insights</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
            <TabsTrigger value="gamification">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Career Progress Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trending className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                  <span>Career Progression</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Frontend → Senior Frontend</div>
                      <div className="text-sm text-muted-foreground">6-12 months</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: orgData.primaryColor }}>
                        {enhancedStats.careerProgress}%
                      </div>
                      <div className="text-sm text-muted-foreground">Complete</div>
                    </div>
                  </div>
                  <Progress value={enhancedStats.careerProgress} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>2 skills left</span>
                    <span>15-25% increase</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Analytics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">This Week's Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Study Time</span>
                      <span className="font-medium">12h 30m</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Modules Completed</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Assessments Passed</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Discussion Posts</span>
                      <span className="font-medium">5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">ML Project Due</div>
                        <div className="text-xs text-muted-foreground">Machine Learning Fund.</div>
                      </div>
                      <Badge className="bg-red-100 text-red-800">2 days</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">Safety Training</div>
                        <div className="text-xs text-muted-foreground">Compliance Requirement</div>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800">5 days</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">React Final Exam</div>
                        <div className="text-xs text-muted-foreground">Advanced React Fund.</div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">1 week</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceTracker />
          </TabsContent>

          <TabsContent value="recommendations">
            <RecommendationEngine />
          </TabsContent>

          <TabsContent value="academic">
            <AcademicCenter />
          </TabsContent>

          <TabsContent value="social">
            <SocialLearning />
          </TabsContent>

          <TabsContent value="assessments">
            <AssessmentHistory />
          </TabsContent>

          <TabsContent value="gamification">
            <GamificationHub />
          </TabsContent>
          </Tabs>
        </section>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage="dashboard" />
    </div>
  );
};

export default EnhancedLearnerDashboard;