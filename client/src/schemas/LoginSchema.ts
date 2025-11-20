import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Minimum 6 characters" }),
});

export type LoginInputForm = z.infer<typeof loginSchema>;
