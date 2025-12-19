import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export function BusFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Bus Type</h3>
          <div className="space-y-2">
            {["AC Sleeper", "Non-AC Sleeper", "AC Seater", "Non-AC Seater"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} />
                <Label htmlFor={type} className="text-sm font-normal cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3">Departure Time</h3>
          <div className="space-y-2">
            {[
              "Before 6 AM",
              "6 AM - 12 PM",
              "12 PM - 6 PM",
              "After 6 PM"
            ].map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <Checkbox id={time} />
                <Label htmlFor={time} className="text-sm font-normal cursor-pointer">
                  {time}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="space-y-4">
            <Slider defaultValue={[0, 5000]} max={5000} step={100} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>₹0</span>
              <span>₹5000</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3">Amenities</h3>
          <div className="space-y-2">
            {["WiFi", "Charging Point", "Water Bottle", "Blanket", "Entertainment"].map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox id={amenity} />
                <Label htmlFor={amenity} className="text-sm font-normal cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-3">Operator</h3>
          <div className="space-y-2">
            {["Volvo Express", "SRS Travels", "RedBus Premium", "VRL Travels", "Orange Travels"].map((operator) => (
              <div key={operator} className="flex items-center space-x-2">
                <Checkbox id={operator} />
                <Label htmlFor={operator} className="text-sm font-normal cursor-pointer">
                  {operator}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
