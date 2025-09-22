import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import {
  Trophy,
  Star,
  Zap,
  Target,
  Award,
  Crown,
  Medal,
  Flame,
  TrendingUp,
  Users,
  BookOpen,
  Clock,
  Calendar,
  Gift,
  Coins,
  Shield,
  Rocket,
  Brain,
  Heart,
  CheckCircle
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'learning' | 'social' | 'streak' | 'performance' | 'special';
  progress: number;
  maxProgress: number;
  earnedDate?: string;
  isEarned: boolean;
  points: number;
  color: string;
}

interface Leaderboard {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  level: number;
  streak: number;
  badge: string;
  isCurrentUser: boolean;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
  maxProgress: number;
  reward: {
    points: number;
    badge?: string;
    title?: string;
  };
  deadline: string;
  isCompleted: boolean;
  participants: number;
}

const GamificationHub = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  const playerStats = {
    level: 23,
    currentXP: 2450,
    nextLevelXP: 3000,
    totalPoints: 15780,
    streak: 12,
    rank: 8,
    badges: 24,
    achievements: 45,
    tier: 'Gold'
  };

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Speed Learner',
      description: 'Complete 5 courses in a month',
      icon: Zap,
      rarity: 'rare',
      category: 'learning',
      progress: 5,
      maxProgress: 5,
      earnedDate: '2024-03-01',
      isEarned: true,
      points: 500,
      color: '#3B82F6'
    },
    {
      id: '2',
      title: 'Perfect Score Master',
      description: 'Score 100% on 10 assessments',
      icon: Target,
      rarity: 'epic',
      category: 'performance',
      progress: 7,
      maxProgress: 10,
      isEarned: false,
      points: 1000,
      color: '#8B5CF6'
    },
    {
      id: '3',
      title: 'Social Butterfly',
      description: 'Participate in 20 forum discussions',
      icon: Users,
      rarity: 'common',
      category: 'social',
      progress: 15,
      maxProgress: 20,
      isEarned: false,
      points: 200,
      color: '#10B981'
    },
    {
      id: '4',
      title: 'Streak Master',
      description: 'Maintain a 30-day learning streak',
      icon: Flame,
      rarity: 'legendary',
      category: 'streak',
      progress: 12,
      maxProgress: 30,
      isEarned: false,
      points: 2000,
      color: '#F59E0B'
    }
  ];

  const leaderboard: Leaderboard[] = [
    {
      rank: 1,
      name: 'Alex Chen',
      avatar: '/avatar-1.jpg',
      points: 18950,
      level: 28,
      streak: 45,
      badge: 'Platinum Scholar',
      isCurrentUser: false
    },
    {
      rank: 2,
      name: 'Sarah Williams',
      avatar: '/avatar-2.jpg',
      points: 17230,
      level: 26,
      streak: 32,
      badge: 'Gold Master',
      isCurrentUser: false
    },
    {
      rank: 8,
      name: 'You',
      avatar: '/current-user.jpg',
      points: 15780,
      level: 23,
      streak: 12,
      badge: 'Gold Learner',
      isCurrentUser: true
    }
  ];

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Daily Knowledge Quest',
      description: 'Complete 1 lesson today',
      type: 'daily',
      difficulty: 'easy',
      progress: 0,
      maxProgress: 1,
      reward: {
        points: 50,
        badge: 'Daily Warrior'
      },
      deadline: '2024-03-12T23:59:59Z',
      isCompleted: false,
      participants: 245
    },
    {
      id: '2',
      title: 'Assessment Champion',
      description: 'Pass 3 assessments this week',
      type: 'weekly',
      difficulty: 'medium',
      progress: 1,
      maxProgress: 3,
      reward: {
        points: 300,
        title: 'Assessment Pro'
      },
      deadline: '2024-03-17T23:59:59Z',
      isCompleted: false,
      participants: 89
    },
    {
      id: '3',
      title: 'Community Helper',
      description: 'Help 5 peers in discussion forums',
      type: 'monthly',
      difficulty: 'hard',
      progress: 2,
      maxProgress: 5,
      reward: {
        points: 800,
        badge: 'Community Champion',
        title: 'Mentor'
      },
      deadline: '2024-03-31T23:59:59Z',
      isCompleted: false,
      participants: 156
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return 'bg-blue-100 text-blue-800';
      case 'weekly': return 'bg-purple-100 text-purple-800';
      case 'monthly': return 'bg-orange-100 text-orange-800';
      case 'special': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateLevelProgress = () => {
    return ((playerStats.currentXP - (playerStats.level - 1) * 100) / ((playerStats.level * 100) - ((playerStats.level - 1) * 100))) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Player Stats Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" style={{ color: orgData.primaryColor }} />
            <span>Your Learning Journey</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: orgData.primaryColor }}>
                {playerStats.level}
              </div>
              <div className="text-sm text-muted-foreground">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {playerStats.totalPoints.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                #{playerStats.rank}
              </div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {playerStats.streak}
              </div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Level {playerStats.level} Progress</span>
              <span className="text-sm text-muted-foreground">
                {playerStats.currentXP} / {playerStats.nextLevelXP} XP
              </span>
            </div>
            <Progress value={calculateLevelProgress()} className="h-3" />
            <div className="text-xs text-muted-foreground mt-1">
              {playerStats.nextLevelXP - playerStats.currentXP} XP to next level
            </div>
          </div>

          {/* Tier Badge */}
          <div className="flex items-center justify-center">
            <Badge 
              className="px-4 py-2 text-sm font-semibold"
              style={{ backgroundColor: orgData.primaryColor, color: 'white' }}
            >
              <Crown className="h-4 w-4 mr-2" />
              {playerStats.tier} Tier Learner
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5" style={{ color: orgData.primaryColor }} />
              <span>Achievements</span>
            </div>
            <Button variant="outline" size="sm">
              View All ({playerStats.achievements})
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`${getRarityColor(achievement.rarity)} ${achievement.isEarned ? 'border-2' : 'opacity-75'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div 
                      className="p-2 rounded-full"
                      style={{ backgroundColor: achievement.color + '20' }}
                    >
                      <achievement.icon 
                        className="h-6 w-6" 
                        style={{ color: achievement.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-sm">{achievement.title}</h4>
                        <Badge variant="outline" className="text-xs capitalize">
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      
                      {!achievement.isEarned ? (
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs">Progress</span>
                            <span className="text-xs">{achievement.progress}/{achievement.maxProgress}</span>
                          </div>
                          <Progress 
                            value={(achievement.progress / achievement.maxProgress) * 100} 
                            className="h-2" 
                          />
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Earned
                          </Badge>
                          {achievement.earnedDate && (
                            <span className="text-xs text-muted-foreground">
                              {new Date(achievement.earnedDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-1">
                          <Coins className="h-3 w-3 text-yellow-600" />
                          <span className="text-xs font-medium">{achievement.points} XP</span>
                        </div>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {achievement.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Daily Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" style={{ color: orgData.primaryColor }} />
            <span>Active Challenges</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="border-l-4" style={{ borderLeftColor: orgData.primaryColor }}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={getTypeColor(challenge.type)}>
                          {challenge.type.toUpperCase()}
                        </Badge>
                        <Badge className={getDifficultyColor(challenge.difficulty)}>
                          {challenge.difficulty.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          {challenge.participants} participating
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Coins className="h-4 w-4 text-yellow-600" />
                        <span className="font-semibold">{challenge.reward.points} XP</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Ends: {new Date(challenge.deadline).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Progress</span>
                      <span className="text-sm">{challenge.progress}/{challenge.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(challenge.progress / challenge.maxProgress) * 100} 
                      className="h-2" 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Reward: {challenge.reward.points} XP
                      {challenge.reward.badge && ` + ${challenge.reward.badge} badge`}
                      {challenge.reward.title && ` + "${challenge.reward.title}" title`}
                    </div>
                    
                    {!challenge.isCompleted && (
                      <Button 
                        size="sm" 
                        style={{ backgroundColor: orgData.primaryColor }}
                        className="text-white"
                      >
                        <Rocket className="h-4 w-4 mr-2" />
                        Start Challenge
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" style={{ color: orgData.primaryColor }} />
            <span>Leaderboard</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((player) => (
              <div 
                key={player.rank} 
                className={`flex items-center space-x-4 p-3 rounded-lg ${
                  player.isCurrentUser ? 'bg-blue-50 border-2 border-blue-200' : 'bg-muted/50'
                }`}
              >
                <div className="text-center w-8">
                  {player.rank <= 3 ? (
                    <Medal className={`h-6 w-6 ${
                      player.rank === 1 ? 'text-yellow-500' : 
                      player.rank === 2 ? 'text-gray-400' : 'text-orange-600'
                    }`} />
                  ) : (
                    <span className="font-bold text-lg">#{player.rank}</span>
                  )}
                </div>
                
                <Avatar>
                  <AvatarImage src={player.avatar} alt={player.name} />
                  <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="font-semibold">{player.name}</div>
                  <div className="text-sm text-muted-foreground">{player.badge}</div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold">{player.points.toLocaleString()} XP</div>
                  <div className="text-sm text-muted-foreground">
                    Level {player.level} • {player.streak} day streak
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Button variant="outline" size="sm">
              View Full Leaderboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationHub;