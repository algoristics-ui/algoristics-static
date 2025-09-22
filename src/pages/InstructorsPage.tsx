import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  UserPlus, 
  Mail, 
  Phone,
  BookOpen,
  Users,
  Star,
  Calendar,
  Award,
  MessageSquare,
  Filter
} from "lucide-react";
import Navigation from "@/components/Navigation";

const InstructorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const instructors = [
    {
      id: 1,
      name: "Dr. Amanda Thompson",
      email: "amanda.thompson@university.edu",
      phone: "+1 (555) 123-4567",
      avatar: "",
      status: "Active",
      department: "Computer Science",
      specialization: "Machine Learning",
      activeCourses: 3,
      totalStudents: 156,
      rating: 4.8,
      experience: "8 years",
      joinDate: "2019-03-15",
      completedCourses: 12
    },
    {
      id: 2,
      name: "Prof. Michael Rodriguez",
      email: "michael.rodriguez@university.edu",
      phone: "+1 (555) 234-5678",
      avatar: "",
      status: "Active",
      department: "Data Science",
      specialization: "Statistical Analysis",
      activeCourses: 2,
      totalStudents: 89,
      rating: 4.6,
      experience: "12 years",
      joinDate: "2017-08-22",
      completedCourses: 18
    },
    {
      id: 3,
      name: "Dr. Sarah Kim",
      email: "sarah.kim@university.edu",
      phone: "+1 (555) 345-6789",
      avatar: "",
      status: "On Leave",
      department: "Business Analytics",
      specialization: "Financial Modeling",
      activeCourses: 0,
      totalStudents: 203,
      rating: 4.9,
      experience: "15 years",
      joinDate: "2015-01-10",
      completedCourses: 25
    },
    {
      id: 4,
      name: "Prof. James Wilson",
      email: "james.wilson@university.edu",
      phone: "+1 (555) 456-7890",
      avatar: "",
      status: "Active",
      department: "Web Development",
      specialization: "Full Stack Development",
      activeCourses: 4,
      totalStudents: 278,
      rating: 4.7,
      experience: "10 years",
      joinDate: "2018-06-05",
      completedCourses: 15
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500/10 text-green-700 dark:text-green-300";
      case "On Leave": return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300";
      case "Inactive": return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
      default: return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instructor.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || instructor.status.toLowerCase().replace(' ', '-') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full overflow-x-hidden">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 pb-6 pt-20 max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Instructors</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Manage teaching staff and course assignments</p>
        </div>
        <Button className="gradient-hero text-white w-full sm:w-auto">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Instructor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Instructors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">84</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Instructors</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-green-600">78</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">4.7</div>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">156</div>
          </CardHeader>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 max-w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="on-leave">On Leave</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Instructor Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Instructors</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
          <TabsTrigger value="new">New Hires</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredInstructors.map((instructor) => (
              <Card key={instructor.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src={instructor.avatar} />
                        <AvatarFallback>{getInitials(instructor.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-2 sm:space-y-0">
                          <div className="min-w-0">
                            <CardTitle className="text-lg truncate">{instructor.name}</CardTitle>
                            <CardDescription className="truncate">{instructor.department} • {instructor.specialization}</CardDescription>
                          </div>
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{instructor.rating}</span>
                            </div>
                            <Badge className={getStatusColor(instructor.status)}>
                              {instructor.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center min-w-0">
                            <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{instructor.email}</span>
                          </span>
                          <span className="flex items-center min-w-0">
                            <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{instructor.phone}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 text-sm">
                    <div className="min-w-0">
                      <span className="text-muted-foreground">Active Courses: </span>
                      <span className="font-medium">{instructor.activeCourses}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-muted-foreground">Students: </span>
                      <span className="font-medium">{instructor.totalStudents}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-muted-foreground">Experience: </span>
                      <span className="font-medium">{instructor.experience}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-muted-foreground">Completed Courses: </span>
                      <span className="font-medium">{instructor.completedCourses}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-muted-foreground">Joined: </span>
                      <span className="font-medium">{instructor.joinDate}</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Courses
                    </Button>
                    <Button size="sm" className="w-full sm:w-auto">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Active instructors will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="top-rated">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Top rated instructors will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="new">
          <div className="text-center py-8">
            <p className="text-muted-foreground">New hire instructors will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default InstructorsPage;