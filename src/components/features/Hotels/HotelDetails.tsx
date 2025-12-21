import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HotelDetails({ hotel, onToggleStatus }: any) {
  return (
    <div className="space-y-3 text-sm overflow-auto">
      <div className="flex justify-between">
        <h3 className="font-semibold">{hotel?.name}</h3>
        <Badge>{hotel?.is_active ? "Active" : "Inactive"}</Badge>
      </div>

      <pre className="bg-muted p-3 rounded text-xs overflow-auto">
        {JSON.stringify(hotel, null, 2)}
      </pre>

      <Button variant="outline" onClick={onToggleStatus}>
        {hotel?.is_active ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
