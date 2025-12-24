import { useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

import { useFlights } from "@/hooks/useFlights";
import { FlightFilters } from "@/components/molecules/filters/FlightFilters";
import { FlightCard } from "@/components/molecules/cards/FlightCard";

const Flights = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data: flights, isLoading } = useFlights({}, params);

  const push = useCallback(
    (next: URLSearchParams) => {
      navigate(`${pathname}?${next.toString()}`, { replace: true });
    },
    [navigate, pathname]
  );

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <main className="flex-1 container overflow-auto py-8">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Flights</h1>
          {flights && (
            <p className="text-muted-foreground">
              Showing {flights.length} flights
            </p>
          )}
        </div>

        <div className="flex gap-6">
          {/* DESKTOP FILTERS */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FlightFilters />
          </aside>

          {/* CONTENT */}
          <div className="flex-1">
            {/* TOOLBAR */}
            <div className="flex items-center justify-between mb-6 overflow-auto">
              {/* MOBILE FILTER BUTTON */}
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    Filters
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-80 p-4">
                  <FlightFilters
                    onApply={() => setFiltersOpen(false)}
                  />
                </SheetContent>
              </Sheet>

              {/* SORT */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Sort by:
                </span>
                <Select
                  value={params.get("sort") ?? "price"}
                  onValueChange={(v) => {
                    const next = new URLSearchParams(params);
                    next.set("sort", v);
                    push(next);
                  }}
                >
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

            {/* RESULTS */}
            {isLoading ? (
              <Skeleton className="h-[40vh] w-full rounded-md" />
            ) : !flights || flights.length === 0 ? (
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">
                  No Flights Found
                </h1>
                <p className="text-muted-foreground">
                  Try changing your filters
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {flights.map((flight, idx) => (
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
