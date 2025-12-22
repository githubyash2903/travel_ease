import { z } from 'zod';

export const createHolidayPackageSchema = z.object({
  title: z.string().min(3),
  destination: z.string().min(2),
  description: z.string().optional(),

  duration_days: z.number().int().positive(),
  duration_nights: z.number().int().nonnegative(),

  price: z.number().nonnegative(),
  rating: z.number().min(0).max(5).optional(),

  inclusions: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  category: z.string().optional(),

  is_active: z.boolean().default(true),
});

export const updateHolidayPackageSchema =
  createHolidayPackageSchema.partial();
