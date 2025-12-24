import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export function BookingDetails({ booking }: any) {
  if (!booking) return null;

  const createdAt = booking.created_at
    ? format(new Date(booking.created_at), "dd/MM/yyyy HH:mm")
    : "-";

  return (
    <div className="space-y-4 text-sm overflow-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{booking.booking_type} Booking</h3>
          <div className="text-muted-foreground">
            {booking.user_name} · {booking.user_email}
          </div>
        </div>
        <Badge variant="outline">{booking.status}</Badge>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-muted-foreground">Total Amount</div>
          <div>₹{booking.total_amount}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Created At</div>
          <div>{createdAt}</div>
        </div>
        <div className="col-span-2">
          <div className="text-muted-foreground">Booking ID</div>
          <div className="break-all">{booking.id}</div>
        </div>
      </div>
      <div className="space-y-4 text-sm">
        <div>
          <div className="font-semibold">Travellers</div>
          <table className="w-full mt-2 border">
            <thead>
              <tr className="border-b">
                <th className="text-center border">Name</th>
                <th className="text-center border">Age</th>
                <th className="text-center border">Gender</th>
                <th className="text-center border">ID Proof</th>
              </tr>
            </thead>
            <tbody>
              {booking.travellers?.map((t: any, i: number) => (
                <tr key={i} className="border-b">
                  <td className="text-center border">{t.full_name}</td>
                  <td className="text-center border">{t.age}</td>
                  <td className="text-center border">{t.gender}</td>
                  <td className="text-center border">
                    {t.id_proof_type} · {t.id_proof_number}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
