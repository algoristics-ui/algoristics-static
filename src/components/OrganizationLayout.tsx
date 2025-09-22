import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { OrganizationPortalSidebar } from "@/components/OrganizationPortalSidebar";
import { OrganizationHeader, OrganizationData } from "@/components/OrganizationHeader";
import { useSmartSidebarDefault } from "@/hooks/useMobileDetection";
import { GraduationCap, Zap } from "lucide-react";

interface OrganizationLayoutProps {
  children: ReactNode;
  orgId?: string;
  title?: string;
}

// Mock organization data - in real app this would come from API
const getOrganizationData = (orgId?: string): OrganizationData => {
  const organizations: { [key: string]: OrganizationData } = {
    "1": {
      name: "Stanford University",
      logo: "/placeholder.svg",
      headerImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&h=300&fit=crop",
      primaryColor: "#8C1515",
      secondaryColor: "#B1040E",
      customUrl: "stanford.learningplatform.com",
      location: "Stanford, CA",
      planType: "Enterprise"
    },
    "2": {
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
    "3": {
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
    }
  };

  return organizations[orgId || "1"] || organizations["1"];
};

export function OrganizationLayout({ children, orgId, title }: OrganizationLayoutProps) {
  const orgData = getOrganizationData(orgId);
  const shouldOpenByDefault = useSmartSidebarDefault();
  
  return (
    <SidebarProvider defaultOpen={shouldOpenByDefault}>
      <div className="min-h-screen flex w-full bg-background">
        <OrganizationPortalSidebar orgName={orgData.name} primaryColor={orgData.primaryColor} />
        
        <div className="flex-1 overflow-auto min-w-0">
          <OrganizationHeader 
            orgData={orgData} 
            stickyHeader={true} 
          />
          
          <main className="container mx-auto p-3 md:p-6 pt-20">
            {title && <h2 className="text-2xl font-bold mb-6" style={{ color: orgData.primaryColor }}>{title}</h2>}
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}