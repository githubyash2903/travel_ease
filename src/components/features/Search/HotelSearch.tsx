import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const mockCities = ["Mumbai", "Delhi", "Bangalore", "Goa", "Jaipur"];

const toISO = (d: Date) => d.toISOString().slice(0, 10);

export const HotelSearch = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  const handleSearch = useCallback(() => {
    if (!city || !checkIn || !checkOut) {
      toast.error("Please fill all required fields");
      return;
    }

    if (checkOut <= checkIn) {
      toast.error("Check-out must be after check-in");
      return;
    }

    const params = new URLSearchParams();
    params.set("city", city.toLowerCase());
    params.set("checkIn", toISO(checkIn));
    params.set("checkOut", toISO(checkOut));
    params.set("rooms", String(rooms));
    params.set("guests", String(guests));

    navigate(`/hotels?${params.toString()}`);
  }, [city, checkIn, checkOut, rooms, guests, navigate]);

  return (
    <div className="space-y-6">
      {/* City */}
      <div className="space-y-2">
        <Label>City, Property, or Location</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal h-12"
            >
              {city || "Where do you want to stay?"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search destinations..." />
              <CommandList>
                <CommandEmpty>No destinations found.</CommandEmpty>
                <CommandGroup>
                  {mockCities.map(c => (
                    <CommandItem
                      key={c}
                      onSelect={() => setCity(c)}
                    >
                      {c}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Dates + Guests */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Check-in */}
        <div className="space-y-2">
          <Label>Check-in Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={date => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <Label>Check-out Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-12",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={date => date < (checkIn || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests & Rooms */}
        <div className="space-y-2">
          <Label>Guests & Rooms</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal h-12"
              >
                {guests} Guests, {rooms} Room{rooms > 1 ? "s" : ""}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Guests</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(g => Math.max(1, g - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{guests}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setGuests(g => g + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Rooms</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setRooms(r => Math.max(1, r - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{rooms}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setRooms(r => r + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Submit */}
      <Button
        className="w-full h-12 text-lg bg-gradient-hero hover:opacity-90"
        onClick={handleSearch}
      >
        <Search className="mr-2 h-5 w-5" />
        Search Hotels
      </Button>
    </div>
  );
};
