import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface HolidayPackageCardProps {
    id: string;
  title: string;
  destination: string;
  duration: string;
  image: string;
  price: number;
  rating: number;
  inclusions: string[];
  category: string;
}

export const HolidayPackageCard = ({ id, title, destination, duration, image, price, rating, inclusions, category }: HolidayPackageCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <Badge className="absolute top-3 left-3 bg-primary text-white">{category}</Badge>
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-2 py-1 rounded text-sm font-semibold">
          ⭐ {rating}
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{destination}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Min 2 persons</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-xs text-muted-foreground mb-2">Includes:</div>
          <div className="flex flex-wrap gap-1">
            {inclusions.slice(0, 3).map((item, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">{item}</Badge>
            ))}
            {inclusions.length > 3 && (
              <Badge variant="secondary" className="text-xs">+{inclusions.length - 3} more</Badge>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <div className="text-xs text-muted-foreground">Starting from</div>
            <div className="text-2xl font-bold text-primary">₹{price.toLocaleString()}</div>
          </div>
          <Button asChild>
            <Link to={`/holidays/${id}`}>View Package</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default HolidayPackageCard;