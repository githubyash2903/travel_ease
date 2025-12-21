import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";
import { toast } from "sonner";

const destinations = [
  "Bali, Indonesia", "Maldives", "Switzerland", "Dubai, UAE", "Paris, France", 
  "Thailand", "Greece", "Japan", "Australia", "Singapore"
];

const packageTypes = [
  "Honeymoon", "Family", "Adventure", "Beach", "Cultural", "Luxury", "Budget"
];

export const HolidaySearch = () => {
  const [destination, setDestination] = useState("");
  const [packageType, setPackageType] = useState("");

  const handleSearch = () => {
    if (!destination && !packageType) {
      toast.error("Please select at least destination or package type");
      return;
    }
    toast.success("Searching holiday packages...");
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Destination</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-12"
              >
                {destination || "Where do you want to go?"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <Command>
                <CommandInput placeholder="Search destinations..." />
                <CommandList>
                  <CommandEmpty>No destinations found.</CommandEmpty>
                  <CommandGroup>
                    {destinations.map((dest) => (
                      <CommandItem key={dest} onSelect={() => setDestination(dest)}>
                        {dest}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Package Type</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-12"
              >
                {packageType || "Select package type"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <Command>
                <CommandInput placeholder="Search package types..." />
                <CommandList>
                  <CommandEmpty>No package types found.</CommandEmpty>
                  <CommandGroup>
                    {packageTypes.map((type) => (
                      <CommandItem key={type} onSelect={() => setPackageType(type)}>
                        {type}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button
        className="w-full h-12 text-lg bg-gradient-hero hover:opacity-90 transition-opacity"
        onClick={handleSearch}
      >
        <Search className="mr-2 h-5 w-5" />
        Search Holiday Packages
      </Button>
    </div>
  );
};
