import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { MobileBottomNav } from "@/components/responsive";
import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  Award,
  Target,
  Calendar,
  Filter,
  Download,
  Eye,
  BookOpen,
  Users,
  Zap,
  Star,
  ChevronDown,
  ChevronUp,
  GraduationCap
} from "lucide-react";

const LearnerAnalyticsPage = () => {
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [showDetailedStats, setShowDetailedStats] = useState(false);

  const timeframes = [
    { label: "7 Days", value: "7d" },
    { label: "30 Days", value: "30d" },
    { label: "3 Months", value: "3m" },
    { label: "1 Year", value: "1y" }
  ];

  const overviewStats = [
    {
      title: "Total Study Time",
      value: "142h 30m",
      change: "+15%",
      trend: "up",
      icon: Clock,
      color: orgData.primaryColor,
      mobile: "142h"
    },
    {
      title: "Courses Completed",
      value: "12",
      change: "+3",
      trend: "up",
      icon: BookOpen,
      color: orgData.primaryColor,
      mobile: "12"
    },
    {
      title: "Average Score",
      value: "89%",
      change: "+7%",
      trend: "up",
      icon: Target,
      color: orgData.primaryColor,
      mobile: "89%"
    },
    {
      title: "Certificates Earned",
      value: "8",
      change: "+2",
      trend: "up",
      icon: Award,
      color: orgData.primaryColor,
      mobile: "8"
    }
  ];

  const weeklyData = [
    { day: "Mon", hours: 4.5, score: 85 },
    { day: "Tue", hours: 3.2, score: 92 },
    { day: "Wed", hours: 5.1, score: 88 },
    { day: "Thu", hours: 2.8, score: 90 },
    { day: "Fri", hours: 4.0, score: 87 },
    { day: "Sat", hours: 6.2, score: 94 },
    { day: "Sun", hours: 3.8, score: 91 }
  ];

  const courseProgress = [
    {
      course: "Advanced Machine Learning",
      progress: 75,
      timeSpent: "28h",
      lastAccessed: "2 hours ago",
      status: "active"
    },
    {
      course: "Data Science Fundamentals",
      progress: 100,
      timeSpent: "42h",
      lastAccessed: "1 week ago",
      status: "completed"
    },
    {
      course: "Python Programming",
      progress: 45,
      timeSpent: "18h",
      lastAccessed: "1 day ago",
      status: "active"
    },
    {
      course: "Statistics for ML",
      progress: 30,
      timeSpent: "12h",
      lastAccessed: "3 days ago",
      status: "active"
    }
  ];

  const achievements = [
    {
      title: "Speed Learner",
      description: "Complete 5 courses in a month",
      earned: true,
      date: "March 2024",
      icon: Zap
    },
    {
      title: "Perfect Score",
      description: "Score 100% on any assessment",
      earned: true,
      date: "February 2024",
      icon: Star
    },
    {
      title: "Consistency Master",
      description: "Study for 30 consecutive days",
      earned: false,
      progress: 23,
      target: 30,
      icon: Target
    },
    {
      title: "Knowledge Seeker",
      description: "Complete 20 courses",
      earned: false,
      progress: 12,
      target: 20,
      icon: BookOpen
    }
  ];

  const skillsData = [
    { skill: "Machine Learning", level: 85, courses: 4 },
    { skill: "Python", level: 92, courses: 6 },
    { skill: "Data Analysis", level: 78, courses: 3 },
    { skill: "Statistics", level: 65, courses: 2 },
    { skill: "Deep Learning", level: 42, courses: 1 }
  ];


  const MobileChart = ({ data, title }: { data: any[], title: string }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-xs font-medium">{item.day || item.skill || item.course}</div>
                <div className="text-xs text-muted-foreground">
                  {item.hours ? `${item.hours}h` : item.level ? `${item.level}%` : `${item.progress}%`}
                </div>
              </div>
              <div className="w-20">
                <Progress 
                  value={item.hours ? (item.hours / 7) * 100 : item.level || item.progress} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const DesktopChart = ({ data, title, type = "bar" }: { data: any[], title: string, type?: string }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title}</span>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-between space-x-2">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full rounded-t"
                style={{ 
                  height: `${((item.hours || item.level || item.progress) / Math.max(...data.map(d => d.hours || d.level || d.progress))) * 200}px`,
                  backgroundColor: orgData.primaryColor,
                  opacity: 0.8
                }}
              />
              <div className="text-xs mt-2 text-center">
                <div className="font-medium">{item.day || item.skill || item.course}</div>
                <div className="text-muted-foreground">
                  {item.hours ? `${item.hours}h` : item.level ? `${item.level}%` : `${item.progress}%`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 md:p-6">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Learning Analytics</h1>
            <p className="text-muted-foreground">Track your progress and performance insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              {timeframes.map((timeframe) => (
                <option key={timeframe.value} value={timeframe.value}>
                  {timeframe.label}
                </option>
              ))}
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Mobile Timeframe Selector */}
        <div className="md:hidden mb-4">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            {timeframes.map((timeframe) => (
              <option key={timeframe.value} value={timeframe.value}>
                {timeframe.label}
              </option>
            ))}
          </select>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-3 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="h-4 w-4 md:h-5 md:w-5" style={{ color: stat.color }} />
                  <Badge variant="secondary" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-xl md:text-2xl font-bold" style={{ color: stat.color }}>
                    <span className="md:hidden">{stat.mobile}</span>
                    <span className="hidden md:inline">{stat.value}</span>
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    {stat.title}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:grid-cols-4">
            <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
            <TabsTrigger value="courses" className="text-xs md:text-sm">Courses</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs md:text-sm">Skills</TabsTrigger>
            <TabsTrigger value="achievements" className="text-xs md:text-sm">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Weekly Activity - Mobile vs Desktop */}
            <div className="md:hidden">
              <MobileChart data={weeklyData} title="Weekly Study Hours" />
            </div>
            <div className="hidden md:block">
              <DesktopChart data={weeklyData} title="Weekly Study Hours & Performance" />
            </div>

            {/* Study Streak */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                  <span>Study Streak</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold" style={{ color: orgData.primaryColor }}>
                      23 Days
                    </div>
                    <div className="text-sm text-muted-foreground">Current streak</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">45 Days</div>
                    <div className="text-sm text-muted-foreground">Best streak</div>
                  </div>
                </div>
                <Progress value={76.7} className="h-3" />
                <div className="text-xs text-muted-foreground mt-2">
                  7 more days to beat your record!
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-4">
              {courseProgress.map((course, index) => (
                <Card key={index}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-sm md:text-base">{course.course}</h3>
                          <Badge 
                            variant={course.status === "completed" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {course.status}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <Progress value={course.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{course.progress}% Complete</span>
                            <span>{course.timeSpent} studied</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 md:ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="md:hidden">
              <MobileChart data={skillsData} title="Skill Progress" />
            </div>
            <div className="hidden md:block">
              <DesktopChart data={skillsData} title="Skill Development Progress" />
            </div>
            
            <div className="grid gap-4">
              {skillsData.map((skill, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{skill.skill}</h3>
                        <p className="text-sm text-muted-foreground">{skill.courses} courses completed</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: orgData.primaryColor }}>
                          {skill.level}%
                        </div>
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className={achievement.earned ? "border-green-200 bg-green-50" : ""}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${achievement.earned ? "bg-green-100" : "bg-gray-100"}`}>
                        <achievement.icon 
                          className={`h-5 w-5 ${achievement.earned ? "text-green-600" : "text-gray-400"}`} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          {achievement.earned && (
                            <Badge className="bg-green-100 text-green-800">Earned</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                        
                        {achievement.earned ? (
                          <p className="text-xs text-green-600 font-medium">
                            Earned in {achievement.date}
                          </p>
                        ) : (
                          <div className="space-y-2">
                            <Progress value={(achievement.progress! / achievement.target!) * 100} className="h-2" />
                            <p className="text-xs text-muted-foreground">
                              {achievement.progress} / {achievement.target}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage="analytics" />
    </div>
  );
};

export default LearnerAnalyticsPage;