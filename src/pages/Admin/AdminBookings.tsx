import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plane,
  Hotel,
  Bus,
  Package,
  Calendar,
  Search,
  Eye,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  CircleCheck,
} from "lucide-react";
import { format } from "date-fns";
import showToast from "@/lib/toast";

// Defined types manually since Supabase types are removed
type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
type BookingType = "flight" | "hotel" | "bus" | "holiday";

interface Profile {
  id: string;
  full_name: string;
  email: string;
}

interface Booking {
  id: string;
  booking_reference: string;
  user_id: string;
  booking_type: BookingType;
  status: BookingStatus;
  total_amount: number;
  travel_date: string;
  created_at: string;
  number_of_travelers: number;
  traveler_details?: any; // JSONB
  // Relations (optional depending on if they are joined in the API response)
  flights?: any;
  hotels?: any;
  buses?: any;
  holiday_packages?: any;
}

export default function AdminBookings() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // 1. Fetch Bookings (Replaces Supabase query)
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["admin-all-bookings", statusFilter, typeFilter],
    queryFn: async () => {
      // Build Query Params
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.append("status", statusFilter);
      if (typeFilter !== "all") params.append("type", typeFilter);

      // REPLACE with your actual backend endpoint
      // Ensure your backend performs the joins (flights, hotels, etc.)
      const response = await fetch(`/api/bookings?${params.toString()}`);

      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      return data || [];
    },
  });

  // 2. Fetch Profiles (for user name lookup)
  const { data: profiles } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      // REPLACE with your actual backend endpoint
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch profiles");
      const data = await response.json();
      return data || [];
    },
  });

  // 3. Update Status Mutation (Replaces Supabase update)
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: BookingStatus;
    }) => {
      // REPLACE with your actual backend endpoint
      const response = await fetch(`/api/bookings/${id}/status`, {
        method: "PATCH", // or PUT depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update status");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-all-bookings"] });
      ({ title: "Success", description: "Booking status updated" });
      if (selectedBooking) {
        setSelectedBooking(null); // Close dialog or update local state
      }
    },
    onError: (error: any) => {
      showToast.error(
        "Error updating status: " + error.message || "Failed to update status"
      );
    },
  });

  const getProfile = (userId: string) => {
    return profiles?.find((p: Profile) => p.id === userId);
  };

  const filteredBookings = bookings?.filter((booking: Booking) => {
    const profile = getProfile(booking.user_id);
    return (
      booking.booking_reference
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      profile?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getBookingIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-5 w-5 text-primary" />;
      case "hotel":
        return <Hotel className="h-5 w-5 text-primary" />;
      case "bus":
        return <Bus className="h-5 w-5 text-primary" />;
      case "holiday":
        return <Package className="h-5 w-5 text-primary" />;
      default:
        return <Calendar className="h-5 w-5 text-primary" />;
    }
  };

  const getBookingDetails = (booking: Booking) => {
    if (booking.flights) {
      return {
        name: `${booking.flights.airline} - ${booking.flights.flight_number}`,
        destination: `${booking.flights.departure_airport} → ${booking.flights.arrival_airport}`,
      };
    }
    if (booking.hotels) {
      return {
        name: booking.hotels.name,
        destination: booking.hotels.location,
      };
    }
    if (booking.buses) {
      return {
        name: `${booking.buses.operator} - ${booking.buses.bus_number}`,
        destination: `${booking.buses.departure_location} → ${booking.buses.arrival_location}`,
      };
    }
    if (booking.holiday_packages) {
      return {
        name: booking.holiday_packages.name,
        destination: booking.holiday_packages.destination,
      };
    }
    return { name: "N/A", destination: "N/A" };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "completed":
        return "outline";
      default:
        return "secondary";
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    updateStatusMutation.mutate({ id: bookingId, status: newStatus });
  };

  const StatusActions = ({ booking }: { booking: Booking }) => {
    const currentStatus = booking.status;

    return (
      <div className="flex gap-2 flex-wrap">
        {currentStatus === "pending" && (
          <>
            <Button
              size="sm"
              variant="default"
              onClick={() => handleStatusChange(booking.id, "confirmed")}
              className="gap-1"
            >
              <CheckCircle className="h-4 w-4" /> Confirm
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleStatusChange(booking.id, "cancelled")}
              className="gap-1"
            >
              <XCircle className="h-4 w-4" /> Cancel
            </Button>
          </>
        )}
        {currentStatus === "confirmed" && (
          <>
            <Button
              size="sm"
              variant="default"
              onClick={() => handleStatusChange(booking.id, "completed")}
              className="gap-1"
            >
              <CircleCheck className="h-4 w-4" /> Complete
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleStatusChange(booking.id, "cancelled")}
              className="gap-1"
            >
              <XCircle className="h-4 w-4" /> Cancel
            </Button>
          </>
        )}
        {currentStatus === "cancelled" && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStatusChange(booking.id, "pending")}
            className="gap-1"
          >
            <Clock className="h-4 w-4" /> Reopen
          </Button>
        )}
        {currentStatus === "completed" && (
          <span className="text-sm text-muted-foreground">
            No actions available
          </span>
        )}
      </div>
    );
  };

  return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by reference, name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="flight">Flights</SelectItem>
              <SelectItem value="hotel">Hotels</SelectItem>
              <SelectItem value="bus">Buses</SelectItem>
              <SelectItem value="holiday">Holidays</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings List */}
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>
              {filteredBookings?.length || 0} bookings found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center py-8 text-muted-foreground">
                Loading...
              </p>
            ) : filteredBookings && filteredBookings.length > 0 ? (
              <div className="space-y-4">
                {filteredBookings.map((booking: Booking) => {
                  const details = getBookingDetails(booking);
                  return (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {getBookingIcon(booking.booking_type)}
                        </div>
                        <div>
                          <p className="font-medium">
                            {booking.booking_reference}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {details.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(() => {
                              const profile = getProfile(booking.user_id);
                              return (
                                profile?.full_name ||
                                profile?.email ||
                                "Unknown user"
                              );
                            })()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                          <p className="font-semibold">
                            ${Number(booking.total_amount).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                            <Users className="h-3 w-3" />
                            {booking.number_of_travelers} travelers
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {booking.travel_date
                              ? format(
                                  new Date(booking.travel_date),
                                  "MMM dd, yyyy"
                                )
                              : "N/A"}
                          </p>
                        </div>
                        <Badge
                          variant={getStatusColor(booking.status || "pending")}
                        >
                          {booking.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No bookings found
              </p>
            )}
          </CardContent>
        </Card>

        {/* Booking Detail Dialog */}
        <Dialog
          open={!!selectedBooking}
          onOpenChange={() => setSelectedBooking(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
              <DialogDescription>
                Reference: {selectedBooking?.booking_reference}
              </DialogDescription>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium capitalize">
                      {selectedBooking.booking_type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant={getStatusColor(selectedBooking.status)}>
                      {selectedBooking.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium">
                      {getProfile(selectedBooking.user_id)?.full_name || "N/A"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {getProfile(selectedBooking.user_id)?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Travel Date</p>
                    <p className="font-medium">
                      {selectedBooking.travel_date
                        ? format(new Date(selectedBooking.travel_date), "PPP")
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Travelers</p>
                    <p className="font-medium">
                      {selectedBooking.number_of_travelers}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Amount
                    </p>
                    <p className="font-medium text-lg">
                      ${Number(selectedBooking.total_amount).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Booking Details
                  </p>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    {(() => {
                      const details = getBookingDetails(selectedBooking);
                      return (
                        <>
                          <p className="font-medium">{details.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {details.destination}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {selectedBooking.traveler_details && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Traveler Details
                    </p>
                    <pre className="p-4 bg-muted/50 rounded-lg text-sm overflow-auto">
                      {JSON.stringify(
                        selectedBooking.traveler_details,
                        null,
                        2
                      )}
                    </pre>
                  </div>
                )}

                <div>
                  <Label className="text-sm text-muted-foreground">
                    Update Status
                  </Label>
                  <div className="mt-2">
                    <StatusActions booking={selectedBooking} />
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
  );
}
