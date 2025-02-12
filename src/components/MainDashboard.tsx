import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Plus, Settings } from "lucide-react";
import SiteConfigurationPanel from "./SiteConfigurationPanel";
import SiteList from "./SiteList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface MainDashboardProps {
  onSiteConfigSave?: (config: any) => void;
  onSiteToggle?: (id: string, enabled: boolean) => void;
  initialSites?: Array<{
    id: string;
    url: string;
    enabled: boolean;
    lastUsed?: string;
  }>;
}

export default function MainDashboard({
  onSiteConfigSave = () => {},
  onSiteToggle = () => {},
  initialSites = [
    {
      id: "1",
      url: "example.com",
      enabled: true,
      lastUsed: "2024-03-20",
    },
    {
      id: "2",
      url: "test-site.com",
      enabled: false,
      lastUsed: "2024-03-19",
    },
  ],
}: MainDashboardProps) {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <Card className="w-[400px] h-[500px] bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Password Manager</CardTitle>
          <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Add New Site</DialogTitle>
                <DialogDescription>
                  Configure automation for a new website.
                </DialogDescription>
              </DialogHeader>
              <SiteConfigurationPanel
                onSave={(config) => {
                  onSiteConfigSave(config);
                  setIsConfigOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sites" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sites">Sites</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="sites" className="mt-4">
            <SiteList
              sites={initialSites}
              onToggle={onSiteToggle}
              onConfigure={(id) => {
                // Handle site configuration
                setIsConfigOpen(true);
              }}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Database Connection</span>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              {/* Add more settings options here */}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
