import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { OrganizationHeader, OrganizationData } from "@/components/OrganizationHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useSmartSidebarDefault } from "@/hooks/useMobileDetection";
import { GraduationCap, Zap } from "lucide-react";
import SuperAdminLayout from "@/components/SuperAdminLayout";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

// Helper function to get organization data
const getOrganizationData = (orgName: string): OrganizationData => {
  const orgData: Record<string, OrganizationData> = {
    'Stanford University': {
      name: "Stanford University",
      logo: "/placeholder.svg",
      headerImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&h=300&fit=crop",
      primaryColor: "#8C1515",
      secondaryColor: "#B1040E",
      customUrl: "stanford.learningplatform.com",
      location: "Stanford, CA",
      planType: "Enterprise"
    },
    'TechCorp Training': {
      name: "TechCorp Training",
      logo: "/placeholder.svg",
      headerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=300&fit=crop",
      primaryColor: "#0066CC",
      secondaryColor: "#004499",
      customUrl: "techcorp.learningplatform.com",
      location: "San Francisco, CA",
      subtitle: "Corporate Learning Hub",
      planType: "Professional",
      additionalBadges: [{
        text: "Tech Focus",
        icon: Zap,
        color: "blue"
      }]
    },
    'City Community College': {
      name: "City Community College",
      logo: "/placeholder.svg",
      headerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=300&fit=crop",
      primaryColor: "#228B22",
      secondaryColor: "#32CD32",
      customUrl: "citycc.learningplatform.com",
      location: "Los Angeles, CA",
      subtitle: "Student Success Portal",
      planType: "Trial",
      additionalBadges: [{
        text: "Community Focus",
        icon: GraduationCap,
        color: "green"
      }]
    },
    'Algoristics': {
      name: "Algoristics",
      logo: "/placeholder.svg",
      headerImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=300&fit=crop",
      primaryColor: "#3B82F6",
      secondaryColor: "#1D4ED8",
      customUrl: "algoristic.learningplatform.com",
      location: "San Jose, CA",
      subtitle: "Learning Management Portal",
      planType: "Enterprise"
    }
  };
  
  return orgData[orgName] || orgData['Algoristics'];
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const shouldOpenByDefault = useSmartSidebarDefault();

  // Use Super Admin Layout for super admins
  if (user?.role === 'super_admin') {
    return <SuperAdminLayout>{children}</SuperAdminLayout>;
  }

  // For organization users, get organization data from URL
  const orgData = getOrganizationDataFromPath(location.pathname);

  return (
    <>
      {/* Organization Navigation Header */}
      <OrganizationHeader 
        orgData={orgData}
        stickyHeader={true}
      />
      
      <SidebarProvider defaultOpen={shouldOpenByDefault}>
        {/* Main container without top padding - handled by sidebar and main content */}
        <div className="min-h-screen bg-background flex flex-col">
          
          {/* Sidebar and Main Content container */}
          <div className="flex flex-1 overflow-hidden">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto bg-gradient-to-br from-primary/5 to-secondary/5 pt-20">
              <div className="h-full">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default DashboardLayout;