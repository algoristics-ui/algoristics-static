import { useState, useEffect } from "react";
import { 
  Home,
  BookOpen, 
  BarChart3, 
  ClipboardList,
  GraduationCap,
  Map,
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { useMobileDetection } from "@/hooks/useMobileDetection";

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
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const getLearnerNavigationItems = () => [
  {
    title: "Dashboard",
    url: "/learner/dashboard",
    icon: Home,
    group: "Overview"
  },
  {
    title: "My Courses",
    url: "/learner/courses",
    icon: BookOpen,
    group: "Learning"
  },
  {
    title: "Learning Paths",
    url: "/learner/paths",
    icon: Map,
    group: "Learning"
  },
  {
    title: "Assessments",
    url: "/learner/assessments",
    icon: ClipboardList,
    group: "Learning"
  },
  {
    title: "My Analytics",
    url: "/learner/analytics",
    icon: BarChart3,
    group: "Progress"
  },
  {
    title: "Certificates",
    url: "/learner/certificates",
    icon: Award,
    group: "Achievements"
  }
];

export function LearnerSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();
  const isMobile = useMobileDetection();
  const { setOpenMobile, state, toggleSidebar, open, setOpen } = useSidebar();

  // Get organization context
  const orgData = getOrganizationDataFromPath(location.pathname);
  const orgPrefix = orgData ? `/${orgData.acronym}` : '';

  // Get learner navigation items with organization prefix
  const getNavigationItems = () => {
    const baseItems = getLearnerNavigationItems();
    return baseItems.map(item => ({
      ...item,
      url: `${orgPrefix}${item.url}`
    }));
  };

  const navigationItems = getNavigationItems();

  // Group items by their group property
  const groupedItems = navigationItems.reduce((groups, item) => {
    const group = item.group;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(item);
    return groups;
  }, {} as Record<string, typeof navigationItems>);

  // Close mobile sidebar when clicking a link
  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon">
        <SidebarContent className="pt-20">
          <div className="flex items-center justify-between p-4">
            {/* When collapsed: show toggle button centered */}
            <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
              <SidebarTrigger className="hidden lg:block" />
              <SidebarTrigger className="lg:hidden" />
            </div>
            
            {/* When expanded: show title and toggle button */}
            <div className="flex items-center justify-between w-full group-data-[collapsible=icon]:hidden">
              <span className="font-semibold text-lg">Student Portal</span>
              <SidebarTrigger className="hidden lg:block" />
              <SidebarTrigger className="lg:hidden" />
            </div>
          </div>

        {Object.entries(groupedItems).map(([groupName, items]) => (
          <SidebarGroup key={groupName}>
            <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider group-data-[collapsible=icon]:hidden">
              {groupName}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = currentPath === item.url || 
                    (item.url !== `${orgPrefix}/learner/dashboard` && currentPath.startsWith(item.url));
                  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive}
                        className="group relative"
                        tooltip={item.title}
                      >
                        <NavLink 
                          to={item.url} 
                          onClick={handleNavClick}
                          className="flex items-center space-x-3 px-3 py-2 rounded-md transition-colors"
                        >
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Quick Stats Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider group-data-[collapsible=icon]:hidden">
            Quick Stats
          </SidebarGroupLabel>
          <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
            <div className="px-4 py-3 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Courses in Progress</span>
                <span className="font-medium" style={{ color: orgData?.primaryColor }}>3</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium" style={{ color: orgData?.primaryColor }}>12</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Certificates</span>
                <span className="font-medium" style={{ color: orgData?.primaryColor }}>8</span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    </TooltipProvider>
  );
}