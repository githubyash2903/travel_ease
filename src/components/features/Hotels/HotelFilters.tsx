import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

export const HotelFilters = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-semibold mb-3 block">Price per Night</Label>
          <Slider defaultValue={[1000, 10000]} max={20000} step={500} className="mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹1,000</span>
            <span>₹10,000</span>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <Label className="text-sm font-semibold mb-3 block">Star Rating</Label>
          <div className="space-y-2">
            {[5, 4, 3, 2].map((stars) => (
              <div key={stars} className="flex items-center space-x-2">
                <Checkbox id={`${stars}-star`} />
                <Label htmlFor={`${stars}-star`} className="text-sm cursor-pointer flex items-center gap-1">
                  {stars} <Star className="h-3 w-3 fill-warning text-warning" />
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <Label className="text-sm font-semibold mb-3 block">Amenities</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="wifi" />
              <Label htmlFor="wifi" className="text-sm cursor-pointer">Free WiFi</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="breakfast" />
              <Label htmlFor="breakfast" className="text-sm cursor-pointer">Free Breakfast</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pool" />
              <Label htmlFor="pool" className="text-sm cursor-pointer">Swimming Pool</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="parking" />
              <Label htmlFor="parking" className="text-sm cursor-pointer">Free Parking</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="gym" />
              <Label htmlFor="gym" className="text-sm cursor-pointer">Gym</Label>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <Label className="text-sm font-semibold mb-3 block">Property Type</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="hotel" />
              <Label htmlFor="hotel" className="text-sm cursor-pointer">Hotel</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="resort" />
              <Label htmlFor="resort" className="text-sm cursor-pointer">Resort</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="villa" />
              <Label htmlFor="villa" className="text-sm cursor-pointer">Villa</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="apartment" />
              <Label htmlFor="apartment" className="text-sm cursor-pointer">Apartment</Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
