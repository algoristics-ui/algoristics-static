import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { MobileBottomNav } from "@/components/responsive";
import { 
  Award, 
  Search,
  Download,
  Calendar,
  Star,
  BookOpen,
  Share2,
  Eye,
  Trophy,
  CheckCircle,
  Clock,
  ExternalLink,
  Medal,
  Shield
} from "lucide-react";

const LearnerCertificatesPage = () => {
  const { user } = useAuth();
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("earned");

  // Sample certificates data - from learner's perspective
  const myCertificates = [
    {
      id: 1,
      courseName: "Advanced JavaScript Fundamentals",
      instructor: "Dr. Sarah Johnson",
      issueDate: "2024-01-15",
      certificateId: "CERT-JS-001-2024",
      status: "issued",
      downloadUrl: "#",
      credentialUrl: "https://credentials.example.com/cert-js-001",
      grade: "A+",
      score: 95,
      hoursCompleted: 40,
      skills: ["JavaScript", "ES6+", "Async Programming"],
      verificationCode: "JS2024-001-ABCD",
      expiryDate: "2027-01-15",
      description: "Demonstrates mastery of advanced JavaScript concepts including closures, promises, and modern syntax."
    },
    {
      id: 2,
      courseName: "Machine Learning Basics",
      instructor: "Dr. Lisa Wang",
      issueDate: "2024-02-20",
      certificateId: "CERT-ML-002-2024",
      status: "issued",
      downloadUrl: "#",
      credentialUrl: "https://credentials.example.com/cert-ml-002",
      grade: "A",
      score: 88,
      hoursCompleted: 60,
      skills: ["Machine Learning", "Python", "Data Analysis"],
      verificationCode: "ML2024-002-EFGH",
      expiryDate: "2027-02-20",
      description: "Comprehensive understanding of machine learning algorithms and practical implementation."
    },
    {
      id: 3,
      courseName: "UX Design Principles",
      instructor: "Emma Rodriguez",
      issueDate: "2024-03-10",
      certificateId: "CERT-UX-003-2024",
      status: "issued",
      downloadUrl: "#",
      credentialUrl: "https://credentials.example.com/cert-ux-003",
      grade: "A-",
      score: 92,
      hoursCompleted: 35,
      skills: ["UX Design", "Prototyping", "User Research"],
      verificationCode: "UX2024-003-IJKL",
      expiryDate: "2026-03-10",
      description: "Proficiency in user experience design principles and research methodologies."
    }
  ];

  const inProgressCertificates = [
    {
      id: 4,
      courseName: "React Advanced Patterns",
      instructor: "Alex Thompson",
      progress: 75,
      estimatedCompletion: "2024-04-15",
      currentModule: "State Management",
      description: "Advanced React patterns and performance optimization techniques."
    },
    {
      id: 5,
      courseName: "Data Science with Python",
      instructor: "Prof. Michael Chen",
      progress: 45,
      estimatedCompletion: "2024-05-20",
      currentModule: "Data Visualization",
      description: "Comprehensive data science curriculum using Python and its libraries."
    }
  ];

  const availableCertificates = [
    {
      id: 6,
      courseName: "Digital Marketing Strategy",
      instructor: "Sarah Martinez",
      duration: "6 weeks",
      difficulty: "Beginner",
      rating: 4.6,
      description: "Learn comprehensive digital marketing strategies and analytics."
    },
    {
      id: 7,
      courseName: "Cloud Computing Fundamentals",
      instructor: "Dr. James Wilson",
      duration: "10 weeks",
      difficulty: "Intermediate",
      rating: 4.8,
      description: "Master cloud computing concepts and AWS services."
    }
  ];

  const filteredCertificates = myCertificates.filter(cert =>
    cert.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const CertificateCard = ({ certificate }: { certificate: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4 flex-1">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${orgData.primaryColor}15` }}>
              <Award className="h-6 w-6" style={{ color: orgData.primaryColor }} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-lg">{certificate.courseName}</h3>
                <Badge className="text-white" style={{ backgroundColor: orgData.primaryColor }}>
                  Verified
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                by {certificate.instructor}
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                {certificate.description}
              </p>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-3">
                {certificate.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: orgData.primaryColor }}>
              {certificate.grade}
            </div>
            <div className="text-xs text-muted-foreground">Grade</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {certificate.score}%
            </div>
            <div className="text-xs text-muted-foreground">Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {certificate.hoursCompleted}h
            </div>
            <div className="text-xs text-muted-foreground">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              <CheckCircle className="h-5 w-5 mx-auto" />
            </div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>

        {/* Certificate Info */}
        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Issued: {new Date(certificate.issueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Valid until: {new Date(certificate.expiryDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="text-xs">
            Certificate ID: {certificate.certificateId} | Verification: {certificate.verificationCode}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button size="sm" style={{ backgroundColor: orgData.primaryColor }} className="text-white">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Verify
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const InProgressCard = ({ certificate }: { certificate: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-blue-100">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{certificate.courseName}</h3>
            <p className="text-sm text-muted-foreground mb-2">by {certificate.instructor}</p>
            <p className="text-sm text-muted-foreground mb-3">{certificate.description}</p>
            
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Progress</span>
                <span className="font-medium">{certificate.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{ 
                    width: `${certificate.progress}%`,
                    backgroundColor: orgData.primaryColor 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span>Current: {certificate.currentModule}</span>
              <span>Est. completion: {new Date(certificate.estimatedCompletion).toLocaleDateString()}</span>
            </div>
            
            <Button size="sm" style={{ backgroundColor: orgData.primaryColor }} className="text-white">
              Continue Learning
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AvailableCard = ({ certificate }: { certificate: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-xl bg-gray-100">
            <Medal className="h-6 w-6 text-gray-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{certificate.courseName}</h3>
            <p className="text-sm text-muted-foreground mb-2">by {certificate.instructor}</p>
            <p className="text-sm text-muted-foreground mb-3">{certificate.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{certificate.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{certificate.rating}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {certificate.difficulty}
              </Badge>
            </div>
            
            <Button size="sm" style={{ backgroundColor: orgData.primaryColor }} className="text-white">
              Start Course
            </Button>
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
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">My Certificates</h1>
          <p className="text-muted-foreground">
            View your earned certificates and track your learning achievements
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: orgData.primaryColor }}>
                {myCertificates.length}
              </div>
              <div className="text-sm text-muted-foreground">Earned</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {inProgressCertificates.length}
              </div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(myCertificates.reduce((acc, cert) => acc + cert.score, 0) / myCertificates.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {myCertificates.reduce((acc, cert) => acc + cert.hoursCompleted, 0)}h
              </div>
              <div className="text-sm text-muted-foreground">Total Hours</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="earned">Earned ({myCertificates.length})</TabsTrigger>
            <TabsTrigger value="progress">In Progress ({inProgressCertificates.length})</TabsTrigger>
            <TabsTrigger value="available">Available ({availableCertificates.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="earned" className="space-y-6 mt-6">
            {filteredCertificates.length > 0 ? (
              <div className="space-y-6">
                {filteredCertificates.map((certificate) => (
                  <CertificateCard key={certificate.id} certificate={certificate} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No certificates found</h3>
                <p className="text-muted-foreground">
                  Complete courses to earn your first certificate!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="progress" className="space-y-6 mt-6">
            {inProgressCertificates.length > 0 ? (
              <div className="space-y-6">
                {inProgressCertificates.map((certificate) => (
                  <InProgressCard key={certificate.id} certificate={certificate} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Clock className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No courses in progress</h3>
                <p className="text-muted-foreground">
                  Start a new course to work towards your next certificate!
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="available" className="space-y-6 mt-6">
            <div className="space-y-6">
              {availableCertificates.map((certificate) => (
                <AvailableCard key={certificate.id} certificate={certificate} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPage="certificates" />
    </div>
  );
};

export default LearnerCertificatesPage;