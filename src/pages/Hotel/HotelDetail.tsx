import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  MapPin,
  Wifi,
  Coffee,
  Car,
  UtensilsCrossed,
  Users,
  Check,
  Info,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useHotel } from "@/hooks/useHotels";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/organisms/ErrorState";
import { useRooms } from "@/hooks/useRooms";
import { useBooking } from "@/hooks/useBookings";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  breakfast: Coffee,
  restaurant: UtensilsCrossed,
  airport_shuttle: MapPin,
  conference_room: MapPin,
  parking: Car,
};
export default function HotelDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [params] = useSearchParams();
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomsCount, setRoomsCount] = useState<number | "">("");
  const [guests, setGuests] = useState<number | "">("");
  const booking = useBooking();
  const { data: hotel, isLoading, isError } = useHotel({}, id);
  const { data: rooms, isLoading: isLoadingRooms } = useRooms({}, params, id);

  if (isLoading) return <Skeleton className="h-40 m-8" />;
  if (isError) return <ErrorState message="Hotel not found" />;

  return (
    <div className="min-h-screen w-full flex flex-col">
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
            {hotel?.images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className="hidden md:block cursor-pointer"
                onClick={() => setSelectedImage(index + 1)}
              >
                <img
                  src={image?.url}
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
                        <span>
                          {hotel?.city},{hotel?.state}
                        </span>
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
                    const Icon =
                      amenity in amenityIcons ? amenityIcons[amenity] : Info;

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
                {(isError || rooms?.length === 0) && (
                  <ErrorState message="Rooms not found" />
                )}

                {(rooms || [])?.map((room, index) => (
                  <div key={index}>
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between lg:flex-row gap-4 flex-col">
                          <div>
                            <CardTitle>{room?.type}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                              <span>{room?.area_sqft} sq ft</span>
                              {room?.beds?.length > 0 && (
                                <>
                                  <span>•</span>
                                  <span>
                                    {room?.beds?.map((bed) => {
                                      return `${bed.count} ${bed.type} bed`;
                                    })}
                                  </span>
                                </>
                              )}
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
                            {Object.entries(room?.amenities || {}).map(
                              ([feature], idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <Check className="h-4 w-4 text-green-600" />
                                  <span>{feature}</span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="mt-4 w-full"
                          variant={
                            selectedRoom?.id === room.id ? "default" : "outline"
                          }
                          onClick={() => setSelectedRoom(room)}
                        >
                          {selectedRoom?.id === room.id
                            ? "Selected"
                            : "Select Room"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            {/* <Separator /> */}
            <div className="lg:col-span-1">
              {selectedRoom && (
                <Card className="mt-6 sticky top-20">
                  <CardHeader>
                    <CardTitle>Book {selectedRoom.type}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Check-in *</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border rounded-md"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Check-out *</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border rounded-md"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Rooms *</label>
                      <input
                        type="number"
                        min={1}
                        className="w-full px-3 py-2 border rounded-md"
                        value={roomsCount}
                        onChange={(e) => setRoomsCount(Number(e.target.value))}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Guests *</label>
                      <input
                        type="number"
                        min={1}
                        className="w-full px-3 py-2 border rounded-md"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                      />
                    </div>

                    <Button
                      className="w-full"
                      disabled={
                        !checkIn ||
                        !checkOut ||
                        !roomsCount ||
                        !guests ||
                        booking.hotel.isPending
                      }
                      onClick={() => {
                        if (!isAuthenticated) {
                          toast.error("Please login to continue");
                          navigate("/auth");
                          return;
                        }
                        booking.hotel.mutate(
                          {
                            hotel_id: hotel.id,
                            room_id: selectedRoom.id,
                            check_in: checkIn,
                            check_out: checkOut,
                            rooms_count: roomsCount,
                            guests,
                          },
                          {
                            onSuccess: () => {
                              toast.success(
                                "Hotel booking request successfully, we'll get back to you."
                              );
                              navigate("/profile/bookings");
                            },
                          }
                        );
                      }}
                    >
                      {booking.hotel.isPending
                        ? "Booking..."
                        : "Request Booking"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
