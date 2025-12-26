import { z } from 'zod';

const countries = ['Germany', 'Ukraine'] as const;

export const addressSchema = z
  .object({
    country: z
      .string()
      .refine(
        (value): value is (typeof countries)[number] =>
          countries.includes(value as any),
        { message: 'Please select a country' }
      ),

    postalCode: z
      .string()
      .trim()
      .min(1, 'Postal code is required'),

    region: z
      .string()
      .trim()
      .min(2, 'Region must contain at least 2 characters')
      .max(100, 'Region is too long'),

    city: z
      .string()
      .trim()
      .min(2, 'City must contain at least 2 characters')
      .max(100, 'City is too long'),

    street: z
      .string()
      .trim()
      .min(2, 'Street must contain at least 2 characters')
      .max(120, 'Street is too long'),

    building: z
      .string()
      .trim()
      .min(1, 'House / apartment is required')
      .max(20, 'House / apartment is too long'),
  })
  .superRefine((data, ctx) => {
    // 🇩🇪 Germany
    if (data.country === 'Germany' && !/^\d{5}$/.test(data.postalCode)) {
      ctx.addIssue({
        path: ['postalCode'],
        code: z.ZodIssueCode.custom,
        message: 'German postal code must contain exactly 5 digits',
      });
    }

    // 🇺🇦 Ukraine
    if (data.country === 'Ukraine' && !/^\d{5}$/.test(data.postalCode)) {
      ctx.addIssue({
        path: ['postalCode'],
        code: z.ZodIssueCode.custom,
        message: 'Ukrainian postal code must contain exactly 5 digits',
      });
    }
  });

export type AddressInput = z.infer<typeof addressSchema>;
