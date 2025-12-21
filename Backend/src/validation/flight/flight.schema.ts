import { z } from 'zod';

export const createFlightSchema = z.object({
  airline: z.string().min(2),
  source: z.string().min(3),
  destination: z.string().min(3),

  departure: z.string().datetime(),
  arrival: z.string().datetime(),

  total_seats: z.number().int().positive(),
  price: z.number().min(0).optional(),
  stops: z.number().int().min(0).optional(),

  is_active: z.boolean().optional(),
});

export const updateFlightSchema = createFlightSchema.partial();
