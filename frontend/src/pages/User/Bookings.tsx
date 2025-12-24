import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyBookings } from "@/hooks/useBookings";

export default function BookingsPage() {
  const { data, isLoading } = useMyBookings();

  if (isLoading)
    return <Skeleton className="h-40 w-full" />;

  if (!data?.length)
    return (
      <div className="text-center text-muted-foreground py-12">
        No bookings found.
      </div>
    );

  return (
    <div className="container py-8 space-y-4">
      {data.map((b: any) => (
        <Card key={b.id}>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between">
              <div className="font-medium">
                {b.booking_type} Booking
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

            <div className="text-sm text-muted-foreground">
              Amount: ₹{b.total_amount}
            </div>

            {b.status === "DECLINED" && (
              <div className="text-sm text-red-600">
                Reason: {b.decline_reason}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
