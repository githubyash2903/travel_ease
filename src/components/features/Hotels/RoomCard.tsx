// components/room/RoomCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Room } from "@/types/room";


export function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardContent className="grid md:grid-cols-3 gap-4 p-4">
        <img
          src={room.images?.[0] || "/room.jpg"}
          className="h-32 w-full object-cover rounded"
        />

        <div className="md:col-span-2 space-y-2">
          <div className="flex justify-between">
            <h4 className="font-semibold">{room.type}</h4>
            <span className="font-bold">₹{room.price_per_night}/night</span>
          </div>

          <p className="text-sm text-muted-foreground">{room.description}</p>

          <Button size="sm">Select Room</Button>
        </div>
      </CardContent>
    </Card>
  );
}
