// validation/user/contact.schema.ts
import { z } from 'zod';

export const createContactMessageSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export type CreateContactMessageInput =
  z.infer<typeof createContactMessageSchema>;
