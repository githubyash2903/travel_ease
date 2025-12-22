import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { useAdminFlights, useAdminFlightMutations } from "@/hooks/useAdminFlights";
import { FlightForm } from "@/components/features/Flights/FlightForm";
import { FlightDetails } from "@/components/features/Flights/FlightDetails";

export default function AdminFlightsPage() {
  const { data, isLoading } = useAdminFlights();
  const mutations = useAdminFlightMutations();

  const [formFlight, setFormFlight] = useState<any>(null);
  const [viewFlight, setViewFlight] = useState<any>(null);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Flights</CardTitle>
        <Button onClick={() => setFormFlight({})}>
          <Plus className="h-4 w-4 mr-2" />
          Add Flight
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
          <div className="text-center text-sm text-muted-foreground py-10">
            No flights found.
          </div>
        )}

        {!!data?.length && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Airline</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((f: any) => (
                <TableRow key={f.id}>
                  <TableCell>{f.airline}</TableCell>
                  <TableCell>
                    {f.source} → {f.destination}
                  </TableCell>
                  <TableCell>
                    {new Date(f.departure).toLocaleString()}
                  </TableCell>
                  <TableCell>₹{f.price}</TableCell>
                  <TableCell>
                    <Badge variant={f.is_active ? "default" : "secondary"}>
                      {f.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" onClick={() => setViewFlight(f)}>
                      <Eye size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setFormFlight(f)}>
                      <Pencil size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => mutations.remove.mutate(f.id)}>
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
      <Dialog open={!!formFlight} onOpenChange={() => setFormFlight(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {formFlight?.id ? "Edit Flight" : "Create Flight"}
            </DialogTitle>
          </DialogHeader>

          <FlightForm
            value={formFlight}
            onSubmit={(payload) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              formFlight?.id
                ? mutations.update.mutate({ id: formFlight.id, payload })
                : mutations.create.mutate(payload);
              setFormFlight(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* DETAILS */}
      <Dialog open={!!viewFlight} onOpenChange={() => setViewFlight(null)}>
        <DialogContent className="max-w-[80vw] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Flight Details</DialogTitle>
          </DialogHeader>

          <FlightDetails
            flight={viewFlight}
            onToggle={() =>
              viewFlight.is_active
                ? mutations.deactivate.mutate(viewFlight.id)
                : mutations.activate.mutate(viewFlight.id)
            }
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
