import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

export const FlightFilters = ({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: (val: any) => void;
}) => {
  // Handle checkbox array filters
  const toggleFilter = (category: string, value: string) => {
    const arr = filters[category] || [];
    if (arr.includes(value)) {
      setFilters({ ...filters, [category]: arr.filter((v: any) => v !== value) });
    } else {
      setFilters({ ...filters, [category]: [...arr, value] });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* -------- Stops -------- */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Stops</Label>
          <div className="space-y-2">
            {["non-stop", "1-stop", "2-stops"].map((stop) => (
              <div key={stop} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.stops.includes(stop)}
                  onCheckedChange={() => toggleFilter("stops", stop)}
                />
                <Label className="text-sm cursor-pointer capitalize">{stop}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* -------- Price Range -------- */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Price Range</Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(v) => setFilters({ ...filters, priceRange: v })}
            max={100000}
            step={1000}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{filters.priceRange[0]}</span>
            <span>₹{filters.priceRange[1]}</span>
          </div>
        </div>

        <Separator />

        {/* -------- Airlines -------- */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Airlines</Label>
          <div className="space-y-2">
            {["IndiGo", "Air India", "SpiceJet", "Vistara"].map((airline) => (
              <div key={airline} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.airlines.includes(airline)}
                  onCheckedChange={() => toggleFilter("airlines", airline)}
                />
                <Label className="text-sm cursor-pointer">{airline}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* -------- Departure Time -------- */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Departure Time</Label>
          <div className="space-y-2">
            {[
              ["morning", "6AM - 12PM"],
              ["afternoon", "12PM - 6PM"],
              ["evening", "6PM - 12AM"],
              ["night", "12AM - 6AM"],
            ].map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.departure.includes(key)}
                  onCheckedChange={() => toggleFilter("departure", key)}
                />
                <Label className="text-sm cursor-pointer">{label}</Label>
              </div>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
