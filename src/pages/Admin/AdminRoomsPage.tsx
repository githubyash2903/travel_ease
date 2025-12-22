import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { useAdminRooms, useAdminRoomMutations } from "@/hooks/useAdminRooms";
import { RoomForm } from "@/components/features/Hotels/RoomForm";
import { RoomDetails } from "@/components/features/Hotels/RoomDetails";


export default function AdminRoomsPage() {
  const { data, isLoading } = useAdminRooms();
  const mutations = useAdminRoomMutations();

  const [formRoom, setFormRoom] = useState<any>(null);
  const [viewRoom, setViewRoom] = useState<any>(null);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Rooms</CardTitle>
        <Button onClick={() => setFormRoom({})}>
          <Plus className="h-4 w-4 mr-2" />
          Add Room
        </Button>
      </CardHeader>

      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        )}

        {!isLoading && !data?.length && (
          <div className="text-sm text-muted-foreground py-10 text-center">
            No rooms found.
          </div>
        )}

        {!!data?.length && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((r: any) => (
                <TableRow key={r.id}>
                  <TableCell>{r.type}</TableCell>
                  <TableCell>{r.hotel_name}</TableCell>
                  <TableCell>₹{r.price_per_night}</TableCell>
                  <TableCell>
                    <Badge variant={r.is_active ? "default" : "secondary"}>
                      {r.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" onClick={() => setViewRoom(r)}>
                      <Eye size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setFormRoom(r)}>
                      <Pencil size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => mutations.remove.mutate(r.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* CREATE / EDIT */}
      <Dialog open={!!formRoom} onOpenChange={() => setFormRoom(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {formRoom?.id ? "Edit Room" : "Create Room"}
            </DialogTitle>
          </DialogHeader>

          <RoomForm
            value={formRoom}
            onSubmit={(payload) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              formRoom?.id
                ? mutations.update.mutate({ id: formRoom.id, payload })
                : mutations.create.mutate(payload);
              setFormRoom(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* DETAILS */}
      <Dialog open={!!viewRoom} onOpenChange={() => setViewRoom(null)}>
        <DialogContent className="max-w-[80vw] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Room Details</DialogTitle>
          </DialogHeader>

          <RoomDetails
            room={viewRoom}
            onToggle={() =>
              viewRoom.is_active
                ? mutations.deactivate.mutate(viewRoom.id)
                : mutations.activate.mutate(viewRoom.id)
            }
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
