import { useState, useEffect } from "react";
import { 
  Home,
  BookOpen, 
  BarChart3, 
  Users, 
  Building2,
  ClipboardList,
  FileText,
  Settings,
  GraduationCap,
  UserCheck,
  Megaphone,
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

const getAllNavigationItems = () => [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    group: "Overview",
    roles: ["super_admin", "org_admin", "instructor", "learner"]
  },
  {
    title: "My Courses",
    url: "/courses",
    icon: BookOpen,
    group: "Teaching",
    roles: ["instructor"],
    instructorOnly: true
  },
  {
    title: "Courses",
    url: "/courses",
    icon: BookOpen,
    group: "Learning",
    roles: ["super_admin", "org_admin", "learner"]
  },
  {
    title: "My Students",
    url: "/students",
    icon: Users,
    group: "Teaching",
    roles: ["instructor"],
    instructorOnly: true
  },
  {
    title: "My Assessments",
    url: "/assessments",
    icon: ClipboardList,
    group: "Teaching",
    roles: ["instructor"],
    instructorOnly: true
  },
  {
    title: "Course Analytics",
    url: "/analytics",
    icon: BarChart3,
    group: "Teaching",
    roles: ["instructor"],
    instructorOnly: true
  },
  {
    title: "Assessments",
    url: "/assessments",
    icon: ClipboardList,
    group: "Learning",
    roles: ["super_admin", "org_admin"]
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    group: "Insights",
    roles: ["super_admin", "org_admin"]
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
    group: "Insights",
    roles: ["super_admin", "org_admin"]
  },
  {
    title: "Students",
    url: "/students",
    icon: Users,
    group: "Management",
    roles: ["super_admin", "org_admin"]
  },
  {
    title: "Instructors",
    url: "/instructors",
    icon: UserCheck,
    group: "Management",
    roles: ["super_admin", "org_admin"]
  },
  {
    title: "News Feed",
    url: "/newsfeed",
    icon: Megaphone,
    group: "Management",
    roles: ["super_admin", "org_admin"]
  },
  {
    title: "Organizations",
    url: "/organizations",
    icon: Building2,
    group: "Management",
    roles: ["super_admin"]
  },
  {
    title: "Certificates",
    url: "/certificates",
    icon: FileText,
    group: "Learning",
    roles: ["super_admin", "org_admin", "instructor", "learner"]
  },
  {
    title: "Profile Settings",
    url: "/profile",
    icon: Settings,
    group: "Personal",
    roles: ["instructor"],
    instructorOnly: true
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    group: "Configuration",
    roles: ["super_admin", "org_admin", "learner"]
  },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();
  const isMobile = useMobileDetection();
  const { setOpenMobile } = useSidebar();

  // Get organization context for non-super admin users
  const orgData = user?.role !== 'super_admin' ? getOrganizationDataFromPath(location.pathname) : null;
  const orgPrefix = orgData ? `/${orgData.acronym}` : '';

  // Get navigation items with organization context
  const getNavigationItems = () => {
    const baseItems = getAllNavigationItems().filter(item => 
      user?.role ? item.roles.includes(user.role) : false
    );

    // If not super admin, prefix URLs with organization
    if (user?.role !== 'super_admin' && orgData) {
      return baseItems.map(item => ({
        ...item,
        url: item.url === '/organizations' ? item.url : `${orgPrefix}${item.url}`
      })).filter(item => item.url !== '/organizations'); // Remove organizations page for org users
    }

    return baseItems;
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

  // Auto-collapse on mobile when navigating to a new page
  useEffect(() => {
    if (isMobile && setOpenMobile) {
      setOpenMobile(false);
    }
  }, [currentPath, isMobile, setOpenMobile]);

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" className="border-r border-border/60 bg-background">
        <SidebarContent className="pt-20">
          {/* Header Section */}
          {user?.role === 'super_admin' ? (
            // Super Admin Header with Algoristics branding
            <div className="p-4 border-b border-border/60">
              <div className="flex items-center justify-between">
                {/* When collapsed: show toggle button centered */}
                <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
                  <SidebarTrigger className="h-5 w-5 opacity-70 hover:opacity-100 transition-opacity" />
                </div>
                
                {/* When expanded: show branding and toggle button */}
                <div className="flex items-center justify-between w-full group-data-[collapsible=icon]:hidden">
                  <div className="flex items-center space-x-3">
                    <div className="gradient-hero w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h1 className="text-lg font-bold text-foreground truncate">Algoristics</h1>
                      <p className="text-xs text-muted-foreground">Learning Management</p>
                    </div>
                  </div>
                  <SidebarTrigger className="h-5 w-5 opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ) : (
            // Organization Admin/Instructor Header - simple label
            <div className="flex items-center justify-between p-4 border-b border-border/60">
              {/* When collapsed: show toggle button centered */}
              <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-full">
                <SidebarTrigger />
              </div>
              
              {/* When expanded: show simple role label and toggle button */}
              <div className="flex items-center justify-between w-full group-data-[collapsible=icon]:hidden">
                <span className="font-semibold text-lg">
                  {user?.role === 'instructor' ? 'Instructor' : 'Admin'}
                </span>
                <SidebarTrigger />
              </div>
            </div>
          )}

          {/* Navigation Groups */}
          {Object.entries(groupedItems).map(([groupName, items], index) => {
            const hasActiveItem = items.some(item => isActive(item.url));
            
            return (
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
                          tooltip={item.title}
                        >
                          <NavLink 
                            to={item.url} 
                            end 
                            className={({ isActive }) => getNavCls({ isActive })}
                            title={item.title}
                          >
                            <item.icon className="h-4 w-4 flex-shrink-0" />
                            <span className="group-data-[collapsible=icon]:hidden ml-3">{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          })}
        </SidebarContent>
      </Sidebar>
    </TooltipProvider>
  );
}