import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { OrganizationHeader } from "@/components/OrganizationHeader";
import InstructorMobileBottomNav from "@/components/responsive/InstructorMobileBottomNav";
import { 
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Upload,
  FileText,
  Video,
  Image,
  Link as LinkIcon,
  Settings,
  Users,
  Calendar
} from "lucide-react";

const InstructorCourseEditPage = () => {
  const { user } = useAuth();
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  // Mock course data - in real app this would be fetched by courseId
  const [courseData, setCourseData] = useState({
    title: "Advanced JavaScript Fundamentals",
    description: "Master modern JavaScript concepts and patterns including ES6+, async programming, and advanced object-oriented concepts.",
    category: "Programming",
    level: "Advanced",
    duration: "8 weeks",
    maxStudents: 50,
    price: 299,
    isPublic: true,
    allowSelfEnrollment: true,
    requiresApproval: false,
    startDate: "2024-04-01",
    endDate: "2024-05-26",
    schedule: "Monday, Wednesday, Friday 2:00 PM - 4:00 PM",
    prerequisites: "Basic JavaScript knowledge, HTML/CSS fundamentals",
    learningOutcomes: [
      "Understand ES6+ features and modern JavaScript syntax",
      "Master asynchronous programming with Promises and async/await",
      "Implement advanced object-oriented patterns",
      "Build scalable JavaScript applications"
    ],
    modules: [
      { id: 1, title: "Introduction to ES6+", description: "Learn modern JavaScript syntax", order: 1 },
      { id: 2, title: "Async/Await and Promises", description: "Master asynchronous programming", order: 2 },
      { id: 3, title: "Advanced Object Patterns", description: "Object-oriented JavaScript", order: 3 },
      { id: 4, title: "Module Systems", description: "ES6 modules and bundling", order: 4 },
      { id: 5, title: "Testing Strategies", description: "Unit and integration testing", order: 5 }
    ]
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setCourseData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving course data:", courseData);
    // In real app, this would save to API
    navigate(`${location.pathname.replace('/edit', '')}`);
  };

  const basePath = location.pathname.replace(`/${courseId}/edit`, '');

  return (
    <div className="w-full overflow-x-hidden">
      <OrganizationHeader orgData={orgData} />
      <div className="container mx-auto px-4 sm:px-6 pb-20 md:pb-6 max-w-6xl" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`${location.pathname.replace('/edit', '')}`)}
          className="mb-4 text-sm"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Back to Course
        </Button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Edit Course</h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Update your course content and settings</p>
          </div>
          <Button 
            onClick={handleSave}
            style={{ backgroundColor: orgData.primaryColor }} 
            className="text-white w-full sm:w-auto text-sm"
          >
            <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="basic" className="text-xs sm:text-sm">Basic Info</TabsTrigger>
          <TabsTrigger value="content" className="text-xs sm:text-sm">Content</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm">Settings</TabsTrigger>
          <TabsTrigger value="enrollment" className="text-xs sm:text-sm">Enrollment</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>Update the basic details of your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={courseData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={courseData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Programming">Programming</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={courseData.level} onValueChange={(value) => handleInputChange('level', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={courseData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="e.g., 8 weeks"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Max Students</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={courseData.maxStudents}
                    onChange={(e) => handleInputChange('maxStudents', parseInt(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={courseData.price}
                    onChange={(e) => handleInputChange('price', parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={courseData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  placeholder="Describe what students will learn in this course..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prerequisites">Prerequisites</Label>
                <Textarea
                  id="prerequisites"
                  value={courseData.prerequisites}
                  onChange={(e) => handleInputChange('prerequisites', e.target.value)}
                  rows={2}
                  placeholder="What should students know before taking this course?"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Outcomes</CardTitle>
              <CardDescription>What will students achieve after completing this course?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {courseData.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input value={outcome} className="flex-1" readOnly />
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Learning Outcome
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Management */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
              <CardDescription>Organize your course content into modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData.modules.map((module, index) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                          {module.order}
                        </span>
                        <Badge variant="outline">Module {module.order}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Module Title</Label>
                        <Input value={module.title} />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input value={module.description} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Content</p>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Video className="w-4 h-4 mr-1" />
                          Add Video
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          Add Document
                        </Button>
                        <Button variant="outline" size="sm">
                          <LinkIcon className="w-4 h-4 mr-1" />
                          Add Link
                        </Button>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-1" />
                          Upload File
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Module
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Course Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Schedule</CardTitle>
              <CardDescription>Set up when your course runs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={courseData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={courseData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={courseData.schedule}
                  onChange={(e) => handleInputChange('schedule', e.target.value)}
                  placeholder="e.g., Monday, Wednesday, Friday 2:00 PM - 4:00 PM"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visibility Settings</CardTitle>
              <CardDescription>Control who can see and access your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Course</Label>
                  <p className="text-sm text-muted-foreground">Make this course visible in the course catalog</p>
                </div>
                <Switch
                  checked={courseData.isPublic}
                  onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Self Enrollment</Label>
                  <p className="text-sm text-muted-foreground">Allow students to enroll themselves</p>
                </div>
                <Switch
                  checked={courseData.allowSelfEnrollment}
                  onCheckedChange={(checked) => handleInputChange('allowSelfEnrollment', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Requires Approval</Label>
                  <p className="text-sm text-muted-foreground">Manually approve student enrollments</p>
                </div>
                <Switch
                  checked={courseData.requiresApproval}
                  onCheckedChange={(checked) => handleInputChange('requiresApproval', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enrollment Settings */}
        <TabsContent value="enrollment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Management</CardTitle>
              <CardDescription>Manage student enrollment and capacity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2" style={{ color: orgData.primaryColor }} />
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-muted-foreground">Currently Enrolled</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Available Spots</p>
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Manually Add Students
                </Button>
                <Button className="w-full" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Student List
                </Button>
                <Button className="w-full" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Waitlist
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <InstructorMobileBottomNav currentPage="courses" />
    </div>
  );
};

export default InstructorCourseEditPage;