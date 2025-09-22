import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Clock, Users, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const GetStartedPage = () => {
  // Ensure page starts at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "Forever",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 50 learners",
        "5 courses maximum",
        "Basic assessments",
        "Community support",
        "Mobile access",
        "Basic analytics"
      ],
      cta: "Start Free",
      popular: false,
      ctaAction: () => window.location.href = '/login'
    },
    {
      name: "Professional",
      price: "$49",
      period: "per month",
      description: "For growing organizations with advanced needs",
      features: [
        "Up to 500 learners",
        "Unlimited courses",
        "Advanced assessments",
        "Proctoring features",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "Integrations"
      ],
      cta: "Start Free Trial",
      popular: true,
      ctaAction: () => window.location.href = '/login'
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with complex requirements",
      features: [
        "Unlimited learners",
        "Unlimited courses",
        "White-label solution",
        "Custom integrations",
        "Dedicated support",
        "Advanced security",
        "Custom deployment",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false,
      ctaAction: () => window.location.href = '/request-demo'
    }
  ];

  const steps = [
    {
      icon: Users,
      title: "Create Your Account",
      description: "Sign up in under 2 minutes. No credit card required for free plan.",
      time: "2 min"
    },
    {
      icon: Zap,
      title: "Set Up Your Organization",
      description: "Configure your learning environment with our guided setup wizard.",
      time: "5 min"
    },
    {
      icon: CheckCircle2,
      title: "Create Your First Course",
      description: "Use our intuitive course builder to create engaging content.",
      time: "15 min"
    },
    {
      icon: ArrowRight,
      title: "Invite Your Team",
      description: "Add learners and start delivering exceptional learning experiences.",
      time: "5 min"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            Get Started with Algoristics
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transform your learning programs in minutes. Choose the plan that fits your needs 
            and start creating exceptional learning experiences today.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                )}
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="font-bold">{step.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.time}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with our free plan and upgrade as you grow. All plans include our core features 
            and can be upgraded or downgraded at any time.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-elegant' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period !== "pricing" && (
                      <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    size="lg"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={plan.ctaAction}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Need Help Choosing?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Not sure which plan is right for you? Our team can help you find the perfect 
                solution for your organization's needs.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link to="/consultation">Schedule Free Consultation</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/request-demo">Request Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ready to Start Building?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Join thousands of organizations already using Algoristics to create 
                exceptional learning experiences.
              </p>
              <div className="space-y-3">
                <Button onClick={() => window.location.href = '/login'} className="w-full">
                  Start Free Account
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/watch-video">Watch Demo Videos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-4">Trusted by Learning Organizations Worldwide</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto text-sm text-muted-foreground">
            <div>
              <div className="text-2xl font-bold text-foreground">99.9%</div>
              <div>Uptime SLA</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div>Support Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">SOC 2</div>
              <div>Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;