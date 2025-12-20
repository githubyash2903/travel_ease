import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Wifi, Coffee, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router-dom";

interface HotelCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  amenities: string[];
  discount?: number;
}

export const HotelCard = ({ id, name, location, rating, reviews, price, image, amenities, discount }: HotelCardProps) => {
  const amenityIcons: Record<string, any> = {
    wifi: Wifi,
    breakfast: Coffee,
    restaurant: UtensilsCrossed,
  };

  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          {discount && (
            <Badge className="absolute top-3 right-3 bg-accent text-white">{discount}% OFF</Badge>
          )}
        </div>
        
        <CardContent className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold mb-1">{name}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{location}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-semibold">{rating}</span>
                <span className="text-sm text-muted-foreground">({reviews})</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-4">
              {amenities.map((amenity, idx) => {
                const Icon = amenityIcons[amenity];
                return Icon ? (
                  <div key={idx} className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                ) : null;
              })}
            </div>
          </div>
          
          <div className="flex items-end justify-between mt-4 pt-4 border-t">
            <div>
              <div className="text-xs text-muted-foreground">Starting from</div>
              <div className="text-2xl font-bold text-primary">₹{price.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">per night</div>
            </div>
            <Button asChild>
              <Link to={`/hotels/${id}`}>View Details</Link>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
