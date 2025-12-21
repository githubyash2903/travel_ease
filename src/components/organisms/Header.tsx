import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plane, Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProfileData } from "@/hooks/useProfile";
import { Skeleton } from "../ui/skeleton";

export const Header = () => {
  const { isAuthenticated } = useAuth();

  const { data: user, isLoading } = useProfileData({
    enabled: isAuthenticated,
  });
  console.log(isLoading, user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const getInitials = (user: any) => {
    if (user?.name) {
      return user.name.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U"; // Default fallback
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="p-2 rounded-lg bg-gradient-hero">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-hero bg-clip-text text-transparent">
            TravelEase
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/flights"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Flights
          </Link>
          <Link
            to="/hotels"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Hotels
          </Link>
          <Link
            to="/holidays"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Holidays
          </Link>
          {/* <Link
            to="/buses"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Buses
          </Link> */}
          <Link
            to="/offers"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Offers
          </Link>
          <Link
            to="/blogs"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Blogs
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <Skeleton className="h-12 w-30% rounded-md" />
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
              <Button className="bg-gradient-hero hover:opacity-90" asChild>
                <Link to="/auth">Sign Up</Link>
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
};
