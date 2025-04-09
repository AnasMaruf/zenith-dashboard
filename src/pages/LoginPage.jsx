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
import { object, z } from "zod";
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
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(value) {
    try {
      const loginResponse = await $fetch.create("api/login", value);
      localStorage.setItem("access_token", loginResponse.data.token);
      console.log("Token:", localStorage.getItem("access_token"));
      console.log("Fetching user profile...");
      const profile = await $fetch.get("api/user");
      console.log("Profile response:", profile);
      navigate("/dashboard/setting");
    } catch (error) {
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
      }
    }
  }
  // const [form, setForm] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setForm((oldState) => ({ ...oldState, [name]: value }));
  // };
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   // const formData = new FormData(event.target);
  //   // console.log({
  //   //   email: formData.get("email"),
  //   //   password: formData.get("password"),
  //   // });
  //   console.log(form);
  // }
  return (
    <section className="min-h-screen bg-primary flex justify-center items-center">
      <div className="max-w-[480px] w-full p-8 space-y-6">
        <h1 className="text-white text-center text-lg font-medium">
          Zenith Dashboard
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your mail and password below to log into your account
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

                <Button className="mt-2">Login</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default LoginPage;
