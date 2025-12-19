import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

export const HolidayFilters = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-semibold mb-3 block">Budget</Label>
          <Slider defaultValue={[10000, 100000]} max={200000} step={5000} className="mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹10,000</span>
            <span>₹1,00,000</span>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <Label className="text-sm font-semibold mb-3 block">Duration</Label>
          <div className="space-y-2">
            <div className="flex items-center text-center  space-x-2">
              <Checkbox id="2-3-days" />
              <Label htmlFor="2-3-days" className="text-sm cursor-pointer">2-3 Days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="4-6-days" />
              <Label htmlFor="4-6-days" className="text-sm cursor-pointer">4-6 Days</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="week" />
              <Label htmlFor="week" className="text-sm cursor-pointer">1 Week</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="week-plus" />
              <Label htmlFor="week-plus" className="text-sm cursor-pointer">1 Week+</Label>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <Label className="text-sm font-semibold mb-3 block">Package Type</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="adventure" />
              <Label htmlFor="adventure" className="text-sm cursor-pointer">Adventure</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="beach" />
              <Label htmlFor="beach" className="text-sm cursor-pointer">Beach</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="cultural" />
              <Label htmlFor="cultural" className="text-sm cursor-pointer">Cultural</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="honeymoon" />
              <Label htmlFor="honeymoon" className="text-sm cursor-pointer">Honeymoon</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="family" />
              <Label htmlFor="family" className="text-sm cursor-pointer">Family</Label>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <Label className="text-sm font-semibold mb-3 block">Inclusions</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="flights-inc" />
              <Label htmlFor="flights-inc" className="text-sm cursor-pointer">Flights</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="hotels-inc" />
              <Label htmlFor="hotels-inc" className="text-sm cursor-pointer">Hotels</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="meals-inc" />
              <Label htmlFor="meals-inc" className="text-sm cursor-pointer">Meals</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="sightseeing" />
              <Label htmlFor="sightseeing" className="text-sm cursor-pointer">Sightseeing</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="transfers" />
              <Label htmlFor="transfers" className="text-sm cursor-pointer">Transfers</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
