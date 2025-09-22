import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import {
  ArrowLeft,
  Menu,
  Home,
  BookOpen,
  GraduationCap,
  BarChart3,
  Map,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface MobileHeaderProps {
  title: string;
  showBackButton?: boolean;
  backPath?: string;
}

const MobileHeader = ({ title, showBackButton = true, backPath }: MobileHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, getOrganizationHomePath } = useAuth();
  const orgData = getOrganizationDataFromPath(location.pathname);

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(`/${orgData.acronym}/learner/dashboard`);
    }
  };

  const handleLogout = async () => {
    await logout();
    const orgHome = getOrganizationHomePath();
    if (orgHome) {
      navigate(orgHome);
    } else {
      navigate('/login');
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: Home,
      path: `/${orgData.acronym}/learner/dashboard`
    },
    {
      label: "Courses",
      icon: BookOpen,
      path: `/${orgData.acronym}/learner/courses`
    },
    {
      label: "Learning Paths",
      icon: Map,
      path: `/${orgData.acronym}/learner/paths`
    },
    {
      label: "Analytics",
      icon: BarChart3,
      path: `/${orgData.acronym}/learner/analytics`
    },
    {
      label: "Assessments",
      icon: GraduationCap,
      path: `/${orgData.acronym}/learner/assessments`
    }
  ];

  return (
    <div className="md:hidden bg-white border-b sticky top-0 z-40">
      <div className="flex items-center justify-between p-4">
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        {!showBackButton && <div className="w-10" />}
        
        <h1 className="font-semibold text-lg flex-1 text-center">{title}</h1>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="space-y-1 mt-6">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => navigate(item.path)}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
              
              <div className="border-t pt-4 mt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => navigate(`/${orgData.acronym}/settings`)}
                >
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileHeader;