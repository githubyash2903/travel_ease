import { useParams, useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plane, Calendar as CalendarIcon } from "lucide-react";
import { useFlight } from "@/hooks/useFlights";
import { formatIST } from "@/utils/time";
import { Skeleton } from "@/components/ui/skeleton";

type SearchData = {
  from?: string;
  to?: string;
  departureDate?: string;
  travellers?: number;
  cabinClass?: string;
};


export default function FlightDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: flight, isLoading } = useFlight({}, id);
  if(isLoading){
    return (
      <Skeleton className="h-[50vh] w-full rounded-md"/>
    )
  }
  return (
    <div className="container py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-6">
        {/* HEADER */}
        <Card className="overflow-auto">
          <CardHeader className="flex justify-between flex-row">
            <div>
              <CardTitle>{flight?.airline}</CardTitle>
              {/* <p className="text-sm text-muted-foreground">
                Flight ID: {flight?.id.slice(0, 6)}
              </p> */}
            </div>
          </CardHeader>

          <CardContent className="grid grid-cols-3 items-center">
            <div className="text-center">
              <p className="text-3xl font-bold">{formatIST(flight?.departure)}</p>
              {/* <p>{flight?.departure.code}</p>
              <p className="text-xs flex justify-center gap-1">
                <CalendarIcon className="h-4 w-4" />
                {flight?.departure || "—"}
              </p> */}
            </div>

            <div className="flex flex-col items-center">
              <Plane className="rotate-90 text-primary" />
              <Badge variant="outline">
                {flight?.stops === 0 ? "Non-stop" : `${flight?.stops} stop`}
              </Badge>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold">{formatIST(flight?.arrival)}</p>
              {/* <p>{flight?.arrival.code}</p> */}
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
            <span>
              {flight?.source} → {flight?.destination}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Date</span>
            <span>{formatIST(flight?.departure) || "—"}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Travellers</span>
            <span>1</span>
          </div>

          <Separator />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary">₹{flight?.price}</span>
          </div>

          <Button
            className="w-full"
          >
            Continue to Book
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
