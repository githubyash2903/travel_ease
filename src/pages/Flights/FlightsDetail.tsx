// src/pages/FlightDetail.tsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicClient } from "@/api/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plane, Calendar as CalendarIcon } from "lucide-react";

type SearchData = {
  from?: string;
  to?: string;
  departureDate?: string;
  travellers?: number;
  cabinClass?: string;
};

type FlightAPI = {
  id: string;
  airline: string;
  price: number;
  stops: number;
  departure: { code: string; time: string };
  arrival: { code: string; time: string };
  searchData?: SearchData;
  date:number
};

export default function FlightDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const passedFlight = location.state?.flight as FlightAPI;
  const passedSearchData = location.state?.searchData as SearchData;

  const [flight, setFlight] = useState<FlightAPI | null>(passedFlight || null);
  const [searchData] = useState<SearchData>(passedSearchData || {});
  const [loading, setLoading] = useState(!passedFlight);

  useEffect(() => {
    if (!passedFlight && id) {
      publicClient.get(`/flights/${id}`).then((res) => {
        setFlight({ ...res.data.flight, searchData });
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !flight) return <p className="text-center py-10">Loading...</p>;
   console.log(flight)
  return (
    <div className="container py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">

        {/* HEADER */}
        <Card>
          <CardHeader className="flex justify-between flex-row">
            <div>
              <CardTitle>{flight.airline}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Flight ID: {flight.id.slice(0, 6)}
              </p>
            </div>
            <Badge>{searchData.cabinClass || "Economy"}</Badge>
          </CardHeader>

          <CardContent className="grid grid-cols-3 items-center">
            <div className="text-center">
              <p className="text-3xl font-bold">{flight.departure.time}</p>
              <p>{flight.departure.code}</p>
              <p className="text-xs flex justify-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                {searchData.departureDate || "—"}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <Plane className="rotate-90 text-primary" />
              <Badge variant="outline">
                {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
              </Badge>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold">{flight.arrival.time}</p>
              <p>{flight.arrival.code}</p>
            </div>
          </CardContent>
        </Card>

        {/* BAGGAGE */}
        <Card>
          <CardHeader>
            <CardTitle>Baggage Allowance</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Cabin Baggage</p>
              <p className="text-sm text-muted-foreground">7 kg (1 piece)</p>
            </div>
            <div>
              <p className="font-medium">Check-in Baggage</p>
              <p className="text-sm text-muted-foreground">15 kg (1 piece)</p>
            </div>
          </CardContent>
        </Card>

        {/* AMENITIES */}
        <Card>
          <CardHeader>
            <CardTitle>In-flight Amenities</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2 text-sm">
            <span>✔️ Meals</span>
            <span>✔️ Charging Port</span>
            <span>✔️ Cabin Luggage</span>
            <span>✔️ Reading Material</span>
          </CardContent>
        </Card>

      </div>

      {/* RIGHT */}
      <Card className="sticky top-20 h-fit">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Route</span>
            <span>{flight.departure.code} → {flight.arrival.code}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Date</span>
            <span>{searchData.departureDate || "—"}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Travellers</span>
            <span>{searchData.travellers || 1}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary">₹{flight.price}</span>
          </div>

          <Button
            className="w-full"
            onClick={() =>
              navigate("/checkout", {
                state: { flight, searchData },
              })
            }
          >
            Continue to Book
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
