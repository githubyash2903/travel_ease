import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { useFlights } from "@/hooks/useFlights";
import { FlightFilters } from "@/components/molecules/filters/FlightFilters";
import { FlightCard } from "@/components/molecules/cards/FlightCard";
import { Skeleton } from "@/components/ui/skeleton";

const Flights = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const { data: flights, isLoading } = useFlights({}, params);

  const push = useCallback(
    (next: URLSearchParams) => {
      navigate(`${pathname}?${next.toString()}`, { replace: true });
    },
    [navigate, pathname]
  );
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
                <Select
                  defaultValue="price"
                  onValueChange={(v) => {
                    const next = new URLSearchParams(params);
                    next.set("sort", String(v));
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
            {isLoading ? (
              <Skeleton className="h-[40vh] w-full  rounded-md" />
            ) : !flights || flights?.length === 0 ? (
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
