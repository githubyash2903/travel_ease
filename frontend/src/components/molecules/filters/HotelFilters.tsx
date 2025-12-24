// src/components/molecules/filters/HotelFilters.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Filters = {
  priceRange: [number, number];
  stars: number[];
  amenities: string[];
  propertyType: string;
  roomType: string;
};

export const HotelFilters = ({
  filters,
  setFilters,
  roomTypes
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  roomTypes: string[];
}) => {
  const amenitiesList = ["Wifi", "Pool", "Breakfast", "Gym", "Parking"];
  const propertyTypes = ["Hotel", "Resort", "Guesthouse", "Apartment"];

  const toggleAmenity = (a: string) => {
    const s = new Set(filters.amenities);
    s.has(a) ? s.delete(a) : s.add(a);
    setFilters({ ...filters, amenities: Array.from(s) });
  };

  const toggleStar = (sNum: number) => {
    const s = new Set(filters.stars);
    s.has(sNum) ? s.delete(sNum) : s.add(sNum);
    setFilters({ ...filters, stars: Array.from(s) });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium">Price Range</Label>
          <Slider
            defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
            min={0}
            max={50000}
            onValueChange={(v) => setFilters({ ...filters, priceRange: [v[0], v[1]] })}
          />
          <div className="flex justify-between text-xs mt-1 text-muted-foreground">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>

        {/* Stars */}
        <div>
          <Label className="text-sm font-medium">Star Rating</Label>
          <div className="flex flex-col gap-2 mt-2">
            {[5, 4, 3, 2, 1].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <Checkbox checked={filters.stars.includes(s)} onCheckedChange={() => toggleStar(s)} />
                <span>{s}-Star</span>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div>
          <Label className="text-sm font-medium">Amenities</Label>
          <div className="flex flex-col gap-2 mt-2">
            {amenitiesList.map((a) => (
              <div key={a} className="flex items-center gap-2">
                <Checkbox checked={filters.amenities.includes(a)} onCheckedChange={() => toggleAmenity(a)} />
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div>
          <Label className="text-sm font-medium">Property Type</Label>
          <Select
            value={filters.propertyType || "any"}
            onValueChange={(v) => setFilters({ ...filters, propertyType: v === "any" ? "" : v })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {propertyTypes.map((pt) => (
                <SelectItem key={pt} value={pt}>
                  {pt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Room Type Filter */}
        <div>
          <Label className="text-sm font-medium">Room Type</Label>
          <Select
            value={filters.roomType || "any"}
            onValueChange={(v) => setFilters({ ...filters, roomType: v === "any" ? "" : v })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {roomTypes.map((rt) => (
                <SelectItem key={rt} value={rt}>
                  {rt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
