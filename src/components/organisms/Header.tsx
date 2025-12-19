import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plane, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();    // ✅ FIXED (was currentUser)
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const getInitials = () => {
    if (user?.name) {
      return user.name.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return "U"; // Default fallback
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="max-w-5xl px-4 mx-auto flex h-16 items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="p-2 rounded-lg bg-blue-400">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl text-foreground font-extrabold">
            TravelEase
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/flights" className="text-sm hover:shadow-md">Flights</Link>
          <Link to="/hotels" className="text-sm hover:shadow-md">Hotels</Link>
          <Link to="/holidays" className="text-sm hover:shadow-md">Holidays</Link>
          <Link to="/buses" className="text-sm hover:shadow-md">Buses</Link>
          <Link to="/offers" className="text-sm hover:shadow-md">Offers</Link>
          <Link to="/blogs" className="text-sm hover:shadow-md">Blogs</Link>
          <Link to="/contact" className="text-sm hover:shadow-md">Contact</Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            // LOGGED IN USER
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-bookings">My Bookings</Link>
                </DropdownMenuItem>
                
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // LOGGED OUT USER
            <>
              <Button variant="ghost" className="hidden md:inline-flex" asChild>
                <Link to="/auth">Login</Link>
              </Button>
              <Button variant="ghost" className="border-1 border-blue-400" asChild>
                <Link to="/auth">Sign Up</Link>
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  <div className="flex flex-col gap-4">
                    <Link to="/flights" className="text-sm hover:shadow-md">Flights</Link>
                    <Link to="/hotels" className="text-sm hover:shadow-md">Hotels</Link>
                    <Link to="/holidays" className="text-sm hover:shadow-md">Holidays</Link>
                    <Link to="/buses" className="text-sm hover:shadow-md">Buses</Link>
                    <Link to="/offers" className="text-sm hover:shadow-md">Offers</Link>
                    <Link to="/blogs" className="text-sm hover:shadow-md">Blogs</Link>
                    <Link to="/contact" className="text-sm hover:shadow-md">Contact</Link>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};
