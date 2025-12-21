import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Car,
  CalendarIcon,
  UtensilsCrossed,
  Users,
  Check,
  Phone,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useHotel } from "@/hooks/useHotels";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/organisms/ErrorState";
import { useRooms } from "@/hooks/useRooms";

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  breakfast: Coffee,
  restaurant: UtensilsCrossed,
  airport_shuttle: MapPin,
  conference_room: MapPin,
  parking: Car,
};
export default function HotelDetail() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const [params] = useSearchParams();

  const { data: hotel, isLoading, isError } = useHotel({}, id);
  const { data: rooms, isLoading: isLoadingRooms } = useRooms({},params, id);

  if (isLoading) return <Skeleton className="h-40 m-8" />;
  if (isError) return <ErrorState message="Hotel not found" />;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-12">
        {/* Image Gallery */}
        <section className="container py-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 md:col-span-3 row-span-2">
              <img
                src={hotel?.images[selectedImage]?.url}
                alt={hotel?.name}
                className="w-full h-[400px] md:h-[500px] object-cover rounded-lg"
              />
            </div>
            {hotel?.images.slice(1, 4).map((image, index) => (
              <div
                key={index}
                className="hidden md:block cursor-pointer"
                onClick={() => setSelectedImage(index + 1)}
              >
                <img
                  src={image}
                  alt={`${hotel?.name} ${index + 2}`}
                  className="w-full h-[160px] object-cover rounded-lg hover:opacity-80 transition-opacity"
                />
              </div>
            ))}
          </div>
        </section>

        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{hotel?.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{hotel?.city},{hotel?.state}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {hotel?.rating} ({hotel?.rating_count} reviews)
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-4">
                  {hotel?.description}
                </p>
              </div>

              <Separator />

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(hotel?.amenities)?.map(([amenity], index) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Room Types */}
              <div className="flex flex-col  gap-4">
                <h2 className="text-2xl font-semibold mb-4 ">Room Types</h2>
                {isLoadingRooms && <Skeleton className="h-40 m-8" />}
                {(isError || rooms?.length===0) && <ErrorState message="Rooms not found" />}

                  {(rooms || [])?.map((room, index) => (
                    <div key={index}>
                      <Card>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle>{room?.type}</CardTitle>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                <span>{room?.area_sqft} sq ft</span>
                                {room?.beds?.length>0 &&
                                <>
                                <span>•</span>
                                <span>{room?.beds?.map((bed) => {
                                  return `${bed.count} ${bed.type} bed`
                                })}</span>
                                </>
                              }
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {room?.max_occupancy}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                ₹{room?.price_per_night}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                per night
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="font-medium">Room Features:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(room?.amenities || {}).map(([feature], idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <Check className="h-4 w-4 text-green-600" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
              </div>

              <Separator />

              {/* <div>
                <h2 className="text-2xl font-semibold mb-4">Hotel Policies</h2>
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium mb-1">Check-in</p>
                        <p className="text-sm text-muted-foreground">
                          {hotel?.policies.checkIn}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium mb-1">Check-out</p>
                        <p className="text-sm text-muted-foreground">
                          {hotel?.policies.checkOut}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium mb-1">Cancellation Policy</p>
                      <p className="text-sm text-muted-foreground">
                        {hotel?.policies.cancellation}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Children & Extra Beds</p>
                      <p className="text-sm text-muted-foreground">
                        {hotel?.policies.children}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Pets</p>
                      <p className="text-sm text-muted-foreground">
                        {hotel?.policies.pets}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">
                  Contact Information
                </h2>
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>{hotel?.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <span>{hotel?.contact.email}</span>
                    </div>
                  </CardContent>
                </Card>
              </div> */}
            </div>

            {/* Booking Sidebar 
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Book Your Stay</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    $
                    <span className="text-sm font-normal text-muted-foreground">
                      {" "}
                      / night
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Check-in Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? (
                            format(checkIn, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Check-out Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? (
                            format(checkOut, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Room Type</span>
                      <span className="font-medium">
                        {hotel?.roomTypes[selectedRoom].name}
                      </span>
                    </div>
                    {checkIn && checkOut && (
                      <>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Nights</span>
                          <span className="font-medium">
                            {Math.ceil(
                              (checkOut.getTime() - checkIn.getTime()) /
                                (1000 * 60 * 60 * 24)
                            )}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span className="text-primary">
                            $
                            {hotel?.roomTypes[selectedRoom].price *
                              Math.ceil(
                                (checkOut.getTime() - checkIn.getTime()) /
                                  (1000 * 60 * 60 * 24)
                              )}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                      const nights =
                        checkIn && checkOut
                          ? Math.ceil(
                              (checkOut.getTime() - checkIn.getTime()) /
                                (1000 * 60 * 60 * 24)
                            )
                          : 1;
                      const totalPrice =
                        hotel?.roomTypes[selectedRoom].price * nights;

                      navigate("/checkout", {
                        state: {
                          title: hotel?.name,
                          destination: hotel?.location,
                          date:
                            checkIn && checkOut
                              ? `${format(checkIn, "MMM dd")} - ${format(
                                  checkOut,
                                  "MMM dd, yyyy"
                                )}`
                              : "Select dates",
                          basePrice: `$${
                            hotel?.roomTypes[selectedRoom].price * nights
                          }`,
                          taxes: `$${Math.round(totalPrice * 0.1)}`,
                          totalPrice: `$${
                            totalPrice + Math.round(totalPrice * 0.1)
                          }`,
                          roomType: hotel?.roomTypes[selectedRoom].name,
                          type: "hotel",
                        },
                      });
                    }}
                  >
                    Book Now
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Free cancellation up to 24 hours before check-in
                  </p>
                </CardContent>
              </Card>
            </div>
            */}
          </div>
        </div>
      </main>
    </div>
  );
}
