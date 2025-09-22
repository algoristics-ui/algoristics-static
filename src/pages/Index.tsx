import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user, logout, restoreSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only restore session if not already authenticated
    if (!user) {
      restoreSession();
    }
  }, [user, restoreSession]);

  useEffect(() => {
    // If user is authenticated and is a Super Admin, show a button to go back to dashboard
    // Don't auto-redirect, let them choose
    if (user && user.role === 'super_admin') {
      // Super Admin is on home page - this is allowed, they can navigate back to dashboard
    }
  }, [user]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        <main className="pt-16">
          <HeroSection />
          <FeatureShowcase />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
