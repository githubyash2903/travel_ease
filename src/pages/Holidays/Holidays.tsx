import { Footer } from "../../components/organisms/Footer";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { useHolidayPackages } from "@/hooks/useHolidayPackages";
import { Skeleton } from "@/components/ui/skeleton";

const Holidays = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const push = useCallback(
    (next: URLSearchParams) => {
      navigate(`${pathname}?${next.toString()}`, { replace: true });
    },
    [navigate, pathname]
  );
  const { data: holidayPackages, isLoading } = useHolidayPackages({}, params);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 text-center container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Holiday Packages</h1>
          <p className="text-muted-foreground">
            Discover amazing destinations with our curated packages
          </p>
        </div>

        <div className="flex px-5  gap-6">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <HolidayFilters />
          </aside>

          <div className="flex-1  ">
            <div className="flex  items-center justify-between mb-6">
              <Button variant="outline" className="lg:hidden">
                Filters
              </Button>
              <div className="flex  items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select
                  defaultValue="popularity"
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

            <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
              {isLoading ? (
                <Skeleton className="h-[40vh] w-full  rounded-md" />
              ) : holidayPackages?.length === 0 ? (
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-2">No Packages Found</h1>
                  <p className="text-muted-foreground">
                    Try changing your filters
                  </p>
                </div>
              ) : (
                (holidayPackages || [])?.map((pkg, idx) => (
                  <HolidayPackageCard key={idx} {...pkg} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Holidays;
