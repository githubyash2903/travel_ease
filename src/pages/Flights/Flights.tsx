// src/pages/Flights.tsx

import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { FlightCard } from "@/components/molecules/cards/FlightCard";
import { FlightFilters } from "@/components/molecules/filters/FlightFilters";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";

import { searchFlightsAPI } from "@/api/flights";
import CompactFlightSearch from "@/components/molecules/searchBar/FlightsSearchBar";

/* ---------------------------------------------
   TYPES
--------------------------------------------- */
interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: { airport: string; code: string; time: string };
  arrival: { airport: string; code: string; time: string };
  duration: string;
  price: number;
  stops: number;
  cabinClass: string;
}

interface FiltersType {
  stops: string[];
  airlines: string[];
  departure: string[];
  priceRange: [number, number];
}

/* ---------------------------------------------
   NORMALIZER
--------------------------------------------- */
const normalizeFlight = (f: any): Flight => ({
  id: f.id,
  airline: f.airline,
  flightNumber: f.flightNumber,
  departure: f.departure,
  arrival: f.arrival,
  duration: f.duration || "N/A",
  price: f.price,
  stops: f.stops,
  cabinClass: f.cabinClass || "ECONOMY",
});

/* ---------------------------------------------
   MAIN COMPONENT
--------------------------------------------- */
export default function Flights() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const searchParams = {
    from: query.get("from") || "",
    to: query.get("to") || "",
    departDate: query.get("departDate") || "",
  };

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FiltersType>({
    stops: [],
    airlines: [],
    departure: [],
    priceRange: [0, 200000],
  });

  const [sortOption, setSortOption] = useState("price");

  /* ---------------------------------------------
     LOAD FLIGHTS
  --------------------------------------------- */
  const loadFlights = async () => {
    if (!searchParams.from || !searchParams.to || !searchParams.departDate) {
      setFlights([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await searchFlightsAPI({
        from: searchParams.from,
        to: searchParams.to,
        departDate: searchParams.departDate,
      });

      // ✅ FIX: backend returns { data: [] }
      const offers = res?.data || [];

      setFlights(offers.map(normalizeFlight));
    } catch (err) {
      console.error("Flight search error:", err);
      setFlights([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadFlights();
  }, [location.search]);

  /* ---------------------------------------------
     FILTER + SORT
  --------------------------------------------- */
  const filteredFlights = useMemo(() => {
    let list = [...flights];

    if (filters.stops.length) {
      list = list.filter((f) => {
        if (f.stops === 0 && filters.stops.includes("non-stop")) return true;
        if (f.stops === 1 && filters.stops.includes("1-stop")) return true;
        if (f.stops >= 2 && filters.stops.includes("2-stops")) return true;
        return false;
      });
    }

    if (filters.airlines.length) {
      list = list.filter((f) => filters.airlines.includes(f.airline));
    }

    list = list.filter(
      (f) => f.price >= filters.priceRange[0] && f.price <= filters.priceRange[1]
    );

    if (sortOption === "price") list.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [flights, filters, sortOption]);

  /* ---------------------------------------------
     RENDER
  --------------------------------------------- */
  return (
    <div className="min-h-screen w-screen flex flex-col">
      <main className="container py-8 flex-1">

        {/* 🔥 ALWAYS SHOW SEARCH BAR (NO REMOVALS) */}
        <CompactFlightSearch />

        {/* 🔥 SHOW TITLE ONLY IF USER SEARCHED */}
        {searchParams.from && searchParams.to && (
          <div className="text-center mb-6 mt-4">
            <h1 className="text-3xl font-bold">
              {searchParams.from} → {searchParams.to}
            </h1>

            {!loading && (
              <p className="text-muted-foreground">
                Showing {filteredFlights.length} results
              </p>
            )}
          </div>
        )}

        <div className="flex px-5 justify-between  items-center mb-4">
          {/* SORTING (MOVED UP) */}
          <div className="flex items-center  gap-2">
            <span className="text-sm font-medium">Sort by:</span>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price (Low-High)</SelectItem>
                <SelectItem value="price-desc">Price (High-Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* FILTER TRIGGER (MOBILE) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Filter className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <FlightFilters filters={filters} setFilters={setFilters} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex px-5 gap-6">
          <aside className="hidden lg:block w-64">
            <FlightFilters filters={filters} setFilters={setFilters} />
          </aside>

          <div className="flex-1">
            {loading && (
              <p className="text-center py-10 text-lg font-medium">
                Loading flights...
              </p>
            )}

            {!loading && filteredFlights.length === 0 && (
              <p className="text-center py-10 text-gray-500">
                No flights found.
              </p>
            )}

            <div className="space-y-4 p-3 ">
              {!loading &&
                filteredFlights.map((flight) => (
                  <FlightCard key={flight.id} {...flight} />
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
