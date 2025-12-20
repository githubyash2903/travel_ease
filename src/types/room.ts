// types/room.ts
export type Room = {
  id: string;
  type: string;
  description?: string;
  price_per_night: string;
  amenities: string[];
  images: string[];
};
