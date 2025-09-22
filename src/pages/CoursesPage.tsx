import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Play,
  Edit,
  Trash2
} from "lucide-react";

const CoursesPage = () => {
  const courses = [
    {
      id: 1,
      title: "Advanced React Development",
      description: "Master modern React patterns, hooks, and state management",
      instructor: "Dr. Sarah Wilson",
      students: 45,
      duration: "8 weeks",
      rating: 4.8,
      status: "active",
      progress: 78,
      category: "Development",
      level: "Advanced"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Introduction to data analysis, visualization, and machine learning",
      instructor: "Prof. Mike Johnson",
      students: 67,
      duration: "12 weeks",
      rating: 4.9,
      status: "completed",
      progress: 100,
      category: "Data Science",
      level: "Beginner"
    },
    {
      id: 3,
      title: "Machine Learning Basics",
      description: "Learn the fundamentals of ML algorithms and applications",
      instructor: "Dr. Lisa Chen",
      students: 34,
      duration: "10 weeks",
      rating: 4.7,
      status: "active",
      progress: 23,
      category: "AI/ML",
      level: "Intermediate"
    },
    {
      id: 4,
      title: "Cloud Computing with AWS",
      description: "Comprehensive guide to Amazon Web Services",
      instructor: "John Smith",
      students: 89,
      duration: "6 weeks",
      rating: 4.6,
      status: "active",
      progress: 45,
      category: "Cloud",
      level: "Intermediate"
    },
    {
      id: 5,
      title: "Digital Marketing Strategy",
      description: "Modern marketing techniques for digital platforms",
      instructor: "Emma Davis",
      students: 123,
      duration: "4 weeks",
      rating: 4.5,
      status: "draft",
      progress: 0,
      category: "Marketing",
      level: "Beginner"
    },
    {
      id: 6,
      title: "Cybersecurity Essentials",
      description: "Protect systems and data from cyber threats",
      instructor: "Robert Brown",
      students: 56,
      duration: "8 weeks",
      rating: 4.8,
      status: "active",
      progress: 67,
      category: "Security",
      level: "Intermediate"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      case 'draft': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-success/10 text-success border-success/20';
      case 'Intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'Advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground">Manage and track all your learning content</p>
        </div>
        <Button variant="gradient" className="px-6">
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="gradient-card border-0 shadow-soft">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search courses..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="px-4">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" className="px-4">
                Category
              </Button>
              <Button variant="outline" className="px-4">
                Status
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="gradient-card border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Enrolled Students</p>
                <p className="text-2xl font-bold">{courses.reduce((acc, course) => acc + course.students, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-bold">{courses.filter(c => c.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">
                  {(courses.reduce((acc, course) => acc + course.rating, 0) / courses.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="gradient-card border-0 shadow-soft hover:shadow-medium transition-smooth group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <Badge className={getLevelColor(course.level)}>
                  {course.level}
                </Badge>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
                <Badge className={getStatusColor(course.status)}>
                  {course.status}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-3">
                  Instructor: <span className="font-medium text-foreground">{course.instructor}</span>
                </p>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Play className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;