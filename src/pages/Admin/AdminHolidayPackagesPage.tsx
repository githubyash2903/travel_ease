import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

import {
  useAdminHolidayPackages,
  useAdminHolidayPackageMutations,
} from "@/hooks/useAdminHolidayPackages";
import { HolidayPackageForm } from "@/components/features/HolidayPackages/HolidayPackageForm";
import { HolidayPackageDetails } from "@/components/features/HolidayPackages/HolidayPackageDetails";

export default function AdminHolidayPackagesPage() {
  const { data, isLoading } = useAdminHolidayPackages();
  const mutations = useAdminHolidayPackageMutations();

  const [formPkg, setFormPkg] = useState<any>(null);
  const [viewPkg, setViewPkg] = useState<any>(null);

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Holiday Packages</CardTitle>
        <Button onClick={() => setFormPkg({})}>
          <Plus className="h-4 w-4 mr-2" />
          Add Package
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
            No holiday packages found.
          </div>
        )}

        {!!data?.length && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Min Pax</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((p: any) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>{p.destination}</TableCell>
                  <TableCell>
                    {p.duration_days}D / {p.duration_nights}N
                  </TableCell>
                  <TableCell>₹{p.price}</TableCell>
                  <TableCell>{p.min_persons}</TableCell>
                  <TableCell>
                    <Badge variant={p.is_active ? "default" : "secondary"}>
                      {p.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setViewPkg(p)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setFormPkg(p)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => mutations.remove.mutate(p.id)}
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
      <Dialog open={!!formPkg} onOpenChange={() => setFormPkg(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              {formPkg?.id ? "Edit Holiday Package" : "Create Holiday Package"}
            </DialogTitle>
          </DialogHeader>

          <HolidayPackageForm
            value={formPkg}
            onSubmit={(payload) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              formPkg?.id
                ? mutations.update.mutate({ id: formPkg.id, payload })
                : mutations.create.mutate(payload);
              setFormPkg(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* DETAILS */}
      <Dialog open={!!viewPkg} onOpenChange={() => setViewPkg(null)}>
        <DialogContent className="max-w-[80vw] max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Holiday Package Details</DialogTitle>
          </DialogHeader>

          <HolidayPackageDetails
            pkg={viewPkg}
            onToggle={() =>
              viewPkg.is_active
                ? mutations.deactivate.mutate(viewPkg.id)
                : mutations.activate.mutate(viewPkg.id)
            }
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
