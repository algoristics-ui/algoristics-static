import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle,
  FileText,
  BarChart3
} from "lucide-react";

const AssessmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const assessments = [
    {
      id: 1,
      title: "JavaScript Fundamentals Quiz",
      course: "Web Development Basics",
      type: "Quiz",
      status: "Active",
      participants: 45,
      duration: "30 min",
      passingScore: 70,
      averageScore: 82,
      dueDate: "2024-01-15"
    },
    {
      id: 2,
      title: "React Components Assignment",
      course: "Advanced React",
      type: "Assignment",
      status: "Draft",
      participants: 28,
      duration: "2 hours",
      passingScore: 75,
      averageScore: 78,
      dueDate: "2024-01-20"
    },
    {
      id: 3,
      title: "Database Design Project",
      course: "Database Systems",
      type: "Project",
      status: "Completed",
      participants: 32,
      duration: "1 week",
      passingScore: 80,
      averageScore: 85,
      dueDate: "2024-01-10"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500/10 text-green-700 dark:text-green-300";
      case "Draft": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300";
      case "Completed": return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Quiz": return <CheckCircle className="h-4 w-4" />;
      case "Assignment": return <FileText className="h-4 w-4" />;
      case "Project": return <BarChart3 className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Assessments</h1>
          <p className="text-muted-foreground">Manage quizzes, assignments, and projects</p>
        </div>
        <Button className="gradient-hero text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Assessments</CardTitle>
            <div className="text-2xl font-bold">24</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            <div className="text-2xl font-bold text-green-600">8</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
            <div className="text-2xl font-bold">78%</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
            <div className="text-2xl font-bold">94%</div>
          </CardHeader>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search assessments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Assessment Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Assessments</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {assessments.map((assessment) => (
              <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(assessment.type)}
                        <CardTitle className="text-lg">{assessment.title}</CardTitle>
                      </div>
                      <CardDescription>{assessment.course}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(assessment.status)}>
                      {assessment.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{assessment.participants} participants</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{assessment.duration}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Passing: </span>
                      <span className="font-medium">{assessment.passingScore}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Average: </span>
                      <span className="font-medium">{assessment.averageScore}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due: </span>
                      <span className="font-medium">{assessment.dueDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2 mt-4">
                    <Button variant="outline" size="sm">View Results</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Active assessments will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Draft assessments will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Completed assessments will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssessmentsPage;