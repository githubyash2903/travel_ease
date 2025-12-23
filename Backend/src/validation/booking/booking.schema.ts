import { z } from 'zod';

/* USER */

export const createHotelBookingSchema = z.object({
  hotel_id: z.string().uuid(),
  room_id: z.string().uuid(),
  check_in: z.coerce.date(),
  check_out: z.coerce.date(),
  rooms_count: z.number().int().positive(),
  guests: z.number().int().positive(),
});

export const createFlightBookingSchema = z.object({
  flight_id: z.string().uuid(),
  seats: z.number().int().positive(),
});

export const createPackageBookingSchema = z.object({
  package_id: z.string().uuid(),
  start_date: z.coerce.date(),
  persons: z.number().int().positive(),
});

/* ADMIN */

export const declineBookingSchema = z.object({
  reason: z.string().min(5),
});
