import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Tag,
  CalendarIcon,
  Plane,
  Hotel,
  Palmtree,
  Copy,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import {
  fetchCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "@/api/admin/coupons";

/* --------------------------------------- */

const getScopeIcons = (scope: string[]) =>
  scope.map((s) => {
    if (s === "flights") return <Plane key={s} className="h-4 w-4" />;
    if (s === "hotels") return <Hotel key={s} className="h-4 w-4" />;
    if (s === "packages") return <Palmtree key={s} className="h-4 w-4" />;
    return null;
  });

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCoupon, setEditingCoupon] = useState<any | null>(null);

  /* FORM STATE */
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    value: "",
    minBooking: "",
    maxDiscount: "",
    usageLimit: "",
  });

  const [scope, setScope] = useState({
    flights: false,
    hotels: false,
    packages: false,
  });

  const [dateRange, setDateRange] = useState<{
    from?: Date;
    to?: Date;
  }>({});

  /* --------------------------------------- */

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const data = await fetchCoupons();
      setCoupons(data);
    } catch {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  /* --------------------------------------- */

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied");
  };

  const handleEdit = (coupon: any) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discountType: coupon.discountType,
      value: coupon.value.toString(),
      minBooking: coupon.minBooking.toString(),
      maxDiscount: coupon.maxDiscount?.toString() || "",
      usageLimit: coupon.usageLimit.toString(),
    });
    setScope({
      flights: coupon.scope.includes("flights"),
      hotels: coupon.scope.includes("hotels"),
      packages: coupon.scope.includes("packages"),
    });
    setDateRange({
      from: new Date(coupon.validFrom),
      to: new Date(coupon.validTo),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCoupon(id);
      toast.success("Coupon deleted successfully");
      loadCoupons();
    } catch {
      toast.error("Failed to delete coupon");
    }
  };

  const resetForm = () => {
    setEditingCoupon(null);
    setFormData({
      code: "",
      discountType: "percentage",
      value: "",
      minBooking: "",
      maxDiscount: "",
      usageLimit: "",
    });
    setScope({ flights: false, hotels: false, packages: false });
    setDateRange({});
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        code: formData.code,
        discountType: formData.discountType,
        value: Number(formData.value),
        minBooking: Number(formData.minBooking),
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
        usageLimit: Number(formData.usageLimit),
        scope: Object.keys(scope).filter(
          (k) => scope[k as keyof typeof scope]
        ),
        validFrom: dateRange.from,
        validTo: dateRange.to,
      };

      if (editingCoupon) {
        await updateCoupon(editingCoupon.id, payload);
        toast.success("Coupon updated successfully");
      } else {
        await createCoupon(payload);
        toast.success("Coupon created successfully");
      }

      setIsDialogOpen(false);
      resetForm();
      loadCoupons();
    } catch {
      toast.error("Failed to save coupon");
    }
  };

  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* --------------------------------------- */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Offers & Coupons</h1>
          <p className="text-muted-foreground">
            Create and manage discount coupons
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Create Coupon
            </Button>
          </DialogTrigger>

          {/* 🔥 ORIGINAL FULL FORM – NO FIELD REMOVED */}
          <DialogContent className="max-w-lg max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>
                {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
              </DialogTitle>
              <DialogDescription>
                Configure discount settings and validity period
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4 overflow-y-auto flex-1">
              {/* Coupon Code */}
              <div className="space-y-2">
                <Label>Coupon Code</Label>
                <Input
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>

              {/* Discount Type & Value */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Select
                  value={formData.discountType}
                  onValueChange={(v) =>
                    setFormData({ ...formData, discountType: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  placeholder="Value"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                />
              </div>

              {/* Min / Max */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  type="number"
                  placeholder="Min Booking Amount"
                  value={formData.minBooking}
                  onChange={(e) =>
                    setFormData({ ...formData, minBooking: e.target.value })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max Discount"
                  value={formData.maxDiscount}
                  onChange={(e) =>
                    setFormData({ ...formData, maxDiscount: e.target.value })
                  }
                  disabled={formData.discountType === "fixed"}
                />
              </div>

              {/* Usage */}
              <Input
                type="number"
                placeholder="Usage Limit"
                value={formData.usageLimit}
                onChange={(e) =>
                  setFormData({ ...formData, usageLimit: e.target.value })
                }
              />

              {/* Scope */}
              <div className="flex gap-4">
                {(["flights", "hotels", "packages"] as const).map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <Checkbox
                      checked={scope[s]}
                      onCheckedChange={(v) =>
                        setScope({ ...scope, [s]: !!v })
                      }
                    />
                    <span className="capitalize">{s}</span>
                  </div>
                ))}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from
                        ? format(dateRange.from, "PPP")
                        : "Start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(d) =>
                        setDateRange({ ...dateRange, from: d })
                      }
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to
                        ? format(dateRange.to, "PPP")
                        : "End date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(d) =>
                        setDateRange({ ...dateRange, to: d })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingCoupon ? "Update Coupon" : "Create Coupon"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* SEARCH */}
      <Input
        placeholder="Search coupons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* TABLE */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Active Coupons
          </CardTitle>
          <CardDescription>
            {filteredCoupons.length} coupons found
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-center py-10">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Scope</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredCoupons.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="font-bold">{c.code}</code>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleCopyCode(c.code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge>
                        {c.discountType === "percentage"
                          ? `${c.value}%`
                          : `₹${c.value}`}
                      </Badge>
                    </TableCell>

                    <TableCell className="flex gap-1">
                      {getScopeIcons(c.scope)}
                    </TableCell>

                    <TableCell>
                      {format(new Date(c.validFrom), "dd MMM")} –{" "}
                      {format(new Date(c.validTo), "dd MMM yyyy")}
                    </TableCell>

                    <TableCell>
                      <Badge>{c.isActive ? "Active" : "Inactive"}</Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(c)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDelete(c.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
