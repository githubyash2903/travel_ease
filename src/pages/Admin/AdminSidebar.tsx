import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Palmtree,
  Plane,
  Hotel,
  Tag,
  CalendarCheck,
  Users,
  Settings,
  Search,
  Bell,
  Menu,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/api/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hotels", label: "Hotels", icon: Hotel },
  { href: "/admin/rooms", label: "Rooms", icon: Hotel },
  { href: "/admin/packages", label: "Holiday Packages", icon: Palmtree },
  { href: "/admin/api-manager", label: "Flight & Hotel API", icon: Plane },
  { href: "/admin/coupons", label: "Offers & Coupons", icon: Tag },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link
          to="/admin"
          className="flex items-center gap-3"
          onClick={onNavigate}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <Plane className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold text-sm text-sidebar-foreground">
              TravelAdmin
            </div>
            <p className="text-xs text-sidebar-foreground/60">
              Management Portal
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.href ||
            (item.href !== "/admin" && location.pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent/50">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground">
              System Status
            </p>
            <p className="text-xs text-green-500">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handlesetting = () => {
    navigate("/admin/settings");
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/auth");
  };

  return (
    <div className="h-screen w-screen flex bg-muted/30 ">
      {/* Desktop Sidebar */}
      <aside className=" overflow-y-auto hidden scrollbar-hide lg:flex w-72 flex-col bg-sidebar border-r border-sidebar-border">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-sidebar">
          <SidebarContent onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 ">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-background flex justify-between items-center gap-4 px-4 lg:px-6">
          {/* Mobile Menu */}
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </Sheet>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookings, users, packages..."
                className="pl-10 bg-muted/50 border-0"
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium">New booking received</span>
                  <span className="text-xs text-muted-foreground">
                    Maldives Package - ₹85,000
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium">Payment confirmed</span>
                  <span className="text-xs text-muted-foreground">
                    Booking #TRV-2024-001
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <span className="font-medium">API Alert</span>
                  <span className="text-xs text-muted-foreground">
                    Amadeus API rate limit at 80%
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 pl-2 pr-3"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium">Admin User</p>
                    <p className="text-xs text-muted-foreground">Super Admin</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handlesetting}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto scrollbar-hide h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
