import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Plane, 
  Hotel, 
  Bus,
  Package, 
  DollarSign,
  Calendar,
  ArrowRight
} from "lucide-react";
import { format } from "date-fns";

// 1. Define Types matching your PostgreSQL API response
interface DashboardStats {
  users: number;
  bookings: number;
  revenue: number;
}

interface Booking {
  id: string;
  booking_reference: string;
  booking_type: string;
  destination?: string;
  total_amount: number;
  created_at: string;
  status: "confirmed" | "pending" | "cancelled";
}

export default function AdminDashboard() {
  // 2. Fetch Stats from your Backend
  const { data: statsData, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      // REPLACE with your actual backend endpoint
      const response = await fetch("/api/admin/stats"); 
      if (!response.ok) throw new Error("Failed to fetch stats");
      return await response.json();
    },
  });

  // 3. Fetch Recent Bookings from your Backend
  const { data: recentBookings, isLoading: bookingsLoading } = useQuery<Booking[]>({
    queryKey: ["admin-recent-bookings"],
    queryFn: async () => {
      // REPLACE with your actual backend endpoint
      const response = await fetch("/api/admin/recent-bookings");
      if (!response.ok) throw new Error("Failed to fetch bookings");
      return await response.json();
    },
  });

  const stats = [
    {
      title: "Total Users",
      value: statsData?.users?.toLocaleString() || "0",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Bookings",
      value: statsData?.bookings?.toLocaleString() || "0",
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Revenue",
      value: `$${statsData?.revenue?.toLocaleString() || "0"}`,
      icon: DollarSign,
      color: "text-orange-600"
    }
  ];

  const getBookingIcon = (type: string) => {
    switch (type) {
      case "flight": return <Plane className="h-5 w-5 text-primary" />;
      case "hotel": return <Hotel className="h-5 w-5 text-primary" />;
      case "bus": return <Bus className="h-5 w-5 text-primary" />;
      case "holiday": return <Package className="h-5 w-5 text-primary" />;
      default: return <Calendar className="h-5 w-5 text-primary" />;
    }
  };

  const getBookingDestination = (booking: Booking) => {
    return booking.destination || "N/A";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your travel booking platform</p>
      </div>
    
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{stat.title}</CardDescription>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? "0" : stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking requests and confirmations</CardDescription>
          </div>
          <Button variant="outline" asChild>
            <Link to="/admin/bookings" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {bookingsLoading ? (
             <p className="text-center py-8 text-muted-foreground">Loading recent bookings...</p>
          ) : recentBookings && recentBookings.length > 0 ? (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {getBookingIcon(booking.booking_type)}
                    </div>
                    <div>
                      <p className="font-medium">{booking.booking_reference}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {booking.booking_type} to {getBookingDestination(booking)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">${Number(booking.total_amount).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {booking.created_at ? format(new Date(booking.created_at), "MMM dd, yyyy") : "N/A"}
                      </p>
                    </div>
                    <Badge
                      variant={booking.status === "confirmed" ? "default" : "secondary"}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No bookings yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}