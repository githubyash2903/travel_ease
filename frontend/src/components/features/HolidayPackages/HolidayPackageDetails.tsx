import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HolidayPackageDetails({ pkg, onToggle }: any) {
  if (!pkg) return null;

  return (
    <div className="space-y-4 text-sm overflow-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-base">{pkg.title}</div>
          <div className="text-muted-foreground">{pkg.destination}</div>
          <div className="text-muted-foreground">
            {pkg.duration_days}D / {pkg.duration_nights}N · Min {pkg.min_persons} pax
          </div>
        </div>
        <Badge variant={pkg.is_active ? "default" : "secondary"}>
          {pkg.is_active ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Cover */}
      {pkg.cover_image && (
        <img
          src={pkg.cover_image}
          alt={pkg.title}
          className="w-full h-48 object-cover rounded"
        />
      )}

      {/* Overview */}
      {pkg.overview && (
        <div>
          <div className="font-medium">Overview</div>
          <p className="text-muted-foreground mt-1">{pkg.overview}</p>
        </div>
      )}

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-muted-foreground">Category</div>
          <div>{pkg.category}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Rating</div>
          <div>{pkg.rating} / 5</div>
        </div>
        <div>
          <div className="text-muted-foreground">Price</div>
          <div>₹{pkg.price}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Taxes</div>
          <div>₹{pkg.taxes}</div>
        </div>
      </div>

      {/* Inclusions */}
      {pkg.inclusions?.length > 0 && (
        <div>
          <div className="font-medium mb-1">Inclusions</div>
          <div className="flex flex-wrap gap-2">
            {pkg.inclusions.map((item: string, idx: number) => (
              <Badge key={idx} variant="outline">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Itinerary */}
      {pkg.itinerary?.length > 0 && (
        <div>
          <div className="font-medium mb-2">Itinerary</div>
          <div className="space-y-2">
            {pkg.itinerary.map((d: any) => (
              <div key={d.day} className="rounded border p-2">
                <div className="font-medium">
                  Day {d.day}: {d.title}
                </div>
                <div className="text-muted-foreground text-xs">
                  {d.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <Button variant="outline" onClick={onToggle}>
        {pkg.is_active ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
