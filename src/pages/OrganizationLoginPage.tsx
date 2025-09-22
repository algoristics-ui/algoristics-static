import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { 
  GraduationCap,
  Users,
  Building,
  ArrowLeft,
  Eye,
  EyeOff
} from "lucide-react";

const OrganizationLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const orgData = getOrganizationDataFromPath(location.pathname);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("learner");
  const [error, setError] = useState("");

  // Get role from URL params if provided
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam && ['learner', 'instructor', 'org_admin'].includes(roleParam)) {
      setSelectedRole(roleParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Use the standard login function with organization
      const success = await login(email, password, orgData.name);
      
      if (success) {
        // Redirect to appropriate dashboard based on role and organization
        const orgPath = location.pathname.replace('/login', '');
        
        if (selectedRole === 'learner') {
          navigate(`${orgPath}/learner/dashboard`);
        } else {
          navigate(`${orgPath}/dashboard`);
        }
      } else {
        setError("Invalid email or password. Please check your credentials.");
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    const orgPath = location.pathname.replace('/login', '');
    navigate(orgPath);
  };

  // Function to handle demo credential click
  const handleDemoCredentialClick = (demoEmail: string, demoPassword: string, role: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setSelectedRole(role);
    setError(""); // Clear any existing errors
  };

  // Get demo credentials for current organization
  const getDemoCredentials = () => {
    const credentials = {
      stanford: {
        learner: { email: 'emma@student.edu', password: 'algoristic123', role: 'learner' },
        instructor: { email: 'prof.johnson@stanford.edu', password: 'algoristic123', role: 'instructor' },
        org_admin: { email: 'sarah@university.edu', password: 'algoristic123', role: 'org_admin' }
      },
      techcorp: {
        learner: { email: 'trainee@techcorp.com', password: 'algoristic123', role: 'learner' },
        instructor: { email: 'mike@techcorp.com', password: 'algoristic123', role: 'instructor' },
        org_admin: { email: 'alex@consultant.com', password: 'algoristic123', role: 'instructor' } // Multi-Org Instructor
      },
      citycollege: {
        learner: { email: 'jane@citycollege.edu', password: 'algoristic123', role: 'learner' },
        instructor: { email: 'teacher@citycollege.edu', password: 'algoristic123', role: 'instructor' },
        org_admin: { email: 'alex@consultant.com', password: 'algoristic123', role: 'instructor' } // Multi-Org Instructor
      },
      algoristics: {
        learner: { email: 'learner@algoristics.com', password: 'algoristic123', role: 'learner' },
        instructor: { email: 'instructor@algoristics.com', password: 'algoristic123', role: 'instructor' },
        org_admin: { email: 'admin@algoristics.com', password: 'algoristic123', role: 'org_admin' }
      }
    };

    return credentials[orgData.acronym as keyof typeof credentials] || credentials.algoristics;
  };

  const roleConfig = {
    learner: {
      title: "Student Login",
      description: "Access your courses and track your learning progress",
      icon: Users,
      color: orgData.primaryColor
    },
    instructor: {
      title: "Instructor Login", 
      description: "Manage your courses and student progress",
      icon: GraduationCap,
      color: orgData.primaryColor
    },
    org_admin: {
      title: "Administrator Login",
      description: "Manage your organization's learning platform",
      icon: Building,
      color: orgData.primaryColor
    }
  };

  const currentConfig = roleConfig[selectedRole as keyof typeof roleConfig];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className="py-4 sm:py-6 px-4 sm:px-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${orgData.primaryColor}, ${orgData.secondaryColor})`
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white mr-3 sm:mr-4"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                {orgData.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 3)}
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold">{orgData.name}</h1>
                <p className="text-white/80 text-xs sm:text-sm hidden sm:block">Learning Management Platform</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 hover:text-white font-medium bg-black/20 backdrop-blur-sm border border-white/30 text-xs sm:text-sm px-2 sm:px-4"
              onClick={goBack}
            >
              <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-12 bg-muted/30">
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center px-4 sm:px-6">
              <div className="flex justify-center mb-4">
                <div 
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${currentConfig.color}15` }}
                >
                  <currentConfig.icon className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: currentConfig.color }} />
                </div>
              </div>
              <CardTitle className="text-xl sm:text-2xl">{currentConfig.title}</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {currentConfig.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-4 sm:px-6">
              {/* Role Selection Tabs */}
              <Tabs value={selectedRole} onValueChange={setSelectedRole} className="mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="learner" className="text-xs sm:text-sm">Student</TabsTrigger>
                  <TabsTrigger value="instructor" className="text-xs sm:text-sm">Instructor</TabsTrigger>
                  <TabsTrigger value="org_admin" className="text-xs sm:text-sm">Admin</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={`Enter your ${selectedRole === 'org_admin' ? 'admin' : selectedRole} email`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full text-white font-medium shadow-lg"
                  style={{ backgroundColor: currentConfig.color }}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-3 sm:p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-xs sm:text-sm mb-3">Demo Credentials (Click to Auto-Fill):</h4>
                <div className="space-y-2">
                  {(() => {
                    const demoCredentials = getDemoCredentials();
                    return (
                      <>
                        <button
                          type="button"
                          onClick={() => handleDemoCredentialClick(
                            demoCredentials.learner.email,
                            demoCredentials.learner.password,
                            demoCredentials.learner.role
                          )}
                          className="w-full p-2 text-left text-xs bg-white/50 hover:bg-white/70 border border-border/50 rounded-md transition-colors duration-200 hover:border-primary/50"
                        >
                          <span className="font-medium text-primary">Student:</span>
                          <span className="ml-1 sm:ml-2 text-muted-foreground break-all">{demoCredentials.learner.email}</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => handleDemoCredentialClick(
                            demoCredentials.instructor.email,
                            demoCredentials.instructor.password,
                            demoCredentials.instructor.role
                          )}
                          className="w-full p-2 text-left text-xs bg-white/50 hover:bg-white/70 border border-border/50 rounded-md transition-colors duration-200 hover:border-primary/50"
                        >
                          <span className="font-medium text-primary">Instructor:</span>
                          <span className="ml-1 sm:ml-2 text-muted-foreground break-all">{demoCredentials.instructor.email}</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => handleDemoCredentialClick(
                            demoCredentials.org_admin.email,
                            demoCredentials.org_admin.password,
                            demoCredentials.org_admin.role
                          )}
                          className="w-full p-2 text-left text-xs bg-white/50 hover:bg-white/70 border border-border/50 rounded-md transition-colors duration-200 hover:border-primary/50"
                        >
                          <span className="font-medium text-primary">
                            {orgData.acronym === 'techcorp' || orgData.acronym === 'citycollege' ? 'Multi-Org Instructor:' : 'Admin:'}
                          </span>
                          <span className="ml-1 sm:ml-2 text-muted-foreground break-all">{demoCredentials.org_admin.email}</span>
                        </button>
                      </>
                    );
                  })()}
                </div>
                <p className="text-muted-foreground/80 mt-3 text-xs">
                  💡 Click any credential above to auto-fill the form. All accounts use password: <code className="bg-white/50 px-1 rounded">algoristic123</code>
                </p>
              </div>

              {/* Links */}
              <div className="mt-6 text-center space-y-2">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Forgot your password?
                </a>
                <div className="text-sm text-muted-foreground">
                  Need help? <a href="#" className="hover:text-foreground">Contact Support</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizationLoginPage;