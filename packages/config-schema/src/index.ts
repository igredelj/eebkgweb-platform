import { z } from 'zod';

export const bookingStepSchema = z.enum([
  'search',
  'flight-selection',
  'fare-selection',
  'passenger-details',
  'extras',
  'review',
  'payment',
  'confirmation',
]);

export const tenantConfigSchema = z.object({
  tenantId: z.string().min(1),
  brand: z.object({
    name: z.string().min(1),
    logo: z.string().min(1),
  }),
  theme: z.object({
    colors: z.object({
      primary: z.string().min(1),
      primaryText: z.string().min(1),
      background: z.string().min(1),
      surface: z.string().min(1),
      border: z.string().min(1),
      text: z.string().min(1),
      mutedText: z.string().min(1),
      accent: z.string().min(1),
      danger: z.string().min(1),
    }),
    radius: z.string().min(1),
    fontFamily: z.string().min(1),
  }),
  bookingFlow: z.array(bookingStepSchema).min(1),
  features: z.object({
    seniorPassenger: z.boolean(),
    ancillaries: z.boolean(),
    promoCode: z.boolean(),
  }),
  locale: z.string().min(2),
  currency: z.string().length(3),
});

export type BookingStep = z.infer<typeof bookingStepSchema>;
export type TenantConfig = z.infer<typeof tenantConfigSchema>;
