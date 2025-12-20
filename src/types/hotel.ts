// types/hotel.ts
export type Hotel = {
  id: string;
  name: string;
  description?: string;
  city: string;
  address: string;
  rating: number | null;
  amenities: string[];
  images: string[];
};
