import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calendar, Clock, CheckCircle2, Users, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ConsultationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    challenges: [],
    preferredTime: "",
    urgency: "",
    additionalInfo: ""
  });

  // Ensure page starts at top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const challenges = [
    "Course creation and management",
    "Student engagement and retention",
    "Assessment and testing",
    "Learning analytics and reporting",
    "Integration with existing systems",
    "Scaling learning programs",
    "Compliance and certification",
    "Multi-organization management"
  ];

  const handleChallengeChange = (challenge: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        challenges: [...prev.challenges, challenge]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        challenges: prev.challenges.filter(c => c !== challenge)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Consultation request submitted successfully! Our team will contact you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Schedule a Consultation</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Get expert guidance on implementing learning solutions that work for your organization. 
            Our learning strategists will help you create a roadmap for success.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Consultation Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Tell us about your learning goals</CardTitle>
                <p className="text-muted-foreground">
                  Help us understand your needs so we can provide the most relevant guidance.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Organization *</Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="education">Higher Education</SelectItem>
                        <SelectItem value="k12">K-12 Education</SelectItem>
                        <SelectItem value="corporate">Corporate Training</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="nonprofit">Non-Profit</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>What challenges are you looking to solve? (Select all that apply)</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {challenges.map((challenge) => (
                        <div key={challenge} className="flex items-center space-x-2">
                          <Checkbox
                            id={challenge}
                            checked={formData.challenges.includes(challenge)}
                            onCheckedChange={(checked) => handleChallengeChange(challenge, !!checked)}
                          />
                          <Label htmlFor={challenge} className="text-sm font-normal cursor-pointer">
                            {challenge}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="urgency">Timeline</Label>
                      <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="When do you need to implement?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Within 1 month</SelectItem>
                          <SelectItem value="quarter">Within 3 months</SelectItem>
                          <SelectItem value="semester">Within 6 months</SelectItem>
                          <SelectItem value="year">Within a year</SelectItem>
                          <SelectItem value="exploring">Just exploring</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Preferred Meeting Time</Label>
                      <Select value={formData.preferredTime} onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                          <SelectItem value="evening">Evening (5 PM - 7 PM)</SelectItem>
                          <SelectItem value="flexible">I'm flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional">Additional Information</Label>
                    <Textarea
                      id="additional"
                      placeholder="Tell us more about your specific needs, current solutions, team size, or any questions you have..."
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Consultation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Consultation Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lightbulb className="w-6 h-6 text-primary" />
                  What We'll Cover
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Current State Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      Review your existing learning programs and identify gaps
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Solution Design</h4>
                    <p className="text-sm text-muted-foreground">
                      Create a customized approach for your organization
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Implementation Roadmap</h4>
                    <p className="text-sm text-muted-foreground">
                      Step-by-step plan with timelines and milestones
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-1">Best Practices</h4>
                    <p className="text-sm text-muted-foreground">
                      Proven strategies from similar organizations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  Consultation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-semibold">45-60 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-semibold">Video call</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost:</span>
                  <span className="font-semibold text-primary">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Follow-up:</span>
                  <span className="font-semibold">Written summary</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  Our Consultants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-3">
                  Our team includes learning strategists and instructional designers with 10+ years 
                  of experience in educational technology.
                </p>
                <div className="text-sm">
                  <div className="font-semibold">Areas of Expertise:</div>
                  <ul className="mt-1 space-y-1 text-muted-foreground">
                    <li>• Learning program design</li>
                    <li>• Technology integration</li>
                    <li>• Change management</li>
                    <li>• Performance measurement</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;