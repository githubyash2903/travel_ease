import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export function FlightDetails({ flight, onToggle }: any) {
  if (!flight) return null;

  const departure = flight.departure
    ? format(new Date(flight.departure), "dd/MM/yyyy HH:mm")
    : "-";

  const arrival = flight.arrival
    ? format(new Date(flight.arrival), "dd/MM/yyyy HH:mm")
    : "-";

  return (
    <div className="space-y-4 text-sm overflow-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold">{flight.airline}</div>
          <div className="text-muted-foreground">
            {flight.source} → {flight.destination}
          </div>
        </div>
        <Badge variant={flight.is_active ? "default" : "secondary"}>
          {flight.is_active ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-muted-foreground">Departure</div>
          <div>{departure}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Arrival</div>
          <div>{arrival}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Stops</div>
          <div>{flight.stops === 0 ? "Non-stop" : flight.stops}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Price</div>
          <div>₹{flight.price}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Total Seats</div>
          <div>{flight.total_seats}</div>
        </div>
      </div>

      {/* Actions */}
      <Button variant="outline" onClick={onToggle}>
        {flight.is_active ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
