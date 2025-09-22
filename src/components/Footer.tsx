import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Twitter, 
  Linkedin, 
  Github, 
  Mail,
  MapPin,
  Phone
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "#" },
        { name: "Pricing", href: "#" },
        { name: "Integrations", href: "#" },
        { name: "API Documentation", href: "#" },
        { name: "Security", href: "#" }
      ]
    },
    {
      title: "Solutions",
      links: [
        { name: "For Universities", href: "#" },
        { name: "For Enterprises", href: "#" },
        { name: "For Training Centers", href: "#" },
        { name: "For Recruiters", href: "#" },
        { name: "Custom Solutions", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "#" },
        { name: "User Guides", href: "#" },
        { name: "Video Tutorials", href: "#" },
        { name: "Best Practices", href: "#" },
        { name: "Community Forum", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press Kit", href: "#" },
        { name: "Partners", href: "#" },
        { name: "Contact", href: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="gradient-hero w-10 h-10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-background">Algoristics</h3>
                  <p className="text-xs text-background/70">Next-Gen LMS</p>
                </div>
              </div>
              
              <p className="text-background/80 text-sm leading-relaxed">
                Empowering organizations to deliver exceptional learning experiences 
                with advanced assessment capabilities and comprehensive analytics.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-background/70">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-2 text-background/70">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-background/70">
                  <Mail className="w-4 h-4" />
                  <span>info@algoristicedu.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-semibold text-background">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href}
                        className="text-background/70 hover:text-background text-sm transition-smooth"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-background/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/70 text-sm">
              © 2024 Algoristics. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-background/70 hover:text-background transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-smooth">
                Cookie Policy
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-smooth">
                GDPR Compliance
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;