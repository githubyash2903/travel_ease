import { z } from 'zod';

// Amenities: key-value pairs, e.g., { "wifi": true, "ac": false }
const amenitiesSchema = z.record(z.string(), z.boolean());

// Image object
const imageSchema = z.object({
  url: z.string().refine(
    (val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: 'Invalid image URL' }
  ),
  is_primary: z.boolean().optional(),
});

// Create Room Schema
export const createRoomSchema = z.object({
  hotel_id: z.string().uuid(),
  type: z.string().min(2),
  description: z.string().optional(),
  area_sqft: z.number().min(0),
  max_occupancy: z.number().min(0),
  beds: z.array(z.any()).optional(),
  price_per_night: z.number().min(0),
  total_rooms: z.number().int().positive(),

  amenities: amenitiesSchema.optional(),
  images: z.array(imageSchema).optional(),

  is_active: z.boolean().optional(),
});

// Update Room Schema: partial fields allowed
export const updateRoomSchema = createRoomSchema.partial();
