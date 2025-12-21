import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FlightDetails({ flight, onToggle }: any) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{flight?.airline}</div>
          <div className="text-muted-foreground">
            {flight?.source} → {flight?.destination}
          </div>
        </div>
        <Badge>{flight?.is_active ? "Active" : "Inactive"}</Badge>
      </div>

      <pre className="bg-muted p-3 rounded text-xs overflow-auto">
        {JSON.stringify(flight, null, 2)}
      </pre>

      <Button variant="outline" onClick={onToggle}>
        {flight?.is_active ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
