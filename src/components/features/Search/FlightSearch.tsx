import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeftRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const airports = [
  { code: "DEL", city: "Delhi" },
  { code: "BOM", city: "Mumbai" },
  { code: "BLR", city: "Bangalore" },
  { code: "MAA", city: "Chennai" },
  { code: "HYD", city: "Hyderabad" },
  { code: "CCU", city: "Kolkata" },
  { code: "GOI", city: "Goa" },
];

export const FlightSearch = () => {
  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [adults, setAdults] = useState(1);
  const [children] = useState(0);
  const [infants] = useState(0);
  const [travelClass, setTravelClass] = useState<"economy" | "business">(
    "economy",
  );

  const swap = () => {
    setSource(destination);
    setDestination(source);
  };

  const search = () => {
    if (!source || !destination || !date) {
      toast.error("Source, destination and date are required");
      return;
    }

    const params = new URLSearchParams({
      source,
      destination,
      date: format(date, "yyyy-MM-dd"),
      adults: String(adults),
      children: String(children),
      infants: String(infants),
      class: travelClass,
    });

    navigate(`/flights?${params.toString()}`);
  };

  const airportLabel = (code: string) =>
    airports.find(a => a.code === code)?.city ?? "Select";

  return (
    <div className="space-y-6">
      {/* From / To */}
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <AirportSelect
          label="From"
          value={source}
          onSelect={setSource}
          display={airportLabel(source)}
        />

        <Button variant="ghost" size="icon" onClick={swap}>
          <ArrowLeftRight />
        </Button>

        <AirportSelect
          label="To"
          value={destination}
          onSelect={setDestination}
          display={airportLabel(destination)}
        />
      </div>

      {/* Date / Pax */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start h-12",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={d => d < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Passengers & Class</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-12">
                {adults} Adult · {travelClass}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 space-y-4">
              <div className="flex justify-between items-center">
                <Label>Adults</Label>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setAdults(a => Math.max(1, a - 1))}
                  >
                    -
                  </Button>
                  <span>{adults}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setAdults(a => a + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Class</Label>
                {["economy", "business"].map(c => (
                  <div key={c} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={travelClass === c}
                      onChange={() => setTravelClass(c as any)}
                    />
                    <Label className="capitalize">{c}</Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Button className="w-full h-12" onClick={search}>
        <Search className="mr-2" />
        Search Flights
      </Button>
    </div>
  );
};

/* ---------- helpers ---------- */

const AirportSelect = ({
  label,
  value,
  onSelect,
  display,
}: {
  label: string;
  value: string;
  display: string;
  onSelect: (v: string) => void;
}) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full h-12 justify-start">
          {display}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search airport" />
          <CommandList>
            <CommandEmpty>No results</CommandEmpty>
            <CommandGroup>
              {airports.map(a => (
                <CommandItem key={a.code} onSelect={() => onSelect(a.code)}>
                  {a.city} ({a.code})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
);
