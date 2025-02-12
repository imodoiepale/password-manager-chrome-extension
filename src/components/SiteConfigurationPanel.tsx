import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
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
import { Globe, Database, TestTube, Save, Plus, X, Key } from "lucide-react";

import { Company, LoginStep, Site } from "../types/schema";

interface SiteConfigurationPanelProps {
  onSave?: (config: Site & { steps: LoginStep[] }) => void;
  initialConfig?: Partial<Site & { steps: LoginStep[] }>;
  companies?: Company[];
  tables?: string[];
  credentials?: LoginCredential[];
}

const SiteConfigurationPanel = ({
  onSave = () => {},
  initialConfig = {},
  companies = [
    { id: "1", name: "ABC Limited" },
    { id: "2", name: "XYZ Corp" },
  ],
  tables = ["credentials", "users", "accounts"],
  credentials = [
    {
      id: "1",
      company_id: "1",
      site_id: "1",
      username: "admin@abc.com",
      password: "******",
    },
    {
      id: "2",
      company_id: "2",
      site_id: "1",
      username: "admin@xyz.com",
      password: "******",
    },
  ],
}: SiteConfigurationPanelProps) => {
  const [steps, setSteps] = useState<LoginStep[]>(
    initialConfig?.steps || [
      {
        id: "1",
        site_id: "",
        step_number: 1,
        selector_type: "username",
        selector: "",
      },
    ],
  );
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
            <TabsTrigger value="steps">Login Steps</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
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

          <TabsContent value="credentials" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Company</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Saved Credentials</Label>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  {credentials.map((cred) => (
                    <div
                      key={cred.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {
                            companies.find((c) => c.id === cred.company_id)
                              ?.name
                          }
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {cred.username}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Key className="h-4 w-4 mr-2" />
                        Use
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="steps" className="space-y-4">
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <Card key={step.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Step {step.step_number}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newSteps = [...steps];
                          newSteps.splice(index, 1);
                          setSteps(newSteps);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Type</Label>
                          <Select
                            value={step.selector_type}
                            onValueChange={(value: any) => {
                              const newSteps = [...steps];
                              newSteps[index].selector_type = value;
                              setSteps(newSteps);
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="username">Username</SelectItem>
                              <SelectItem value="password">Password</SelectItem>
                              <SelectItem value="submit">Submit</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Wait Time (ms)</Label>
                          <Input
                            type="number"
                            value={step.wait_time || 0}
                            onChange={(e) => {
                              const newSteps = [...steps];
                              newSteps[index].wait_time = parseInt(
                                e.target.value,
                              );
                              setSteps(newSteps);
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Selector</Label>
                        <Input
                          value={step.selector}
                          onChange={(e) => {
                            const newSteps = [...steps];
                            newSteps[index].selector = e.target.value;
                            setSteps(newSteps);
                          }}
                          placeholder="#username or .login-input"
                        />
                      </div>

                      {step.selector_type === "custom" && (
                        <div className="space-y-2">
                          <Label>Value</Label>
                          <Input
                            value={step.value || ""}
                            onChange={(e) => {
                              const newSteps = [...steps];
                              newSteps[index].value = e.target.value;
                              setSteps(newSteps);
                            }}
                            placeholder="Custom value to enter"
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSteps([
                      ...steps,
                      {
                        id: (steps.length + 1).toString(),
                        site_id: "",
                        step_number: steps.length + 1,
                        selector_type: "custom",
                        selector: "",
                      },
                    ]);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Step
                </Button>
              </div>
            </ScrollArea>
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
