// src/components/molecules/searchBar/FlightsSearchBar.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem, CommandInput, CommandList, CommandEmpty } from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";

import { CalendarIcon, MapPin, Plane } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";
import { cn } from "@/lib/utils";
import { getAirports } from "@/api/flights";

export default function CompactFlightSearch() {
  const navigate = useNavigate();

  /* ---------------------------------------------
     STATE
  --------------------------------------------- */
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState<Date>();

  // FROM airport search state
  const [fromQuery, setFromQuery] = useState("");
  const [fromResults, setFromResults] = useState<any[]>([]);
  const [loadingFrom, setLoadingFrom] = useState(false);

  // TO airport search state
  const [toQuery, setToQuery] = useState("");
  const [toResults, setToResults] = useState<any[]>([]);
  const [loadingTo, setLoadingTo] = useState(false);

  /* ---------------------------------------------
     API CALL — Search airports (FROM)
  --------------------------------------------- */
  const searchFromAirports = async (query: string) => {
    setFromQuery(query);

    if (query.length < 2) {
      setFromResults([]);
      return;
    }

    setLoadingFrom(true);

    try {
      const airports = await getAirports(query);
      setFromResults(airports);
    } catch (err) {
      console.log(err);
      setFromResults([]);
    }

    setLoadingFrom(false);
  };

  /* ---------------------------------------------
     API CALL — Search airports (TO)
  --------------------------------------------- */
  const searchToAirports = async (query: string) => {
    setToQuery(query);

    if (query.length < 2) {
      setToResults([]);
      return;
    }

    setLoadingTo(true);

    try {
        const airports = await getAirports(query);
      setToResults(airports);
    
    } catch (err) {
      console.log(err);
      setToResults([]);
    }

    setLoadingTo(false);
  };

  /* ---------------------------------------------
     HANDLE SEARCH
  --------------------------------------------- */
  const searchFlights = () => {
    if (!from || !to || !departDate) return;

    const params = new URLSearchParams();
    params.append("from", from);
    params.append("to", to);
    params.append("departDate", format(departDate, "yyyy-MM-dd"));
    params.append("adults", "1"); // default

    navigate(`/flights?${params.toString()}`);
  };

  return (
    <div className="bg-white shadow p-6 rounded-xl max-w-3xl mx-auto mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* ---------------------------------------------
           FROM
        --------------------------------------------- */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-12 justify-start w-full">
              <MapPin className="mr-2 h-4 w-4" />
              {from || "From"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[90vw] sm:w-64 p-0">
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
                  {fromResults.map((airport) => (
                    <CommandItem
                      key={airport.code}
                      onSelect={() => setFrom(airport.code)}
                    >
                      {airport.city} ({airport.code})
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* ---------------------------------------------
           TO
        --------------------------------------------- */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-12 justify-start w-full">
              <Plane className="mr-2 h-4 w-4" />
              {to || "To"}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[90vw] sm:w-64 p-0">
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
                  {toResults.map((airport) => (
                    <CommandItem
                      key={airport.code}
                      onSelect={() => setTo(airport.code)}
                    >
                      {airport.city} ({airport.code})
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* ---------------------------------------------
           DATE
        --------------------------------------------- */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("h-12 justify-start", !departDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {departDate ? format(departDate, "PPP") : "Depart Date"}
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

      {/* SEARCH BUTTON */}
      <Button className="w-full mt-4 h-12" onClick={searchFlights}>
        Search Flights
      </Button>
    </div>
  );
}
