import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Star, Check } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import heroBeach from "@/assets/hero-beach.jpg";
import { useHolidayPackage } from "@/hooks/useHolidayPackages";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/organisms/ErrorState";

const HolidayDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: holidayPackage,
    isLoading,
    isError,
  } = useHolidayPackage({}, id);

  if (isLoading) return <Skeleton className="h-40 m-8" />;
  if (isError) return <ErrorState message="Package not found" />;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src={holidayPackage?.cover_image ?? heroBeach}
                alt="Holiday Package"
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-primary text-white">
                {holidayPackage?.category} Package
              </Badge>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">{holidayPackage?.title}</h1>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-warning text-warning" />
                  <span className="font-semibold text-lg">4.5</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{holidayPackage?.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {holidayPackage?.duration_days} days /{" "}
                    {holidayPackage?.duration_nights} nights
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{holidayPackage?.min_persons}</span>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Package Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {holidayPackage?.overview}
                </p>
              </CardContent>
            </Card>

            {holidayPackage?.inclusions &&
              holidayPackage?.inclusions?.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">
                      Package Inclusions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {holidayPackage?.inclusions?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-success" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            {holidayPackage?.inclusions &&
              holidayPackage?.itinerary?.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">
                      Day-wise Itinerary
                    </h2>
                    <div className="space-y-4">
                      {holidayPackage?.itinerary?.map((day, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 pb-4 border-b last:border-0"
                        >
                          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">
                              {day.day}: {day.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {day.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    Starting from
                  </div>
                  <div className="text-4xl font-bold text-primary mb-1">
                    ₹{holidayPackage?.price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    per person
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Number of Travelers
                    </label>
                    <select className="w-full px-3 py-2 border rounded-md">
                      <option>2 Travelers</option>
                      <option>3 Travelers</option>
                      <option>4 Travelers</option>
                      <option>5+ Travelers</option>
                    </select>
                  </div>
                </div>

                <Button className="w-full mb-3" size="lg">
                  Book Now
                </Button>

                <div className="mt-6 pt-6 border-t space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Package Price</span>
                    <span className="font-semibold">
                      ₹{holidayPackage?.price}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="font-semibold">
                      ₹{holidayPackage?.taxes}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t text-base">
                    <span className="font-semibold">Total Amount</span>
                    <span className="font-bold text-primary">
                      ₹
                      {Number(holidayPackage?.price) +
                        Number(holidayPackage?.taxes)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HolidayDetail;
