import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Save,
  Shield,
  Users,
  Bell,
  Database,
  Trash2,
  AlertTriangle,
  Lock,
  Zap
} from "lucide-react";
import Navigation from "@/components/Navigation";

const OrganizationAdminSettingsPage = () => {
  const { orgId } = useParams();
  const navigate = useNavigate();

  // Mock organization data
  const organization = {
    name: "Stanford University",
    primaryColor: "#8C1515"
  };

  // Settings state
  const [settings, setSettings] = useState({
    // Security Settings
    twoFactorRequired: true,
    passwordMinLength: 8,
    sessionTimeout: 60,
    allowSSOOnly: false,
    
    // User Management
    autoApproveUsers: false,
    allowSelfRegistration: true,
    defaultUserRole: "Learner",
    maxUsersAllowed: 15000,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    systemAlerts: true,
    
    // Platform Settings
    allowPublicCourses: false,
    enableCertificates: true,
    enableBadges: true,
    enableDiscussions: true,
    enableAssessments: true,
    
    // Data & Privacy
    dataRetentionPeriod: 36,
    allowDataExport: true,
    requireCookieConsent: true,
    enableAnalytics: true
  });

  const handleSettingChange = (setting: string, value: boolean | string | number) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    // In real app, this would save to API
  };

  const handleSuspendOrganization = () => {
    console.log("Suspending organization");
    // In real app, this would call API to suspend
  };

  const handleDeleteOrganization = () => {
    console.log("Deleting organization");
    // In real app, this would call API to delete
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 pb-6 pt-20 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/super-admin/organizations/${orgId}`)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Organization Details
        </Button>
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
              <AvatarFallback 
                className="text-white text-lg sm:text-xl font-bold"
                style={{ backgroundColor: organization.primaryColor }}
              >
                {organization.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Organization Settings</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Manage platform configuration and security settings</p>
            </div>
          </div>
          
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="security" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto">
          <TabsTrigger value="security" className="text-xs sm:text-sm">Security</TabsTrigger>
          <TabsTrigger value="users" className="text-xs sm:text-sm">Users</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs sm:text-sm">Notifications</TabsTrigger>
          <TabsTrigger value="platform" className="text-xs sm:text-sm">Platform</TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs sm:text-sm">Advanced</TabsTrigger>
        </TabsList>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Configure authentication and security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Require Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Force all users to enable 2FA</p>
                </div>
                <Switch
                  checked={settings.twoFactorRequired}
                  onCheckedChange={(checked) => handleSettingChange('twoFactorRequired', checked)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>SSO Only Access</Label>
                  <p className="text-sm text-muted-foreground">Disable password-based login</p>
                </div>
                <Switch
                  checked={settings.allowSSOOnly}
                  onCheckedChange={(checked) => handleSettingChange('allowSSOOnly', checked)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Minimum Password Length</Label>
                  <Select 
                    value={settings.passwordMinLength.toString()} 
                    onValueChange={(value) => handleSettingChange('passwordMinLength', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 characters</SelectItem>
                      <SelectItem value="8">8 characters</SelectItem>
                      <SelectItem value="10">10 characters</SelectItem>
                      <SelectItem value="12">12 characters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Session Timeout (minutes)</Label>
                  <Select 
                    value={settings.sessionTimeout.toString()} 
                    onValueChange={(value) => handleSettingChange('sessionTimeout', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>Configure user registration and management policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Allow Self Registration</Label>
                  <p className="text-sm text-muted-foreground">Users can register without admin approval</p>
                </div>
                <Switch
                  checked={settings.allowSelfRegistration}
                  onCheckedChange={(checked) => handleSettingChange('allowSelfRegistration', checked)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Auto-approve New Users</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve user registrations</p>
                </div>
                <Switch
                  checked={settings.autoApproveUsers}
                  onCheckedChange={(checked) => handleSettingChange('autoApproveUsers', checked)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default User Role</Label>
                  <Select 
                    value={settings.defaultUserRole} 
                    onValueChange={(value) => handleSettingChange('defaultUserRole', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Learner">Learner</SelectItem>
                      <SelectItem value="Instructor">Instructor</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Maximum Users Allowed</Label>
                  <Input
                    type="number"
                    value={settings.maxUsersAllowed}
                    onChange={(e) => handleSettingChange('maxUsersAllowed', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>Configure notification preferences and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send important updates via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send real-time push notifications</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Send weekly usage and progress reports</p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>System Alerts</Label>
                  <p className="text-sm text-muted-foreground">Critical system notifications and alerts</p>
                </div>
                <Switch
                  checked={settings.systemAlerts}
                  onCheckedChange={(checked) => handleSettingChange('systemAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Features */}
        <TabsContent value="platform" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Platform Features</span>
              </CardTitle>
              <CardDescription>Enable or disable platform features and capabilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Public Courses</Label>
                  <p className="text-sm text-muted-foreground">Allow courses to be publicly accessible</p>
                </div>
                <Switch
                  checked={settings.allowPublicCourses}
                  onCheckedChange={(checked) => handleSettingChange('allowPublicCourses', checked)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Certificates</Label>
                  <p className="text-sm text-muted-foreground">Enable certificate generation</p>
                </div>
                <Switch
                  checked={settings.enableCertificates}
                  onCheckedChange={(checked) => handleSettingChange('enableCertificates', checked)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Badges & Achievements</Label>
                  <p className="text-sm text-muted-foreground">Enable gamification features</p>
                </div>
                <Switch
                  checked={settings.enableBadges}
                  onCheckedChange={(checked) => handleSettingChange('enableBadges', checked)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Discussion Forums</Label>
                  <p className="text-sm text-muted-foreground">Enable course discussions and forums</p>
                </div>
                <Switch
                  checked={settings.enableDiscussions}
                  onCheckedChange={(checked) => handleSettingChange('enableDiscussions', checked)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Assessments & Quizzes</Label>
                  <p className="text-sm text-muted-foreground">Enable assessment creation and grading</p>
                </div>
                <Switch
                  checked={settings.enableAssessments}
                  onCheckedChange={(checked) => handleSettingChange('enableAssessments', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Data & Privacy</span>
              </CardTitle>
              <CardDescription>Configure data retention and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Allow Data Export</Label>
                  <p className="text-sm text-muted-foreground">Users can export their data</p>
                </div>
                <Switch
                  checked={settings.allowDataExport}
                  onCheckedChange={(checked) => handleSettingChange('allowDataExport', checked)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Cookie Consent Required</Label>
                  <p className="text-sm text-muted-foreground">Show cookie consent banner</p>
                </div>
                <Switch
                  checked={settings.requireCookieConsent}
                  onCheckedChange={(checked) => handleSettingChange('requireCookieConsent', checked)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="space-y-0.5 flex-1">
                  <Label>Analytics Tracking</Label>
                  <p className="text-sm text-muted-foreground">Enable usage analytics and tracking</p>
                </div>
                <Switch
                  checked={settings.enableAnalytics}
                  onCheckedChange={(checked) => handleSettingChange('enableAnalytics', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Data Retention Period (months)</Label>
                <Select 
                  value={settings.dataRetentionPeriod.toString()} 
                  onValueChange={(value) => handleSettingChange('dataRetentionPeriod', parseInt(value))}
                >
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                    <SelectItem value="36">36 months</SelectItem>
                    <SelectItem value="60">5 years</SelectItem>
                    <SelectItem value="84">7 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          {/* Danger Zone */}
          <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-700 dark:text-red-300">
                <AlertTriangle className="w-5 h-5" />
                <span>Danger Zone</span>
              </CardTitle>
              <CardDescription>Irreversible actions that affect the organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  These actions cannot be undone. Please proceed with caution.
                </AlertDescription>
              </Alert>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 space-y-3 sm:space-y-0">
                <div className="space-y-1 flex-1">
                  <p className="font-medium">Suspend Organization</p>
                  <p className="text-sm text-muted-foreground">Temporarily disable access to the platform</p>
                </div>
                <Button variant="outline" onClick={handleSuspendOrganization} className="border-orange-300 text-orange-700 hover:bg-orange-50 w-full sm:w-auto">
                  <Lock className="w-4 h-4 mr-2" />
                  Suspend
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-red-200 space-y-3 sm:space-y-0">
                <div className="space-y-1 flex-1">
                  <p className="font-medium">Delete Organization</p>
                  <p className="text-sm text-muted-foreground">Permanently remove all data and access</p>
                </div>
                <Button variant="destructive" onClick={handleDeleteOrganization} className="w-full sm:w-auto">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
};

export default OrganizationAdminSettingsPage;