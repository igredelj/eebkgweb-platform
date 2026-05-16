import { describe, expect, it } from 'vitest';
import type { RootState } from '../../app/store';
import { isStepAvailable } from './selectors';

const baseState = {
  booking: {
    passengersComplete: false,
    extras: [],
    reviewed: false,
    paymentComplete: false,
  },
} satisfies RootState;

describe('isStepAvailable', () => {
  it('allows search as the entry point', () => {
    expect(isStepAvailable(baseState, 'search')).toBe(true);
  });

  it('locks payment until review is complete', () => {
    expect(isStepAvailable(baseState, 'payment')).toBe(false);

    expect(
      isStepAvailable(
        {
          booking: {
            ...baseState.booking,
            reviewed: true,
          },
        },
        'payment',
      ),
    ).toBe(true);
  });
});
