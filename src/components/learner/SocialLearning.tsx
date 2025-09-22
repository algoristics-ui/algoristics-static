import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import { useState } from "react";
import {
  MessageSquare,
  Users,
  Heart,
  Share2,
  Send,
  Search,
  Video,
  Calendar,
  BookOpen,
  Star,
  ThumbsUp,
  MessageCircle,
  UserPlus,
  Bell,
  Pin,
  Award,
  TrendingUp,
  Clock,
  Eye,
  Filter
} from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    reputation: number;
  };
  course?: string;
  category: string;
  tags: string[];
  createdAt: string;
  likes: number;
  replies: number;
  views: number;
  isLiked: boolean;
  isPinned: boolean;
  hasAnswered: boolean;
  bestAnswer?: string;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  course: string;
  members: number;
  maxMembers: number;
  privacy: 'public' | 'private' | 'invite_only';
  meetingTime: string;
  location: string;
  tags: string[];
  organizer: {
    name: string;
    avatar: string;
  };
  nextMeeting: string;
  isJoined: boolean;
  recentActivity: string;
}

interface PeerConnection {
  id: string;
  name: string;
  avatar: string;
  role: string;
  sharedCourses: string[];
  mutualConnections: number;
  lastActive: string;
  isConnected: boolean;
  connectionStatus: 'connected' | 'pending' | 'not_connected';
  reputation: number;
  badges: string[];
}

interface VirtualSession {
  id: string;
  title: string;
  instructor: string;
  course: string;
  date: string;
  time: string;
  duration: string;
  type: 'lecture' | 'discussion' | 'lab' | 'office_hours';
  participants: number;
  maxParticipants: number;
  isLive: boolean;
  isRegistered: boolean;
  recordingAvailable: boolean;
}

const SocialLearning = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'How to optimize React component performance?',
      content: 'I\'m working on a large React application and noticing some performance issues...',
      author: {
        name: 'Sarah Chen',
        avatar: '/avatar-1.jpg',
        role: 'Student',
        reputation: 245
      },
      course: 'Advanced React Fundamentals',
      category: 'Technical Discussion',
      tags: ['React', 'Performance', 'Optimization'],
      createdAt: '2024-03-10T10:30:00Z',
      likes: 23,
      replies: 8,
      views: 156,
      isLiked: false,
      isPinned: false,
      hasAnswered: true,
      bestAnswer: 'Use React.memo and useMemo for expensive calculations...'
    },
    {
      id: '2',
      title: 'Study Group for Machine Learning Final',
      content: 'Looking for serious students to form a study group for the upcoming ML final exam...',
      author: {
        name: 'Michael Rodriguez',
        avatar: '/avatar-2.jpg',
        role: 'Student',
        reputation: 189
      },
      course: 'Machine Learning Fundamentals',
      category: 'Study Groups',
      tags: ['Study Group', 'Machine Learning', 'Final Exam'],
      createdAt: '2024-03-09T15:45:00Z',
      likes: 15,
      replies: 12,
      views: 89,
      isLiked: true,
      isPinned: true,
      hasAnswered: false
    }
  ];

  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'React Advanced Patterns Study Group',
      description: 'Weekly study sessions focusing on advanced React patterns, hooks, and performance optimization.',
      course: 'Advanced React Fundamentals',
      members: 8,
      maxMembers: 12,
      privacy: 'public',
      meetingTime: 'Saturdays 2:00 PM',
      location: 'Library Room 203 / Zoom',
      tags: ['React', 'JavaScript', 'Frontend'],
      organizer: {
        name: 'Emma Wilson',
        avatar: '/avatar-3.jpg'
      },
      nextMeeting: '2024-03-16T14:00:00Z',
      isJoined: true,
      recentActivity: 'New study materials shared 2 hours ago'
    },
    {
      id: '2',
      name: 'ML Math Fundamentals',
      description: 'Focus on the mathematical foundations of machine learning algorithms.',
      course: 'Machine Learning Fundamentals',
      members: 6,
      maxMembers: 10,
      privacy: 'public',
      meetingTime: 'Thursdays 6:00 PM',
      location: 'Online (Discord)',
      tags: ['Math', 'Statistics', 'Machine Learning'],
      organizer: {
        name: 'David Kim',
        avatar: '/avatar-4.jpg'
      },
      nextMeeting: '2024-03-14T18:00:00Z',
      isJoined: false,
      recentActivity: 'Practice problems posted yesterday'
    }
  ];

  const peerConnections: PeerConnection[] = [
    {
      id: '1',
      name: 'Alex Thompson',
      avatar: '/avatar-5.jpg',
      role: 'Senior Student',
      sharedCourses: ['Advanced React Fundamentals', 'JavaScript Patterns'],
      mutualConnections: 3,
      lastActive: '2 hours ago',
      isConnected: true,
      connectionStatus: 'connected',
      reputation: 320,
      badges: ['Top Contributor', 'Study Group Leader']
    },
    {
      id: '2',
      name: 'Jessica Liu',
      avatar: '/avatar-6.jpg',
      role: 'Student',
      sharedCourses: ['Machine Learning Fundamentals'],
      mutualConnections: 1,
      lastActive: '1 day ago',
      isConnected: false,
      connectionStatus: 'not_connected',
      reputation: 180,
      badges: ['Active Learner']
    }
  ];

  const virtualSessions: VirtualSession[] = [
    {
      id: '1',
      title: 'Advanced React Hooks Deep Dive',
      instructor: 'Dr. Sarah Johnson',
      course: 'Advanced React Fundamentals',
      date: '2024-03-15',
      time: '3:00 PM',
      duration: '90 minutes',
      type: 'lecture',
      participants: 45,
      maxParticipants: 50,
      isLive: false,
      isRegistered: true,
      recordingAvailable: false
    },
    {
      id: '2',
      title: 'Office Hours: ML Project Help',
      instructor: 'Prof. Michael Chen',
      course: 'Machine Learning Fundamentals',
      date: '2024-03-12',
      time: '4:00 PM',
      duration: '60 minutes',
      type: 'office_hours',
      participants: 8,
      maxParticipants: 15,
      isLive: true,
      isRegistered: false,
      recordingAvailable: false
    }
  ];

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="forum" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forum">Discussion Forum</TabsTrigger>
          <TabsTrigger value="groups">Study Groups</TabsTrigger>
          <TabsTrigger value="peers">Peer Network</TabsTrigger>
          <TabsTrigger value="sessions">Virtual Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-4">
          {/* New Post Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" style={{ color: orgData.primaryColor }} />
                <span>Start a Discussion</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="What's your question or topic?"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
              <Textarea
                placeholder="Share your thoughts, ask for help, or start a discussion..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={3}
              />
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="cursor-pointer">
                    + Add Tags
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer">
                    + Select Course
                  </Badge>
                </div>
                <Button 
                  style={{ backgroundColor: orgData.primaryColor }}
                  className="text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post Discussion
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Forum Posts */}
          <div className="space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            {post.isPinned && (
                              <Pin className="h-4 w-4 text-blue-600" />
                            )}
                            <h3 className="font-semibold">{post.title}</h3>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{post.author.name}</span>
                            <span>•</span>
                            <span>{post.author.role}</span>
                            <span>•</span>
                            <span>{getTimeAgo(post.createdAt)}</span>
                            {post.course && (
                              <>
                                <span>•</span>
                                <span className="text-blue-600">{post.course}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{post.author.reputation}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {post.content}
                      </p>

                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.hasAnswered && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            Answered
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className={`h-4 w-4 ${post.isLiked ? 'text-blue-600' : ''}`} />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Heart className="h-4 w-4 mr-1" />
                            Like
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Reply
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          {/* Study Groups */}
          <div className="grid gap-4">
            {studyGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{group.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {group.course}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {group.privacy.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {group.isJoined && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Joined
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Avatar>
                      <AvatarImage src={group.organizer.avatar} alt={group.organizer.name} />
                      <AvatarFallback>{group.organizer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Members</div>
                      <div className="font-medium">{group.members}/{group.maxMembers}</div>
                      <Progress value={(group.members / group.maxMembers) * 100} className="h-1 mt-1" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Meeting Time</div>
                      <div className="font-medium">{group.meetingTime}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Location</div>
                      <div className="font-medium">{group.location}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-1">Topics</div>
                    <div className="flex flex-wrap gap-2">
                      {group.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {group.recentActivity}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {group.isJoined ? (
                        <Button 
                          variant="outline"
                          size="sm"
                        >
                          Leave Group
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          style={{ backgroundColor: orgData.primaryColor }}
                          className="text-white"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Join Group
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="peers" className="space-y-4">
          {/* Peer Connections */}
          <div className="grid gap-4">
            {peerConnections.map((peer) => (
              <Card key={peer.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={peer.avatar} alt={peer.name} />
                      <AvatarFallback>{peer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{peer.name}</h3>
                          <p className="text-sm text-muted-foreground">{peer.role}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs">{peer.reputation} reputation</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{peer.lastActive}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          {peer.isConnected ? (
                            <Button variant="outline" size="sm">
                              Connected
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              style={{ backgroundColor: orgData.primaryColor }}
                              className="text-white"
                            >
                              <UserPlus className="h-4 w-4 mr-2" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="text-sm text-muted-foreground mb-1">Shared Courses</div>
                        <div className="flex flex-wrap gap-2">
                          {peer.sharedCourses.map((course, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {peer.badges.map((badge, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          {peer.mutualConnections} mutual connections
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          {/* Virtual Sessions */}
          <div className="grid gap-4">
            {virtualSessions.map((session) => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg">{session.title}</h3>
                        {session.isLive && (
                          <Badge className="bg-red-100 text-red-800 text-xs">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                              <span>LIVE</span>
                            </div>
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {session.instructor} • {session.course}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline" className="text-xs capitalize">
                          {session.type.replace('_', ' ')}
                        </Badge>
                        {session.isRegistered && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            Registered
                          </Badge>
                        )}
                        {session.recordingAvailable && (
                          <Badge variant="secondary" className="text-xs">
                            Recording Available
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="font-medium">{new Date(session.date).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Time</div>
                      <div className="font-medium">{session.time}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                      <div className="font-medium">{session.duration}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Participants</div>
                      <div className="font-medium">{session.participants}/{session.maxParticipants}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Progress 
                      value={(session.participants / session.maxParticipants) * 100} 
                      className="flex-1 mr-4 h-2" 
                    />
                    
                    <div className="flex space-x-2">
                      {session.recordingAvailable && (
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Watch Recording
                        </Button>
                      )}
                      {session.isLive ? (
                        <Button 
                          size="sm" 
                          style={{ backgroundColor: orgData.primaryColor }}
                          className="text-white"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Join Now
                        </Button>
                      ) : session.isRegistered ? (
                        <Button variant="outline" size="sm">
                          Registered
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          style={{ backgroundColor: orgData.primaryColor }}
                          className="text-white"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Register
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialLearning;