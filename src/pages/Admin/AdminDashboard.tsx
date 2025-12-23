import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


import { getAdminBookings } from "@/api/admin/bookings";
import { getAdminStats } from "@/api/admin/stats";

export default function AdminDashboard() {
  const { data: statsRes } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
    select: (r) => r.data.data,
  });

  const { data: bookingsRes, isLoading } = useQuery({
    queryKey: ["admin-dashboard-bookings"],
    queryFn: () => getAdminBookings({ limit: 5 }),
    select: (r) => r.data.data,
  });

  const stats = [
    {
      title: "Total Users",
      value: statsRes?.users ?? 0,
      icon: Users,
    },
    {
      title: "Total Bookings",
      value: statsRes?.bookings ?? 0,
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform overview
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.title}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardDescription>{s.title}</CardDescription>
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {s.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* RECENT BOOKINGS */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest booking requests</CardDescription>
          </div>

          <Button variant="outline" asChild>
            <Link to="/admin/bookings" className="gap-2">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <p className="text-center py-8 text-muted-foreground">
              Loading bookings…
            </p>
          )}

          {!isLoading && !bookingsRes?.length && (
            <p className="text-center py-8 text-muted-foreground">
              No bookings yet
            </p>
          )}

          {!!bookingsRes?.length && (
            <div className="space-y-4">
              {bookingsRes.map((b: any) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {b.booking_type} Booking
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {b.user_name}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">
                        ₹{b.total_amount}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(b.created_at), "MMM dd, yyyy")}
                      </p>
                    </div>

                    <Badge
                      variant={
                        b.status === "APPROVED"
                          ? "default"
                          : b.status === "DECLINED"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {b.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
