// src/components/molecules/cards/HotelCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  name: string;
  location: string;
  rating: number;
  star: number;
  pricePerNight: number;
  currency?: string;
  thumbnail?: string | null;
  amenities?: string[];
  propertyType?: string;

  // ⭐ ADD THIS
  searchData?: {
    city?: string;
    checkin?: string;
    checkout?: string;
    guests?: number;
    rooms?: number;
  };
}

export const HotelCard = ({
  id,
  name,
  location,
  rating,
  star,
  pricePerNight,
  currency = "INR",
  thumbnail,
  amenities = [],
  propertyType,
  searchData,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4 md:p-6">
        <div className="flex gap-4">

          {/* IMAGE */}
          <div className="w-32 h-20 bg-gray-100 rounded overflow-hidden">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-muted-foreground">
                No image
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{name}</h3>
                <div className="text-sm text-muted-foreground">
                  {location} • {propertyType}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  ⭐ {rating} • {star}-star
                </div>
                {amenities.length > 0 && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {amenities.slice(0, 3).join(" • ")}
                  </div>
                )}
              </div>

              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  Per night
                </div>
                <div className="text-2xl font-bold text-primary">
                  ₹{(pricePerNight || 0).toLocaleString()}
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  navigate(`/hotels/${id}`, {
                    state: {
                      hotel: {
                        id,
                        name,
                        location,
                        rating,
                        star,
                        pricePerNight,
                        amenities,
                        propertyType,
                      },
                      searchData,
                    },
                  })
                }
              >
                View Details
              </Button>

              <Button
                onClick={() =>
                  navigate(`/hotels/${id}`, {
                    state: {
                      hotel: {
                        id,
                        name,
                        location,
                        rating,
                        star,
                        pricePerNight,
                        amenities,
                        propertyType,
                      },
                      searchData,
                    },
                  })
                }
              >
                Book Now
              </Button>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};
