import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import {
  Brain,
  TrendingUp,
  Target,
  Star,
  Clock,
  Users,
  BookOpen,
  Lightbulb,
  Award,
  ArrowRight,
  Zap,
  ThumbsUp,
  Eye
} from "lucide-react";

interface Recommendation {
  id: string;
  title: string;
  type: 'skill_gap' | 'role_based' | 'interest_based' | 'trending' | 'peer_recommended' | 'career_path';
  reason: string;
  course: {
    id: string;
    title: string;
    instructor: string;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    rating: number;
    enrollments: number;
    thumbnail: string;
    skills: string[];
    matchScore: number;
  };
  urgency: 'high' | 'medium' | 'low';
  category: string;
  estimatedImpact: string;
}

interface SkillGap {
  skill: string;
  currentLevel: number;
  targetLevel: number;
  importance: 'critical' | 'high' | 'medium' | 'low';
  recommendedCourses: string[];
  timeToClose: string;
  businessImpact: string;
}

interface CareerPath {
  currentRole: string;
  targetRole: string;
  progress: number;
  requiredSkills: string[];
  recommendedCourses: string[];
  timeToAchieve: string;
  salaryIncrease?: string;
}

const RecommendationEngine = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Close Critical Skill Gap',
      type: 'skill_gap',
      reason: 'You need advanced React skills for your current role as Frontend Developer',
      course: {
        id: '1',
        title: 'Advanced React Patterns and Performance',
        instructor: 'Sarah Chen',
        duration: '6 weeks',
        level: 'advanced',
        rating: 4.9,
        enrollments: 1250,
        thumbnail: '/course-1.jpg',
        skills: ['React Hooks', 'Performance Optimization', 'State Management'],
        matchScore: 95
      },
      urgency: 'high',
      category: 'Frontend Development',
      estimatedImpact: 'High - Directly impacts current role performance'
    },
    {
      id: '2',
      title: 'Career Advancement Opportunity',
      type: 'career_path',
      reason: 'Required for promotion to Senior Frontend Developer',
      course: {
        id: '2',
        title: 'Technical Leadership and Mentoring',
        instructor: 'Michael Rodriguez',
        duration: '4 weeks',
        level: 'intermediate',
        rating: 4.7,
        enrollments: 890,
        thumbnail: '/course-2.jpg',
        skills: ['Leadership', 'Mentoring', 'Team Management'],
        matchScore: 88
      },
      urgency: 'medium',
      category: 'Leadership',
      estimatedImpact: 'Very High - Enables career progression'
    },
    {
      id: '3',
      title: 'Trending in Your Field',
      type: 'trending',
      reason: 'AI/ML is becoming essential for modern web development',
      course: {
        id: '3',
        title: 'AI for Frontend Developers',
        instructor: 'Dr. Emma Watson',
        duration: '8 weeks',
        level: 'intermediate',
        rating: 4.8,
        enrollments: 2100,
        thumbnail: '/course-3.jpg',
        skills: ['Machine Learning', 'TensorFlow.js', 'AI Integration'],
        matchScore: 82
      },
      urgency: 'medium',
      category: 'Artificial Intelligence',
      estimatedImpact: 'High - Future-proofs your skills'
    },
    {
      id: '4',
      title: 'Peer Recommendation',
      type: 'peer_recommended',
      reason: 'Highly rated by developers in similar roles',
      course: {
        id: '4',
        title: 'Modern CSS Architecture',
        instructor: 'Alex Thompson',
        duration: '3 weeks',
        level: 'intermediate',
        rating: 4.6,
        enrollments: 1560,
        thumbnail: '/course-4.jpg',
        skills: ['CSS Grid', 'Flexbox', 'Design Systems'],
        matchScore: 75
      },
      urgency: 'low',
      category: 'CSS & Design',
      estimatedImpact: 'Medium - Enhances design capabilities'
    }
  ];

  const skillGaps: SkillGap[] = [
    {
      skill: 'Advanced React',
      currentLevel: 6,
      targetLevel: 9,
      importance: 'critical',
      recommendedCourses: ['Advanced React Patterns and Performance'],
      timeToClose: '6-8 weeks',
      businessImpact: 'Critical for Q2 project deliverables'
    },
    {
      skill: 'TypeScript',
      currentLevel: 4,
      targetLevel: 8,
      importance: 'high',
      recommendedCourses: ['TypeScript Mastery', 'Advanced TypeScript Patterns'],
      timeToClose: '4-6 weeks',
      businessImpact: 'Improves code quality and team productivity'
    },
    {
      skill: 'System Design',
      currentLevel: 3,
      targetLevel: 7,
      importance: 'medium',
      recommendedCourses: ['Frontend System Design', 'Scalable Web Architecture'],
      timeToClose: '8-10 weeks',
      businessImpact: 'Essential for senior role progression'
    }
  ];

  const careerPath: CareerPath = {
    currentRole: 'Frontend Developer',
    targetRole: 'Senior Frontend Developer',
    progress: 65,
    requiredSkills: ['Advanced React', 'TypeScript', 'System Design', 'Team Leadership'],
    recommendedCourses: [
      'Advanced React Patterns and Performance',
      'Technical Leadership and Mentoring',
      'TypeScript Mastery'
    ],
    timeToAchieve: '6-12 months',
    salaryIncrease: '15-25%'
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'skill_gap': return <Target className="h-4 w-4" />;
      case 'career_path': return <TrendingUp className="h-4 w-4" />;
      case 'trending': return <Zap className="h-4 w-4" />;
      case 'peer_recommended': return <ThumbsUp className="h-4 w-4" />;
      case 'interest_based': return <Star className="h-4 w-4" />;
      case 'role_based': return <Users className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI-Powered Recommendations Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" style={{ color: orgData.primaryColor }} />
            <span>AI-Powered Learning Recommendations</span>
          </CardTitle>
          <CardDescription>
            Personalized course suggestions based on your role, skills, and career goals
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Career Path Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" style={{ color: orgData.primaryColor }} />
            <span>Career Progression Path</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{careerPath.currentRole}</div>
                <div className="text-sm text-muted-foreground">Current Role</div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-semibold">{careerPath.targetRole}</div>
                <div className="text-sm text-muted-foreground">Target Role</div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress to Target Role</span>
                <span className="text-sm font-medium">{careerPath.progress}%</span>
              </div>
              <Progress value={careerPath.progress} className="h-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <div className="text-sm text-muted-foreground">Time to Achieve</div>
                <div className="font-medium">{careerPath.timeToAchieve}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Salary Increase</div>
                <div className="font-medium text-green-600">{careerPath.salaryIncrease}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Skills Needed</div>
                <div className="font-medium">{careerPath.requiredSkills.length}</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Required Skills</div>
              <div className="flex flex-wrap gap-2">
                {careerPath.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Gap Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" style={{ color: orgData.primaryColor }} />
            <span>Skill Gap Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillGaps.map((gap, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{gap.skill}</h4>
                    <Badge className={`text-xs ${getImportanceColor(gap.importance)} bg-transparent border-current`}>
                      {gap.importance.toUpperCase()} PRIORITY
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Skill Level</div>
                    <div className="font-semibold">
                      {gap.currentLevel}/10 → {gap.targetLevel}/10
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Current Progress</span>
                    <span className="text-sm">{gap.currentLevel}/10</span>
                  </div>
                  <Progress value={(gap.currentLevel / 10) * 100} className="h-2 mb-2" />
                  <div className="text-xs text-muted-foreground">
                    Gap: {gap.targetLevel - gap.currentLevel} levels | {gap.timeToClose} to close
                  </div>
                </div>

                <div className="text-sm">
                  <div className="text-muted-foreground mb-1">Business Impact:</div>
                  <div>{gap.businessImpact}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recommended for You</h3>
        {recommendations.map((rec) => (
          <Card key={rec.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-muted">
                    {getTypeIcon(rec.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{rec.reason}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge className={getUrgencyColor(rec.urgency)}>
                        {rec.urgency.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {rec.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {rec.course.matchScore}% Match
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="border rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-semibold">{rec.course.title}</h5>
                    <p className="text-sm text-muted-foreground">by {rec.course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{rec.course.rating}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {rec.course.enrollments.toLocaleString()} students
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                    <div className="text-sm font-medium">{rec.course.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Level</div>
                    <div className="text-sm font-medium capitalize">{rec.course.level}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                    <div className="text-sm font-medium">{rec.estimatedImpact.split(' - ')[0]}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-1">Skills You'll Learn</div>
                  <div className="flex flex-wrap gap-1">
                    {rec.course.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Impact Assessment */}
              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                <div className="text-sm">
                  <span className="font-medium text-blue-900">Expected Impact: </span>
                  <span className="text-blue-800">{rec.estimatedImpact}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Course
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Add to Wishlist
                  </Button>
                  <Button 
                    size="sm" 
                    style={{ backgroundColor: orgData.primaryColor }}
                    className="text-white"
                    onClick={() => navigate(`/${orgData.acronym}/learner/courses`)}
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5" style={{ color: orgData.primaryColor }} />
            <span>Learning Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Your Learning Pattern</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Preferred Learning Time:</span>
                  <span className="font-medium">Evenings (6-9 PM)</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Session Length:</span>
                  <span className="font-medium">45 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Learning Streak:</span>
                  <span className="font-medium">12 days</span>
                </div>
                <div className="flex justify-between">
                  <span>Completion Rate:</span>
                  <span className="font-medium text-green-600">89%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Trending in Your Industry</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm">AI/Machine Learning</span>
                  <Badge variant="secondary" className="text-xs">+45%</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Cloud Architecture</span>
                  <Badge variant="secondary" className="text-xs">+38%</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm">DevOps Practices</span>
                  <Badge variant="secondary" className="text-xs">+32%</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecommendationEngine;