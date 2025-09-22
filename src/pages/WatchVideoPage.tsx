import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const WatchVideoPage = () => {
  const [selectedVideo, setSelectedVideo] = useState('overview');

  // Ensure page starts at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const videos = {
    overview: {
      title: "Platform Overview",
      duration: "5:32",
      description: "Get a comprehensive overview of Algoristics' key features and capabilities",
      thumbnail: "/api/placeholder/600/400",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
    },
    demo: {
      title: "Live Demo Walkthrough",
      duration: "12:45",
      description: "Watch a detailed walkthrough of creating courses and managing learners",
      thumbnail: "/api/placeholder/600/400",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
    },
    assessment: {
      title: "Advanced Assessment Features",
      duration: "8:21",
      description: "Discover our powerful assessment engine and proctoring capabilities",
      thumbnail: "/api/placeholder/600/400",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
    },
    analytics: {
      title: "Learning Analytics Dashboard",
      duration: "6:18",
      description: "Explore our comprehensive analytics and reporting features",
      thumbnail: "/api/placeholder/600/400",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder
    }
  };

  const testimonials = [
    {
      name: "Sarah Wilson",
      role: "Director of Learning",
      organization: "TechCorp",
      feedback: "The video really helped us understand the platform's potential. The demo was comprehensive and answered all our questions."
    },
    {
      name: "Dr. Michael Chen",
      role: "Dean of Online Education",
      organization: "State University",
      feedback: "Seeing the platform in action convinced us it was the right choice for our institution."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Watch Our Videos</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Explore Algoristics through our comprehensive video library. See our platform 
            in action and discover how it can transform your learning programs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardContent className="p-0">
                <div className="aspect-video bg-slate-900 rounded-t-lg relative">
                  {/* Placeholder for video player */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/80 to-secondary/80 rounded-t-lg">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <h3 className="text-2xl font-bold mb-2">{videos[selectedVideo as keyof typeof videos].title}</h3>
                      <p className="text-white/80 mb-4">{videos[selectedVideo as keyof typeof videos].description}</p>
                      <Button
                        size="lg"
                        className="bg-white text-primary hover:bg-white/90"
                        onClick={() => alert("Video player would open here")}
                      >
                        <Play className="w-5 h-5 mr-2" />
                        Play Video ({videos[selectedVideo as keyof typeof videos].duration})
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{videos[selectedVideo as keyof typeof videos].title}</h2>
                  <p className="text-muted-foreground mb-4">{videos[selectedVideo as keyof typeof videos].description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {videos[selectedVideo as keyof typeof videos].duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      12.5K views
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      4.9/5
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg md:text-xl font-bold mb-2">Ready to get started?</h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  Schedule a personalized demo to see how Algoristics can work for your organization.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link to="/request-demo">Schedule Demo</Link>
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/login'}>
                    Start Free Trial
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Video List */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>More Videos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(videos).map(([key, video]) => (
                  <div
                    key={key}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedVideo === key 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedVideo(key)}
                  >
                    <h4 className="font-semibold mb-1">{video.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </span>
                      <Play className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle>What Others Say</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm mb-3 italic">"{testimonial.feedback}"</p>
                    <div className="text-xs">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-muted-foreground">{testimonial.role}</div>
                      <div className="text-muted-foreground">{testimonial.organization}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchVideoPage;