import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HolidayPackageDetails({ pkg, onToggle }: any) {
  return (
    <div className="space-y-4 text-sm">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold text-base">{pkg?.title}</div>
          <div className="text-muted-foreground">{pkg?.destination}</div>
          <div className="text-muted-foreground">
            {pkg?.duration_days}D / {pkg?.duration_nights}N · Min {pkg?.min_persons} pax
          </div>
        </div>
        <Badge>{pkg?.is_active ? "Active" : "Inactive"}</Badge>
      </div>

      <img
        src={pkg?.cover_image}
        alt={pkg?.title}
        className="w-full h-48 object-cover rounded"
      />

      <div>
        <strong>Overview</strong>
        <p className="text-muted-foreground mt-1">{pkg?.overview}</p>
      </div>

      <pre className="bg-muted p-3 rounded text-xs overflow-auto">
        {JSON.stringify(pkg, null, 2)}
      </pre>

      <Button variant="outline" onClick={onToggle}>
        {pkg?.is_active ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
