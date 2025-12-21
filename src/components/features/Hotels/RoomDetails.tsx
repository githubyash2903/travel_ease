import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function RoomDetails({ room, onToggle }: any) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{room?.type}</div>
          <div className="text-muted-foreground">{room?.hotel_name}</div>
        </div>
        <Badge>{room?.is_active ? "Active" : "Inactive"}</Badge>
      </div>

      <pre className="rounded bg-muted p-3 text-xs overflow-auto">
        {JSON.stringify(room, null, 2)}
      </pre>

      <Button variant="outline" onClick={onToggle}>
        {room?.is_active ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
}
