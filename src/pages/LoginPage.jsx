import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import $fetch from "@/lib/$fetch";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

function LoginPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(value) {
    try {
      setIsLoading(true);
      // Login request
      const loginResponse = await $fetch.create("/api/login", value);

      // Store token
      const token = loginResponse.data.token;
      localStorage.setItem("access_token", token);
      console.log("Token:", token);

      // Make sure $fetch is configured to use the token for subsequent requests
      // If your $fetch utility doesn't automatically use localStorage token,
      // you may need to configure the Authorization header explicitly:

      try {
        // Add a delay to ensure token is properly processed
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Explicitly pass the token in the headers for this request
        const profile = await $fetch.get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the response is valid before proceeding
        if (profile && profile.data) {
          console.log("Profile response:", profile);
          navigate("/dashboard/setting");
        } else {
          throw new Error("Invalid profile response");
        }
      } catch (fetchError) {
        console.error("Error fetching user profile:", fetchError);

        // Handle fetch error more gracefully
        toast({
          title: "Could not load user profile",
          description: "Please try again or contact support",
          variant: "destructive",
        });

        // Log out the user if profile fetch fails
        localStorage.removeItem("access_token");
      }
    } catch (error) {
      // Login error handling
      if (error.meta?.messages?.[0]) {
        toast({
          title: error.meta.messages[0],
          variant: "destructive",
        });
        return;
      }

      if (error.meta?.validations) {
        Object.keys(error.meta.validations).forEach((key) => {
          form.setError(key, {
            type: "server",
            message: error.meta.validations[key][0],
          });
        });
      } else {
        // Generic error handling
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <section className="min-h-screen bg-primary flex justify-center items-center">
      <div className="max-w-md w-full p-8 space-y-6">
        <h1 className="text-white text-center text-lg font-medium">
          Zenith Dashboard
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email and password below to log into your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-2" loading={isLoading}>
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default LoginPage;
