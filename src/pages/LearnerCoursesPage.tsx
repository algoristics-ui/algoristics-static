import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { MobileBottomNav } from "@/components/responsive";
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Clock, 
  Users, 
  Play,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  SlidersHorizontal,
  Calendar,
  TrendingUp,
  Award,
  CheckCircle,
  ArrowUpDown,
  MoreVertical,
  Download,
  Share2,
  Eye,
  Heart
} from "lucide-react";

const LearnerCoursesPage = () => {
  const { user } = useAuth();
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    levels: [] as string[],
    duration: [0, 20] as number[],
    rating: [0, 5] as number[],
    status: [] as string[]
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarkedCourses, setBookmarkedCourses] = useState<number[]>([1, 3, 5]);

  // Sample courses data
  const allCourses = [
    {
      id: 1,
      title: "Advanced JavaScript Fundamentals",
      instructor: "Dr. Sarah Johnson",
      description: "Master advanced JavaScript concepts including closures, promises, async/await, and modern ES6+ features.",
      thumbnail: "/placeholder-course.jpg",
      duration: "12 weeks",
      level: "Intermediate",
      rating: 4.8,
      ratingCount: 1240,
      studentsEnrolled: 3200,
      price: "Free",
      category: "Programming",
      tags: ["JavaScript", "Web Development", "ES6"],
      progress: 75,
      status: "in_progress",
      lastAccessed: "2 hours ago",
      nextLesson: "Async/Await Patterns",
      estimatedTime: "3h 20m remaining",
      isBookmarked: true,
      completionRate: 89,
      difficulty: 7,
      prerequisites: ["Basic JavaScript", "HTML/CSS"],
      skillsGained: ["Advanced JS", "Async Programming", "Modern Syntax"],
      certificate: true
    },
    {
      id: 2,
      title: "Data Science with Python",
      instructor: "Prof. Michael Chen",
      description: "Learn data analysis, visualization, and machine learning using Python, pandas, and scikit-learn.",
      thumbnail: "/placeholder-course.jpg",
      duration: "16 weeks",
      level: "Advanced",
      rating: 4.9,
      ratingCount: 890,
      studentsEnrolled: 2100,
      price: "Free",
      category: "Data Science",
      tags: ["Python", "Machine Learning", "Data Analysis"],
      progress: 45,
      status: "in_progress",
      lastAccessed: "1 day ago",
      nextLesson: "Linear Regression",
      estimatedTime: "8h 45m remaining",
      isBookmarked: false,
      completionRate: 92,
      difficulty: 9,
      prerequisites: ["Basic Python", "Statistics"],
      skillsGained: ["Data Analysis", "ML Algorithms", "Python Libraries"],
      certificate: true
    },
    {
      id: 3,
      title: "UX Design Principles",
      instructor: "Emma Rodriguez",
      description: "Fundamental principles of user experience design, prototyping, and user research methodologies.",
      thumbnail: "/placeholder-course.jpg",
      duration: "8 weeks",
      level: "Beginner",
      rating: 4.7,
      ratingCount: 2100,
      studentsEnrolled: 5600,
      price: "Free",
      category: "Design",
      tags: ["UX Design", "Prototyping", "User Research"],
      progress: 20,
      status: "in_progress",
      lastAccessed: "3 days ago",
      nextLesson: "User Personas",
      estimatedTime: "12h 30m remaining",
      isBookmarked: true,
      completionRate: 85,
      difficulty: 4,
      prerequisites: [],
      skillsGained: ["UX Research", "Prototyping", "Design Thinking"],
      certificate: true
    },
    {
      id: 4,
      title: "React Advanced Patterns",
      instructor: "Alex Thompson",
      description: "Advanced React patterns, state management, performance optimization, and testing strategies.",
      thumbnail: "/placeholder-course.jpg",
      duration: "10 weeks",
      level: "Advanced",
      rating: 4.9,
      ratingCount: 560,
      studentsEnrolled: 1800,
      price: "Free",
      category: "Programming",
      tags: ["React", "State Management", "Performance"],
      progress: 0,
      status: "not_started",
      lastAccessed: null,
      nextLesson: "Component Composition",
      estimatedTime: "15h total",
      isBookmarked: false,
      completionRate: 91,
      difficulty: 8,
      prerequisites: ["React Basics", "JavaScript ES6"],
      skillsGained: ["Advanced React", "State Management", "Testing"],
      certificate: true
    },
    {
      id: 5,
      title: "Machine Learning Basics",
      instructor: "Dr. Lisa Wang",
      description: "Introduction to machine learning algorithms, supervised and unsupervised learning, model evaluation.",
      thumbnail: "/placeholder-course.jpg",
      duration: "14 weeks",
      level: "Intermediate",
      rating: 4.8,
      ratingCount: 1200,
      studentsEnrolled: 2800,
      price: "Free",
      category: "Data Science",
      tags: ["Machine Learning", "Algorithms", "Model Training"],
      progress: 100,
      status: "completed",
      lastAccessed: "1 week ago",
      nextLesson: null,
      estimatedTime: "Completed",
      isBookmarked: true,
      completionRate: 88,
      difficulty: 6,
      prerequisites: ["Basic Statistics", "Python Basics"],
      skillsGained: ["ML Fundamentals", "Algorithm Selection", "Model Evaluation"],
      certificate: true
    },
    {
      id: 6,
      title: "Digital Marketing Strategy",
      instructor: "Sarah Martinez",
      description: "Comprehensive digital marketing strategies, SEO, social media marketing, and analytics.",
      thumbnail: "/placeholder-course.jpg",
      duration: "6 weeks",
      level: "Beginner",
      rating: 4.6,
      ratingCount: 800,
      studentsEnrolled: 3400,
      price: "Free",
      category: "Marketing",
      tags: ["Digital Marketing", "SEO", "Social Media"],
      progress: 0,
      status: "not_started",
      lastAccessed: null,
      nextLesson: "Marketing Fundamentals",
      estimatedTime: "9h total",
      isBookmarked: false,
      completionRate: 82,
      difficulty: 3,
      prerequisites: [],
      skillsGained: ["SEO", "Social Media Strategy", "Analytics"],
      certificate: true
    }
  ];

  const categories = ["Programming", "Data Science", "Design", "Marketing", "Business"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const statuses = ["not_started", "in_progress", "completed"];

  // Filter and search logic
  const filteredCourses = useMemo(() => {
    let filtered = allCourses;

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedFilters.categories.length > 0) {
      filtered = filtered.filter(course =>
        selectedFilters.categories.includes(course.category)
      );
    }

    // Level filter
    if (selectedFilters.levels.length > 0) {
      filtered = filtered.filter(course =>
        selectedFilters.levels.includes(course.level)
      );
    }

    // Status filter
    if (selectedFilters.status.length > 0) {
      filtered = filtered.filter(course =>
        selectedFilters.status.includes(course.status)
      );
    }

    // Duration filter
    const durationInWeeks = (duration: string) => parseInt(duration.split(' ')[0]);
    filtered = filtered.filter(course => {
      const weeks = durationInWeeks(course.duration);
      return weeks >= selectedFilters.duration[0] && weeks <= selectedFilters.duration[1];
    });

    // Rating filter
    filtered = filtered.filter(course =>
      course.rating >= selectedFilters.rating[0] && course.rating <= selectedFilters.rating[1]
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "students":
          return b.studentsEnrolled - a.studentsEnrolled;
        case "duration":
          return parseInt(a.duration) - parseInt(b.duration);
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedFilters, sortBy]);

  const toggleBookmark = (courseId: number) => {
    setBookmarkedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const getStatusBadge = (status: string, progress?: number) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Categories</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedFilters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFilters(prev => ({
                      ...prev,
                      categories: [...prev.categories, category]
                    }));
                  } else {
                    setSelectedFilters(prev => ({
                      ...prev,
                      categories: prev.categories.filter(c => c !== category)
                    }));
                  }
                }}
              />
              <label htmlFor={category} className="text-sm cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Levels */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Difficulty Level</Label>
        <div className="space-y-2">
          {levels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={level}
                checked={selectedFilters.levels.includes(level)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFilters(prev => ({
                      ...prev,
                      levels: [...prev.levels, level]
                    }));
                  } else {
                    setSelectedFilters(prev => ({
                      ...prev,
                      levels: prev.levels.filter(l => l !== level)
                    }));
                  }
                }}
              />
              <label htmlFor={level} className="text-sm cursor-pointer">
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Progress Status</Label>
        <div className="space-y-2">
          {[
            { value: "not_started", label: "Not Started" },
            { value: "in_progress", label: "In Progress" },
            { value: "completed", label: "Completed" }
          ].map((status) => (
            <div key={status.value} className="flex items-center space-x-2">
              <Checkbox
                id={status.value}
                checked={selectedFilters.status.includes(status.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedFilters(prev => ({
                      ...prev,
                      status: [...prev.status, status.value]
                    }));
                  } else {
                    setSelectedFilters(prev => ({
                      ...prev,
                      status: prev.status.filter(s => s !== status.value)
                    }));
                  }
                }}
              />
              <label htmlFor={status.value} className="text-sm cursor-pointer">
                {status.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Duration: {selectedFilters.duration[0]} - {selectedFilters.duration[1]} weeks
        </Label>
        <Slider
          value={selectedFilters.duration}
          onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, duration: value }))}
          max={20}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      {/* Rating */}
      <div>
        <Label className="text-sm font-medium mb-3 block">
          Minimum Rating: {selectedFilters.rating[0]} stars
        </Label>
        <Slider
          value={selectedFilters.rating}
          onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, rating: value }))}
          max={5}
          min={0}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        onClick={() => setSelectedFilters({
          categories: [],
          levels: [],
          duration: [0, 20],
          rating: [0, 5],
          status: []
        })}
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  );

  const CourseCard = ({ course, isListView = false }: { course: any; isListView?: boolean }) => (
    <Card className={`group hover:shadow-lg transition-all duration-200 cursor-pointer ${
      isListView ? 'flex-row' : ''
    }`}>
      <CardContent className="p-0">
        <div className={`flex ${isListView ? 'flex-row' : 'flex-col'}`}>
          {/* Thumbnail */}
          <div className={`relative bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 ${
            isListView ? 'w-48 h-32' : 'h-48'
          }`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: orgData.primaryColor }}
              >
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
            </div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 space-y-1">
              <Badge variant="secondary">{course.level}</Badge>
              {course.status === "in_progress" && (
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 block">
                  {course.progress}% Complete
                </Badge>
              )}
            </div>
            
            <div className="absolute top-3 right-3 space-y-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-white/90 hover:bg-white text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(course.id);
                }}
              >
                {bookmarkedCourses.includes(course.id) ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Progress bar for in-progress courses */}
            {course.status === "in_progress" && (
              <div className="absolute bottom-0 left-0 right-0 h-1">
                <Progress value={course.progress} className="h-1 rounded-none" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className={`font-semibold group-hover:text-primary transition-colors mb-1 ${
                  isListView ? 'text-base' : 'text-lg'
                }`}>
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  by {course.instructor}
                </p>
                {!isListView && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {course.description}
                  </p>
                )}
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress for in-progress courses */}
            {course.status === "in_progress" && !isListView && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            )}

            {/* Course Info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                  <span>({course.ratingCount})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{course.studentsEnrolled.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {course.tags.slice(0, 3).map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {course.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{course.tags.length - 3} more
                </Badge>
              )}
            </div>

            {/* Status and Action */}
            <div className="flex items-center justify-between">
              {getStatusBadge(course.status, course.progress)}
              <div className="flex items-center space-x-2">
                {course.status === "in_progress" ? (
                  <Button size="sm" style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    Continue
                  </Button>
                ) : course.status === "completed" ? (
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                ) : (
                  <Button size="sm" style={{ backgroundColor: orgData.primaryColor }} className="text-white">
                    Start Course
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-0">
      <div className="container mx-auto px-4 sm:px-6 pb-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">My Learning</h1>
          <p className="text-muted-foreground">
            Track your progress and discover new courses
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, instructors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center space-x-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="relevance">Sort by Relevance</option>
                <option value="rating">Highest Rated</option>
                <option value="students">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="duration">Duration</option>
              </select>

              <div className="flex items-center space-x-1 border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden flex items-center justify-between">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Filter Courses</SheetTitle>
                    <SheetDescription>
                      Narrow down your course selection
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 overflow-y-auto">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="students">Popular</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2">
            {selectedFilters.categories.map((category) => (
              <Badge key={category} variant="secondary" className="cursor-pointer" onClick={() => {
                setSelectedFilters(prev => ({
                  ...prev,
                  categories: prev.categories.filter(c => c !== category)
                }));
              }}>
                {category} ×
              </Badge>
            ))}
            {selectedFilters.levels.map((level) => (
              <Badge key={level} variant="secondary" className="cursor-pointer" onClick={() => {
                setSelectedFilters(prev => ({
                  ...prev,
                  levels: prev.levels.filter(l => l !== level)
                }));
              }}>
                {level} ×
              </Badge>
            ))}
            {selectedFilters.status.map((status) => (
              <Badge key={status} variant="secondary" className="cursor-pointer" onClick={() => {
                setSelectedFilters(prev => ({
                  ...prev,
                  status: prev.status.filter(s => s !== status)
                }));
              }}>
                {status.replace('_', ' ')} ×
              </Badge>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={`grid gap-8 ${showFilters ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
          {/* Course Grid */}
          <div className={showFilters ? 'lg:col-span-9' : 'col-span-1'}>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredCourses.length} courses
              </p>
              <div className="lg:hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                >
                  {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Courses Grid/List */}
            <div className={`${
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6" 
                : "space-y-4"
            }`}>
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isListView={viewMode === "list"} 
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find more courses.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setSelectedFilters({
                    categories: [],
                    levels: [],
                    duration: [0, 20],
                    rating: [0, 5],
                    status: []
                  });
                }}>
                  Clear Search & Filters
                </Button>
              </div>
            )}
          </div>

          {/* Right Sidebar Filters (Desktop) */}
          {showFilters && (
            <div className="hidden lg:block lg:col-span-3">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    Filters
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                    >
                      ×
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterPanel />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage="courses" />
    </div>
  );
};

export default LearnerCoursesPage;