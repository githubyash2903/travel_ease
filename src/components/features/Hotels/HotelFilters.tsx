import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

type Amenity = {
  key: string;
  label: string;
};

type HotelFiltersProps = {
  amenities?: Amenity[];
  price?: {
    min: number;
    max: number;
    step?: number;
  };
  ratings?: number[];
};

export const HotelFilters = ({
  amenities = [
    { key: "wifi", label: "Free WiFi" },
    { key: "breakfast", label: "Free Breakfast" },
    { key: "pool", label: "Swimming Pool" },
    { key: "parking", label: "Free Parking" },
    { key: "gym", label: "Gym" },
  ],
  price = { min: 0, max: 20000, step: 500 },
  ratings = [5, 4, 3, 2],
}: HotelFiltersProps) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const params = useMemo(() => new URLSearchParams(search), [search]);

  const pushParams = useCallback(
    (next: URLSearchParams) => {
      navigate(`${pathname}?${next.toString()}`, { replace: true });
    },
    [navigate, pathname],
  );

  const minPrice = Number(params.get("minPrice") ?? price.min);
  const maxPrice = Number(params.get("maxPrice") ?? price.max);
  const minRating = params.get("minRating");

  const hasAmenity = (key: string) =>
    params.getAll("amenities").includes(key);

  const toggleAmenity = (key: string) => {
    const next = new URLSearchParams(params);
    const values = next.getAll("amenities");
    next.delete("amenities");

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    values.includes(key)
      ? values.filter(v => v !== key).forEach(v => next.append("amenities", v))
      : [...values, key].forEach(v => next.append("amenities", v));

    pushParams(next);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">
            Price per Night
          </Label>
          <Slider
            min={price.min}
            max={price.max}
            step={price.step}
            value={[minPrice, maxPrice]}
            onValueChange={([min, max]) => {
              const next = new URLSearchParams(params);
              next.set("minPrice", String(min));
              next.set("maxPrice", String(max));
              pushParams(next);
            }}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{minPrice}</span>
            <span>₹{maxPrice}</span>
          </div>
        </div>

        <Separator />

        {/* Rating */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">
            Star Rating
          </Label>
          <div className="space-y-2">
            {ratings.map(r => (
              <div key={r} className="flex items-center space-x-2">
                <Checkbox
                  checked={minRating === String(r)}
                  onCheckedChange={(checked) => {
                    const next = new URLSearchParams(params);
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    checked
                      ? next.set("minRating", String(r))
                      : next.delete("minRating");
                    pushParams(next);
                  }}
                />
                <Label className="flex items-center gap-1 cursor-pointer">
                  {r}
                  <Star className="h-3 w-3 fill-warning text-warning" />
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Amenities */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">
            Amenities
          </Label>
          <div className="space-y-2">
            {amenities.map(a => (
              <div key={a.key} className="flex items-center space-x-2">
                <Checkbox
                  checked={hasAmenity(a.key)}
                  onCheckedChange={() => toggleAmenity(a.key)}
                />
                <Label className="cursor-pointer">{a.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Sort */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">
            Sort By
          </Label>
          <div className="space-y-2">
            {[
              ["rating_desc", "Rating: High to Low"],
              ["rating_asc", "Rating: Low to High"],
              ["newest", "Newest"],
              ["name_asc", "Name A–Z"],
              ["name_desc", "Name Z–A"],
            ].map(([value, label]) => (
              <div key={value} className="flex items-center space-x-2">
                <Checkbox
                  checked={params.get("sort") === value}
                  onCheckedChange={(checked) => {
                    const next = new URLSearchParams(params);
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    checked
                      ? next.set("sort", value)
                      : next.delete("sort");
                    pushParams(next);
                  }}
                />
                <Label className="cursor-pointer">{label}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
