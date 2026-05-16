import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type PassengerType = 'adult' | 'child' | 'senior';

export interface PassengerCounts {
  adult: number;
  child: number;
  senior: number;
}

export interface SearchCriteria {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: PassengerCounts;
}

export interface BookingState {
  search?: SearchCriteria;
  outboundFlightId?: string;
  inboundFlightId?: string;
  fareId?: string;
  passengersComplete: boolean;
  extras: string[];
  reviewed: boolean;
  paymentComplete: boolean;
  confirmationCode?: string;
}

const initialState: BookingState = {
  passengersComplete: false,
  extras: [],
  reviewed: false,
  paymentComplete: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<SearchCriteria>) {
      state.search = action.payload;
      state.outboundFlightId = undefined;
      state.inboundFlightId = undefined;
      state.fareId = undefined;
      state.passengersComplete = false;
      state.extras = [];
      state.reviewed = false;
      state.paymentComplete = false;
      state.confirmationCode = undefined;
    },
    selectFlights(state, action: PayloadAction<{ outboundFlightId: string; inboundFlightId: string }>) {
      state.outboundFlightId = action.payload.outboundFlightId;
      state.inboundFlightId = action.payload.inboundFlightId;
      state.fareId = undefined;
      state.reviewed = false;
      state.paymentComplete = false;
    },
    selectFare(state, action: PayloadAction<string>) {
      state.fareId = action.payload;
      state.reviewed = false;
      state.paymentComplete = false;
    },
    completePassengers(state) {
      state.passengersComplete = true;
      state.reviewed = false;
      state.paymentComplete = false;
    },
    setExtras(state, action: PayloadAction<string[]>) {
      state.extras = action.payload;
      state.reviewed = false;
      state.paymentComplete = false;
    },
    markReviewed(state) {
      state.reviewed = true;
    },
    completePayment(state, action: PayloadAction<string>) {
      state.paymentComplete = true;
      state.confirmationCode = action.payload;
    },
  },
});

export const {
  completePassengers,
  completePayment,
  markReviewed,
  selectFare,
  selectFlights,
  setExtras,
  setSearch,
} = bookingSlice.actions;

export default bookingSlice.reducer;
