import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { OrganizationHeader } from "@/components/OrganizationHeader";
import { useAuth } from "@/contexts/AuthContext";
import { useSmartSidebarDefault } from "@/hooks/useMobileDetection";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { useLocation } from "react-router-dom";
import { LearnerSidebar } from "@/components/LearnerSidebar";

interface LearnerLayoutProps {
  children: ReactNode;
}

const LearnerLayout = ({ children }: LearnerLayoutProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const defaultOpen = useSmartSidebarDefault();

  // Get organization data from the current path
  const orgData = getOrganizationDataFromPath(location.pathname);

  if (!orgData) {
    return <div>Organization not found</div>;
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex h-screen w-full bg-background">
        <LearnerSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <OrganizationHeader orgData={orgData} />
          <main className="flex-1 overflow-auto bg-background pt-20">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LearnerLayout;