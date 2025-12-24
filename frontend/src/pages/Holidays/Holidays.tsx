import { useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { HolidayPackageCard } from "../../components/molecules/cards/HolidayPackageCard";
import { HolidayFilters } from "../../components/molecules/filters/HolidayFilters";

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

import { useHolidayPackages } from "@/hooks/useHolidayPackages";

const Holidays = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const [filtersOpen, setFiltersOpen] = useState(false);

  const push = useCallback(
    (next: URLSearchParams) => {
      navigate(`${pathname}?${next.toString()}`, { replace: true });
    },
    [navigate, pathname]
  );

  const { data: holidayPackages, isLoading } = useHolidayPackages({}, params);

  return (
    <div className="min-h-screen flex flex-col w-screen">
      <main className="flex-1 container py-8">
        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Holiday Packages</h1>
          <p className="text-muted-foreground">
            Discover amazing destinations with our curated packages
          </p>
        </div>

        <div className="flex gap-6">
          {/* DESKTOP FILTERS */}
          <aside className="hidden lg:block w-64 shrink-0">
            <HolidayFilters />
          </aside>

          {/* CONTENT */}
          <div className="flex-1">
            {/* TOOLBAR */}
            <div className="flex items-center justify-between mb-6">
              {/* MOBILE FILTER BUTTON */}
              <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    Filters
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-80 p-4">
                  <HolidayFilters onApply={() => setFiltersOpen(false)} />
                </SheetContent>
              </Sheet>

              {/* SORT */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select
                  value={params.get("sort") ?? "popularity"}
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
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* GRID */}

            {isLoading ? (
              <Skeleton className="h-[40vh] w-full rounded-md" />
            ) : holidayPackages?.length === 0 ? (
              <div className="col-span-full text-center">
                <h1 className="text-3xl font-bold mb-2">No Packages Found</h1>
                <p className="text-muted-foreground">
                  Try changing your filters
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(holidayPackages || []).map((pkg, idx) => (
                  <HolidayPackageCard key={idx} {...pkg} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Holidays;
