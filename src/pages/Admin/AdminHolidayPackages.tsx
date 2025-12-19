import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Search, 
  Upload,
  X,
  GripVertical,
  Image as ImageIcon
} from "lucide-react";

const mockPackages = [
  {
    id: "1",
    title: "Maldives Honeymoon Escape",
    slug: "maldives-honeymoon-escape",
    destination: "Maldives",
    duration: "5D/4N",
    category: "Honeymoon",
    basePrice: 125000,
    offerPrice: 99000,
    isFeatured: true,
    isActive: true,
    thumbnail: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Kerala Backwaters Tour",
    slug: "kerala-backwaters-tour",
    destination: "Kerala, India",
    duration: "4D/3N",
    category: "Nature",
    basePrice: 45000,
    offerPrice: 38000,
    isFeatured: false,
    isActive: true,
    thumbnail: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Ladakh Adventure Expedition",
    slug: "ladakh-adventure-expedition",
    destination: "Ladakh, India",
    duration: "7D/6N",
    category: "Adventure",
    basePrice: 85000,
    offerPrice: 72000,
    isFeatured: true,
    isActive: true,
    thumbnail: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Bali Paradise Getaway",
    slug: "bali-paradise-getaway",
    destination: "Bali, Indonesia",
    duration: "6D/5N",
    category: "Beach",
    basePrice: 95000,
    offerPrice: 82000,
    isFeatured: false,
    isActive: false,
    thumbnail: "/placeholder.svg"
  },
];

const categories = ["Honeymoon", "Adventure", "Nature", "Beach", "Cultural", "Wildlife", "Pilgrimage", "Family"];

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export default function AdminHolidayPackages() {
  const [packages, setPackages] = useState(mockPackages);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPackage, setEditingPackage] = useState<typeof mockPackages[0] | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    days: "",
    nights: "",
    category: "",
    basePrice: "",
    offerPrice: "",
    currency: "INR",
    inclusions: "",
    exclusions: "",
    isFeatured: false,
    isActive: true,
  });
  
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { day: 1, title: "", description: "" }
  ]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleAddDay = () => {
    setItinerary([...itinerary, { day: itinerary.length + 1, title: "", description: "" }]);
  };

  const handleRemoveDay = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index).map((item, i) => ({ ...item, day: i + 1 })));
  };

  const handleItineraryChange = (index: number, field: "title" | "description", value: string) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const handleEdit = (pkg: typeof mockPackages[0]) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      destination: pkg.destination,
      days: pkg.duration.split("D")[0],
      nights: pkg.duration.split("/")[1]?.replace("N", "") || "",
      category: pkg.category,
      basePrice: pkg.basePrice.toString(),
      offerPrice: pkg.offerPrice.toString(),
      currency: "INR",
      inclusions: "",
      exclusions: "",
      isFeatured: pkg.isFeatured,
      isActive: pkg.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPackages(packages.filter(p => p.id !== id));
  };

  const handleSubmit = () => {
    // Handle form submission
    setIsDialogOpen(false);
    setEditingPackage(null);
    setFormData({
      title: "",
      destination: "",
      days: "",
      nights: "",
      category: "",
      basePrice: "",
      offerPrice: "",
      currency: "INR",
      inclusions: "",
      exclusions: "",
      isFeatured: false,
      isActive: true,
    });
    setItinerary([{ day: 1, title: "", description: "" }]);
  };

  const filteredPackages = packages.filter(pkg => 
    pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Holiday Packages</h1>
          <p className="text-muted-foreground">Manage your travel packages and itineraries</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingPackage(null); setFormData({ title: "", destination: "", days: "", nights: "", category: "", basePrice: "", offerPrice: "", currency: "INR", inclusions: "", exclusions: "", isFeatured: false, isActive: true }); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPackage ? "Edit Package" : "Create New Package"}</DialogTitle>
              <DialogDescription>Fill in the details to {editingPackage ? "update" : "create"} a holiday package.</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Basic Information</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Package Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Maldives Honeymoon Escape"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (Auto-generated)</Label>
                    <Input 
                      id="slug" 
                      value={generateSlug(formData.title)}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input 
                      id="destination" 
                      placeholder="e.g., Maldives"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Days"
                        type="number"
                        value={formData.days}
                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                      />
                      <Input 
                        placeholder="Nights"
                        type="number"
                        value={formData.nights}
                        onChange={(e) => setFormData({ ...formData, nights: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Pricing</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="basePrice">Base Price</Label>
                    <Input 
                      id="basePrice" 
                      type="number"
                      placeholder="125000"
                      value={formData.basePrice}
                      onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="offerPrice">Offer Price</Label>
                    <Input 
                      id="offerPrice" 
                      type="number"
                      placeholder="99000"
                      value={formData.offerPrice}
                      onChange={(e) => setFormData({ ...formData, offerPrice: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">INR (₹)</SelectItem>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Media */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Media</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Thumbnail Image</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Gallery Images</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Add multiple images</p>
                      <p className="text-xs text-muted-foreground mt-1">Up to 10 images</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Itinerary Builder */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Itinerary Builder</h3>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddDay}>
                    <Plus className="mr-1 h-4 w-4" />
                    Add Day
                  </Button>
                </div>
                <div className="space-y-3">
                  {itinerary.map((day, index) => (
                    <Card key={index} className="relative">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center gap-2 pt-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                            <Badge variant="secondary">Day {day.day}</Badge>
                          </div>
                          <div className="flex-1 space-y-3">
                            <Input 
                              placeholder="Day title (e.g., Arrival & Check-in)"
                              value={day.title}
                              onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                            />
                            <Textarea 
                              placeholder="Day description and activities..."
                              value={day.description}
                              onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                              rows={2}
                            />
                          </div>
                          {itinerary.length > 1 && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleRemoveDay(index)}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Inclusions/Exclusions */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="inclusions">Inclusions</Label>
                  <Textarea 
                    id="inclusions"
                    placeholder="Enter inclusions (one per line)"
                    value={formData.inclusions}
                    onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exclusions">Exclusions</Label>
                  <Textarea 
                    id="exclusions"
                    placeholder="Enter exclusions (one per line)"
                    value={formData.exclusions}
                    onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
                    rows={4}
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <Switch 
                    id="featured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                  />
                  <Label htmlFor="featured">Is Featured?</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch 
                    id="active"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label htmlFor="active">Is Active?</Label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>{editingPackage ? "Update Package" : "Create Package"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search packages..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Packages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Packages</CardTitle>
          <CardDescription>{filteredPackages.length} packages found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={pkg.thumbnail} 
                        alt={pkg.title}
                        className="h-10 w-14 rounded object-cover bg-muted"
                      />
                      <div>
                        <p className="font-medium">{pkg.title}</p>
                        {pkg.isFeatured && <Badge variant="secondary" className="text-xs mt-1">Featured</Badge>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{pkg.destination}</TableCell>
                  <TableCell>{pkg.duration}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{pkg.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">₹{pkg.offerPrice.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground line-through">₹{pkg.basePrice.toLocaleString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={pkg.isActive ? "default" : "secondary"}>
                      {pkg.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(pkg)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(pkg.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
