import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { 
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertCircle,
  BookOpen,
  ClipboardList,
  Calendar,
  Search,
  Users,
  BarChart3
} from "lucide-react";

const OrganizationNewsFeedPage = () => {
  const { orgId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  const [newsFeedItems, setNewsFeedItems] = useState([
    {
      id: 1,
      type: "due_date",
      title: "Course Completion Due",
      content: "Complete 'Data Science Fundamentals' by March 15th to maintain your certification progress.",
      priority: "high",
      date: "2024-03-15",
      createdAt: "2024-03-01",
      author: "Admin"
    },
    {
      id: 2,
      type: "new_course",
      title: "New Course Available",
      content: "Advanced Machine Learning course is now available. Enroll today to enhance your AI skills.",
      priority: "medium",
      date: "2024-03-10",
      createdAt: "2024-03-05",
      author: "Course Director"
    },
    {
      id: 3,
      type: "assessment",
      title: "Assessment Reminder",
      content: "Midterm assessment for 'Cloud Computing' opens tomorrow. Prepare and schedule your exam.",
      priority: "high",
      date: "2024-03-12",
      createdAt: "2024-03-08",
      author: "Assessment Team"
    },
    {
      id: 4,
      type: "announcement",
      title: "Spring Break Schedule",
      content: "University will be closed from March 25-29. All online courses remain accessible during this period.",
      priority: "low",
      date: "2024-03-25",
      createdAt: "2024-03-01",
      author: "Admin"
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({
    type: "",
    title: "",
    content: "",
    priority: "",
    date: ""
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'due_date': return AlertCircle;
      case 'new_course': return BookOpen;
      case 'assessment': return ClipboardList;
      case 'announcement': return Megaphone;
      default: return Megaphone;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return orgData.primaryColor;
    }
  };

  const handleCreate = () => {
    const id = Math.max(...newsFeedItems.map(item => item.id)) + 1;
    setNewsFeedItems([...newsFeedItems, {
      ...newItem,
      id,
      createdAt: new Date().toISOString().split('T')[0],
      author: "Admin"
    }]);
    setNewItem({ type: "", title: "", content: "", priority: "", date: "" });
    setIsCreateDialogOpen(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setNewItem({
      type: item.type,
      title: item.title,
      content: item.content,
      priority: item.priority,
      date: item.date
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    setNewsFeedItems(newsFeedItems.map(item => 
      item.id === selectedItem.id 
        ? { ...item, ...newItem }
        : item
    ));
    setIsEditDialogOpen(false);
    setSelectedItem(null);
    setNewItem({ type: "", title: "", content: "", priority: "", date: "" });
  };

  const handleDelete = (id) => {
    setNewsFeedItems(newsFeedItems.filter(item => item.id !== id));
  };

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 sm:mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">News Feed</h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Create and manage announcements for your organization</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: orgData.primaryColor }} className="text-white">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Create News Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create News Item</DialogTitle>
              <DialogDescription>
                Add a new announcement or news item for your organization.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={newItem.type} onValueChange={(value) => setNewItem({...newItem, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="new_course">New Course</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="due_date">Due Date</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newItem.priority} onValueChange={(value) => setNewItem({...newItem, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  placeholder="Enter news item title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content"
                  value={newItem.content}
                  onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                  placeholder="Enter news item content"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Event Date</Label>
                <Input 
                  id="date"
                  type="date"
                  value={newItem.date}
                  onChange={(e) => setNewItem({...newItem, date: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="text-xs sm:text-sm">
                Cancel
              </Button>
              <Button onClick={handleCreate} style={{ backgroundColor: orgData.primaryColor }} className="text-white text-xs sm:text-sm">
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Actions */}
      <Card className="mb-4 sm:mb-6">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex items-center space-x-2">
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <Button 
              variant="outline" 
              className="h-14 sm:h-16 md:h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              <span className="text-xs sm:text-sm">Create News</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 sm:h-16 md:h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate(`/${orgData.acronym}/courses`)}
            >
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              <span className="text-xs sm:text-sm">View Courses</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 sm:h-16 md:h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate(`/${orgData.acronym}/students`)}
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              <span className="text-xs sm:text-sm">View Students</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-14 sm:h-16 md:h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate(`/${orgData.acronym}/analytics`)}
            >
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: orgData.primaryColor }} />
              <span className="text-xs sm:text-sm">View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="mb-4 sm:mb-6">
        <CardContent className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input placeholder="Search news items..." className="pl-9" />
            </div>
            <Button variant="outline" className="text-xs sm:text-sm">Filter by Type</Button>
            <Button variant="outline" className="text-xs sm:text-sm">Filter by Priority</Button>
          </div>
        </CardContent>
      </Card>

      {/* News Feed Items */}
      <Card>
        <CardHeader className="px-4 sm:px-6">
          <CardTitle>All News Items</CardTitle>
          <CardDescription>Manage announcements and news for your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newsFeedItems.map((item) => {
              const TypeIcon = getTypeIcon(item.type);
              return (
                <div key={item.id} className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 border border-border rounded-lg hover:bg-muted/50">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${getPriorityColor(item.priority)}15` }}>
                      <TypeIcon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: getPriorityColor(item.priority) }} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm sm:text-base font-semibold">{item.title}</h3>
                        <Badge 
                          variant="secondary"
                          style={{ 
                            backgroundColor: `${getPriorityColor(item.priority)}20`,
                            color: getPriorityColor(item.priority)
                          }}
                        >
                          {item.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          {item.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">{item.content}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>Event: {new Date(item.date).toLocaleDateString()}</span>
                        </div>
                        <span>Created: {new Date(item.createdAt).toLocaleDateString()}</span>
                        <span>By: {item.author}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="text-xs sm:text-sm">
                      <Edit className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      style={{ 
                        borderColor: '#ef4444',
                        color: '#ef4444' 
                      }}
                    >
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit News Item</DialogTitle>
            <DialogDescription>
              Update the announcement or news item details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-type">Type</Label>
                <Select value={newItem.type} onValueChange={(value) => setNewItem({...newItem, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="new_course">New Course</SelectItem>
                    <SelectItem value="assessment">Assessment</SelectItem>
                    <SelectItem value="due_date">Due Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-priority">Priority</Label>
                <Select value={newItem.priority} onValueChange={(value) => setNewItem({...newItem, priority: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input 
                id="edit-title"
                value={newItem.title}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                placeholder="Enter news item title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">Content</Label>
              <Textarea 
                id="edit-content"
                value={newItem.content}
                onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                placeholder="Enter news item content"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-date">Event Date</Label>
              <Input 
                id="edit-date"
                type="date"
                value={newItem.date}
                onChange={(e) => setNewItem({...newItem, date: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="text-xs sm:text-sm">
              Cancel
            </Button>
            <Button onClick={handleUpdate} style={{ backgroundColor: orgData.primaryColor }} className="text-white text-xs sm:text-sm">
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizationNewsFeedPage;