import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft, ArrowRight, Database, Globe } from "lucide-react";
import DatabaseConfigForm from "./DatabaseConfigForm";

interface SetupWizardProps {
  onComplete?: () => void;
  initialStep?: number;
}

export default function SetupWizard({
  onComplete = () => {},
  initialStep = 0,
}: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isLoading, setIsLoading] = useState(false);

  const handleDatabaseSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setCurrentStep(1);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      title: "Database Configuration",
      icon: <Database className="h-5 w-5" />,
      content: (
        <DatabaseConfigForm
          onSubmit={handleDatabaseSubmit}
          isLoading={isLoading}
        />
      ),
    },
    {
      title: "Website Configuration",
      icon: <Globe className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Great! Now let's configure your first website for login automation.
          </p>
          <Button onClick={onComplete} className="w-full">
            Continue to Website Setup
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="w-[400px] bg-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          {steps[currentStep].icon}
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps[currentStep].content}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0 || isLoading}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep < steps.length - 1 && (
              <Button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                disabled={isLoading}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep
                    ? "bg-primary"
                    : "bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
