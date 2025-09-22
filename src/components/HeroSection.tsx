import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";

const HeroSection = () => {
  const navigateWithScroll = useScrollNavigation();
  
  return (
    <section className="relative py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/60" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          
          {/* Main Heading */}
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="text-white drop-shadow-lg">Empower Learning,</span>
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent block drop-shadow-lg">
                Drive Success
              </span>
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-sm">
              The complete learning management platform that transforms how educational institutions, 
              corporations, and training organizations deliver exceptional learning experiences.
            </p>
          </div>

          {/* Key Value Props */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 glass bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">For Universities</h3>
              <p className="text-white/80 text-xs md:text-sm">Streamline academic programs with powerful course management and assessment tools</p>
            </Card>
            
            <Card className="p-6 glass bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">For Corporations</h3>
              <p className="text-white/80 text-xs md:text-sm">Scale employee training with enterprise-grade security and detailed analytics</p>
            </Card>
            
            <Card className="p-6 glass bg-white/10 border-white/20 backdrop-blur-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">For Learners</h3>
              <p className="text-white/80 text-xs md:text-sm">Engage with interactive content and track progress in an intuitive learning environment</p>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="px-10 py-4 text-lg font-semibold bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-elegant"
              onClick={() => navigateWithScroll('/request-demo')}
            >
              Request Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-white text-white bg-black/20 hover:bg-black/30 transition-all duration-300"
              onClick={() => navigateWithScroll('/watch-video')}
            >
              <Play className="w-5 h-5 mr-3 text-white" />
              <span className="text-white font-bold">Watch Video</span>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;