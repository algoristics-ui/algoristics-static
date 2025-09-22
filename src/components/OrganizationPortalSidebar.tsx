import { useState, useEffect } from "react";
import { 
  Home,
  BookOpen, 
  BarChart3, 
  Users, 
  ClipboardList,
  FileText,
  Settings,
  UserCheck,
  Award,
  Megaphone
} from "lucide-react";
import { NavLink, useLocation, useParams } from "react-router-dom";
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

interface OrganizationPortalSidebarProps {
  orgName: string;
  primaryColor: string;
}

const getNavigationItems = (orgId: string) => [
  {
    title: "Home",
    url: `/portal/${orgId}/dashboard`,
    icon: Home,
    group: "Overview"
  },
  {
    title: "Courses",
    url: `/portal/${orgId}/courses`,
    icon: BookOpen,
    group: "Learning"
  },
  {
    title: "Assessments",
    url: `/portal/${orgId}/assessments`,
    icon: ClipboardList,
    group: "Learning"
  },
  {
    title: "Certificates",
    url: `/portal/${orgId}/certificates`,
    icon: Award,
    group: "Learning"
  },
  {
    title: "Analytics",
    url: `/portal/${orgId}/analytics`,
    icon: BarChart3,
    group: "Insights"
  },
  {
    title: "Reports",
    url: `/portal/${orgId}/reports`,
    icon: FileText,
    group: "Insights"
  },
  {
    title: "Students",
    url: `/portal/${orgId}/students`,
    icon: Users,
    group: "Management"
  },
  {
    title: "Instructors",
    url: `/portal/${orgId}/instructors`,
    icon: UserCheck,
    group: "Management"
  },
  {
    title: "News Feed",
    url: `/portal/${orgId}/newsfeed`,
    icon: Megaphone,
    group: "Management"
  },
  {
    title: "Settings",
    url: `/portal/${orgId}/settings`,
    icon: Settings,
    group: "Configuration"
  },
];

export function OrganizationPortalSidebar({ orgName, primaryColor }: OrganizationPortalSidebarProps) {
  const { orgId } = useParams();
  const location = useLocation();
  const navigationItems = getNavigationItems(orgId || "1");
  const isMobile = useMobileDetection();
  const { setOpenMobile } = useSidebar();

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
  }, [location.pathname, isMobile, setOpenMobile]);

  const isActive = (url: string) => {
    return location.pathname === url;
  };

  const getNavCls = (isActive: boolean) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-muted/50";

  return (
    <Sidebar collapsible="icon" className="border-r border-border bg-background">
      <SidebarContent>
        {/* Header with Logo and Toggle */}
        <div className="p-4 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                {orgName.charAt(0)}
              </div>
              <div className="group-data-[collapsible=icon]:hidden min-w-0">
                <h1 className="text-lg font-bold text-foreground truncate">{orgName}</h1>
                <p className="text-xs text-muted-foreground">Portal</p>
              </div>
            </div>
            {/* Toggle button always visible */}
            <div className="flex-shrink-0">
              <SidebarTrigger className="h-5 w-5 opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>

        {/* Navigation Groups */}
        {Object.entries(groupedItems).map(([groupName, items]) => (
          <SidebarGroup key={groupName}>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {groupName}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) => `w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors ${getNavCls(isActive)}`}
                        title={item.title}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}