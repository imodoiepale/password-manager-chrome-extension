export interface Company {
  id: string;
  name: string;
  created_at?: string;
}

export interface LoginCredential {
  id: string;
  company_id: string;
  site_id: string;
  username: string;
  password: string;
  created_at?: string;
}

export interface LoginStep {
  id: string;
  site_id: string;
  step_number: number;
  selector_type: "username" | "password" | "submit" | "custom";
  selector: string;
  value?: string;
  wait_time?: number;
  created_at?: string;
}

export interface Site {
  id: string;
  url: string;
  name: string;
  auto_detect: boolean;
  trigger_selector?: string;
  enabled: boolean;
  created_at?: string;
}
