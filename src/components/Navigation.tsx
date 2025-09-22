import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, User, LogOut, Building2, Users, BarChart3, FileText, Settings, Shield, Database, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import SuperAdminSidebar from "./SuperAdminSidebar";
import { getOrganizationDataFromPath } from "@/utils/organizationData";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if we're in an organization context (specific org paths, not main site)
  const orgData = getOrganizationDataFromPath(location.pathname);
  const isOrganizationContext = location.pathname.startsWith('/stanford') || 
                                location.pathname.startsWith('/techcorp') || 
                                location.pathname.startsWith('/citycollege') ||
                                location.pathname.startsWith('/algoristics');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    // If in organization context, redirect to organization home, otherwise to main site
    if (isOrganizationContext) {
      navigate(`/${orgData.acronym}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <Link to={isOrganizationContext ? `/${orgData.acronym}` : "/"} className="flex items-center space-x-3">
            <div 
              className={isOrganizationContext ? "w-8 h-8 rounded-lg flex items-center justify-center" : "w-8 h-8 rounded-lg bg-primary flex items-center justify-center"}
              style={{ 
                backgroundColor: isOrganizationContext ? orgData.primaryColor : undefined 
              }}
            >
              {isOrganizationContext ? (
                <span className="text-white font-bold text-sm">
                  {orgData.name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2)}
                </span>
              ) : (
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              )}
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-foreground">
                {isOrganizationContext ? orgData.name : 'Algoristics'}
              </h1>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {/* ...existing code... */}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{user.email?.split('@')[0] || 'User'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.email}</span>
                    <span className="text-xs text-muted-foreground capitalize">{user.role?.replace('_', ' ')}</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user.role === 'super_admin' && (
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="h-4 w-4 mr-2" />
                    Super Admin Dashboard
                  </DropdownMenuItem>
                )}
                {(user.role === 'org_admin' || user.role === 'instructor') && isOrganizationContext && (
                  <DropdownMenuItem onClick={() => navigate(`/${orgData.acronym}/dashboard`)}>
                    <Building2 className="h-4 w-4 mr-2" />
                    {user.role === 'org_admin' ? 'Organization Dashboard' : 'Instructor Dashboard'}
                  </DropdownMenuItem>
                )}
                {(user.role === 'super_admin' || ((user.role === 'org_admin' || user.role === 'instructor') && isOrganizationContext)) && <DropdownMenuSeparator />}
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => navigate(isOrganizationContext ? `/${orgData.acronym}/login` : '/login')}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="px-6 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link 
                to={isOrganizationContext ? `/${orgData.acronym}` : "/"} 
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </div>
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 border-t space-y-3">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm">
                    <div className="font-medium">{user.email}</div>
                    <div className="text-xs text-muted-foreground capitalize">{user.role?.replace('_', ' ')}</div>
                  </div>
                  {user.role === 'super_admin' && (
                    <>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                        Super Admin
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => {
                          navigate('/dashboard');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => {
                          navigate('/organizations');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Building2 className="h-4 w-4 mr-2" />
                        Organizations
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => {
                          navigate('/users');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Global Users
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => {
                          navigate('/analytics');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => {
                          navigate('/settings');
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <div className="border-t my-2"></div>
                    </>
                  )}
                  {(user.role === 'org_admin' || user.role === 'instructor') && isOrganizationContext && (
                    <>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">
                        {user.role === 'org_admin' ? 'Organization Admin' : 'Instructor'}
                      </div>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => {
                          navigate(`/${orgData.acronym}/dashboard`);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Dashboard
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => {
                          navigate(`/${orgData.acronym}/courses`);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Courses
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start" 
                        onClick={() => {
                          navigate(`/${orgData.acronym}/students`);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Students
                      </Button>
                      {user.role === 'org_admin' && (
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start" 
                          onClick={() => {
                            navigate(`/${orgData.acronym}/settings`);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Settings
                        </Button>
                      )}
                      <div className="border-t my-2"></div>
                    </>
                  )}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => {
                    navigate(isOrganizationContext ? `/${orgData.acronym}/login` : '/login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

       {/* <SuperAdminSidebar /> */}
    </nav>
    
  );
};
export default Navigation;