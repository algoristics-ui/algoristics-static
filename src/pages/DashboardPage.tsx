import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Award,
  AlertCircle,
  Calendar,
  Clock,
  Target,
  Star,
  Megaphone
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SuperAdminDashboard from "@/components/SuperAdminDashboard";

const DashboardPage = () => {
  const { user } = useAuth();

  // Render Super Admin dashboard if user is super admin
  if (user?.role === 'super_admin') {
    return <SuperAdminDashboard />;
  }

  // Regular user dashboard content would go here
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Regular user dashboard content</p>
    </div>
  );
};

export default DashboardPage;