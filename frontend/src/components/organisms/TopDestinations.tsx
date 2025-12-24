import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useHolidayPackages } from "@/hooks/useHolidayPackages";
import { useNavigate } from "react-router-dom";

export const TopDestinations = () => {
  const navigate = useNavigate();
  const { data: holidayPackages, isLoading } = useHolidayPackages(
    {},
    { limit: 5 }
  );

  return (
    <section className="py-16 px-4 bg-gradient-sky">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Top Destinations
          </h2>
          <p className="text-muted-foreground text-lg">
            Discover your next adventure in these stunning locations
          </p>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[320px] w-full rounded-xl" />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!isLoading && (!holidayPackages || holidayPackages.length === 0) && (
          <div className="text-center py-12 text-muted-foreground">
            No packages found.
          </div>
        )}

        {/* DATA */}
        {!isLoading && holidayPackages?.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {holidayPackages.map((dest, index) => (
              <Card
                key={dest?.id}
                className="group overflow-hidden hover:shadow-strong transition-all duration-300 cursor-pointer"
                onClick={() => {
                  navigate(`/holidays/${dest?.id}`);
                }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img
                      src={dest?.cover_image}
                      alt={dest?.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {dest?.category && (
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground border-0">
                        {dest?.category}
                      </Badge>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-1">{dest?.title}</h3>
                      <p className="text-white/90 text-sm mb-3">
                        {dest?.destination}
                      </p>
                      <p className="text-lg font-semibold">₹{dest?.price}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
