import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal,
  UserCheck,
  Crown,
  Building2,
  Mail,
  Plus,
  Edit,
  Trash2,
  Save
} from "lucide-react";
import Navigation from "@/components/Navigation";

const GlobalUsersPage = () => {
  // State management for organization admins
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      email: "admin@stanford.edu",
      role: "org_admin",
      organization: "Stanford University",
      status: "active",
      lastLogin: "2 hours ago",
      joinDate: "Jan 15, 2023",
      permissions: ["Full Access", "User Management", "Course Management"],
      totalUsers: 12950,
      totalCourses: 120
    },
    {
      id: 2,
      name: "Mike Johnson", 
      email: "admin@techcorp.com",
      role: "org_admin",
      organization: "TechCorp Training",
      status: "active",
      lastLogin: "4 hours ago",
      joinDate: "Jan 2, 2024",
      permissions: ["Full Access", "User Management", "Course Management"],
      totalUsers: 875,
      totalCourses: 45
    },
    {
      id: 3,
      name: "Dr. Lisa Martinez",
      email: "admin@citycc.edu", 
      role: "org_admin",
      organization: "City Community College",
      status: "active",
      lastLogin: "1 day ago",
      joinDate: "Jan 5, 2024",
      permissions: ["Full Access", "User Management", "Course Management"],
      totalUsers: 2520,
      totalCourses: 65
    },
    {
      id: 4,
      name: "John Admin",
      email: "admin@algoristics.com",
      role: "org_admin", 
      organization: "Algoristics",
      status: "active",
      lastLogin: "30 mins ago",
      joinDate: "Aug 20, 2023",
      permissions: ["Full Access", "User Management", "Course Management", "Platform Settings"],
      totalUsers: 5275,
      totalCourses: 85
    }
  ]);

  // Dialog and form state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    permissions: [] as string[]
  });

  // Available organizations
  const organizations = [
    "Stanford University",
    "TechCorp Training", 
    "City Community College",
    "Algoristics"
  ];

  // Available permissions
  const availablePermissions = [
    "Full Access",
    "User Management", 
    "Course Management",
    "Platform Settings",
    "Analytics Access",
    "Report Generation"
  ];

  // CRUD Functions
  const handleAddAdmin = () => {
    if (formData.name && formData.email && formData.organization) {
      const newAdmin = {
        id: Math.max(...admins.map(a => a.id)) + 1,
        name: formData.name,
        email: formData.email,
        role: "org_admin" as const,
        organization: formData.organization,
        status: "active" as const,
        lastLogin: "Just now",
        joinDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        permissions: formData.permissions.length > 0 ? formData.permissions : ["Full Access", "User Management", "Course Management"],
        totalUsers: 0,
        totalCourses: 0
      };
      
      setAdmins([...admins, newAdmin]);
      setFormData({ name: "", email: "", organization: "", permissions: [] });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditAdmin = (admin: any) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      organization: admin.organization,
      permissions: admin.permissions
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateAdmin = () => {
    if (editingAdmin && formData.name && formData.email && formData.organization) {
      const updatedAdmins = admins.map(admin => 
        admin.id === editingAdmin.id 
          ? { ...admin, ...formData, permissions: formData.permissions.length > 0 ? formData.permissions : admin.permissions }
          : admin
      );
      setAdmins(updatedAdmins);
      setFormData({ name: "", email: "", organization: "", permissions: [] });
      setEditingAdmin(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteAdmin = (adminId: number) => {
    setAdmins(admins.filter(admin => admin.id !== adminId));
  };

  // Filter admins based on search
  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userStats = [
    {
      title: "Organization Admins",
      value: admins.length.toString(),
      change: "+1",
      changeType: "positive" as const,
      icon: UserCheck,
    },
    {
      title: "Active Organizations",
      value: admins.filter(admin => admin.status === 'active').length.toString(),
      change: "0",
      changeType: "neutral" as const,
      icon: Building2,
    },
    {
      title: "Total Managed Users",
      value: admins.reduce((total, admin) => total + admin.totalUsers, 0).toLocaleString(),
      change: "+892",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Total Courses",
      value: admins.reduce((total, admin) => total + admin.totalCourses, 0).toString(),
      change: "+12",
      changeType: "positive" as const,
      icon: Crown,
    }
  ];

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      super_admin: { label: "Super Admin", color: "bg-red-500/10 text-red-700 border-red-200" },
      org_admin: { label: "Org Admin", color: "bg-blue-500/10 text-blue-700 border-blue-200" },
      instructor: { label: "Instructor", color: "bg-green-500/10 text-green-700 border-green-200" },
      learner: { label: "Learner", color: "bg-gray-500/10 text-gray-700 border-gray-200" }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.learner;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-500/10 text-green-700 border-green-200">Active</Badge>
    ) : (
      <Badge className="bg-gray-500/10 text-gray-700 border-gray-200">Inactive</Badge>
    );
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Navigation />
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/60" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 pt-8 px-2 sm:px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Organization Admins
              </h1>
              <p className="text-base md:text-lg text-white/95 max-w-2xl mx-auto drop-shadow-sm">
                Manage organization administrators across all organizations
              </p>
            </div>
            
            <div className="flex justify-center px-2 sm:px-4">
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-white text-primary hover:bg-white/90 font-semibold px-6 md:px-8 py-3 w-full sm:w-auto shadow-lg"
              >
                <Plus className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Add Organization Admin
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto space-y-8">

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {userStats.map((stat, index) => (
                  <Card key={index} className="shadow-elegant hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                          <p className={`text-sm mt-1 ${
                            stat.changeType === 'positive' ? 'text-green-600' : 
                            stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {stat.change} this month
                          </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Users Management */}
              <Card className="shadow-elegant">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle className="text-xl font-bold">Organization Administrators</CardTitle>
                      <p className="text-muted-foreground">Manage organization admins and their permissions</p>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search organization admins..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button variant="outline">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAdmins.map((admin) => (
                      <div key={admin.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 sm:p-6 rounded-xl bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 border border-border/10 space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-4 sm:space-x-6 flex-1 min-w-0">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-semibold text-base sm:text-lg flex-shrink-0">
                            {admin.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                              <h3 className="font-semibold text-foreground text-base sm:text-lg truncate">{admin.name}</h3>
                              <div className="flex items-center gap-2 flex-wrap">
                                {getRoleBadge(admin.role)}
                                {getStatusBadge(admin.status)}
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-muted-foreground mb-2">
                              <span className="flex items-center gap-1 min-w-0">
                                <Mail className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{admin.email}</span>
                              </span>
                              <span className="flex items-center gap-1 min-w-0">
                                <Building2 className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{admin.organization}</span>
                              </span>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 text-xs text-muted-foreground">
                              <span>{admin.totalUsers.toLocaleString()} users managed</span>
                              <span>{admin.totalCourses} courses</span>
                              <span>Joined: {admin.joinDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                          <div className="space-y-2 flex-1 sm:flex-initial">
                            <p className="text-xs sm:text-sm text-muted-foreground">Last login: {admin.lastLogin}</p>
                            <div className="flex gap-1 flex-wrap justify-start sm:justify-end">
                              {admin.permissions.slice(0, 2).map((permission, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                              {admin.permissions.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{admin.permissions.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="self-start sm:self-center">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditAdmin(admin)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Admin
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                    <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                                    <span className="text-red-500">Delete Admin</span>
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Organization Admin</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete {admin.name}? This action cannot be undone and will remove their access to {admin.organization}.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteAdmin(admin.id)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
          </div> {/* Close max-w-6xl */}
        </div>
      </div>

      {/* Add Admin Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Organization Admin</DialogTitle>
            <DialogDescription>
              Create a new organization administrator account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="admin@organization.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="organization">Organization</Label>
              <Select value={formData.organization} onValueChange={(value) => setFormData(prev => ({ ...prev, organization: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org} value={org}>{org}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-2">
                {availablePermissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={permission}
                      checked={formData.permissions.includes(permission)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({ 
                            ...prev, 
                            permissions: [...prev.permissions, permission] 
                          }));
                        } else {
                          setFormData(prev => ({ 
                            ...prev, 
                            permissions: prev.permissions.filter(p => p !== permission) 
                          }));
                        }
                      }}
                      className="rounded"
                    />
                    <Label htmlFor={permission} className="text-sm">{permission}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAdmin}>
              <Save className="w-4 h-4 mr-2" />
              Add Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Admin Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Organization Admin</DialogTitle>
            <DialogDescription>
              Update organization administrator details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email Address</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="admin@organization.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-organization">Organization</Label>
              <Select value={formData.organization} onValueChange={(value) => setFormData(prev => ({ ...prev, organization: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map((org) => (
                    <SelectItem key={org} value={org}>{org}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Permissions</Label>
              <div className="grid grid-cols-2 gap-2">
                {availablePermissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`edit-${permission}`}
                      checked={formData.permissions.includes(permission)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({ 
                            ...prev, 
                            permissions: [...prev.permissions, permission] 
                          }));
                        } else {
                          setFormData(prev => ({ 
                            ...prev, 
                            permissions: prev.permissions.filter(p => p !== permission) 
                          }));
                        }
                      }}
                      className="rounded"
                    />
                    <Label htmlFor={`edit-${permission}`} className="text-sm">{permission}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateAdmin}>
              <Save className="w-4 h-4 mr-2" />
              Update Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GlobalUsersPage;