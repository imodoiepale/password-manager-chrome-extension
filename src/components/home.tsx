import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import SetupWizard from "./SetupWizard";
import MainDashboard from "./MainDashboard";

interface HomeProps {
  isFirstTimeSetup?: boolean;
}

export default function Home({ isFirstTimeSetup = true }: HomeProps) {
  const [setupComplete, setSetupComplete] = useState(!isFirstTimeSetup);

  const handleSetupComplete = () => {
    setSetupComplete(true);
  };

  const handleSiteConfigSave = (config: any) => {
    // Handle saving site configuration
    console.log("Saving site config:", config);
  };

  const handleSiteToggle = (id: string, enabled: boolean) => {
    // Handle toggling site enabled/disabled state
    console.log(`Toggling site ${id} to ${enabled}`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-[400px] bg-white shadow-lg">
        <CardContent className="p-0">
          {!setupComplete ? (
            <SetupWizard onComplete={handleSetupComplete} />
          ) : (
            <MainDashboard
              onSiteConfigSave={handleSiteConfigSave}
              onSiteToggle={handleSiteToggle}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
