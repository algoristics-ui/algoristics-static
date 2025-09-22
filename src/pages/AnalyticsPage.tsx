import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Brain,
  Sparkles,
  CheckCircle,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  X
} from "lucide-react";

const AnalyticsPage = () => {
  const navigate = useNavigate();
  const [isInsightsDialogOpen, setIsInsightsDialogOpen] = useState(false);

  const handleExportReport = () => {
    // Create CSV data
    const csvData = `
Platform Analytics Report
Generated: ${new Date().toLocaleDateString()}

Key Metrics:
Total Learners,2847
Course Completion,87.3%
Engagement Score,94.1
Knowledge Retention,76.4%

Course Performance:
Course Name,Students,Completion Rate,Satisfaction
React Development,145,92%,4.8
Data Science,267,87%,4.9
Machine Learning,89,76%,4.7
Cloud Computing,198,94%,4.6
Cybersecurity,134,89%,4.8

Assessment Performance:
Assessment Type,Count,Average Score
Multiple Choice,1247,82.4%
Coding Challenges,456,78.9%
Essay Questions,234,84.2%
Project Reviews,123,86.7%
    `.trim();

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `platform-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleGenerateInsights = () => {
    setIsInsightsDialogOpen(true);
  };

  const insightsData = {
    performanceHighlights: [
      {
        icon: TrendingUp,
        title: "Course Completion Above Average",
        description: "Course completion rates are 12% above industry average",
        status: "positive"
      },
      {
        icon: Activity,
        title: "Peak Learning Hours",
        description: "Peak learning hours (2-4 PM) show highest engagement",
        status: "positive"
      },
      {
        icon: Users,
        title: "Mobile Learning Adoption",
        description: "Mobile learning adoption at 64% indicates strong accessibility",
        status: "positive"
      }
    ],
    recommendations: [
      {
        icon: Lightbulb,
        title: "Mobile-First Experience",
        description: "Optimize content for mobile-first experience to increase engagement",
        priority: "high"
      },
      {
        icon: PieChart,
        title: "Shorter Video Segments",
        description: "Create shorter video segments (5-7 min optimal) for better retention",
        priority: "medium"
      },
      {
        icon: CheckCircle,
        title: "Interactive Assessments",
        description: "Implement interactive assessments for higher engagement",
        priority: "high"
      }
    ],
    growthOpportunities: [
      {
        icon: AlertTriangle,
        title: "Weekend Study Support",
        description: "Weekend study support could improve completion rates",
        impact: "medium"
      },
      {
        icon: TrendingDown,
        title: "Advanced Coding Challenges",
        description: "Advanced coding challenges show room for improvement",
        impact: "high"
      },
      {
        icon: Brain,
        title: "Knowledge Retention Strategies",
        description: "Knowledge retention strategies needed for long-term success",
        impact: "high"
      }
    ]
  };

  const keyMetrics = [
    {
      title: "Total Learners",
      value: "2,847",
      change: "+18%",
      changeType: "positive" as const,
      icon: Users,
      description: "Active enrolled students",
      link: "/users"
    },
    {
      title: "Course Completion",
      value: "87.3%",
      change: "+5.2%",
      changeType: "positive" as const,
      icon: Award,
      description: "Average completion rate",
      link: "/courses"
    },
    {
      title: "Engagement Score",
      value: "94.1",
      change: "+2.8%",
      changeType: "positive" as const,
      icon: Activity,
      description: "Learning engagement index",
      link: "/reports"
    },
    {
      title: "Knowledge Retention",
      value: "76.4%",
      change: "-1.2%",
      changeType: "negative" as const,
      icon: Target,
      description: "Long-term retention rate",
      link: "/reports"
    }
  ];

  const coursePerformance = [
    { name: "React Development", students: 145, completion: 92, satisfaction: 4.8 },
    { name: "Data Science", students: 267, completion: 87, satisfaction: 4.9 },
    { name: "Machine Learning", students: 89, completion: 76, satisfaction: 4.7 },
    { name: "Cloud Computing", students: 198, completion: 94, satisfaction: 4.6 },
    { name: "Cybersecurity", students: 134, completion: 89, satisfaction: 4.8 }
  ];

  const learningTrends = [
    { period: "Week 1", completed: 120, started: 180 },
    { period: "Week 2", completed: 145, started: 160 },
    { period: "Week 3", completed: 167, started: 195 },
    { period: "Week 4", completed: 189, started: 220 },
    { period: "Week 5", completed: 203, started: 210 },
    { period: "Week 6", completed: 178, started: 190 }
  ];

  const assessmentMetrics = [
    { type: "Multiple Choice", count: 1247, avgScore: 82.4 },
    { type: "Coding Challenges", count: 456, avgScore: 78.9 },
    { type: "Essay Questions", count: 234, avgScore: 84.2 },
    { type: "Project Reviews", count: 123, avgScore: 86.7 }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 pt-8 px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Platform Analytics
              </h1>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-sm">
                Track learning outcomes and platform performance metrics
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
              <Button 
                variant="outline" 
                onClick={handleExportReport}
                className="border-white/50 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/70 font-semibold w-full sm:w-auto backdrop-blur-sm"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button 
                onClick={handleGenerateInsights}
                className="bg-white text-primary hover:bg-white/90 hover:text-primary font-semibold px-6 md:px-8 py-3 w-full sm:w-auto"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Insights
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {keyMetrics.map((metric, index) => (
                  <Card 
                    key={index} 
                    className="gradient-card border-0 shadow-soft hover:shadow-medium transition-smooth cursor-pointer" 
                    onClick={() => navigate(metric.link)}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {metric.title}
                      </CardTitle>
                      <metric.icon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{metric.value}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`text-sm font-medium ${metric.changeType === 'positive' ? 'text-success' : 'text-destructive'}`}>
                          {metric.change}
                        </span>
                        <span className="text-sm text-muted-foreground">vs last month</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Learning Trends Chart */}
                <Card className="lg:col-span-2 gradient-card border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Learning Trends</span>
                    </CardTitle>
                    <CardDescription>
                      Course starts vs completions over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {learningTrends.map((week, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{week.period}</span>
                            <div className="flex items-center space-x-4">
                              <span className="text-primary">Started: {week.started}</span>
                              <span className="text-success">Completed: {week.completed}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${(week.started / 250) * 100}%` }}
                              ></div>
                            </div>
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div 
                                className="bg-success h-2 rounded-full" 
                                style={{ width: `${(week.completed / 250) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Performers */}
                <Card className="gradient-card border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Top Performing Courses</span>
                    </CardTitle>
                    <CardDescription>
                      Ranked by completion rate
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {coursePerformance.slice(0, 5).map((course, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <button 
                            onClick={() => navigate('/courses')}
                            className="font-medium text-sm text-left hover:text-primary transition-colors cursor-pointer"
                          >
                            {course.name}
                          </button>
                          <Badge variant="outline" className="text-xs">
                            {course.completion}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{course.students} students</span>
                          <span>⭐ {course.satisfaction}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div 
                            className="bg-primary h-1.5 rounded-full" 
                            style={{ width: `${course.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Assessment Analytics */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="gradient-card border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <PieChart className="h-5 w-5" />
                      <span>Assessment Performance</span>
                    </CardTitle>
                    <CardDescription>
                      Performance across different assessment types
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assessmentMetrics.map((assessment, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                          <div>
                            <h4 className="font-medium">{assessment.type}</h4>
                            <p className="text-sm text-muted-foreground">{assessment.count} assessments</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{assessment.avgScore}%</div>
                            <div className="text-xs text-muted-foreground">Avg Score</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Engagement Insights */}
                <Card className="gradient-card border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="h-5 w-5" />
                      <span>Engagement Insights</span>
                    </CardTitle>
                    <CardDescription>
                      Key learning behavior patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Peak Learning Hours</span>
                          <span className="text-sm text-muted-foreground">2:00 PM - 4:00 PM</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Mobile vs Desktop</span>
                          <span className="text-sm text-muted-foreground">64% / 36%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 flex">
                          <div className="bg-primary h-2 rounded-l-full w-16"></div>
                          <div className="bg-secondary h-2 rounded-r-full w-9"></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Video Completion Rate</span>
                          <span className="text-sm text-muted-foreground">82.4%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-success h-2 rounded-full" style={{ width: '82.4%' }}></div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border/60">
                        <h4 className="font-medium mb-3">Key Insights</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 rounded-full bg-success mt-1.5"></div>
                            <span className="text-muted-foreground">Students prefer shorter video segments (5-7 minutes)</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 rounded-full bg-warning mt-1.5"></div>
                            <span className="text-muted-foreground">Interactive assessments show 23% higher engagement</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5"></div>
                            <span className="text-muted-foreground">Weekend study sessions have lower completion rates</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
          </div> {/* Close max-w-6xl */}
        </div> {/* Close container */}
      </div> {/* Close py-16 section */}

      {/* AI Insights Dialog */}
      <Dialog open={isInsightsDialogOpen} onOpenChange={setIsInsightsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="border-b pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  AI-Generated Insights
                  <Sparkles className="w-5 h-5 text-primary" />
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Generated on {new Date().toLocaleDateString()} • Analysis based on platform data
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="py-6 space-y-8">
            {/* Performance Highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-600">Performance Highlights</h3>
              </div>
              <div className="grid md:grid-cols-1 gap-4">
                {insightsData.performanceHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-green-50 border border-green-200">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <highlight.icon className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-800">{highlight.title}</h4>
                      <p className="text-sm text-green-700 mt-1">{highlight.description}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-600">Recommendations</h3>
              </div>
              <div className="grid md:grid-cols-1 gap-4">
                {insightsData.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <recommendation.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-blue-800">{recommendation.title}</h4>
                        <Badge 
                          className={`text-xs ${
                            recommendation.priority === 'high' 
                              ? 'bg-red-100 text-red-700 border-red-200' 
                              : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                          }`}
                        >
                          {recommendation.priority} priority
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">{recommendation.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Opportunities */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-600">Growth Opportunities</h3>
              </div>
              <div className="grid md:grid-cols-1 gap-4">
                {insightsData.growthOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <opportunity.icon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-purple-800">{opportunity.title}</h4>
                        <Badge 
                          className={`text-xs ${
                            opportunity.impact === 'high' 
                              ? 'bg-red-100 text-red-700 border-red-200' 
                              : 'bg-orange-100 text-orange-700 border-orange-200'
                          }`}
                        >
                          {opportunity.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-purple-700 mt-1">{opportunity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <div className="flex items-center justify-between w-full">
              <div className="text-xs text-muted-foreground">
                Insights powered by AI analysis of your platform data
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsInsightsDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={handleExportReport}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div> 
  );
};

export default AnalyticsPage;