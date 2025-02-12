import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Globe, Database, TestTube, Save } from "lucide-react";

interface SiteConfigurationPanelProps {
  onSave?: (config: any) => void;
  initialConfig?: any;
  tables?: string[];
}

const SiteConfigurationPanel = ({
  onSave = () => {},
  initialConfig = {},
  tables = ["users", "credentials", "logins"],
}: SiteConfigurationPanelProps) => {
  const [testResult, setTestResult] = useState<"success" | "failure" | null>(
    null,
  );

  return (
    <Card className="w-full max-w-[360px] p-6 bg-white">
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Site Configuration</h2>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                defaultValue={initialConfig.url || ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="table">Database Table</Label>
              <Select defaultValue={tables[0]}>
                <SelectTrigger>
                  <SelectValue placeholder="Select table" />
                </SelectTrigger>
                <SelectContent>
                  {tables.map((table) => (
                    <SelectItem key={table} value={table}>
                      {table}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="auto-fill" defaultChecked={true} />
              <Label htmlFor="auto-fill">Enable Auto-fill</Label>
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Username Field</Label>
                <Input placeholder="#username or .login-input" />
              </div>

              <div className="space-y-2">
                <Label>Password Field</Label>
                <Input placeholder="#password or .password-input" />
              </div>

              <div className="space-y-2">
                <Label>Submit Button</Label>
                <Input placeholder="#submit or .login-button" />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <TestTube className="mr-2 h-4 w-4" />
                Test Selectors
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Test Results</AlertDialogTitle>
                <AlertDialogDescription>
                  {testResult === "success"
                    ? "All selectors were found successfully!"
                    : "Some selectors could not be found. Please verify your input."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction>Try Again</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button className="flex-1" onClick={() => onSave({})}>
            <Save className="mr-2 h-4 w-4" />
            Save Config
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SiteConfigurationPanel;
