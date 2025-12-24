import { useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useAdminBookings,
  useAdminBookingMutations,
} from "@/hooks/useAdminBookings";
import { BookingDetails } from "@/components/features/Bookings/BookingDetails";
import { DeclineBookingForm } from "@/components/features/Bookings/DeclineBookingForm";
import { useNavigate } from "react-router-dom";

export default function AdminBookingsPage() {
  const navigate = useNavigate();

  const [status, setStatus] = useState<string | undefined>();
  const { data, isLoading } = useAdminBookings({ status });

  const mutations = useAdminBookingMutations();

  const [viewBooking, setViewBooking] = useState<any>(null);
  const [declineBooking, setDeclineBooking] = useState<any>(null);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Bookings</CardTitle>

        <div className="flex gap-2">
          {["PENDING", "APPROVED", "DECLINED"].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={status === s ? "default" : "outline"}
              onClick={() => setStatus(status === s ? undefined : s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        )}

        {!isLoading && !data?.length && (
          <div className="text-center text-sm text-muted-foreground py-12">
            No bookings found.
          </div>
        )}

        {!!data?.length && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((b: any) => (
                <TableRow key={b?.id}>
                  <TableCell>{b?.booking_type}</TableCell>
                  <TableCell>
                    <button
                      className="text-primary hover:underline text-left"
                      onClick={() =>
                        navigate(`/admin/users?focus=${b.user_id}`)
                      }
                    >
                      {b.user_name}
                      <div className="text-xs text-muted-foreground">
                        {b.user_email}
                      </div>
                    </button>
                  </TableCell>

                  <TableCell>₹{b?.total_amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        b?.status === "APPROVED"
                          ? "default"
                          : b?.status === "DECLINED"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {b?.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setViewBooking(b)}
                    >
                      <Eye size={16} />
                    </Button>

                    {b?.status === "PENDING" && (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => mutations.approve.mutate(b?.id)}
                        >
                          <CheckCircle size={16} />
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setDeclineBooking(b)}
                        >
                          <XCircle size={16} />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* VIEW DETAILS */}
      <Dialog open={!!viewBooking} onOpenChange={() => setViewBooking(null)}>
        <DialogContent className="max-w-[80vw] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          <BookingDetails booking={viewBooking} />
        </DialogContent>
      </Dialog>

      {/* DECLINE */}
      <Dialog
        open={!!declineBooking}
        onOpenChange={() => setDeclineBooking(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Decline Booking</DialogTitle>
          </DialogHeader>

          <DeclineBookingForm
            onSubmit={(reason) => {
              mutations.decline.mutate({
                id: declineBooking.id,
                reason,
              });
              setDeclineBooking(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
