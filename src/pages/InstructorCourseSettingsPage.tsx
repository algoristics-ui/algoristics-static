import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { OrganizationHeader } from "@/components/OrganizationHeader";
import InstructorMobileBottomNav from "@/components/responsive/InstructorMobileBottomNav";
import { 
  ArrowLeft,
  Save,
  Shield,
  Bell,
  Users,
  MessageSquare,
  FileText,
  Clock,
  Award,
  Settings,
  Trash2,
  AlertTriangle
} from "lucide-react";

const InstructorCourseSettingsPage = () => {
  const { user } = useAuth();
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  // Mock settings data
  const [settings, setSettings] = useState({
    // Access Control
    allowLateEnrollment: true,
    requireInstructorApproval: false,
    allowGuestAccess: false,
    maxEnrollments: 50,
    waitlistEnabled: true,
    
    // Communication
    enableDiscussions: true,
    allowStudentMessages: true,
    enableAnnouncements: true,
    emailNotifications: true,
    autoEmailReminders: true,
    
    // Grading & Assessment
    gradingScale: "percentage",
    passingGrade: 70,
    allowLateSubmissions: true,
    latePenalty: 10,
    showGradesToStudents: true,
    enablePeerReview: false,
    
    // Content & Progress
    allowDownloads: true,
    trackProgress: true,
    requireSequentialAccess: false,
    enableCertificates: true,
    certificateTemplate: "standard",
    
    // Advanced Settings
    timezone: "America/New_York",
    courseLanguage: "English",
    accessibilityMode: false,
    enableAnalytics: true,
    dataRetention: "2_years"
  });

  const handleSettingChange = (key: string, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Saving course settings:", settings);
    // In real app, this would save to API
  };

  const handleDeleteCourse = () => {
    if (confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      // In real app, this would delete the course
      navigate(location.pathname.replace(`/${courseId}/settings`, ''));
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <OrganizationHeader orgData={orgData} />
      <div className="container mx-auto px-4 sm:px-6 pb-20 md:pb-6 max-w-6xl" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`${location.pathname.replace('/settings', '')}`)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">Course Settings</h1>
            <p className="text-muted-foreground">Configure your course preferences and policies</p>
          </div>
          <Button 
            onClick={handleSave}
            style={{ backgroundColor: orgData.primaryColor }} 
            className="text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      <Tabs defaultValue="access" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="access">Access</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="grading">Grading</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Access Control */}
        <TabsContent value="access" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Enrollment & Access Control</span>
              </CardTitle>
              <CardDescription>Manage who can access your course and how</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="maxEnrollments">Maximum Enrollments</Label>
                  <Input
                    id="maxEnrollments"
                    type="number"
                    value={settings.maxEnrollments}
                    onChange={(e) => handleSettingChange('maxEnrollments', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Late Enrollment</Label>
                    <p className="text-sm text-muted-foreground">Students can enroll after course start date</p>
                  </div>
                  <Switch
                    checked={settings.allowLateEnrollment}
                    onCheckedChange={(checked) => handleSettingChange('allowLateEnrollment', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Instructor Approval</Label>
                    <p className="text-sm text-muted-foreground">Manually approve all enrollment requests</p>
                  </div>
                  <Switch
                    checked={settings.requireInstructorApproval}
                    onCheckedChange={(checked) => handleSettingChange('requireInstructorApproval', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Guest Access</Label>
                    <p className="text-sm text-muted-foreground">Non-enrolled users can view course content</p>
                  </div>
                  <Switch
                    checked={settings.allowGuestAccess}
                    onCheckedChange={(checked) => handleSettingChange('allowGuestAccess', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Waitlist</Label>
                    <p className="text-sm text-muted-foreground">Students can join waitlist when course is full</p>
                  </div>
                  <Switch
                    checked={settings.waitlistEnabled}
                    onCheckedChange={(checked) => handleSettingChange('waitlistEnabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Communication */}
        <TabsContent value="communication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Communication Settings</span>
              </CardTitle>
              <CardDescription>Configure how students can interact and receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Course Discussions</Label>
                    <p className="text-sm text-muted-foreground">Allow students to post in course forums</p>
                  </div>
                  <Switch
                    checked={settings.enableDiscussions}
                    onCheckedChange={(checked) => handleSettingChange('enableDiscussions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Student Messages</Label>
                    <p className="text-sm text-muted-foreground">Students can send direct messages to instructor</p>
                  </div>
                  <Switch
                    checked={settings.allowStudentMessages}
                    onCheckedChange={(checked) => handleSettingChange('allowStudentMessages', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Announcements</Label>
                    <p className="text-sm text-muted-foreground">Send course-wide announcements to students</p>
                  </div>
                  <Switch
                    checked={settings.enableAnnouncements}
                    onCheckedChange={(checked) => handleSettingChange('enableAnnouncements', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send important updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Email Reminders</Label>
                    <p className="text-sm text-muted-foreground">Send reminders for deadlines and sessions</p>
                  </div>
                  <Switch
                    checked={settings.autoEmailReminders}
                    onCheckedChange={(checked) => handleSettingChange('autoEmailReminders', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grading & Assessment */}
        <TabsContent value="grading" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Grading & Assessment</span>
              </CardTitle>
              <CardDescription>Configure grading policies and assessment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gradingScale">Grading Scale</Label>
                  <Select value={settings.gradingScale} onValueChange={(value) => handleSettingChange('gradingScale', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                      <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
                      <SelectItem value="points">Points Based</SelectItem>
                      <SelectItem value="pass_fail">Pass/Fail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passingGrade">Passing Grade (%)</Label>
                  <Input
                    id="passingGrade"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.passingGrade}
                    onChange={(e) => handleSettingChange('passingGrade', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="latePenalty">Late Penalty (%)</Label>
                  <Input
                    id="latePenalty"
                    type="number"
                    min="0"
                    max="100"
                    value={settings.latePenalty}
                    onChange={(e) => handleSettingChange('latePenalty', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Late Submissions</Label>
                    <p className="text-sm text-muted-foreground">Students can submit assignments after deadline</p>
                  </div>
                  <Switch
                    checked={settings.allowLateSubmissions}
                    onCheckedChange={(checked) => handleSettingChange('allowLateSubmissions', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Grades to Students</Label>
                    <p className="text-sm text-muted-foreground">Students can view their grades immediately</p>
                  </div>
                  <Switch
                    checked={settings.showGradesToStudents}
                    onCheckedChange={(checked) => handleSettingChange('showGradesToStudents', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Peer Review</Label>
                    <p className="text-sm text-muted-foreground">Students can review each other's work</p>
                  </div>
                  <Switch
                    checked={settings.enablePeerReview}
                    onCheckedChange={(checked) => handleSettingChange('enablePeerReview', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content & Progress */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Content & Progress</span>
              </CardTitle>
              <CardDescription>Manage how students access and progress through content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="certificateTemplate">Certificate Template</Label>
                <Select value={settings.certificateTemplate} onValueChange={(value) => handleSettingChange('certificateTemplate', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Template</SelectItem>
                    <SelectItem value="advanced">Advanced Template</SelectItem>
                    <SelectItem value="custom">Custom Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Content Downloads</Label>
                    <p className="text-sm text-muted-foreground">Students can download course materials</p>
                  </div>
                  <Switch
                    checked={settings.allowDownloads}
                    onCheckedChange={(checked) => handleSettingChange('allowDownloads', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Track Student Progress</Label>
                    <p className="text-sm text-muted-foreground">Monitor completion of modules and activities</p>
                  </div>
                  <Switch
                    checked={settings.trackProgress}
                    onCheckedChange={(checked) => handleSettingChange('trackProgress', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Sequential Access</Label>
                    <p className="text-sm text-muted-foreground">Students must complete modules in order</p>
                  </div>
                  <Switch
                    checked={settings.requireSequentialAccess}
                    onCheckedChange={(checked) => handleSettingChange('requireSequentialAccess', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Certificates</Label>
                    <p className="text-sm text-muted-foreground">Award certificates upon course completion</p>
                  </div>
                  <Switch
                    checked={settings.enableCertificates}
                    onCheckedChange={(checked) => handleSettingChange('enableCertificates', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Advanced Settings</span>
              </CardTitle>
              <CardDescription>Configure advanced course options and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Course Timezone</Label>
                  <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseLanguage">Course Language</Label>
                  <Select value={settings.courseLanguage} onValueChange={(value) => handleSettingChange('courseLanguage', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention</Label>
                  <Select value={settings.dataRetention} onValueChange={(value) => handleSettingChange('dataRetention', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6_months">6 Months</SelectItem>
                      <SelectItem value="1_year">1 Year</SelectItem>
                      <SelectItem value="2_years">2 Years</SelectItem>
                      <SelectItem value="5_years">5 Years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Accessibility Mode</Label>
                    <p className="text-sm text-muted-foreground">Enhanced accessibility features for students with disabilities</p>
                  </div>
                  <Switch
                    checked={settings.accessibilityMode}
                    onCheckedChange={(checked) => handleSettingChange('accessibilityMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Analytics</Label>
                    <p className="text-sm text-muted-foreground">Collect detailed analytics on student engagement</p>
                  </div>
                  <Switch
                    checked={settings.enableAnalytics}
                    onCheckedChange={(checked) => handleSettingChange('enableAnalytics', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                <span>Danger Zone</span>
              </CardTitle>
              <CardDescription>Irreversible actions that will permanently affect your course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <h4 className="font-semibold text-red-900">Delete Course</h4>
                  <p className="text-sm text-red-700">
                    Permanently delete this course and all associated data. This action cannot be undone.
                  </p>
                </div>
                <Button variant="destructive" onClick={handleDeleteCourse}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Course
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

export default InstructorCourseSettingsPage;