import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, Star, Check } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import heroBeach from "@/assets/hero-beach.jpg";
import { useHolidayPackage } from "@/hooks/useHolidayPackages";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/organisms/ErrorState";
import { useState } from "react";
import { useBooking } from "@/hooks/useBookings";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const HolidayDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [startDate, setStartDate] = useState("");
  const [persons, setPersons] = useState<number | "">("");
  const booking = useBooking();
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
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Travelers *
                  </label>
                  <input
                    type="number"
                    min={holidayPackage.min_persons}
                    className="w-full px-3 py-2 border rounded-md"
                    value={persons}
                    onChange={(e) => setPersons(Number(e.target.value))}
                  />
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!startDate || !persons || booking.package.isPending}
                  onClick={() => {
                    if (!isAuthenticated) {
                      toast.error("Please login to continue");
                      navigate("/auth");
                      return;
                    }
                    booking.package.mutate(
                      {
                        package_id: holidayPackage.id,
                        start_date: startDate,
                        persons,
                      },
                      {
                        onSuccess: () => {
                          toast.success(
                            "Holiday booking request successfully, we'll get back to you."
                          );
                          navigate("/profile/bookings");
                        },
                      }
                    );
                  }}
                >
                  {booking.package.isPending ? "Booking..." : "Request Booking"}
                </Button>

                <div className="pt-4 border-t text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Package</span>
                    <span>₹{holidayPackage.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>₹{holidayPackage.taxes}</span>
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
