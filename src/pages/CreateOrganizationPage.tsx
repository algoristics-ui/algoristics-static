import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Upload, 
  ArrowLeft, 
  Building2, 
  Image as ImageIcon, 
  User, 
  Globe,
  Palette,
  Settings
} from "lucide-react";

const CreateOrganizationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    subdomain: "",
    adminName: "",
    adminEmail: "",
    primaryColor: "#3b82f6",
    secondaryColor: "#10b981",
    logo: null as File | null,
    headerImage: null as File | null,
    backgroundImage: null as File | null,
    footerLogo: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    toast.success("Organization created successfully!");
    navigate("/organizations");
  };

  const FileUploadCard = ({ 
    title, 
    description, 
    field, 
    accept = "image/*",
    currentFile 
  }: {
    title: string;
    description: string;
    field: string;
    accept?: string;
    currentFile: File | null;
  }) => (
    <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
            <ImageIcon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        
        {currentFile ? (
          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs">
              {currentFile.name}
            </Badge>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = accept;
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    handleFileUpload(field, file || null);
                  };
                  input.click();
                }}
              >
                Replace
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFileUpload(field, null)}
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = accept;
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                handleFileUpload(field, file || null);
              };
              input.click();
            }}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload {title}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  const steps = [
    { number: 1, title: "Organization Details", icon: Building2 },
    { number: 2, title: "Admin Account", icon: User },
    { number: 3, title: "Branding & Assets", icon: Palette },
    { number: 4, title: "Review & Create", icon: Settings },
  ];

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((stepItem, index) => (
        <div key={stepItem.number} className="flex items-center">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step >= stepItem.number
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <stepItem.icon className="h-5 w-5" />
          </div>
          <div className="ml-3 hidden sm:block">
            <p className={`text-sm font-medium ${
              step >= stepItem.number ? "text-foreground" : "text-muted-foreground"
            }`}>
              Step {stepItem.number}
            </p>
            <p className={`text-xs ${
              step >= stepItem.number ? "text-primary" : "text-muted-foreground"
            }`}>
              {stepItem.title}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-px mx-4 ${
              step > stepItem.number ? "bg-primary" : "bg-border"
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/organizations")}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Organizations</span>
        </Button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create New Organization</h1>
          <p className="text-muted-foreground mt-2">
            Set up a new organization with custom branding and admin account
          </p>
        </div>

        <StepIndicator />

        <Card className="shadow-soft">
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Organization Information</h2>
                  <p className="text-sm text-muted-foreground">
                    Provide basic details about the organization
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name *</Label>
                      <Input
                        id="orgName"
                        placeholder="e.g., Stanford University"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="orgType">Organization Type *</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="corporate">Corporate</SelectItem>
                          <SelectItem value="training_center">Training Center</SelectItem>
                          <SelectItem value="k12_school">K-12 School</SelectItem>
                          <SelectItem value="government">Government Agency</SelectItem>
                          <SelectItem value="nonprofit">Non-Profit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subdomain">Custom Subdomain *</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="subdomain"
                          placeholder="stanford"
                          value={formData.subdomain}
                          onChange={(e) => handleInputChange("subdomain", e.target.value)}
                          className="flex-1"
                        />
                        <div className="text-sm text-muted-foreground">.yourplatform.com</div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        This will be your organization's unique URL
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of the organization..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={8}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Organization Admin Account</h2>
                  <p className="text-sm text-muted-foreground">
                    Create the primary administrator account for this organization
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminName">Admin Full Name *</Label>
                    <Input
                      id="adminName"
                      placeholder="e.g., Dr. Sarah Wilson"
                      value={formData.adminName}
                      onChange={(e) => handleInputChange("adminName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email Address *</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      placeholder="admin@stanford.edu"
                      value={formData.adminEmail}
                      onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      A temporary password will be sent to this email address
                    </p>
                  </div>

                  <Card className="bg-muted/50 border-none">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <User className="h-5 w-5 text-primary mt-0.5" />
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Admin Permissions</h4>
                          <p className="text-xs text-muted-foreground">
                            This admin will have full control over the organization including:
                          </p>
                          <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                            <li>• Manage courses and content</li>
                            <li>• Add/remove instructors and students</li>
                            <li>• Configure organization settings</li>
                            <li>• View analytics and reports</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Branding & Visual Assets</h2>
                  <p className="text-sm text-muted-foreground">
                    Customize the look and feel of your organization's learning platform
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Color Scheme */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Palette className="h-5 w-5" />
                        <span>Color Scheme</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="primaryColor">Primary Color</Label>
                          <div className="flex items-center space-x-3">
                            <Input
                              id="primaryColor"
                              type="color"
                              value={formData.primaryColor}
                              onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                              className="w-16 h-10 p-1 border rounded"
                            />
                            <Input
                              value={formData.primaryColor}
                              onChange={(e) => handleInputChange("primaryColor", e.target.value)}
                              placeholder="#3b82f6"
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="secondaryColor">Secondary Color</Label>
                          <div className="flex items-center space-x-3">
                            <Input
                              id="secondaryColor"
                              type="color"
                              value={formData.secondaryColor}
                              onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                              className="w-16 h-10 p-1 border rounded"
                            />
                            <Input
                              value={formData.secondaryColor}
                              onChange={(e) => handleInputChange("secondaryColor", e.target.value)}
                              placeholder="#10b981"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Image Assets */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <ImageIcon className="h-5 w-5" />
                        <span>Visual Assets</span>
                      </CardTitle>
                      <CardDescription>
                        Upload images to customize your organization's platform appearance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FileUploadCard
                          title="Logo"
                          description="Primary logo (recommended: 200x60px)"
                          field="logo"
                          currentFile={formData.logo}
                        />
                        <FileUploadCard
                          title="Header Image"
                          description="Header background (recommended: 1200x300px)"
                          field="headerImage"
                          currentFile={formData.headerImage}
                        />
                        <FileUploadCard
                          title="Background Image"
                          description="Page background (recommended: 1920x1080px)"
                          field="backgroundImage"
                          currentFile={formData.backgroundImage}
                        />
                        <FileUploadCard
                          title="Footer Logo"
                          description="Footer logo (recommended: 150x50px)"
                          field="footerLogo"
                          currentFile={formData.footerLogo}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Review & Create Organization</h2>
                  <p className="text-sm text-muted-foreground">
                    Please review all details before creating the organization
                  </p>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Organization Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium capitalize">{formData.type.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">URL:</span>
                        <span className="font-medium">{formData.subdomain}.yourplatform.com</span>
                      </div>
                      {formData.description && (
                        <div className="space-y-1">
                          <span className="text-muted-foreground">Description:</span>
                          <p className="text-sm">{formData.description}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Administrator</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{formData.adminName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span className="font-medium">{formData.adminEmail}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Branding Assets</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-sm text-muted-foreground">Color Scheme:</span>
                          <div className="flex space-x-2">
                            <div
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: formData.primaryColor }}
                            />
                            <div
                              className="w-6 h-6 rounded border"
                              style={{ backgroundColor: formData.secondaryColor }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm text-muted-foreground">Uploaded Assets:</span>
                          <div className="flex flex-wrap gap-1">
                            {formData.logo && <Badge variant="secondary" className="text-xs">Logo</Badge>}
                            {formData.headerImage && <Badge variant="secondary" className="text-xs">Header</Badge>}
                            {formData.backgroundImage && <Badge variant="secondary" className="text-xs">Background</Badge>}
                            {formData.footerLogo && <Badge variant="secondary" className="text-xs">Footer</Badge>}
                            {!formData.logo && !formData.headerImage && !formData.backgroundImage && !formData.footerLogo && (
                              <span className="text-xs text-muted-foreground">None uploaded</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            <Separator className="my-6" />

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
              >
                Previous
              </Button>
              
              <div className="flex space-x-2">
                {step < 4 ? (
                  <Button onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-success hover:bg-success/90">
                    Create Organization
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateOrganizationPage;