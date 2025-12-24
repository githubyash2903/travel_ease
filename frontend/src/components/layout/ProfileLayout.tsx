import { Outlet, NavLink } from "react-router-dom";
import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useProfileData } from "@/hooks/useProfile";
import { Spinner } from "../ui/spinner";

export default function ProfileLayout() {
  const { data: user, isLoading } = useProfileData();

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex bg-muted/30 w-screen">
      <div className="container mx-auto flex flex-1 py-8 px-4">
        <div className="grid w-full grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 h-full ">
          
          <Card className="h-fit self-start">
            <CardContent className="p-6 space-y-6">
              {/* PROFILE */}
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center mb-3">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>

              {/* NAV */}
              <nav className="flex flex-col gap-1">
                {[
                  { to: "/profile", label: "Profile" },
                  { to: "/profile/bookings", label: "Bookings" },
                  { to: "/profile/payments", label: "Payments" },
                ].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* ---------- RIGHT CONTENT (ONLY THIS SCROLLS) ---------- */}
          <div className=" overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
