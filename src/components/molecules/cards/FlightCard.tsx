import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FlightCardProps {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    time: string;
    code: string;
  };
  arrival: {
    airport: string;
    time: string;
    code: string;
  };
  duration: string;
  price: number;
  stops: number;
  cabinClass: string;

  // ⭐ NEW → Add searchData
  searchData?: {
    from?: string;
    to?: string;
    departureDate?: string;
    returnDate?: string;
    travellers?: number;
    cabinClass?: string;
  };
}

export const FlightCard = ({
  id,
  airline,
  flightNumber,
  departure,
  arrival,
  duration,
  price,
  stops,
  cabinClass,

  // ⭐ receive searchData
  searchData,
}: FlightCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

          {/* Left Section */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">
                {airline || "Unknown Airline"}
              </span>

              <Badge variant="secondary" className="text-xs">
                {flightNumber || "N/A"}
              </Badge>

              {stops === 0 && (
                <Badge className="bg-success text-white">Non-stop</Badge>
              )}
            </div>

            <div className="flex items-center gap-8">
              {/* Departure */}
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {departure?.time || "--:--"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {departure?.code || "XXX"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {departure?.airport || "Unknown Airport"}
                </div>
              </div>

              {/* Middle */}
              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <Clock className="h-4 w-4" />
                  <span>{duration || "--"}</span>
                </div>

                <div className="w-full h-px bg-border relative">
                  <Plane
                    className="h-4 w-4 absolute top-1/2 left-1/2 
                    -translate-x-1/2 -translate-y-1/2 text-primary"
                  />
                </div>

                {stops > 0 && (
                  <div className="text-xs text-muted-foreground mt-2">
                    {stops} {stops === 1 ? "stop" : "stops"}
                  </div>
                )}
              </div>

              {/* Arrival */}
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {arrival?.time || "--:--"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {arrival?.code || "XXX"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {arrival?.airport || "Unknown Airport"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col items-end gap-3 md:border-l md:pl-6 md:min-w-[180px]">
            <div>
              <div className="text-xs text-muted-foreground">From</div>
              <div className="text-3xl font-bold text-primary">
                ₹{(price || 0).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                {cabinClass || "Economy"}
              </div>
            </div>

            {/* ⭐ BOOK NOW WITH FULL DATA */}
            <Button
            variant="secondary"
              className="w-full  "
              onClick={() =>
                navigate(`/flights/${id}`, {
                  state: {
                    flight: {
                      id,
                      airline,
                      flightNumber,
                      departure,
                      arrival,
                      duration,
                      price,
                      stops,
                      cabinClass,
                    },

                    // ⭐ Pass searchData also
                    searchData: searchData || {},
                  },
                })
              }
            >
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
