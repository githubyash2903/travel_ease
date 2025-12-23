import { Badge } from "@/components/ui/badge";

export function BookingDetails({ booking }: any) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <h3 className="font-semibold">
          {booking?.booking_type} Booking
        </h3>
        <Badge>{booking?.status}</Badge>
      </div>

      <pre className="bg-muted p-3 rounded text-xs overflow-auto">
        {JSON.stringify(booking, null, 2)}
      </pre>
    </div>
  );
}
