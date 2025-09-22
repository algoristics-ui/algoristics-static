import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const OrganizationSettingsPage = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 pb-6 max-w-7xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Manage your organization settings and preferences
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6">
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Organization Settings</span>
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">Configure your organization preferences</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <p className="text-muted-foreground text-sm sm:text-base">
              Organization settings will be available here. This is a placeholder for organization-specific settings.
            </p>
            <div className="mt-4">
              <Button className="text-sm">Save Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationSettingsPage;