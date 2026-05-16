import type { BookingStep } from '@eebkg/config-schema';
import type { RootState } from '../../app/store';

export const selectBooking = (state: RootState) => state.booking;

export const isStepAvailable = (state: RootState, step: BookingStep) => {
  const booking = state.booking;

  switch (step) {
    case 'search':
      return true;
    case 'flight-selection':
      return Boolean(booking.search);
    case 'fare-selection':
      return Boolean(booking.outboundFlightId && booking.inboundFlightId);
    case 'passenger-details':
      return Boolean(booking.fareId);
    case 'extras':
      return booking.passengersComplete;
    case 'review':
      return booking.passengersComplete;
    case 'payment':
      return booking.reviewed;
    case 'confirmation':
      return booking.paymentComplete;
  }
};
