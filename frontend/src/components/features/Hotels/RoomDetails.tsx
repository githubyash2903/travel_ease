import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function RoomDetails({ room, onToggle }: any) {
  if (!room) return null;

  const amenities = Object.entries(room.amenities || {}).filter(
    ([, v]) => v === true
  );

  const primaryImage =
    room.images?.find((i: any) => i.is_primary)?.url ??
    room.images?.[0]?.url;

  return (
    <div className="space-y-4 text-sm overflow-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold">{room.type}</div>
          <div className="text-muted-foreground">{room.hotel_name}</div>
        </div>
        <Badge variant={room.is_active ? "default" : "secondary"}>
          {room.is_active ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Image */}
      {primaryImage && (
        <img
          src={primaryImage}
          alt={room.type}
          className="w-full h-36 object-cover rounded"
        />
      )}

      {/* Description */}
      {room.description && (
        <p className="text-muted-foreground">{room.description}</p>
      )}

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-muted-foreground">Area</div>
          <div>{room.area_sqft} sqft</div>
        </div>
        <div>
          <div className="text-muted-foreground">Max Occupancy</div>
          <div>{room.max_occupancy} guests</div>
        </div>
        <div>
          <div className="text-muted-foreground">Price</div>
          <div>₹{room.price_per_night} / night</div>
        </div>
        <div>
          <div className="text-muted-foreground">Total Rooms</div>
          <div>{room.total_rooms}</div>
        </div>
      </div>

      {/* Beds */}
      {room.beds?.length > 0 && (
        <div>
          <div className="text-muted-foreground mb-1">Beds</div>
          <div className="flex flex-wrap gap-2">
            {room.beds.map((b: any, idx: number) => (
              <Badge key={idx} variant="outline">
                {b.count} {b.type}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Amenities */}
      {amenities.length > 0 && (
        <div>
          <div className="text-muted-foreground mb-1">Amenities</div>
          <div className="flex flex-wrap gap-2">
            {amenities.map(([key]) => (
              <Badge key={key} variant="outline">
                {key.replace(/_/g, " ")}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <Button variant="outline" onClick={onToggle}>
        {room.is_active ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
