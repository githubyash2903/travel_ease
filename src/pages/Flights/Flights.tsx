import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useFlights } from "@/hooks/useFlights";
import { FlightFilters } from "@/components/molecules/filters/FlightFilters";
import { FlightCard } from "@/components/molecules/cards/FlightCard";
import { Skeleton } from "@/components/ui/skeleton";

const mockFlights = [
  {
    id: "1",
    airline: "IndiGo",
    flightNumber: "6E-123",
    departure: { airport: "Mumbai", time: "06:00", code: "BOM" },
    arrival: { airport: "Delhi", time: "08:15", code: "DEL" },
    duration: "2h 15m",
    price: 4500,
    stops: 0,
    cabinClass: "Economy",
  },
  {
    id: "2",
    airline: "Air India",
    flightNumber: "AI-456",
    departure: { airport: "Mumbai", time: "09:30", code: "BOM" },
    arrival: { airport: "Delhi", time: "13:45", code: "DEL" },
    duration: "4h 15m",
    price: 5200,
    stops: 1,
    cabinClass: "Economy",
  },
  {
    id: "3",
    airline: "Vistara",
    flightNumber: "UK-789",
    departure: { airport: "Mumbai", time: "14:20", code: "BOM" },
    arrival: { airport: "Delhi", time: "16:30", code: "DEL" },
    duration: "2h 10m",
    price: 6800,
    stops: 0,
    cabinClass: "Premium Economy",
  },
  {
    id: "4",
    airline: "SpiceJet",
    flightNumber: "SG-234",
    departure: { airport: "Mumbai", time: "18:00", code: "BOM" },
    arrival: { airport: "Delhi", time: "20:10", code: "DEL" },
    duration: "2h 10m",
    price: 4200,
    stops: 0,
    cabinClass: "Economy",
  },
  {
    id: "5",
    airline: "IndiGo",
    flightNumber: "6E-567",
    departure: { airport: "Mumbai", time: "21:45", code: "BOM" },
    arrival: { airport: "Delhi", time: "23:55", code: "DEL" },
    duration: "2h 10m",
    price: 4800,
    stops: 0,
    cabinClass: "Economy",
  },
];

const Flights = () => {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const { data: flights, isLoading } = useFlights({}, params);

  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Flights</h1>
          {flights && (
            <p className="text-muted-foreground">
              Showing {flights?.length} flights
            </p>
          )}
        </div>

        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FlightFilters />
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" className="lg:hidden">
                Filters
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select defaultValue="price">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                    <SelectItem value="departure">Departure Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {isLoading ? (
              <Skeleton className="h-[40vh] w-full  rounded-md" />
            ) : flights?.length === 0 ? (
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">No Flights Found</h1>
                <p className="text-muted-foreground">
                  Try changing your filters
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {flights?.map((flight, idx) => (
                  <FlightCard key={idx} {...flight} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Flights;
