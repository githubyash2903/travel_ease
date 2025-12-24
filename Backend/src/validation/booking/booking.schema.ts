import { z } from 'zod';

/* USER */

export const travellerSchema = z.object({
  full_name: z.string().min(2),
  age: z.number().int().positive(),
  gender: z.enum(["MALE","FEMALE","OTHER"]),
  id_proof_type: z.enum(["AADHAR","PASSPORT","DRIVING_LICENSE","VOTER_ID"]),
  id_proof_number: z.string().min(4),
});

export const createHotelBookingSchema = z.object({
  hotel_id: z.string().uuid(),
  room_id: z.string().uuid(),
  check_in: z.coerce.date(),
  check_out: z.coerce.date(),
  rooms_count: z.number().int().positive(),
  guests: z.number().int().positive(),
  travellers: z.array(travellerSchema).min(1),
});

export const createFlightBookingSchema = z.object({
  flight_id: z.string().uuid(),
  seats: z.number().int().positive(),
  travellers: z.array(travellerSchema).min(1),
});

export const createPackageBookingSchema = z.object({
  package_id: z.string().uuid(),
  start_date: z.coerce.date(),
  persons: z.number().int().positive(),
  travellers: z.array(travellerSchema).min(1),
});


/* ADMIN */

export const declineBookingSchema = z.object({
  reason: z.string().min(5),
});
