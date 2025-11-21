import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const profileInfoSchema = z.object({
  firstName: z.string().min(2, { message: 'Full Name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Full Name must be at least 2 characters' }),
  email: z.email({ message: 'Invalid email format' }),
  phone: z.string().refine(isValidPhoneNumber, {
    message: "Invalid phone number",
  }),

  gender: z.string().refine((val) => ['male', 'female', 'other'].includes(val), {
    message: 'Select your gender',
  }),

  birthday: z.object({
    day: z.string().min(1, { message: "Required" }),
    month: z.string().min(1, { message: "Required" }),
    year: z.string().min(1, { message: "Required" }),
  }),

  oldPassword: z.string().min(6, { message: "Minimum 6 characters" }),
  newPassword: z.string().min(6, { message: "Minimum 6 characters" }),
})
.refine((data) => data.oldPassword !== data.newPassword, {
  message: "New password must be different",
  path: ["newPassword"],
});


export type ProfileInputInput = z.infer<typeof profileInfoSchema>;