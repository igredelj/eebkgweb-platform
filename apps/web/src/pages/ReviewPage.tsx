import { ClipboardCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { markReviewed } from '../features/booking/bookingSlice';

export const ReviewPage = () => {
  const booking = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = () => {
    dispatch(markReviewed());
    navigate('/payment');
  };

  return (
    <section className="flow-page" aria-labelledby="review-title">
      <div className="page-heading">
        <h1 id="review-title">Review booking</h1>
        <p>Check your itinerary, fare, passengers, and extras before payment.</p>
      </div>

      <dl className="summary-list">
        <div>
          <dt>Route</dt>
          <dd>
            {booking.search?.origin} to {booking.search?.destination}
          </dd>
        </div>
        <div>
          <dt>Dates</dt>
          <dd>
            {booking.search?.departureDate} to {booking.search?.returnDate}
          </dd>
        </div>
        <div>
          <dt>Flights</dt>
          <dd>
            {booking.outboundFlightId} / {booking.inboundFlightId}
          </dd>
        </div>
        <div>
          <dt>Fare</dt>
          <dd>{booking.fareId}</dd>
        </div>
        <div>
          <dt>Extras</dt>
          <dd>{booking.extras.length ? booking.extras.join(', ') : 'No extras selected'}</dd>
        </div>
      </dl>

      <button className="primary-action" type="button" onClick={submit}>
        <ClipboardCheck aria-hidden="true" size={18} />
        Continue to payment
      </button>
    </section>
  );
};
