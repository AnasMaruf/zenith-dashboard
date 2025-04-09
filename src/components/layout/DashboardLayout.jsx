import { LogOut, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/ui/navbar";
import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardLayout() {
  return (
    <section className="h-screen flex items-stretch">
      <section className="w-64 border-r">
        <div className={cn("flex flex-col", "px-4 py-3")}>
          <h2>Zenith</h2>
          <p className="text-xs text-black/80">CMS Dashboard</p>
        </div>
        <Separator />
        <Navbar
          links={[
            {
              title: "Settings",
              icon: Settings,
              to: "/dashboard/setting",
            },
          ]}
        />
      </section>
      <section className="flex-1">
        <div className="min-h-16 py-4 px-8 flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="px-8 py-6">
          <Outlet />
        </div>
      </section>
    </section>
  );
}
