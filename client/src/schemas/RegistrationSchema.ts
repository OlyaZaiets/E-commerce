import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const registrationSchema = z.object({
  fullName: z.string().min(2, { message: 'Full Name must be at least 2 characters' }),
  email: z.email({ message: 'Invalid email format' }),
  phone: z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number",
  }),
  password: z
    .string()
    .min(6, { message: 'Minimum 6 characters' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Minimum 6 characters' }),
  privacy: z
    .literal(true, { message: 'You must agree to the Privacy Policy' }),
})
.refine((data) => data.password === data.confirmPassword, { 
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type RegistrationInputForm = z.infer<typeof registrationSchema>;
