import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Plane } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

import { useAuth } from "@/context/AuthContext";
import { useProfileData } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/flights", label: "Flights" },
  { href: "/hotels", label: "Hotels" },
  { href: "/holidays", label: "Holidays" },
  // { href: "/offers", label: "Offers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function MobileNav({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-2 font-bold text-lg"
        >
          <div className="p-2 rounded-lg bg-gradient-hero">
            <Plane className="h-5 w-5 text-white" />
          </div>
          TravelEase
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const active = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={cn(
                "block px-4 py-3 rounded-lg text-sm font-medium",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const { data: user, isLoading } = useProfileData({
    enabled: isAuthenticated,
  });

  const getInitials = (user: any) => {
    if (user?.name) return user.name.slice(0, 2).toUpperCase();
    if (user?.email) return user.email.slice(0, 2).toUpperCase();
    return "U";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <nav className="container flex h-16 items-center justify-between gap-2">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72 p-0">
              <MobileNav onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="p-2 rounded-lg bg-gradient-hero">
              <Plane className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              TravelEase
            </span>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {isLoading ? (
            <Skeleton className="h-8 w-20 rounded-md" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(user)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile/bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" className="hidden md:inline-flex" asChild>
                <Link to="/auth">Login</Link>
              </Button>
              <Button className="bg-gradient-hero" asChild>
                <Link to="/auth">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
