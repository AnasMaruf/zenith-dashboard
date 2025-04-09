import FacebookIcon from "@/components/icon/FacebookIcon";
import InstagramIcon from "@/components/icon/InstagramIcon";
import LinkedinIcon from "@/components/icon/LinkedinIcon";
import TwitterIcon from "@/components/icon/TwitterIcon";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Title } from "@/components/ui/title";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";

const settingSchema = z.object({
  video_url: z
    .string({ required_error: "Video is required" })
    .url("Video must be valid url"),
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[+]?\d+(-\d+)*$/, "Invalid phone number"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  x_url: z
    .string({ required_error: "Value is required" })
    .url("Value must be valid url"),
  facebook_url: z
    .string({ required_error: "Value is required" })
    .url("Value must be valid url"),
  instagram_url: z
    .string({ required_error: "Value is required" })
    .url("Value must be valid url"),
  linkedin_url: z
    .string({ required_error: "Value is required" })
    .url("Value must be valid url"),
});

export default function SettingPage() {
  const form = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      video_url: "",
      phone_number: "",
      email: "",
      x_url: "",
      facebook_url: "",
      instagram_url: "",
      linkedin_url: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }
  return (
    <div>
      <Title title={"Settings"} caption={"Manage your account settings."} />
      <Form {...form}>
        <form
          className="gris grid-cols-2 gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="video_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Embed video (url)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormDescription>
                    Add the phone number to let the users know where they can
                    reach us
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="+123-456-789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormDescription>
                    Add the email to let users know where they can reach us
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="mail@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Label>Social Media</Label>
              <FormField
                control={form.control}
                name="x_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <TwitterIcon />
                      <FormControl>
                        <Input placeholder="https://x.com/username" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facebook_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <FacebookIcon />
                      <FormControl>
                        <Input placeholder="https://facebook.com/username" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <InstagramIcon />
                      <FormControl>
                        <Input placeholder="https://instagram.com/username" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2">
                      <LinkedinIcon />
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/username" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="mt-2">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
