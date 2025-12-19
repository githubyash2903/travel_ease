import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeftRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { showToast } from "@/lib/toast";
import { getAirports } from "@/api/flights";

export const FlightSearch = () => {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();

  // ---------------- FROM AIRPORT ----------------
  const [fromQuery, setFromQuery] = useState("");
  const [fromResults, setFromResults] = useState<any[]>([]);
  const [loadingFrom, setLoadingFrom] = useState(false);

  const searchFromAirports = async (query: string) => {
    setFromQuery(query);
    if (!query || query.length < 2) {
      setFromResults([]);
      return;
    }

    try {
      setLoadingFrom(true);
      const airports = await getAirports(query);
      setFromResults(airports);
    } catch {
      setFromResults([]);
    } finally {
      setLoadingFrom(false);
    }
  };

  // ---------------- TO AIRPORT ----------------
  const [toQuery, setToQuery] = useState("");
  const [toResults, setToResults] = useState<any[]>([]);
  const [loadingTo, setLoadingTo] = useState(false);

  const searchToAirports = async (query: string) => {
    setToQuery(query);
    if (!query || query.length < 2) {
      setToResults([]);
      return;
    }

    try {
      setLoadingTo(true);
      const airports = await getAirports(query);
      setToResults(airports);
    } catch {
      setToResults([]);
    } finally {
      setLoadingTo(false);
    }
  };

  // Swap From <-> To
  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  // ---------------- SEARCH ----------------
  const handleSearch = () => {
    if (!from || !to || !departDate) {
      showToast.error("Please fill all required fields");
      return;
    }

    const params = new URLSearchParams();
    params.append("from", from);
    params.append("to", to);
    params.append("departDate", format(departDate, "yyyy-MM-dd"));

    navigate(`/flights?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Trip Type */}
      <RadioGroup
        value={tripType}
        onValueChange={setTripType}
        className="flex flex-wrap gap-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="oneway" id="oneway" />
          <Label htmlFor="oneway">One Way</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="roundtrip" id="roundtrip" />
          <Label htmlFor="roundtrip">Round Trip</Label>
        </div>
      </RadioGroup>

      {/* FROM – TO */}
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        {/* FROM */}
        <div className="space-y-2">
          <Label>From</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-12 justify-start">
                {from || "Select origin"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[90vw] sm:w-80 p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search airports..."
                  value={fromQuery}
                  onValueChange={searchFromAirports}
                />
                <CommandList>
                  <CommandEmpty>
                    {loadingFrom ? "Loading..." : "No airports found"}
                  </CommandEmpty>
                  <CommandGroup>
                    {fromResults.map((a) => (
                      <CommandItem
                        key={a.code}
                        onSelect={() => setFrom(a.code)}
                      >
                        <p className="font-medium">{a.city}</p>
                        <p className="text-xs text-muted-foreground">
                          {a.code}, {a.country}
                        </p>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Swap */}
        <Button variant="ghost" size="icon" onClick={swapLocations}>
          <ArrowLeftRight className="h-5 w-5" />
        </Button>

        {/* TO */}
        <div className="space-y-2">
          <Label>To</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full h-12 justify-start">
                {to || "Select destination"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[90vw] sm:w-80 p-0">
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Search airports..."
                  value={toQuery}
                  onValueChange={searchToAirports}
                />
                <CommandList>
                  <CommandEmpty>
                    {loadingTo ? "Loading..." : "No airports found"}
                  </CommandEmpty>
                  <CommandGroup>
                    {toResults.map((a) => (
                      <CommandItem
                        key={a.code}
                        onSelect={() => setTo(a.code)}
                      >
                        <p className="font-medium">{a.city}</p>
                        <p className="text-xs text-muted-foreground">
                          {a.code}, {a.country}
                        </p>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* ✅ DEPART DATE (RESTORED) */}
      <div className="space-y-2">
        <Label>Depart Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 justify-start",
                !departDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {departDate ? format(departDate, "PPP") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Calendar
              mode="single"
              selected={departDate}
              onSelect={setDepartDate}
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* SEARCH */}
      <Button
        className="w-full h-12 bg-blue-500 text-white"
        onClick={handleSearch}
      >
        <Search className="mr-2 h-5 w-5" />
        Search Flights
      </Button>
    </div>
  );
};
