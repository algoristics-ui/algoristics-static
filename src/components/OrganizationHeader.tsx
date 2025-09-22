import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  Globe, 
  MapPin, 
  Bell, 
  Download, 
  Settings,
  CheckCircle,
  Timer,
  GraduationCap,
  Zap,
  HelpCircle,
  LogOut,
  User
} from "lucide-react";

interface OrganizationData {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  acronym: string;
  headerImage?: string;
}

interface OrganizationHeaderProps {
  orgData: OrganizationData;
  stickyHeader?: boolean;
}

const OrganizationHeader = ({ orgData, stickyHeader = false }: OrganizationHeaderProps) => {
  const { user, logout, getOrganizationHomePath } = useAuth();
  const navigate = useNavigate();

  const getAcronym = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 3);
  };

  const handleLogout = () => {
    const homePath = getOrganizationHomePath();
    logout();
    navigate(homePath);
  };

  return (
    <nav 
      className="border-b fixed top-0 left-0 right-0 z-50 w-full overflow-hidden"
      style={{
        backgroundImage: orgData.headerImage 
          ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${orgData.headerImage})`
          : `linear-gradient(135deg, ${orgData.primaryColor}, ${orgData.secondaryColor})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '80px'
      }}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
          {/* Organization Logo and Name */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-3">
              {/* Organization acronym badge */}
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                {getAcronym(orgData.name)}
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-white drop-shadow-md">{orgData.name}</h1>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/20 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Help */}
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
              <HelpCircle className="h-5 w-5" />
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-white/20">
                  <Avatar className="h-8 w-8 ring-2 ring-white/20">
                    <AvatarImage src="/placeholder-user.jpg" alt={user?.name || 'User'} />
                    <AvatarFallback className="bg-white/90 text-gray-700">
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.name || 'User'}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
    </nav>
  );
};

export { OrganizationHeader };
export type { OrganizationData };