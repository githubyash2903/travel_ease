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
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useHotel } from "@/hooks/useHotels";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/organisms/ErrorState";
import { useRooms } from "@/hooks/useRooms";
import { useBooking } from "@/hooks/useBookings";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import {
  Traveller,
  TravellersForm,
} from "@/components/features/Bookings/TravellersForm";

const amenityIcons: Record<string, any> = {
  wifi: Wifi,
  breakfast: Coffee,
  restaurant: UtensilsCrossed,
  airport_shuttle: MapPin,
  conference_room: MapPin,
  parking: Car,
};

const diffNights = (a: string, b: string) =>
  Math.max(
    0,
    Math.ceil(
      (new Date(b).getTime() - new Date(a).getTime()) / 86400000
    )
  );

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [params] = useSearchParams();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomsCount, setRoomsCount] = useState<number>(1);
  const [guests, setGuests] = useState<number>(1);
  const [travellers, setTravellers] = useState<Traveller[]>([{}]);

  const booking = useBooking();
  const { data: hotel, isLoading, isError } = useHotel({}, id);
  const { data: rooms, isLoading: isLoadingRooms } = useRooms({}, params, id);

  const today = new Date().toISOString().slice(0, 10);

  const maxRoomsAllowed = selectedRoom?.total_rooms ?? 0;
  const maxGuestsAllowed = selectedRoom
    ? roomsCount * selectedRoom.max_occupancy
    : 0;

  useEffect(() => {
    if (!selectedRoom) return;
    setRoomsCount(1);
    setGuests(1);
    setTravellers([{}]);
  }, [selectedRoom]);

  useEffect(() => {
    if (guests > maxGuestsAllowed) {
      setGuests(maxGuestsAllowed);
    }
    setTravellers((prev) => prev.slice(0, guests));
    if (travellers.length < guests) {
      setTravellers((prev) => [
        ...prev,
        ...Array.from({ length: guests - prev.length }).map(() => ({})),
      ]);
    }
  }, [guests, maxGuestsAllowed]);

  const nights = useMemo(
    () => (checkIn && checkOut ? diffNights(checkIn, checkOut) : 0),
    [checkIn, checkOut]
  );

  const totalAmount = useMemo(() => {
    if (!selectedRoom || !nights) return 0;
    return (
      Number(selectedRoom.price_per_night) *
      roomsCount *
      nights
    );
  }, [selectedRoom, roomsCount, nights]);

  if (isLoading) return <Skeleton className="h-40 m-8" />;
  if (isError) return <ErrorState message="Hotel not found" />;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <main className="flex-1 pb-12">
        {/* Images */}
        <section className="container py-6">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 md:col-span-3">
              <img
                src={hotel?.images[selectedImage]?.url}
                alt={hotel?.name}
                className="w-full h-[450px] object-cover rounded-lg"
              />
            </div>
            {hotel?.images.slice(0, 3).map((img, i) => (
              <img
                key={i}
                src={img.url}
                onClick={() => setSelectedImage(i + 1)}
                className="hidden md:block h-[140px] w-full object-cover rounded-lg cursor-pointer"
              />
            ))}
          </div>
        </section>

        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{hotel?.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mt-2">
                <MapPin className="h-4 w-4" />
                {hotel?.city}, {hotel?.state}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.keys(hotel?.amenities || {}).map((a, i) => {
                  const Icon = amenityIcons[a] ?? Info;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="text-sm">{a}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Room Types</h2>
              {isLoadingRooms && <Skeleton className="h-40" />}
              {(rooms || []).map((room: any) => (
                <Card key={room.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{room.type}</CardTitle>
                      <div className="text-right">
                        <div className="text-xl font-bold">
                          ₹{room.price_per_night}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          per night
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                      <span>{room.area_sqft} sq ft</span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {room.max_occupancy} / room
                      </span>
                      <span>{room.total_rooms} rooms available</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.keys(room.amenities || {}).map((a, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <Check className="h-4 w-4 text-green-600" />
                          {a}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant={
                        selectedRoom?.id === room.id
                          ? "default"
                          : "outline"
                      }
                      onClick={() => setSelectedRoom(room)}
                    >
                      {selectedRoom?.id === room.id
                        ? "Selected"
                        : "Select Room"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-1">
            {selectedRoom && (
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Book {selectedRoom.type}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Check-in</label>
                    <input
                      type="date"
                      min={today}
                      className="w-full border px-3 py-2 rounded-md"
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);
                        if (checkOut && checkOut <= e.target.value) {
                          setCheckOut("");
                        }
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Check-out</label>
                    <input
                      type="date"
                      min={checkIn || today}
                      disabled={!checkIn}
                      className="w-full border px-3 py-2 rounded-md"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Rooms (max {maxRoomsAllowed})
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={maxRoomsAllowed}
                      value={roomsCount}
                      className="w-full border px-3 py-2 rounded-md"
                      onChange={(e) =>
                        setRoomsCount(
                          Math.min(
                            maxRoomsAllowed,
                            Math.max(1, Number(e.target.value))
                          )
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Guests (max {maxGuestsAllowed})
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={maxGuestsAllowed}
                      value={guests}
                      className="w-full border px-3 py-2 rounded-md"
                      onChange={(e) =>
                        setGuests(
                          Math.min(
                            maxGuestsAllowed,
                            Math.max(1, Number(e.target.value))
                          )
                        )
                      }
                    />
                  </div>

                  <TravellersForm
                    count={guests}
                    value={travellers}
                    onChange={setTravellers}
                  />

                  <Separator />

                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Price / Night</span>
                      <span>₹{selectedRoom.price_per_night}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nights</span>
                      <span>{nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rooms</span>
                      <span>{roomsCount}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    disabled={
                      !checkIn ||
                      !checkOut ||
                      nights === 0 ||
                      travellers.length !== guests ||
                      booking.hotel.isPending
                    }
                    onClick={() => {
                      if (!isAuthenticated) {
                        toast.error("Please login to continue");
                        navigate("/auth");
                        return;
                      }
                      if (guests > maxGuestsAllowed) {
                        toast.error(
                          `Max ${maxGuestsAllowed} guests allowed`
                        );
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
                          travellers,
                        },
                        {
                          onSuccess: () => {
                            toast.success(
                              "Hotel booking request submitted"
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
      </main>
    </div>
  );
}
