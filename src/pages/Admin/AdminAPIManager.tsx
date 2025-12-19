import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Plane,
  Hotel,
  Settings,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  Percent,
  DollarSign,
} from "lucide-react";

/* ---------------- MOCK DATA ---------------- */

const apiStatus = [
  { name: "Amadeus GDS", type: "flights", status: "online", latency: "120ms", lastCheck: "2 mins ago" },
  { name: "Booking.com", type: "hotels", status: "online", latency: "85ms", lastCheck: "2 mins ago" },
  { name: "TBO Holidays", type: "flights", status: "degraded", latency: "450ms", lastCheck: "2 mins ago" },
  { name: "Agoda", type: "hotels", status: "offline", latency: "-", lastCheck: "5 mins ago" },
];

const blacklistedItems = {
  airlines: ["Spirit Airlines", "Frontier Airlines", "Allegiant Air"],
  hotels: ["OYO Rooms", "FabHotels"],
};

/* ---------------- HELPERS ---------------- */

const getStatusIcon = (status: string) => {
  if (status === "online") return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  if (status === "degraded") return <AlertCircle className="h-4 w-4 text-yellow-500" />;
  if (status === "offline") return <XCircle className="h-4 w-4 text-red-500" />;
  return null;
};

const getStatusBadge = (status: string) => {
  if (status === "online") return <Badge className="bg-green-500/10 text-green-600">Online</Badge>;
  if (status === "degraded") return <Badge className="bg-yellow-500/10 text-yellow-600">Degraded</Badge>;
  if (status === "offline") return <Badge className="bg-red-500/10 text-red-600">Offline</Badge>;
  return null;
};

/* ---------------- COMPONENT ---------------- */

export default function AdminAPIManager() {
  // 🔴 ORIGINAL STATES (UNCHANGED)
  const [flightMarkupType, setFlightMarkupType] = useState("percentage");
  const [flightMarkupValue, setFlightMarkupValue] = useState("5");
  const [hotelMarkupType, setHotelMarkupType] = useState("percentage");
  const [hotelMarkupValue, setHotelMarkupValue] = useState("8");

  const [airlines, setAirlines] = useState(blacklistedItems.airlines);
  const [hotels, setHotels] = useState(blacklistedItems.hotels);
  const [newBlacklistItem, setNewBlacklistItem] = useState("");

  const [isManualFlightOpen, setIsManualFlightOpen] = useState(false);
  const [isManualHotelOpen, setIsManualHotelOpen] = useState(false);

  
  const handleRemoveAirline = (airline: string) => {
    setAirlines(airlines.filter(a => a !== airline));
  };

  const handleRemoveHotel = (hotel: string) => {
    setHotels(hotels.filter(h => h !== hotel));
  };


  const handleAddAirline = () => {
    if (newBlacklistItem && !airlines.includes(newBlacklistItem)) {
      setAirlines([...airlines, newBlacklistItem]);
      setNewBlacklistItem("");
    }
  };

  const handleAddHotel = () => {
    if (newBlacklistItem && !hotels.includes(newBlacklistItem)) {
      setHotels([...hotels, newBlacklistItem]);
      setNewBlacklistItem("");
    }
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold">Flight & Hotel API Manager</h1>
        <p className="text-muted-foreground">
          Configure pricing rules, monitor API health, and manage inventory
        </p>
      </div>

      {/* ================= API HEALTH ================= */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" /> API Health Status
          </CardTitle>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead>Last Check</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiStatus.map((api) => (
                <TableRow key={api.name}>
                  <TableCell className="flex items-center gap-2">
                    {getStatusIcon(api.status)} {api.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {api.type === "flights" ? <Plane className="h-3 w-3 mr-1" /> : <Hotel className="h-3 w-3 mr-1" />}
                      {api.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(api.status)}</TableCell>
                  <TableCell>{api.latency}</TableCell>
                  <TableCell>{api.lastCheck}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ================= NEW SECTION (ADDED) ================= */}
      <Card>
        <CardHeader>
          <CardTitle>All Inventory</CardTitle>
          <CardDescription>All flights & hotels (API + Manual)</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="flights">
            <TabsList>
              <TabsTrigger value="flights"><Plane className="h-4 w-4 mr-2" />Flights</TabsTrigger>
              <TabsTrigger value="hotels"><Hotel className="h-4 w-4 mr-2" />Hotels</TabsTrigger>
            </TabsList>

            <TabsContent value="flights">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Airline</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Air India</TableCell>
                    <TableCell>DEL → BOM</TableCell>
                    <TableCell>19 Dec, 10:30</TableCell>
                    <TableCell>₹6,500</TableCell>
                    <TableCell><Badge>API</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="hotels">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hotel</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Source</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Taj Palace</TableCell>
                    <TableCell>Mumbai</TableCell>
                    <TableCell>★★★★★</TableCell>
                    <TableCell>₹15,000</TableCell>
                    <TableCell><Badge>API</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Markup Settings */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Flight Markup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Flight Markup Settings
            </CardTitle>
            <CardDescription>Configure global markup for flight bookings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label>Markup Type</Label>
                <Select value={flightMarkupType} onValueChange={setFlightMarkupType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">
                      <div className="flex items-center gap-2">
                        <Percent className="h-4 w-4" />
                        Percentage
                      </div>
                    </SelectItem>
                    <SelectItem value="fixed">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Fixed Amount
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label>Markup Value</Label>
                <div className="relative">
                  <Input 
                    type="number"
                    value={flightMarkupValue}
                    onChange={(e) => setFlightMarkupValue(e.target.value)}
                    className="pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {flightMarkupType === "percentage" ? "%" : "₹"}
                  </span>
                </div>
              </div>
            </div>
            <Button className="w-full">Save Flight Settings</Button>
          </CardContent>
        </Card>

        {/* Hotel Markup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hotel className="h-5 w-5" />
              Hotel Markup Settings
            </CardTitle>
            <CardDescription>Configure global markup for hotel bookings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label>Markup Type</Label>
                <Select value={hotelMarkupType} onValueChange={setHotelMarkupType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">
                      <div className="flex items-center gap-2">
                        <Percent className="h-4 w-4" />
                        Percentage
                      </div>
                    </SelectItem>
                    <SelectItem value="fixed">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Fixed Amount
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-2">
                <Label>Markup Value</Label>
                <div className="relative">
                  <Input 
                    type="number"
                    value={hotelMarkupValue}
                    onChange={(e) => setHotelMarkupValue(e.target.value)}
                    className="pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {hotelMarkupType === "percentage" ? "%" : "₹"}
                  </span>
                </div>
              </div>
            </div>
            <Button className="w-full">Save Hotel Settings</Button>
          </CardContent>
        </Card>
      </div>

      {/* Blacklist & Manual Override */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Blacklist Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Blacklist Settings</CardTitle>
            <CardDescription>Manage airlines and hotel chains to exclude from search results</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="airlines">
              <TabsList className="w-full">
                <TabsTrigger value="airlines" className="flex-1">Airlines</TabsTrigger>
                <TabsTrigger value="hotels" className="flex-1">Hotel Chains</TabsTrigger>
              </TabsList>
              <TabsContent value="airlines" className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add airline to blacklist..."
                    value={newBlacklistItem}
                    onChange={(e) => setNewBlacklistItem(e.target.value)}
                  />
                  <Button onClick={handleAddAirline}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {airlines.map((airline) => (
                    <div key={airline} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{airline}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveAirline(airline)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="hotels" className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add hotel chain to blacklist..."
                    value={newBlacklistItem}
                    onChange={(e) => setNewBlacklistItem(e.target.value)}
                  />
                  <Button onClick={handleAddHotel}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {hotels.map((hotel) => (
                    <div key={hotel} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <span className="font-medium">{hotel}</span>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveHotel(hotel)} className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Manual Override */}
        <Card>
          <CardHeader>
            <CardTitle>Manual Inventory Override</CardTitle>
            <CardDescription>Add special offline inventory for flights and hotels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog open={isManualFlightOpen} onOpenChange={setIsManualFlightOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Plane className="mr-2 h-4 w-4" />
                  Add Manual Flight
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Manual Flight</DialogTitle>
                  <DialogDescription>Create a custom flight listing for special inventory</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Airline</Label>
                      <Input placeholder="e.g., Air India" />
                    </div>
                    <div className="space-y-2">
                      <Label>Flight Number</Label>
                      <Input placeholder="e.g., AI-302" />
                    </div>
                    <div className="space-y-2">
                      <Label>From</Label>
                      <Input placeholder="e.g., DEL" />
                    </div>
                    <div className="space-y-2">
                      <Label>To</Label>
                      <Input placeholder="e.g., MLE" />
                    </div>
                    <div className="space-y-2">
                      <Label>Departure Time</Label>
                      <Input type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label>Arrival Time</Label>
                      <Input type="datetime-local" />
                    </div>
                    <div className="space-y-2">
                      <Label>Price (₹)</Label>
                      <Input type="number" placeholder="45000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Available Seats</Label>
                      <Input type="number" placeholder="50" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsManualFlightOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsManualFlightOpen(false)}>Add Flight</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isManualHotelOpen} onOpenChange={setIsManualHotelOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Hotel className="mr-2 h-4 w-4" />
                  Add Manual Hotel
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Manual Hotel</DialogTitle>
                  <DialogDescription>Create a custom hotel listing for special inventory</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Hotel Name</Label>
                      <Input placeholder="e.g., Taj Mahal Palace" />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input placeholder="e.g., Mumbai, India" />
                    </div>
                    <div className="space-y-2">
                      <Label>Star Rating</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Star</SelectItem>
                          <SelectItem value="4">4 Star</SelectItem>
                          <SelectItem value="3">3 Star</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Price per Night (₹)</Label>
                      <Input type="number" placeholder="15000" />
                    </div>
                    <div className="space-y-2">
                      <Label>Available Rooms</Label>
                      <Input type="number" placeholder="10" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsManualHotelOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsManualHotelOpen(false)}>Add Hotel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="p-4 rounded-lg bg-muted/50 border border-dashed">
              <p className="text-sm text-muted-foreground text-center">
                Manual inventory items will appear alongside API results and can be managed separately.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
