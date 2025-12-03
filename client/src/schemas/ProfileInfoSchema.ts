import { isValidPhoneNumber } from 'react-phone-number-input';
import { z } from 'zod';

export const profileInfoSchema = z.object({
  firstName: z.string().min(2, { message: 'Full Name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Full Name must be at least 2 characters' }),
  email: z.email({ message: 'Invalid email format' }),
  phone: z.string().refine(isValidPhoneNumber, {
    message: 'Invalid phone number',
  }),

  gender: z.string().optional(),
  
  birthday: z.object({
    day: z.string().optional(),
    month: z.string().optional(),
    year: z.string().optional(),
  }),

  oldPassword: z.string().optional(),
  newPassword: z.string().min(6, 'Minimum 6 characters').optional().or(z.literal('')),
})
.refine((data) => {
  if (!data.newPassword) return true; // user does NOT change password
  return !!data.oldPassword; // if newPassword exists → oldPassword required
}, {
  message: 'Old password is required when changing password',
  path: ['oldPassword'],
})
.refine((data) => {
  if (!data.newPassword) return true; 
  return data.newPassword !== data.oldPassword;
}, {
  message: 'New password must be different from old password',
  path: ['newPassword'],
});


export type ProfileInputInput = z.infer<typeof profileInfoSchema>;