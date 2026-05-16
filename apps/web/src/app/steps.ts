import type { BookingStep } from '@eebkg/config-schema';

export const stepRoutes: Record<BookingStep, string> = {
  search: '/search',
  'flight-selection': '/flights',
  'fare-selection': '/fares',
  'passenger-details': '/passengers',
  extras: '/extras',
  review: '/review',
  payment: '/payment',
  confirmation: '/confirmation',
};

export const stepLabels: Record<BookingStep, string> = {
  search: 'Search',
  'flight-selection': 'Flights',
  'fare-selection': 'Fares',
  'passenger-details': 'Passengers',
  extras: 'Extras',
  review: 'Review',
  payment: 'Payment',
  confirmation: 'Confirmation',
};

export const defaultFlow: BookingStep[] = [
  'search',
  'flight-selection',
  'fare-selection',
  'passenger-details',
  'extras',
  'review',
  'payment',
  'confirmation',
];
