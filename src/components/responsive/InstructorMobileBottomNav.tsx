import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import {
  Home,
  BookOpen,
  Users,
  BarChart3,
  Settings
} from "lucide-react";

interface InstructorMobileBottomNavProps {
  currentPage?: string;
}

const InstructorMobileBottomNav = ({ currentPage }: InstructorMobileBottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const orgData = getOrganizationDataFromPath(location.pathname);

  const navItems = [
    {
      label: "Dashboard",
      icon: Home,
      path: `/${orgData.acronym}/dashboard`,
      id: "dashboard"
    },
    {
      label: "Courses",
      icon: BookOpen,
      path: `/${orgData.acronym}/courses`,
      id: "courses"
    },
    {
      label: "Students", 
      icon: Users,
      path: `/${orgData.acronym}/students`,
      id: "students"
    },
    {
      label: "Analytics",
      icon: BarChart3,
      path: `/${orgData.acronym}/analytics`,
      id: "analytics"
    },
    {
      label: "Profile",
      icon: Settings,
      path: `/${orgData.acronym}/instructor/profile`,
      id: "profile"
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const isActive = currentPage === item.id || location.pathname.includes(item.path);
          const Icon = item.icon;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={`h-16 flex flex-col items-center justify-center space-y-1 ${
                isActive ? 'text-primary' : ''
              }`}
              style={isActive ? { color: orgData.primaryColor } : {}}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default InstructorMobileBottomNav;