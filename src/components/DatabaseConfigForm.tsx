import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  projectUrl: z.string().url("Please enter a valid Supabase project URL"),
  apiKey: z.string().min(1, "API key is required"),
});

type FormData = z.infer<typeof formSchema>;

interface DatabaseConfigFormProps {
  onSubmit?: (data: FormData) => Promise<void>;
  isLoading?: boolean;
  defaultValues?: Partial<FormData>;
}

export default function DatabaseConfigForm({
  onSubmit = async () => {},
  isLoading = false,
  defaultValues = {
    projectUrl: "https://your-project.supabase.co",
    apiKey: "",
  },
}: DatabaseConfigFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = async (data: FormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Card className="w-[360px] bg-white">
      <CardHeader>
        <CardTitle>Database Configuration</CardTitle>
        <CardDescription>
          Enter your Supabase project details to connect to your database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="projectUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://your-project.supabase.co"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your Supabase project URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="your-api-key"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your Supabase project API key
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing Connection...
                </>
              ) : (
                "Test Connection"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
