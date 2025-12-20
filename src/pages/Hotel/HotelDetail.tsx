// import { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import {publicClient} from "@/api/axios";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";

// import {
//   Star,
//   MapPin,
//   Users,
//   Calendar as CalendarIcon,
//   ChevronRight,
//   CheckCircle
// } from "lucide-react";

// export default function HotelDetails() {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Query param dates (REAL TIME)
//   const params = new URLSearchParams(location.search);
//   const checkin = params.get("checkin") || "";
//   const checkout = params.get("checkout") || "";
//   const guests = params.get("guests") || "2";

//   const [hotel, setHotel] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const [selectedRoom, setSelectedRoom] = useState<any>(null);

//   const load = async () => {
//     try {
//       const res = await publicClient.get(`/hotels/${id}`);
//       setHotel(res.data.hotel);
//     } catch (err) {
//       console.error("Hotel details error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   if (loading) return <p className="text-center py-10">Loading hotel...</p>;
//   if (!hotel) return <p className="text-center py-10 text-red-500">Hotel not found.</p>;

//   return (
//     <div className="min-h-screen bg-muted/10 py-10">
//       <div className="container max-w-6xl">

//         {/* ========== HEADER SECTION ========== */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold">{hotel.name}</h1>

//           <div className="flex items-center gap-3 text-muted-foreground mt-2">
//             <MapPin className="h-4 w-4" />
//             <span>{hotel.location}</span>

//             <Separator orientation="vertical" className="h-4" />

//             <div className="flex items-center">
//               <Star className="h-4 w-4 text-yellow-500" />
//               <span className="ml-1">{hotel.rating}</span>
//             </div>

//             <Badge variant="secondary">{hotel.star}-Star</Badge>
//           </div>
//         </div>

//         {/* ========== IMAGES ========== */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           {hotel.images?.map((img: string, i: number) => (
//             <img
//               key={i}
//               src={img}
//               className="w-full h-64 object-cover rounded-lg shadow"
//             />
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* ================= MAIN CONTENT (LEFT) ================= */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* ABOUT HOTEL */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>About This Property</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground leading-relaxed">
//                   {hotel.description}
//                 </p>
//               </CardContent>
//             </Card>

//             {/* AMENITIES */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Amenities</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//                   {hotel.amenities?.map((am: string, i: number) => (
//                     <div key={i} className="flex items-center gap-2">
//                       <CheckCircle className="h-4 w-4 text-primary" />
//                       <span>{am}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* ROOMS LIST */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Choose Your Room</CardTitle>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 {hotel.rooms?.map((room: any, i: number) => (
//                   <Card
//                     key={i}
//                     className={`border-2 ${
//                       selectedRoom?.type === room.type
//                         ? "border-primary"
//                         : "border-transparent"
//                     }`}
//                   >
//                     <CardContent className="p-4 flex flex-col md:flex-row justify-between gap-4">

//                       {/* ROOM INFO */}
//                       <div>
//                         <h3 className="text-lg font-semibold">{room.type}</h3>

//                         <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
//                           <Users className="h-4 w-4" />
//                           <span>Up to {room.occupancy} Guests</span>
//                         </div>

//                         <p className="text-sm mt-1">
//                           {room.refundable ? (
//                             <span className="text-green-600">Refundable</span>
//                           ) : (
//                             <span className="text-red-600">Non-refundable</span>
//                           )}
//                         </p>
//                       </div>

//                       {/* PRICE + SELECT BUTTON */}
//                       <div className="text-right">
//                         <p className="text-2xl font-bold">₹{room.price.toLocaleString()}</p>
//                         <p className="text-xs text-muted-foreground">per night</p>

//                         <Button
//                           className="mt-3"
//                           variant={selectedRoom?.type === room.type ? "default" : "outline"}
//                           onClick={() => setSelectedRoom(room)}
//                         >
//                           {selectedRoom?.type === room.type ? "Selected" : "Select Room"}
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>

//           {/* ================= RIGHT SIDEBAR ================= */}
//           <div className="lg:col-span-1">
//             <Card className="sticky  top-20">
//               <CardHeader>
//                 <CardTitle>Your Booking Summary</CardTitle>
//               </CardHeader>

//               <CardContent className="space-y-4">
//                 {/* CHECKIN - CHECKOUT */}
//                 <div className="p-3 bg-muted rounded-md">
//                   <div className="flex items-center gap-2">
//                     <CalendarIcon className="h-4 w-4" />
//                     <div>
//                       <p className="text-sm">Check-in</p>
//                       <p className="font-medium">{checkin || "Not selected"}</p>
//                     </div>
//                   </div>

//                   <Separator className="my-2" />

//                   <div className="flex items-center gap-2">
//                     <CalendarIcon className="h-4 w-4" />
//                     <div>
//                       <p className="text-sm">Check-out</p>
//                       <p className="font-medium">{checkout || "Not selected"}</p>
//                     </div>
//                   </div>

//                   <Separator className="my-2" />

//                   <div className="flex items-center gap-2">
//                     <Users className="h-4 w-4" />
//                     <p>{guests} Guests</p>
//                   </div>
//                 </div>

//                 {/* ROOM SELECTED */}
//                 {selectedRoom ? (
//                   <div>
//                     <h3 className="font-semibold">{selectedRoom.type}</h3>
//                     <p className="text-muted-foreground text-sm">
//                       ₹{selectedRoom.price.toLocaleString()} / night
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="text-sm text-red-500">Please select a room</p>
//                 )}

//                 <Separator />

//                 {/* CONTINUE BUTTON */}
//                 <Button
//                   className="w-full"
//                   size="lg"
//                   disabled={!selectedRoom}
//                   onClick={() =>
//                     navigate(`/hotel-checkout`, {
//                       state: {
//                         hotel,
//                         selectedRoom,
//                         checkin,
//                         checkout,
//                         guests,
//                       },
//                     })
//                   }
//                 >
//                   Continue to Booking
//                   <ChevronRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// pages/HotelDetailsPage.tsx
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/organisms/ErrorState";
import { RoomFilters } from "@/components/features/Hotels/RoomFilters";
import { EmptyState } from "@/components/organisms/EmptyState";
import { RoomCard } from "@/components/features/Hotels/RoomCard";

export default function HotelDetailsPage() {
  const { id } = useParams();
  const [params] = useSearchParams();

  const hotelQuery = useQuery({
    queryKey: ["hotel", id],
    queryFn: () => {},
  });

  const roomsQuery = useQuery({
    queryKey: ["rooms", id, params.toString()],
    queryFn: () => {},
  });

  if (hotelQuery.isLoading) return <Skeleton className="h-40 m-8" />;
  if (hotelQuery.isError) return <ErrorState message="Hotel not found" />;

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{hotelQuery.data!.name}</h1>
        <p className="text-muted-foreground">{hotelQuery.data!.address}</p>
      </div>

      <RoomFilters />

      {roomsQuery.isLoading && <Skeleton className="h-32" />}

      {roomsQuery.isError && (
        <ErrorState message="Failed to load rooms" />
      )}

      {!roomsQuery.isLoading && roomsQuery.data?.length === 0 && (
        <EmptyState
          title="No rooms available"
          description="Try adjusting price or dates"
        />
      )}

      <div className="space-y-4">
        {roomsQuery.data?.map(r => (
          <RoomCard key={r.id} room={r} />
        ))}
      </div>
    </div>
  );
}

