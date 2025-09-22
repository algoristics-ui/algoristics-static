import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Rocket, MessageSquare, Calendar, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
const CTASection = () => {
  const navigateWithScroll = useScrollNavigation();
  
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Main CTA Content */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Start Your Learning
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Revolution Today
              </span>
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Transform how your organization learns, grows, and succeeds with our comprehensive 
              learning management platform.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-sm md:text-base font-semibold text-white mb-1">Quick Setup</h4>
                <p className="text-white/80 text-xs md:text-sm">Get started in minutes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-sm md:text-base font-semibold text-white mb-1">24/7 Support</h4>
                <p className="text-white/80 text-xs md:text-sm">Expert help when you need it</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-sm md:text-base font-semibold text-white mb-1">Proven Results</h4>
                <p className="text-white/80 text-xs md:text-sm">500+ success stories</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button 
              size="lg" 
              className="px-12 py-4 text-lg font-bold bg-white text-primary hover:bg-white/90 transition-all duration-300 shadow-elegant"
              onClick={() => navigateWithScroll('/get-started')}
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-white text-white bg-black/20 hover:bg-black/30 transition-all duration-300"
              onClick={() => navigateWithScroll('/request-demo')}
            >
              <Calendar className="w-5 h-5 mr-3 text-white" />
              <span className="text-white font-bold">Book Demo</span>
            </Button>
          </div>

          {/* Trust badge */}
          <div className="pt-8">
            <p className="text-white/70 text-sm mb-4">🔒 SOC 2 Compliant • GDPR Ready • Enterprise Security</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CTASection;