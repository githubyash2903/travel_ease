import { HotelCard } from "@/components/features/Hotels/HotelCard";
import { HotelFilters } from "@/components/features/Hotels/HotelFilters";
import { useHotels } from "@/hooks/useHotels";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Hotels = () => {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const { data: hotels, isLoading } = useHotels({}, params);

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Hotels</h1>
          {hotels &&
          <p className="text-muted-foreground">
            Showing {hotels?.length} properties
          </p>
}
        </div>

        <div className="flex gap-6">
          <aside className="hidden lg:block w-64 shrink-0">
            <HotelFilters />
          </aside>

          <div className="flex-1">
            {isLoading ? (
              <Skeleton className="h-[40vh] w-full  rounded-md" />
            ) : hotels?.length===0?
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2">No Hotels Found</h1>
              <p className="text-muted-foreground">
                Try changing your filters
              </p>
            </div>
            :(
              <div className="space-y-4">
                {(hotels || [])?.map((hotel, idx) => (
                  <HotelCard key={idx} {...hotel} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hotels;
