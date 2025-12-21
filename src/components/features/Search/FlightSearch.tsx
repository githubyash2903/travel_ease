import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeftRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const mockAirports = [
  { code: "DEL", city: "Delhi", country: "India" },
  { code: "BOM", city: "Mumbai", country: "India" },
  { code: "BLR", city: "Bangalore", country: "India" },
  { code: "MAA", city: "Chennai", country: "India" },
  { code: "HYD", city: "Hyderabad", country: "India" },
  { code: "CCU", city: "Kolkata", country: "India" },
  { code: "GOI", city: "Goa", country: "India" },
];

export const FlightSearch = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("roundtrip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [travelers, setTravelers] = useState({ adults: 1, children: 0, infants: 0 });
  const [travelClass, setTravelClass] = useState("economy");

  const handleSearch = () => {
    if (!from || !to || !departDate || (tripType === "roundtrip" && !returnDate)) {
      toast.error("Please fill all required fields");
      return;
    }

    const params = new URLSearchParams({
      from,
      to,
      departDate: format(departDate, "yyyy-MM-dd"),
      ...(tripType === "roundtrip" && returnDate && { returnDate: format(returnDate, "yyyy-MM-dd") }),
      travelers: JSON.stringify(travelers),
      class: travelClass,
    });

    navigate(`/flights?${params.toString()}`);
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="space-y-6">
      <RadioGroup value={tripType} onValueChange={setTripType} className="flex gap-6">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="roundtrip" id="roundtrip" />
          <Label htmlFor="roundtrip" className="cursor-pointer">Round Trip</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="oneway" id="oneway" />
          <Label htmlFor="oneway" className="cursor-pointer">One Way</Label>
        </div>
      </RadioGroup>

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div className="space-y-2">
          <Label>From</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-12"
              >
                {from ? mockAirports.find(a => a.code === from)?.city : "Select origin"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <Command>
                <CommandInput placeholder="Search airports..." />
                <CommandList>
                  <CommandEmpty>No airports found.</CommandEmpty>
                  <CommandGroup>
                    {mockAirports.map((airport) => (
                      <CommandItem
                        key={airport.code}
                        onSelect={() => setFrom(airport.code)}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{airport.city}</span>
                          <span className="text-sm text-muted-foreground">
                            {airport.code}, {airport.country}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="mb-1 rounded-full hover:bg-primary/10"
          onClick={swapLocations}
        >
          <ArrowLeftRight className="h-5 w-5" />
        </Button>

        <div className="space-y-2">
          <Label>To</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-12"
              >
                {to ? mockAirports.find(a => a.code === to)?.city : "Select destination"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <Command>
                <CommandInput placeholder="Search airports..." />
                <CommandList>
                  <CommandEmpty>No airports found.</CommandEmpty>
                  <CommandGroup>
                    {mockAirports.map((airport) => (
                      <CommandItem
                        key={airport.code}
                        onSelect={() => setTo(airport.code)}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{airport.city}</span>
                          <span className="text-sm text-muted-foreground">
                            {airport.code}, {airport.country}
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Depart Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
                  !departDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departDate ? format(departDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departDate}
                onSelect={setDepartDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {tripType === "roundtrip" && (
          <div className="space-y-2">
            <Label>Return Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-12",
                    !returnDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  disabled={(date) => date < (departDate || new Date())}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        <div className="space-y-2">
          <Label>Travelers & Class</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-12"
              >
                {travelers.adults + travelers.children + travelers.infants} Travelers, {travelClass}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Adults</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTravelers(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{travelers.adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTravelers(prev => ({ ...prev, adults: prev.adults + 1 }))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Travel Class</Label>
                  <RadioGroup value={travelClass} onValueChange={setTravelClass}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="economy" id="economy" />
                      <Label htmlFor="economy" className="cursor-pointer">Economy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="business" id="business" />
                      <Label htmlFor="business" className="cursor-pointer">Business</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button
        className="w-full h-12 text-lg bg-gradient-hero hover:opacity-90 transition-opacity"
        onClick={handleSearch}
      >
        <Search className="mr-2 h-5 w-5" />
        Search Flights
      </Button>
    </div>
  );
};
