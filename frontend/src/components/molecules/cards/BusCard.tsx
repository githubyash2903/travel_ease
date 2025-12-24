import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface BusCardProps {
  id: string;
  operator: string;
  busType: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  seats: number;
  rating: number;
  amenities: string[];
}

export function BusCard({
  id,
  operator,
  busType,
  from,
  to,
  departureTime,
  arrivalTime,
  duration,
  price,
  seats,
  rating,
  amenities
}: BusCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">{operator}</h3>
                <Badge variant="secondary" className="text-xs">{busType}</Badge>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-sm">{rating}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Departure</p>
                <p className="font-semibold text-lg">{departureTime}</p>
                <p className="text-sm">{from}</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Clock className="h-4 w-4 text-muted-foreground mb-1" />
                <p className="text-xs font-medium">{duration}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Arrival</p>
                <p className="font-semibold text-lg">{arrivalTime}</p>
                <p className="text-sm">{to}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {amenities.slice(0, 4).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
              {amenities.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{amenities.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          <div className="md:w-48 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:border-l md:pl-6">
            <div className="text-left md:text-right">
              <p className="text-2xl font-bold text-primary">₹{price}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Users className="h-3 w-3" />
                <span>{seats} seats left</span>
              </div>
            </div>
            <Button asChild className="w-full md:w-auto">
              <Link to={`/buses/${id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}