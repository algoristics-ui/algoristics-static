import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { OrganizationHeader } from "@/components/OrganizationHeader";
import InstructorMobileBottomNav from "@/components/responsive/InstructorMobileBottomNav";
import { 
  User, 
  Save,
  Upload,
  Bell,
  Lock,
  Globe,
  Calendar,
  Award,
  BookOpen,
  Users,
  Star,
  Settings
} from "lucide-react";

const InstructorProfilePage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const orgData = getOrganizationDataFromPath(location.pathname);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "Prof. Johnson",
    email: user?.email || "prof.johnson@stanford.edu",
    title: "Senior Instructor",
    department: "Computer Science",
    bio: "Experienced instructor with over 10 years in software development and education. Specialized in JavaScript, algorithms, and web development.",
    phone: "+1 (555) 123-4567",
    officeHours: "Monday-Friday, 2:00 PM - 4:00 PM",
    website: "https://personal-website.com",
    linkedin: "https://linkedin.com/in/prof-johnson",
    expertise: ["JavaScript", "Data Structures", "Web Development", "Algorithms", "React"],
    
    // Notification preferences
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    studentMessages: true,
    weeklyReports: false,
    
    // Privacy settings
    publicProfile: true,
    showEmail: false,
    showPhone: false,
    allowStudentContact: true
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", profileData);
    // In real app, this would save to API
  };

  // Mock instructor stats
  const instructorStats = [
    { label: "Total Students", value: "248", icon: Users, color: orgData.primaryColor },
    { label: "Courses Taught", value: "6", icon: BookOpen, color: "#10b981" },
    { label: "Average Rating", value: "4.8", icon: Star, color: "#f59e0b" },
    { label: "Certifications Issued", value: "189", icon: Award, color: "#8b5cf6" }
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <OrganizationHeader orgData={orgData} />
      <div className="container mx-auto px-4 sm:px-6 pb-20 md:pb-6 max-w-6xl" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
          Manage your instructor profile and preferences
        </p>
      </div>

      {/* Profile Overview */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback 
                  className="text-2xl font-bold text-white"
                  style={{ backgroundColor: orgData.primaryColor }}
                >
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2"
                style={{ backgroundColor: orgData.primaryColor }}
              >
                <Upload className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">{profileData.name}</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-2">{profileData.title}</p>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4">{profileData.department} • {user?.organization}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {instructorStats.map((stat, index) => (
                  <div key={index} className="text-center px-2 py-3 sm:px-3 sm:py-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: stat.color }} />
                    </div>
                    <div className="text-lg sm:text-xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        {/* Profile Information */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Basic Information</span>
              </CardTitle>
              <CardDescription>Update your basic profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={profileData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="officeHours">Office Hours</Label>
                  <Input
                    id="officeHours"
                    value={profileData.officeHours}
                    onChange={(e) => handleInputChange('officeHours', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  placeholder="Tell students about your background and expertise..."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Areas of Expertise</Label>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {profileData.expertise.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    + Add Skill
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Information */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Contact Information</span>
              </CardTitle>
              <CardDescription>Manage how students and colleagues can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://your-website.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Preferences */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Choose how you want to be notified about course activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={profileData.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                  </div>
                  <Switch
                    checked={profileData.pushNotifications}
                    onCheckedChange={(checked) => handleInputChange('pushNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Course Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about course-related updates</p>
                  </div>
                  <Switch
                    checked={profileData.courseUpdates}
                    onCheckedChange={(checked) => handleInputChange('courseUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Student Messages</Label>
                    <p className="text-sm text-muted-foreground">Notifications for student messages and questions</p>
                  </div>
                  <Switch
                    checked={profileData.studentMessages}
                    onCheckedChange={(checked) => handleInputChange('studentMessages', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                  </div>
                  <Switch
                    checked={profileData.weeklyReports}
                    onCheckedChange={(checked) => handleInputChange('weeklyReports', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Privacy Settings</span>
              </CardTitle>
              <CardDescription>Control what information is visible to students and other instructors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to all students</p>
                  </div>
                  <Switch
                    checked={profileData.publicProfile}
                    onCheckedChange={(checked) => handleInputChange('publicProfile', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Email Address</Label>
                    <p className="text-sm text-muted-foreground">Display email in public profile</p>
                  </div>
                  <Switch
                    checked={profileData.showEmail}
                    onCheckedChange={(checked) => handleInputChange('showEmail', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Phone Number</Label>
                    <p className="text-sm text-muted-foreground">Display phone number in public profile</p>
                  </div>
                  <Switch
                    checked={profileData.showPhone}
                    onCheckedChange={(checked) => handleInputChange('showPhone', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Student Contact</Label>
                    <p className="text-sm text-muted-foreground">Allow students to send you direct messages</p>
                  </div>
                  <Switch
                    checked={profileData.allowStudentContact}
                    onCheckedChange={(checked) => handleInputChange('allowStudentContact', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t">
        <Button 
          onClick={handleSave}
          style={{ backgroundColor: orgData.primaryColor }}
          className="text-white"
        >
          <Save className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          Save Changes
        </Button>
      </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <InstructorMobileBottomNav currentPage="profile" />
    </div>
  );
};

export default InstructorProfilePage;