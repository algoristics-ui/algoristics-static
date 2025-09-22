import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Save, 
  Bell, 
  Shield, 
  Users, 
  Globe,
  Database,
  Mail,
  Smartphone,
  Key,
  AlertTriangle
} from "lucide-react";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    courseUpdates: true,
    studentProgress: true,
    systemAlerts: false
  });

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
                Global Settings
              </h1>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-sm">
                Manage system preferences and platform configurations
              </p>
            </div>
            
            <div className="flex justify-center px-4">
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-6 md:px-8 py-3 w-full sm:w-auto">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Settings Tabs */}
            <Tabs defaultValue="general" className="space-y-8">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Globe className="h-5 w-5 mr-2" />
                        Platform Settings
                      </CardTitle>
                      <CardDescription>Configure basic platform settings and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        
                        <div className="space-y-2">
                          <Label htmlFor="platform-name">Platform Name</Label>
                          <Input id="platform-name" defaultValue="Algoristics" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="platform-url">Platform URL</Label>
                          <Input id="platform-url" defaultValue="https://algoristic.edu" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="platform-description">Platform Description</Label>
                        <Textarea 
                          id="platform-description" 
                          defaultValue="Enterprise Learning Management System for modern organizations"
                          rows={3}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Default Timezone</Label>
                          <Select defaultValue="utc-5">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                              <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                              <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                              <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="language">Default Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Course Settings</CardTitle>
                      <CardDescription>Default settings for new courses and content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="default-duration">Default Course Duration (weeks)</Label>
                          <Input id="default-duration" type="number" defaultValue="8" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="max-students">Max Students per Course</Label>
                          <Input id="max-students" type="number" defaultValue="50" />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="auto-enrollment" defaultChecked />
                        <Label htmlFor="auto-enrollment">Enable automatic enrollment</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="course-certificates" defaultChecked />
                        <Label htmlFor="course-certificates">Generate completion certificates</Label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="h-5 w-5 mr-2" />
                        Notification Preferences
                      </CardTitle>
                      <CardDescription>Configure how and when you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Delivery Methods</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                              </div>
                            </div>
                            <Switch 
                              checked={notifications.email} 
                              onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Smartphone className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <Label>Push Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                              </div>
                            </div>
                            <Switch 
                              checked={notifications.push} 
                              onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Smartphone className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <Label>SMS Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive text message notifications</p>
                              </div>
                            </div>
                            <Switch 
                              checked={notifications.sms} 
                              onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Notification Types</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Course Updates</Label>
                              <p className="text-sm text-muted-foreground">New courses, content updates, schedules</p>
                            </div>
                            <Switch 
                              checked={notifications.courseUpdates} 
                              onCheckedChange={(checked) => setNotifications({...notifications, courseUpdates: checked})}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Student Progress</Label>
                              <p className="text-sm text-muted-foreground">Completion milestones, assessment results</p>
                            </div>
                            <Switch 
                              checked={notifications.studentProgress} 
                              onCheckedChange={(checked) => setNotifications({...notifications, studentProgress: checked})}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>System Alerts</Label>
                              <p className="text-sm text-muted-foreground">Maintenance, security, critical updates</p>
                            </div>
                            <Switch 
                              checked={notifications.systemAlerts} 
                              onCheckedChange={(checked) => setNotifications({...notifications, systemAlerts: checked})}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Security */}
                <TabsContent value="security" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        Security Settings
                      </CardTitle>
                      <CardDescription>Manage authentication and security preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Authentication</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Two-Factor Authentication</Label>
                              <p className="text-sm text-muted-foreground">Require 2FA for all user accounts</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Single Sign-On (SSO)</Label>
                              <p className="text-sm text-muted-foreground">Enable SSO integration</p>
                            </div>
                            <Switch />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Password Complexity Requirements</Label>
                              <p className="text-sm text-muted-foreground">Enforce strong password policies</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Session Management</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                            <Input id="session-timeout" type="number" defaultValue="60" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="max-sessions">Max Concurrent Sessions</Label>
                            <Input id="max-sessions" type="number" defaultValue="3" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Key className="h-5 w-5 mr-2" />
                        API Security
                      </CardTitle>
                      <CardDescription>Manage API access and security settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>API Rate Limiting</Label>
                          <p className="text-sm text-muted-foreground">Limit API requests per hour</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>API Key Rotation</Label>
                          <p className="text-sm text-muted-foreground">Automatically rotate API keys monthly</p>
                        </div>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Users */}
                <TabsContent value="users" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        User Management
                      </CardTitle>
                      <CardDescription>Configure user roles and permissions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Self Registration</Label>
                          <p className="text-sm text-muted-foreground">Allow users to create their own accounts</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Verification</Label>
                          <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Admin Approval</Label>
                          <p className="text-sm text-muted-foreground">Require admin approval for new instructors</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Integrations */}
                <TabsContent value="integrations" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Third-Party Integrations</CardTitle>
                      <CardDescription>Connect with external services and tools</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <Label>Google Workspace</Label>
                            <p className="text-sm text-muted-foreground">Calendar and email integration</p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <Label>Microsoft Teams</Label>
                            <p className="text-sm text-muted-foreground">Video conferencing integration</p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <Label>Slack</Label>
                            <p className="text-sm text-muted-foreground">Team communication and notifications</p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Advanced */}
                <TabsContent value="advanced" className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Database className="h-5 w-5 mr-2" />
                        Advanced Settings
                      </CardTitle>
                      <CardDescription>System maintenance and advanced configurations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Data Management</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Automatic Backups</Label>
                              <p className="text-sm text-muted-foreground">Daily automated database backups</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Data Retention</Label>
                              <p className="text-sm text-muted-foreground">Automatically delete old records</p>
                            </div>
                            <Select defaultValue="2-years">
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-year">1 Year</SelectItem>
                                <SelectItem value="2-years">2 Years</SelectItem>
                                <SelectItem value="5-years">5 Years</SelectItem>
                                <SelectItem value="never">Never</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                          <Label className="text-red-600">Danger Zone</Label>
                        </div>
                        <p className="text-sm text-red-600 mb-3">
                          These actions are irreversible. Please proceed with caution.
                        </p>
                        <div className="space-y-2">
                          <Button variant="destructive" size="sm">Reset All Settings</Button>
                          <Button variant="destructive" size="sm">Clear All Data</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
          </div> {/* Close max-w-6xl */}
        </div> {/* Close container */}
      </div> {/* Close py-16 section */}
    </div> 
  );
};

export default SettingsPage;