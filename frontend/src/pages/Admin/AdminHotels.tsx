import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { useAdminHotels, useAdminHotelMutations } from "@/hooks/useAdminHotels";
import { HotelForm } from "@/components/features/Hotels/HotelForm";
import { HotelDetails } from "@/components/features/Hotels/HotelDetails";


export default function AdminHotelsPage() {
  const { data, isLoading } = useAdminHotels();
  const mutations = useAdminHotelMutations();

  const [formHotel, setFormHotel] = useState<any>(null);
  const [viewHotel, setViewHotel] = useState<any>(null);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Hotels</CardTitle>
        <Button onClick={() => setFormHotel({})}>
          <Plus className="mr-2 h-4 w-4" />
          Add Hotel
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
          <div className="text-center text-sm text-muted-foreground py-12">
            No hotels found. Create your first hotel.
          </div>
        )}

        {!!data?.length && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((h: any) => (
                <TableRow key={h.id}>
                  <TableCell className="font-medium">
                    {h.name}
                  </TableCell>
                  <TableCell>{h.city}</TableCell>
                  <TableCell>₹{h.min_price_per_night}</TableCell>
                  <TableCell>
                    <Badge variant={h.is_active ? "default" : "secondary"}>
                      {h.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex gap-2 justify-end">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setViewHotel(h)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setFormHotel(h)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => mutations.remove.mutate(h.id)}
                    >
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
      <Dialog open={!!formHotel} onOpenChange={() => setFormHotel(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {formHotel?.id ? "Edit Hotel" : "Create Hotel"}
            </DialogTitle>
          </DialogHeader>

          <HotelForm
            value={formHotel}
            onSubmit={(payload) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              formHotel?.id
                ? mutations.update.mutate({ id: formHotel.id, payload })
                : mutations.create.mutate(payload);
              setFormHotel(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* VIEW DETAILS */}
      <Dialog open={!!viewHotel} onOpenChange={() => setViewHotel(null)}>
        <DialogContent className="max-w-[80vw] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Hotel Details</DialogTitle>
          </DialogHeader>

          <HotelDetails
            hotel={viewHotel}
            onToggleStatus={() =>
              viewHotel.is_active
                ? mutations.deactivate.mutate(viewHotel.id)
                : mutations.activate.mutate(viewHotel.id)
            }
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
