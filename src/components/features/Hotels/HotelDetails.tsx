import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HotelDetails({ hotel, onToggleStatus }: any) {
  if (!hotel) return null;

  const amenities = Object.entries(hotel.amenities || {}).filter(
    ([, v]) => v === true
  );

  const primaryImage =
    hotel.images?.find((i: any) => i.is_primary)?.url ?? hotel.images?.[0]?.url;

  return (
    <div className="space-y-4 text-sm overflow-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">{hotel.name}</h3>
          <p className="text-muted-foreground">
            {hotel.city}, {hotel.state}
          </p>
        </div>
        <Badge variant={hotel.is_active ? "default" : "secondary"}>
          {hotel.is_active ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Image */}
      {primaryImage && (
        <img
          src={primaryImage}
          alt={hotel.name}
          className="w-full h-40 object-cover rounded"
        />
      )}

      {/* Description */}
      {hotel.description && (
        <p className="text-muted-foreground">{hotel.description}</p>
      )}

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-muted-foreground">Rating</div>
          <div>
            {hotel.rating} / 5 ({hotel.rating_count})
          </div>
        </div>
        <div>
          <div className="text-muted-foreground">Price</div>
          <div>₹{hotel.min_price_per_night} / night</div>
        </div>
        <div className="col-span-2">
          <div className="text-muted-foreground">Address</div>
          <div>{hotel.address}</div>
        </div>
      </div>

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
      <Button variant="outline" onClick={onToggleStatus}>
        {hotel.is_active ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
