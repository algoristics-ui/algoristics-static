import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import {
  Calendar,
  GraduationCap,
  BookOpen,
  Award,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Star
} from "lucide-react";

interface AcademicEvent {
  id: string;
  title: string;
  type: 'class' | 'exam' | 'assignment' | 'office_hours' | 'registration' | 'holiday';
  date: string;
  time: string;
  location?: string;
  instructor?: string;
  course?: string;
  status: 'upcoming' | 'today' | 'completed' | 'cancelled';
  isRequired: boolean;
}

interface Grade {
  id: string;
  course: string;
  courseCode: string;
  assignment: string;
  type: 'quiz' | 'exam' | 'project' | 'participation' | 'final';
  score: number;
  maxPoints: number;
  percentage: number;
  letterGrade: string;
  weight: number;
  submittedDate: string;
  gradedDate?: string;
  feedback?: string;
  rubric?: {
    criteria: string;
    score: number;
    maxScore: number;
    comments: string;
  }[];
}

interface CourseGrade {
  courseId: string;
  courseName: string;
  courseCode: string;
  instructor: string;
  credits: number;
  currentGrade: number;
  letterGrade: string;
  semester: string;
  year: number;
  assignments: Grade[];
  attendance: number;
  participation: number;
}

interface Advisor {
  id: string;
  name: string;
  title: string;
  department: string;
  specialization: string[];
  email: string;
  phone: string;
  office: string;
  officeHours: string;
  avatar: string;
  bio: string;
  nextAppointment?: string;
  totalMeetings: number;
  lastMeeting?: string;
}

interface Transcript {
  semester: string;
  year: number;
  courses: {
    code: string;
    name: string;
    credits: number;
    grade: string;
    gpa: number;
  }[];
  semesterGPA: number;
  cumulativeGPA: number;
  totalCredits: number;
}

const AcademicCenter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  const upcomingEvents: AcademicEvent[] = [
    {
      id: '1',
      title: 'Data Structures Midterm Exam',
      type: 'exam',
      date: '2024-03-15',
      time: '10:00 AM - 12:00 PM',
      location: 'Room 205, Computer Science Building',
      instructor: 'Dr. Smith',
      course: 'CS 201',
      status: 'upcoming',
      isRequired: true
    },
    {
      id: '2',
      title: 'Machine Learning Project Due',
      type: 'assignment',
      date: '2024-03-18',
      time: '11:59 PM',
      course: 'CS 485',
      status: 'upcoming',
      isRequired: true
    },
    {
      id: '3',
      title: 'Office Hours - Dr. Johnson',
      type: 'office_hours',
      date: '2024-03-12',
      time: '2:00 PM - 4:00 PM',
      location: 'Room 310, CS Building',
      instructor: 'Dr. Johnson',
      course: 'CS 485',
      status: 'today',
      isRequired: false
    },
    {
      id: '4',
      title: 'Spring Break',
      type: 'holiday',
      date: '2024-03-25',
      time: 'All Day',
      status: 'upcoming',
      isRequired: false
    }
  ];

  const currentGrades: CourseGrade[] = [
    {
      courseId: '1',
      courseName: 'Data Structures and Algorithms',
      courseCode: 'CS 201',
      instructor: 'Dr. Smith',
      credits: 4,
      currentGrade: 89.5,
      letterGrade: 'A-',
      semester: 'Spring',
      year: 2024,
      attendance: 95,
      participation: 88,
      assignments: [
        {
          id: '1',
          course: 'CS 201',
          courseCode: 'CS 201',
          assignment: 'Homework 1: Arrays and Linked Lists',
          type: 'project',
          score: 95,
          maxPoints: 100,
          percentage: 95,
          letterGrade: 'A',
          weight: 10,
          submittedDate: '2024-02-15',
          gradedDate: '2024-02-18',
          feedback: 'Excellent implementation and clean code. Great use of comments.',
          rubric: [
            { criteria: 'Correctness', score: 25, maxScore: 25, comments: 'All test cases pass' },
            { criteria: 'Code Quality', score: 23, maxScore: 25, comments: 'Clean, well-structured code' },
            { criteria: 'Documentation', score: 22, maxScore: 25, comments: 'Good comments, could be more detailed' },
            { criteria: 'Efficiency', score: 25, maxScore: 25, comments: 'Optimal time complexity' }
          ]
        }
      ]
    },
    {
      courseId: '2',
      courseName: 'Machine Learning Fundamentals',
      courseCode: 'CS 485',
      instructor: 'Dr. Johnson',
      credits: 3,
      currentGrade: 92.3,
      letterGrade: 'A',
      semester: 'Spring',
      year: 2024,
      attendance: 98,
      participation: 94,
      assignments: []
    }
  ];

  const advisor: Advisor = {
    id: '1',
    name: 'Dr. Emily Rodriguez',
    title: 'Academic Advisor',
    department: 'Computer Science',
    specialization: ['Software Engineering', 'AI/ML Career Paths', 'Industry Transitions'],
    email: 'e.rodriguez@university.edu',
    phone: '(555) 123-4567',
    office: 'Room 405, Academic Building',
    officeHours: 'Mon, Wed, Fri: 2:00 PM - 4:00 PM',
    avatar: '/advisor-avatar.jpg',
    bio: 'Dr. Rodriguez has over 15 years of experience in academic advising and industry consulting. She specializes in helping students navigate career paths in technology and research.',
    nextAppointment: '2024-03-14 at 3:00 PM',
    totalMeetings: 12,
    lastMeeting: '2024-02-28'
  };

  const transcriptData: Transcript[] = [
    {
      semester: 'Fall',
      year: 2023,
      courses: [
        { code: 'CS 101', name: 'Introduction to Programming', credits: 4, grade: 'A', gpa: 4.0 },
        { code: 'MATH 151', name: 'Calculus I', credits: 4, grade: 'B+', gpa: 3.3 },
        { code: 'ENG 101', name: 'English Composition', credits: 3, grade: 'A-', gpa: 3.7 },
        { code: 'PHYS 201', name: 'Physics I', credits: 4, grade: 'B', gpa: 3.0 }
      ],
      semesterGPA: 3.5,
      cumulativeGPA: 3.5,
      totalCredits: 15
    },
    {
      semester: 'Spring',
      year: 2024,
      courses: [
        { code: 'CS 201', name: 'Data Structures and Algorithms', credits: 4, grade: 'A-', gpa: 3.7 },
        { code: 'CS 485', name: 'Machine Learning Fundamentals', credits: 3, grade: 'A', gpa: 4.0 },
        { code: 'MATH 152', name: 'Calculus II', credits: 4, grade: 'B+', gpa: 3.3 },
        { code: 'STAT 301', name: 'Statistics', credits: 3, grade: 'A-', gpa: 3.7 }
      ],
      semesterGPA: 3.7,
      cumulativeGPA: 3.6,
      totalCredits: 29
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-800';
      case 'assignment': return 'bg-orange-100 text-orange-800';
      case 'class': return 'bg-blue-100 text-blue-800';
      case 'office_hours': return 'bg-green-100 text-green-800';
      case 'registration': return 'bg-purple-100 text-purple-800';
      case 'holiday': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'exam': return <FileText className="h-4 w-4" />;
      case 'assignment': return <BookOpen className="h-4 w-4" />;
      case 'class': return <GraduationCap className="h-4 w-4" />;
      case 'office_hours': return <User className="h-4 w-4" />;
      case 'registration': return <CheckCircle className="h-4 w-4" />;
      case 'holiday': return <Calendar className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getLetterGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-orange-600';
    return 'text-red-600';
  };

  const calculateCumulativeGPA = () => {
    const latestSemester = transcriptData[transcriptData.length - 1];
    return latestSemester.cumulativeGPA;
  };

  const getTotalCredits = () => {
    const latestSemester = transcriptData[transcriptData.length - 1];
    return latestSemester.totalCredits;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="calendar">Academic Calendar</TabsTrigger>
          <TabsTrigger value="grades">Grades & GPA</TabsTrigger>
          <TabsTrigger value="advisor">Academic Advisor</TabsTrigger>
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          {/* Academic Calendar Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                <span>Academic Calendar</span>
              </CardTitle>
              <CardDescription>
                View important dates, deadlines, and upcoming events
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Upcoming Events */}
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className={`hover:shadow-md transition-shadow ${
                event.status === 'today' ? 'border-l-4 border-l-blue-500' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-muted">
                        {getEventIcon(event.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                          {event.isRequired && (
                            <Badge variant="destructive" className="text-xs">
                              REQUIRED
                            </Badge>
                          )}
                          {event.status === 'today' && (
                            <Badge style={{ backgroundColor: orgData.primaryColor }} className="text-white text-xs">
                              TODAY
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(event.date).toLocaleDateString()} • {event.time}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.instructor && (
                            <div className="flex items-center space-x-2">
                              <User className="h-3 w-3" />
                              <span>{event.instructor} • {event.course}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Add to Calendar
                      </Button>
                      {event.type === 'office_hours' && (
                        <Button 
                          size="sm" 
                          style={{ backgroundColor: orgData.primaryColor }}
                          className="text-white"
                        >
                          Schedule Meeting
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="grades" className="space-y-4">
          {/* GPA Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: orgData.primaryColor }}>
                    {calculateCumulativeGPA().toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Cumulative GPA</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {transcriptData[transcriptData.length - 1].semesterGPA.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Semester</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {getTotalCredits()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Credits</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {currentGrades.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Courses</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Courses */}
          <div className="space-y-4">
            {currentGrades.map((course) => (
              <Card key={course.courseId} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{course.courseName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.courseCode} • {course.instructor} • {course.credits} Credits
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getLetterGradeColor(course.letterGrade)}`}>
                        {course.letterGrade}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {course.currentGrade.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Course Progress</div>
                      <Progress value={course.currentGrade} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {course.currentGrade.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Attendance</div>
                      <Progress value={course.attendance} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {course.attendance}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Participation</div>
                      <Progress value={course.participation} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {course.participation}%
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {course.assignments.length} assignments completed
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Grade Breakdown
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advisor" className="space-y-4">
          {/* Advisor Profile */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={advisor.avatar} alt={advisor.name} />
                  <AvatarFallback>{advisor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{advisor.name}</h3>
                  <p className="text-muted-foreground">{advisor.title} • {advisor.department}</p>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{advisor.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{advisor.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{advisor.office}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{advisor.officeHours}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {advisor.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button 
                      size="sm" 
                      style={{ backgroundColor: orgData.primaryColor }}
                      className="text-white"
                    >
                      Schedule Meeting
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground">{advisor.bio}</p>
              </div>
            </CardContent>
          </Card>

          {/* Meeting History and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: orgData.primaryColor }}>
                    {advisor.totalMeetings}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Meetings</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">
                    {advisor.nextAppointment}
                  </div>
                  <div className="text-sm text-muted-foreground">Next Appointment</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">
                    {advisor.lastMeeting && new Date(advisor.lastMeeting).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Last Meeting</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transcript" className="space-y-4">
          {/* Transcript Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                  <span>Official Transcript</span>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardTitle>
              <CardDescription>
                Complete academic record with grades and GPA history
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Semester History */}
          <div className="space-y-4">
            {transcriptData.reverse().map((semester, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {semester.semester} {semester.year}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Semester GPA: </span>
                      <span className="font-semibold">{semester.semesterGPA.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Cumulative GPA: </span>
                      <span className="font-semibold">{semester.cumulativeGPA.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Credits: </span>
                      <span className="font-semibold">{semester.totalCredits}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {semester.courses.map((course, courseIndex) => (
                      <div key={courseIndex} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex-1">
                          <div className="font-medium">{course.code} - {course.name}</div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="text-muted-foreground">{course.credits} Credits</div>
                          <div className={`font-semibold ${getLetterGradeColor(course.grade)}`}>
                            {course.grade}
                          </div>
                          <div className="text-muted-foreground w-12 text-right">
                            {course.gpa.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicCenter;