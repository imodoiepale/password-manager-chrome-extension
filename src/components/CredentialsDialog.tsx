import React, { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Key } from "lucide-react";

interface Company {
  id: string;
  name: string;
}

interface Credential {
  id: string;
  company_id: string;
  site_id: string;
  username: string;
  password: string;
}

interface CredentialsDialogProps {
  siteUrl: string;
  companies?: Company[];
  credentials?: Credential[];
  onCredentialSelect?: (credential: Credential) => void;
}

export default function CredentialsDialog({
  siteUrl,
  companies = [
    { id: "1", name: "ABC Limited" },
    { id: "2", name: "XYZ Corp" },
  ],
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
  onCredentialSelect = () => {},
}: CredentialsDialogProps) {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Key className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Credentials</DialogTitle>
          <DialogDescription>
            Choose company credentials to use for {siteUrl}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Select
              value={selectedCompanyId}
              onValueChange={setSelectedCompanyId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company" />
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

          <ScrollArea className="h-[200px] rounded-md border p-4">
            {credentials
              .filter((cred) => cred.company_id === selectedCompanyId)
              .map((cred) => (
                <div
                  key={cred.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {companies.find((c) => c.id === cred.company_id)?.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {cred.username}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCredentialSelect(cred)}
                  >
                    Use
                  </Button>
                </div>
              ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
