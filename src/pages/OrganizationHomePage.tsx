import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { 
  GraduationCap,
  Users,
  BookOpen,
  Award,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

const OrganizationHomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orgData = getOrganizationDataFromPath(location.pathname);

  const handleRoleLogin = (role: string) => {
    // Navigate to organization-specific login with role pre-selected
    navigate(`${location.pathname}/login?role=${role}`);
  };

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Courses",
      description: "Engaging online courses designed by industry experts"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from experienced professionals and academic leaders"
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Earn recognized certificates upon course completion"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor your learning progress with detailed analytics"
    }
  ];

  const stats = [
    { label: "Active Courses", value: "150+", icon: BookOpen },
    { label: "Students Enrolled", value: "12,000+", icon: Users },
    { label: "Certificates Issued", value: "8,500+", icon: Award },
    { label: "Success Rate", value: "94%", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 text-center text-white overflow-hidden"
        style={{
          backgroundImage: orgData.headerImage 
            ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(${orgData.headerImage})`
            : `linear-gradient(135deg, ${orgData.primaryColor}, ${orgData.secondaryColor})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mr-4"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              {orgData.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 3)}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
              {orgData.name}
            </h1>
          </div>
          
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90">
            Transform your learning journey with our comprehensive educational platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-white/90 px-8 py-3 text-lg font-medium shadow-lg"
              onClick={() => handleRoleLogin('learner')}
            >
              <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Student Login
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-medium shadow-lg"
              onClick={() => handleRoleLogin('instructor')}
            >
              <GraduationCap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Instructor Login
            </Button>
          </div>

          <div className="text-center">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 hover:text-white text-sm font-medium bg-black/20 backdrop-blur-sm border border-white/30"
              onClick={() => handleRoleLogin('org_admin')}
            >
              Organization Admin Access
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${orgData.primaryColor}15` }}
                  >
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" style={{ color: orgData.primaryColor }} />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: orgData.primaryColor }}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make our learning management system the preferred choice for students and educators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${orgData.primaryColor}15` }}
                    >
                      <feature.icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" style={{ color: orgData.primaryColor }} />
                    </div>
                  </div>
                  <CardTitle className="text-sm sm:text-base md:text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 sm:py-20 px-4 sm:px-6 text-center text-white"
        style={{
          background: `linear-gradient(135deg, ${orgData.primaryColor}, ${orgData.secondaryColor})`
        }}
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 text-white/90">
            Join thousands of students and professionals advancing their careers through our platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-white/90 px-8 py-3 text-lg font-medium shadow-lg"
              onClick={() => handleRoleLogin('learner')}
            >
              Get Started as Student
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/80 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-medium shadow-lg"
              onClick={() => handleRoleLogin('instructor')}
            >
              Join as Instructor
              <GraduationCap className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white mr-3"
                style={{ backgroundColor: orgData.primaryColor }}
              >
                {orgData.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 3)}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold">{orgData.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Learning Management Platform</p>
              </div>
            </div>
            
            <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
              <a href="#" className="hover:text-foreground">Contact Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrganizationHomePage;