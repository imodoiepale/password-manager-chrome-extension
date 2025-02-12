import React from "react";
import { Switch } from "./ui/switch";
import { Card } from "./ui/card";
import { Globe, Settings } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface Site {
  id: string;
  url: string;
  enabled: boolean;
  lastUsed?: string;
}

interface SiteListProps {
  sites?: Site[];
  onToggle?: (id: string, enabled: boolean) => void;
  onConfigure?: (id: string) => void;
}

const defaultSites: Site[] = [
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
  {
    id: "3",
    url: "demo.net",
    enabled: true,
    lastUsed: "2024-03-18",
  },
];

const SiteList = ({
  sites = defaultSites,
  onToggle = () => {},
  onConfigure = () => {},
}: SiteListProps) => {
  return (
    <div className="w-full p-4 space-y-4 bg-background">
      <h2 className="text-xl font-semibold mb-4">Configured Sites</h2>

      <div className="space-y-3">
        {sites.map((site) => (
          <Card key={site.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{site.url}</p>
                  {site.lastUsed && (
                    <p className="text-sm text-muted-foreground">
                      Last used: {site.lastUsed}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onConfigure(site.id)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Configure site</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Switch
                        checked={site.enabled}
                        onCheckedChange={(checked) =>
                          onToggle(site.id, checked)
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{site.enabled ? "Disable" : "Enable"} autofill</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {sites.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No sites configured yet
        </div>
      )}
    </div>
  );
};

export default SiteList;
