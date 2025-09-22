import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrganizationDataFromPath } from "@/utils/organizationData";
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  Calendar,
  Shield,
  Award,
  Target,
  TrendingUp
} from "lucide-react";

interface ComplianceItem {
  id: string;
  title: string;
  category: 'mandatory' | 'regulatory' | 'certification' | 'ceu';
  status: 'compliant' | 'overdue' | 'expiring' | 'pending';
  dueDate: string;
  completionDate?: string;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  requirements: string[];
  expirationDate?: string;
  renewalRequired?: boolean;
  regulatoryBody?: string;
  credits?: number;
}

const ComplianceTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orgData = getOrganizationDataFromPath(location.pathname);

  const complianceItems: ComplianceItem[] = [
    {
      id: '1',
      title: 'Annual Safety Training',
      category: 'mandatory',
      status: 'overdue',
      dueDate: '2024-03-01',
      progress: 60,
      priority: 'high',
      requirements: ['Safety Protocols', 'Emergency Procedures', 'Equipment Training'],
      regulatoryBody: 'OSHA'
    },
    {
      id: '2',
      title: 'Data Privacy Certification',
      category: 'certification',
      status: 'expiring',
      dueDate: '2024-04-15',
      completionDate: '2023-04-15',
      progress: 100,
      priority: 'high',
      requirements: ['GDPR Training', 'Privacy Assessment'],
      expirationDate: '2024-04-15',
      renewalRequired: true
    },
    {
      id: '3',
      title: 'Continuing Education Units',
      category: 'ceu',
      status: 'pending',
      dueDate: '2024-12-31',
      progress: 25,
      priority: 'medium',
      requirements: ['Professional Development', 'Industry Training'],
      credits: 12
    },
    {
      id: '4',
      title: 'Anti-Harassment Training',
      category: 'regulatory',
      status: 'compliant',
      dueDate: '2024-12-01',
      completionDate: '2024-01-15',
      progress: 100,
      priority: 'high',
      requirements: ['Workplace Ethics', 'Reporting Procedures']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'expiring': return 'bg-orange-100 text-orange-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'expiring': return <Clock className="h-4 w-4 text-orange-600" />;
      case 'pending': return <Target className="h-4 w-4 text-blue-600" />;
      default: return <Shield className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mandatory': return <Shield className="h-4 w-4" />;
      case 'regulatory': return <AlertTriangle className="h-4 w-4" />;
      case 'certification': return <Award className="h-4 w-4" />;
      case 'ceu': return <TrendingUp className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const overallCompliance = Math.round(
    (complianceItems.filter(item => item.status === 'compliant').length / complianceItems.length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" style={{ color: orgData.primaryColor }} />
            <span>Compliance Overview</span>
          </CardTitle>
          <CardDescription>
            Track your mandatory training and certification requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: orgData.primaryColor }}>
                {overallCompliance}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Compliance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {complianceItems.filter(item => item.status === 'overdue').length}
              </div>
              <div className="text-sm text-muted-foreground">Overdue Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {complianceItems.filter(item => item.status === 'expiring').length}
              </div>
              <div className="text-sm text-muted-foreground">Expiring Soon</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {complianceItems.filter(item => item.status === 'compliant').length}
              </div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </div>
          </div>
          <Progress value={overallCompliance} className="h-3" />
        </CardContent>
      </Card>

      {/* Compliance Items */}
      <div className="grid gap-4">
        {complianceItems.map((item) => {
          const daysUntilDue = getDaysUntilDue(item.dueDate);
          
          return (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {item.category.toUpperCase()}
                        </Badge>
                        {item.regulatoryBody && (
                          <Badge variant="secondary" className="text-xs">
                            {item.regulatoryBody}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(item.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(item.status)}
                        <span>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                      </div>
                    </Badge>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>

                {/* Due Date and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Due Date:</span>
                      <span className={daysUntilDue < 0 ? 'text-red-600 font-semibold' : daysUntilDue < 30 ? 'text-orange-600' : ''}>
                        {new Date(item.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    {daysUntilDue >= 0 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {daysUntilDue} days remaining
                      </div>
                    )}
                    {daysUntilDue < 0 && (
                      <div className="text-xs text-red-600 font-medium mt-1">
                        {Math.abs(daysUntilDue)} days overdue
                      </div>
                    )}
                  </div>
                  
                  {item.expirationDate && (
                    <div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Expires:</span>
                        <span>{new Date(item.expirationDate).toLocaleDateString()}</span>
                      </div>
                      {item.renewalRequired && (
                        <div className="text-xs text-orange-600 mt-1">
                          Renewal required
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Requirements:</div>
                  <div className="flex flex-wrap gap-2">
                    {item.requirements.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {item.credits && (
                      <Badge variant="secondary" className="text-xs">
                        {item.credits} Credits
                      </Badge>
                    )}
                    {item.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">
                        High Priority
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {item.status !== 'compliant' && (
                      <Button 
                        size="sm" 
                        style={{ backgroundColor: orgData.primaryColor }}
                        className="text-white"
                        onClick={() => navigate(`/${orgData.acronym}/learner/courses`)}
                      >
                        {item.progress > 0 ? 'Continue' : 'Start Training'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ComplianceTracker;