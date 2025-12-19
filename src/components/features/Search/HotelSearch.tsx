// src/components/molecules/search/HotelSearch.tsx
import { useState } from "react";
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
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";
import { showToast } from "@/lib/toast";

/* ---------------------------------------------
   TEMP CITY LIST (LATER API)
--------------------------------------------- */
const mockCities = [
  { code: "Mumbai", name: "Mumbai" },
  { code: "Delhi", name: "Delhi" },
  { code: "Goa", name: "Goa" },
  { code: "Bangalore", name: "Bangalore" },
];

/* ---------------------------------------------
   COMPONENT
--------------------------------------------- */
export const HotelSearch = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [checkin, setCheckin] = useState<Date | undefined>();
  const [checkout, setCheckout] = useState<Date | undefined>();
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  /* ---------------------------------------------
     SEARCH HANDLER (FIXED)
  --------------------------------------------- */
  const handleSearch = () => {
    if (!city || !checkin || !checkout) {
      showToast.error("Please select city, check-in and check-out dates");
      return;
    }

    if (checkout <= checkin) {
      showToast.error("Check-out date must be after check-in");
      return;
    }

    // ✅ ONLY REQUIRED PARAMS
    const params = new URLSearchParams();
    params.append("city", city);
    params.append("checkin", format(checkin, "yyyy-MM-dd"));
    params.append("checkout", format(checkout, "yyyy-MM-dd"));
    params.append("guests", String(guests));
    params.append("rooms", String(rooms));

    navigate(`/hotels?${params.toString()}`);
  };

  /* ---------------------------------------------
     UI
  --------------------------------------------- */
  return (
    <div className="space-y-4">

      {/* CITY + DATES */}
      <div className="grid md:grid-cols-3 gap-4 items-end">

        {/* CITY */}
        <div>
          <Label>Destination</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left"
              >
                {city || "Select city"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[90vw] sm:w-64 p-0">
              <Command>
                <CommandInput placeholder="Search cities..." />
                <CommandList>
                  <CommandEmpty>No cities found</CommandEmpty>
                  <CommandGroup>
                    {mockCities.map((c) => (
                      <CommandItem
                        key={c.code}
                        onSelect={() => setCity(c.name)}
                      >
                        {c.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* CHECK-IN */}
        <div>
          <Label>Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkin ? format(checkin, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={checkin}
                onSelect={setCheckin}
                disabled={(d) => d < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* CHECK-OUT */}
        <div>
          <Label>Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkout ? format(checkout, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={checkout}
                onSelect={setCheckout}
                disabled={(d) => d <= (checkin || new Date())}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* GUESTS + ROOMS + SEARCH */}
      <div className="grid md:grid-cols-3 gap-4 items-end">

        {/* GUESTS */}
        <div>
          <Label>Guests</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-12 w-12"
              onClick={() => setGuests(Math.max(1, guests - 1))}
            >
              -
            </Button>
            <div className="flex-grow text-center text-lg">{guests}</div>
            <Button
              variant="outline"
              className="h-12 w-12"
              onClick={() => setGuests(guests + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* ROOMS */}
        <div>
          <Label>Rooms</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-12 w-12"
              onClick={() => setRooms(Math.max(1, rooms - 1))}
            >
              -
            </Button>
            <div className="flex-grow text-center text-lg">{rooms}</div>
            <Button
              variant="outline"
              className="h-12 w-12"
              onClick={() => setRooms(rooms + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex items-center justify-end">
          <Button
            className="w-full h-12 bg-blue-500 text-white"
            onClick={handleSearch}
          >
            <Search className="mr-2 h-4 w-4" />
            Search Hotels
          </Button>
        </div>
      </div>
    </div>
  );
};
