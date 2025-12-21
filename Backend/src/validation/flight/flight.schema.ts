import { z } from 'zod';

export const createFlightSchema = z.object({
  airline: z.string().min(2),

  source: z.string().length(3),
  destination: z.string().length(3),

  departure: z.coerce.date(),
  arrival: z.coerce.date(),

  total_seats: z.number().int().positive(),
  price: z.number().nonnegative().default(0),
  stops: z.number().int().nonnegative().default(0),

  is_active: z.boolean().default(true),
});


export const updateFlightSchema = createFlightSchema.partial();
