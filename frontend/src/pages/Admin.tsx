import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Plane, 
  Hotel, 
  Package, 
  FileText, 
  Settings,
  TrendingUp,
  DollarSign,
  Calendar,
  AlertCircle
} from "lucide-react";

export default function Admin() {
  // Note: This is a demo admin page. In production, you should:
  // 1. Enable Lovable Cloud for authentication
  // 2. Create a user_roles table with proper RLS policies
  // 3. Use server-side validation to check admin status
  // Never use localStorage or hardcoded credentials for admin checks

  const stats = [
    {
      title: "Total Users",
      value: "12,543",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Flight Bookings",
      value: "3,289",
      change: "+8.2%",
      icon: Plane,
      color: "text-green-600"
    },
    {
      title: "Hotel Bookings",
      value: "5,672",
      change: "+15.3%",
      icon: Hotel,
      color: "text-purple-600"
    },
    {
      title: "Revenue",
      value: "$234,560",
      change: "+23.1%",
      icon: DollarSign,
      color: "text-orange-600"
    }
  ];

  const recentBookings = [
    {
      id: "BK-001234",
      customer: "John Doe",
      type: "Flight",
      destination: "London",
      amount: "$850",
      status: "confirmed",
      date: "2024-03-15"
    },
    {
      id: "BK-001235",
      customer: "Jane Smith",
      type: "Hotel",
      destination: "Paris",
      amount: "$1,200",
      status: "pending",
      date: "2024-03-15"
    },
    {
      id: "BK-001236",
      customer: "Mike Johnson",
      type: "Package",
      destination: "Bali",
      amount: "$2,500",
      status: "confirmed",
      date: "2024-03-14"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      
      <main className="flex-1 py-8">
        <div className="container">
          {/* Security Warning */}
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-900 mb-1">Demo Admin Page</h3>
    
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your travel booking platform
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600">{stat.change}</span>
                      <span className="text-muted-foreground">vs last month</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Management Tabs */}
          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest booking requests and confirmations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            {booking.type === "Flight" && <Plane className="h-5 w-5 text-primary" />}
                            {booking.type === "Hotel" && <Hotel className="h-5 w-5 text-primary" />}
                            {booking.type === "Package" && <Package className="h-5 w-5 text-primary" />}
                          </div>
                          <div>
                            <p className="font-medium">{booking.customer}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.type} to {booking.destination}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold">{booking.amount}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {booking.date}
                            </p>
                          </div>
                          <Badge
                            variant={booking.status === "confirmed" ? "default" : "secondary"}
                          >
                            {booking.status}
                          </Badge>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage registered users and their permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">User management interface will be here</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Manage blog posts, offers, and destination content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <FileText className="h-6 w-6" />
                      Manage Blogs
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <Package className="h-6 w-6" />
                      Manage Offers
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2">
                      <Plane className="h-6 w-6" />
                      Manage Destinations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                  <CardDescription>Platform performance and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Analytics charts and reports will be here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
