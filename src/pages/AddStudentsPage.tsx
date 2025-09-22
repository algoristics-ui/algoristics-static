import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { UserPlus, Upload, Mail, FileText, Users, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AddStudentsPage = () => {
  const { toast } = useToast();
  const [singleStudent, setSingleStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    course: "",
    department: "",
    employeeId: "",
  });

  const [bulkEmails, setBulkEmails] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const handleSingleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Student Added",
      description: `${singleStudent.firstName} ${singleStudent.lastName} has been added successfully!`,
    });
    setSingleStudent({
      firstName: "",
      lastName: "",
      email: "",
      course: "",
      department: "",
      employeeId: "",
    });
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emails = bulkEmails.split('\n').filter(email => email.trim());
    toast({
      title: "Students Added",
      description: `${emails.length} students have been invited successfully!`,
    });
    setBulkEmails("");
  };

  const courses = [
    "React Fundamentals",
    "Data Science Essentials", 
    "Digital Marketing Strategy",
    "Project Management Basics",
    "UI/UX Design Principles",
    "Python Programming"
  ];

  const departments = [
    "Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"
  ];

  const toggleCourse = (course: string) => {
    setSelectedCourses(prev => 
      prev.includes(course) 
        ? prev.filter(c => c !== course)
        : [...prev, course]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="bg-primary/10 p-3 rounded-lg">
          <UserPlus className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Add Students</h1>
          <p className="text-muted-foreground">
            Enroll new students to your courses
          </p>
        </div>
      </div>

      <Tabs defaultValue="single" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="single" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Single Student
          </TabsTrigger>
          <TabsTrigger value="bulk" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Bulk Add
          </TabsTrigger>
          <TabsTrigger value="import" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import CSV
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Student Information</CardTitle>
                  <CardDescription>
                    Enter the details for a new student
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSingleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={singleStudent.firstName}
                          onChange={(e) => setSingleStudent({ ...singleStudent, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={singleStudent.lastName}
                          onChange={(e) => setSingleStudent({ ...singleStudent, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@company.com"
                        value={singleStudent.email}
                        onChange={(e) => setSingleStudent({ ...singleStudent, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Department</Label>
                        <Select
                          value={singleStudent.department}
                          onValueChange={(value) => setSingleStudent({ ...singleStudent, department: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="employeeId">Employee ID (Optional)</Label>
                        <Input
                          id="employeeId"
                          placeholder="EMP001"
                          value={singleStudent.employeeId}
                          onChange={(e) => setSingleStudent({ ...singleStudent, employeeId: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Initial Course (Optional)</Label>
                      <Select
                        value={singleStudent.course}
                        onValueChange={(value) => setSingleStudent({ ...singleStudent, course: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex justify-end space-x-4">
                      <Button variant="outline">Cancel</Button>
                      <Button type="submit">Add Student</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Invitation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    An email invitation will be sent to the student with login instructions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Students:</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Active Enrollments:</span>
                    <span className="font-medium">892</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>This Month:</span>
                    <span className="font-medium">+52</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="bulk">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Bulk Add Students</CardTitle>
                  <CardDescription>
                    Add multiple students by entering their email addresses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleBulkSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="emails">Email Addresses</Label>
                      <Textarea
                        id="emails"
                        placeholder="Enter one email per line:&#10;john.doe@company.com&#10;jane.smith@company.com&#10;bob.wilson@company.com"
                        rows={8}
                        value={bulkEmails}
                        onChange={(e) => setBulkEmails(e.target.value)}
                        required
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Enter one email address per line. Empty lines will be ignored.
                      </p>
                    </div>
                    
                    <div>
                      <Label>Assign to Courses (Optional)</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {courses.map((course) => (
                          <Button
                            key={course}
                            type="button"
                            variant={selectedCourses.includes(course) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleCourse(course)}
                            className="justify-start text-left"
                          >
                            {course}
                          </Button>
                        ))}
                      </div>
                      {selectedCourses.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {selectedCourses.map((course) => (
                            <Badge key={course} variant="secondary">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <Separator />
                    <div className="flex justify-end space-x-4">
                      <Button variant="outline">Cancel</Button>
                      <Button type="submit">Send Invitations</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Email count:</span>
                      <span className="font-medium">
                        {bulkEmails.split('\n').filter(email => email.trim()).length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Selected courses:</span>
                      <span className="font-medium">{selectedCourses.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Import from CSV
              </CardTitle>
              <CardDescription>
                Upload a CSV file with student information for bulk enrollment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Upload CSV File</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your CSV file here, or click to browse
                </p>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">CSV Format Requirements:</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-mono">
                    firstName,lastName,email,department,employeeId,courses
                  </p>
                  <p className="text-sm font-mono text-muted-foreground">
                    John,Doe,john.doe@company.com,Engineering,EMP001,"React Fundamentals,Python Programming"
                  </p>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• firstName, lastName, and email are required fields</p>
                  <p>• department and employeeId are optional</p>
                  <p>• courses should be comma-separated and enclosed in quotes</p>
                  <p>• Maximum file size: 5MB</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
                <Button>
                  Process Import
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};