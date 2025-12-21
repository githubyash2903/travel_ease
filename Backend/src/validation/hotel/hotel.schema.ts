import { z } from 'zod';

const amenitiesSchema = z.record(z.string(), z.boolean());

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

export const createHotelSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  address: z.string().min(5),
  rating: z.number().min(0).max(5).optional(),
  rating_count: z.number().optional(),
  min_price_per_night: z.number().optional(),

  amenities: amenitiesSchema.optional(),
  images: z.array(imageSchema).optional(),

  is_active: z.boolean().optional(),
});

export const updateHotelSchema = createHotelSchema.partial();
