// src/pages/Hotels.tsx
import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { HotelCard } from "@/components/molecules/cards/HotelCard";
import { searchHotelsAPI } from "@/api/hotels";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface HotelItem {
  id: string;
  name: string;
  location: string;
  description?: string;
  star: number;
  rating: number;
  amenities: string[];
  pricePerNight: number;
  currency: string;
}

export default function Hotels() {
  const locationHook = useLocation();
  const params = new URLSearchParams(locationHook.search);

  const city = params.get("city") || "";

  const [hotels, setHotels] = useState<HotelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("price");

  /* -------------------------------------------
     LOAD HOTELS
  ------------------------------------------- */
  const loadHotels = async () => {
    if (!city) {
      setHotels([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const data = await searchHotelsAPI({ city });

      const normalized = (data.hotels || []).map((h: any) => ({
        id: h.id,
        name: h.name,
        location: h.location,
        description: h.description,
        star: h.star_rating,
        rating: Number(h.star_rating),
        amenities: h.amenities || [],
        pricePerNight: Number(h.price_per_night), // 🔥 FIX
        currency: "INR",
      }));

      setHotels(normalized);
    } catch (err) {
      console.error("Hotels load error:", err);
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHotels();
  }, [locationHook.search]);

  /* -------------------------------------------
     SORT
  ------------------------------------------- */
  const sortedHotels = useMemo(() => {
    const list = [...hotels];
    if (sort === "price") list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [hotels, sort]);

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <main className="container py-8 flex-1">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            {city ? `Hotels in ${city}` : "Hotels"}
          </h1>
          {!loading && (
            <p className="text-muted-foreground">
              Showing {sortedHotels.length} properties
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <Button variant="outline">Filters</Button>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="rating">Rating: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading && <p className="text-center py-10">Loading hotels...</p>}

        {!loading && sortedHotels.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No hotels found.
          </p>
        )}

        <div className="space-y-4">
          {!loading &&
            sortedHotels.map((hotel) => (
              <HotelCard key={hotel.id} {...hotel} />
            ))}
        </div>
      </main>
    </div>
  );
}
