import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plane, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { formatIST } from "@/utils/time";

interface FlightCardProps {
  id: string;
  airline: string;
  flightNumber: string;
  source: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  stops: number;
  cabinClass: string;
}


export const FlightCard = ({
  id,
  airline,
  departure,
  source,
  destination,
  arrival,
  duration,
  price,
  stops,
  cabinClass,
}: FlightCardProps) => {
  console.log(stops);
  return (
    <Card className="hover:shadow-elegant transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">{airline}</span>
              {stops === 0 && (
                <Badge className="bg-green-400 text-white">Non-stop</Badge>
              )}
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold">{formatIST(departure)}</div>
                <div className="text-xs text-muted-foreground">{source}</div>
              </div>

              <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <Clock className="h-4 w-4" />
                  <span>{duration}</span>
                </div>
                <div className="w-full h-px bg-border relative">
                  <Plane className="h-4 w-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
                </div>
                {stops > 0 && (
                  <div className="text-xs text-muted-foreground mt-2">
                    {stops} {stops === 1 ? "stop" : "stops"}
                  </div>
                )}
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold">{formatIST(arrival)}</div>
                <div className="text-xs text-muted-foreground">
                  {destination}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 md:border-l md:pl-6 md:min-w-[180px]">
            <div>
              <div className="text-xs text-muted-foreground">From</div>
              <div className="text-3xl font-bold text-primary">
                ₹{price.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">{cabinClass}</div>
            </div>
            <Button className="w-full" asChild>
              <Link to={`/flights/${id}`}>Book Now</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
