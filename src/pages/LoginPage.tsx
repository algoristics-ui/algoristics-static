import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if organization is required for non-super admin accounts
    const isSuperAdmin = email === "admin@algoristicedu.com";
    if (!isSuperAdmin && !organization) {
      setError("Please select your organization");
      return;
    }

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password, organization);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in",
      });
      
      // Navigate based on user role and organization
      if (isSuperAdmin) {
        navigate("/dashboard");
      } else {
        // Get organization acronym from mapping or find from demo accounts
        let orgAcronym = organizationMapping[organization as keyof typeof organizationMapping];
        const selectedAccount = demoAccounts.find(acc => acc.email === email);
        
        if (!orgAcronym) {
          orgAcronym = selectedAccount?.acronym || organization.toLowerCase().replace(/\s+/g, '-');
        }
        
        // Redirect based on user role
        if (selectedAccount?.role === "Learner") {
          navigate(`/${orgAcronym}/learner/dashboard`);
        } else {
          // Admin/Instructor goes to organization dashboard
          navigate(`/${orgAcronym}/dashboard`);
        }
      }
    } else {
      setError("Invalid email or password");
    }
  };

  const demoAccounts = [
    { email: "admin@algoristicedu.com", role: "Super Admin", org: "Algoristics", acronym: "algoristics", requiresOrg: false },
    { email: "sarah@university.edu", role: "Organization Admin", org: "Stanford University", acronym: "stanford", requiresOrg: true },
    { email: "mike@techcorp.com", role: "Instructor", org: "TechCorp Training", acronym: "techcorp", requiresOrg: true },
    { email: "emma@student.edu", role: "Learner", org: "Stanford University", acronym: "stanford", requiresOrg: true },
    { email: "jane@citycollege.edu", role: "Learner", org: "City Community College", acronym: "citycollege", requiresOrg: true },
    { email: "alex@consultant.com", role: "Instructor", org: "Any Organization", acronym: "multiple", requiresOrg: true },
  ];

  // Organization mapping
  const organizationMapping = {
    "Stanford University": "stanford",
    "TechCorp Training": "techcorp", 
    "City Community College": "citycollege",
    "Algoristics": "algoristics"
  };

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-6 pt-20">
      <div className="w-full max-w-md space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-hero shadow-medium">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Algoristics account</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="gradient-card border-0 shadow-medium">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-smooth"
                />
              </div>

              {/* Organization field - hidden for super admin */}
              {email !== "admin@algoristicedu.com" && (
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Select value={organization} onValueChange={setOrganization}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Stanford University">Stanford University</SelectItem>
                      <SelectItem value="TechCorp Training">TechCorp Training</SelectItem>
                      <SelectItem value="City Community College">City Community College</SelectItem>
                      <SelectItem value="Algoristics">Algoristics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 transition-smooth"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                variant="gradient"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="gradient-card border-0 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Demo Accounts</CardTitle>
            <CardDescription>
              Use these credentials to test different user roles (password: <code className="font-mono bg-muted px-1 rounded">algoristic123</code>)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-smooth cursor-pointer"
                onClick={() => {
                  setEmail(account.email);
                  setPassword("algoristic123");
                  if (account.requiresOrg) {
                    setOrganization(account.org);
                  }
                }}
              >
                <div>
                  <div className="font-medium text-sm">{account.role}</div>
                  <div className="text-xs text-muted-foreground">{account.email}</div>
                  <div className="text-xs text-muted-foreground">{account.org}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  setEmail(account.email);
                  setPassword("algoristic123");
                  if (account.requiresOrg) {
                    setOrganization(account.org);
                  }
                }}>
                  Use
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Algoristics. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;