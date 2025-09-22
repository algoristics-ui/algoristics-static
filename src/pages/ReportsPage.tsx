import { useState } from "react";
console.log("ReportsPage component loaded successfully");
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  BookOpen,
  BarChart3,
  FileText,
  Filter
} from "lucide-react";

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState("last-30-days");
  const [reportType, setReportType] = useState("all");

  const reports = [
    {
      id: 1,
      title: "Student Progress Report",
      description: "Comprehensive overview of student learning progress",
      type: "Academic",
      lastGenerated: "2024-01-12",
      format: "PDF",
      size: "2.4 MB",
      downloads: 156
    },
    {
      id: 2,
      title: "Course Completion Analytics",
      description: "Analysis of course completion rates and trends",
      type: "Analytics",
      lastGenerated: "2024-01-11",
      format: "Excel",
      size: "1.8 MB",
      downloads: 89
    },
    {
      id: 3,
      title: "Assessment Performance",
      description: "Detailed breakdown of assessment scores and participation",
      type: "Assessment",
      lastGenerated: "2024-01-10",
      format: "PDF",
      size: "3.1 MB",
      downloads: 203
    },
    {
      id: 4,
      title: "Instructor Activity Report",
      description: "Summary of instructor engagement and course management",
      type: "Administrative",
      lastGenerated: "2024-01-09",
      format: "PDF",
      size: "1.2 MB",
      downloads: 45
    }
  ];

  const quickStats = [
    { label: "Total Students", value: "2,847", change: "+12%", icon: Users },
    { label: "Active Courses", value: "156", change: "+5%", icon: BookOpen },
    { label: "Completion Rate", value: "87%", change: "+3%", icon: TrendingUp },
    { label: "Average Score", value: "78%", change: "+2%", icon: BarChart3 }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Academic": return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
      case "Analytics": return "bg-green-500/10 text-green-700 dark:text-green-300";
      case "Assessment": return "bg-purple-500/10 text-purple-700 dark:text-purple-300";
      case "Administrative": return "bg-orange-500/10 text-orange-700 dark:text-orange-300";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
    }
  };

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
                System Reports
              </h1>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-sm">
                Generate and download comprehensive system reports
              </p>
            </div>
            
            <div className="flex justify-center px-4">
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-6 md:px-8 py-3 w-full sm:w-auto">
                <FileText className="w-4 h-4 mr-2" />
                Create Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <Badge variant="secondary" className="text-green-600">
                          {stat.change}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 days</SelectItem>
                    <SelectItem value="last-quarter">Last quarter</SelectItem>
                    <SelectItem value="last-year">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Report Tabs */}
              <Tabs defaultValue="available" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="available">Available Reports</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  <TabsTrigger value="custom">Custom Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="space-y-4">
                  <div className="grid gap-4">
                    {reports.map((report) => (
                      <Card key={report.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{report.title}</CardTitle>
                              <CardDescription>{report.description}</CardDescription>
                            </div>
                            <Badge className={getTypeColor(report.type)}>
                              {report.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-muted-foreground">Last Generated: </span>
                              <span className="font-medium">{report.lastGenerated}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Format: </span>
                              <span className="font-medium">{report.format}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Size: </span>
                              <span className="font-medium">{report.size}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Downloads: </span>
                              <span className="font-medium">{report.downloads}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            <Button size="sm">Generate New</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="scheduled">
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Scheduled Reports</h3>
                    <p className="text-muted-foreground">You can schedule reports to be generated automatically</p>
                    <Button variant="outline" className="mt-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule a Report
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="custom">
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Custom Report Builder</h3>
                    <p className="text-muted-foreground">Create custom reports with specific metrics and filters</p>
                    <Button variant="outline" className="mt-4">
                      <FileText className="h-4 w-4 mr-2" />
                      Build Custom Report
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

          </div> {/* Close max-w-6xl */}
        </div> {/* Close container */}
      </div> {/* Close py-16 section */}
    </div> 
  );
};

export default ReportsPage;