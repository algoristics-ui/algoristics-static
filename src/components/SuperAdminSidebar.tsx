import { useState, useEffect } from "react";
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Building2,
  Users,
  BarChart3,
  FileText,
  Settings,
  Shield,
  Globe,
  TrendingUp,
  Database,
  Zap,
  GraduationCap
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useMobileDetection } from "@/hooks/useMobileDetection";

const SuperAdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useMobileDetection();
  const { setOpenMobile } = useSidebar();

  // Auto-collapse on mobile when navigating to a new page
  useEffect(() => {
    if (isMobile && setOpenMobile) {
      setOpenMobile(false);
    }
  }, [currentPath, isMobile, setOpenMobile]);

  const menuGroups = {
    "Overview": [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: BarChart3,
      }
    ],
    "Management": [
      {
        title: "Organizations",
        url: "/organizations",
        icon: Building2,
      },
      {
        title: "Global Users",
        url: "/users",
        icon: Users,
      }
    ],
    "Analytics": [
      {
        title: "Platform Analytics",
        url: "/analytics", 
        icon: BarChart3,
      },
      {
        title: "System Reports",
        url: "/reports",
        icon: FileText,
      },
      {
        title: "Performance",
        url: "/performance",
        icon: TrendingUp,
      }
    ],
    "System": [
      {
        title: "Security",
        url: "/security",
        icon: Shield,
      },
      {
        title: "Infrastructure",
        url: "/infrastructure",
        icon: Database,
      }
    ],
    "Configuration": [
      {
        title: "Global Settings",
        url: "/settings",
        icon: Settings,
      }
    ]
  };

  const isActive = (url: string) => {
    return location.pathname === url;
  };

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className="border-r border-border/60 bg-background">
        <SidebarContent className="pt-16">
          {/* Super Admin Header - clean like other sidebars */}
          <div className="flex items-center justify-between p-4 border-b border-border/60">
            {/* When collapsed: show toggle button centered */}
            <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
              <SidebarTrigger />
            </div>
            
            {/* When expanded: show title and toggle button */}
            <div className="flex items-center justify-between w-full group-data-[collapsible=icon]:hidden">
              <span className="font-semibold text-lg">Super Admin</span>
              <SidebarTrigger />
            </div>
          </div>
          
          {/* Navigation Groups */}
          {Object.entries(menuGroups).map(([groupName, items], index) => (
            <SidebarGroup key={groupName}>
              <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {groupName}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`${isActive(item.url) ? 'bg-primary/10 text-primary' : ''}`}
                        tooltip={item.title}
                      >
                        <Link to={item.url} className="flex items-center">
                          <item.icon className="h-4 w-4 shrink-0" />
                          <span className="group-data-[collapsible=icon]:hidden ml-2">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  );
};

export default SuperAdminSidebar;