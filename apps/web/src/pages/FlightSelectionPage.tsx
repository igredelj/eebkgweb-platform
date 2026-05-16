import { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectFlights } from '../features/booking/bookingSlice';
import { searchFlights, type FlightOption } from '../services/bookingApi';

export const FlightSelectionPage = () => {
  const booking = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [flights, setFlights] = useState<FlightOption[]>([]);
  const [outboundFlightId, setOutboundFlightId] = useState('');
  const [inboundFlightId, setInboundFlightId] = useState('');
  const [status, setStatus] = useState('Loading flight options');

  useEffect(() => {
    searchFlights(booking.search)
      .then((response) => {
        setFlights(response.flights);
        setStatus(`${response.flights.length} flight options loaded`);
      })
      .catch(() => setStatus('Flight options could not be loaded'));
  }, [booking.search]);

  const submit = () => {
    dispatch(selectFlights({ outboundFlightId, inboundFlightId }));
    navigate('/fares');
  };

  const renderOptions = (direction: FlightOption['direction']) => (
    <div className="option-stack">
      {flights
        .filter((flight) => flight.direction === direction)
        .map((flight) => (
          <label className="choice-card" key={flight.id}>
            <input
              type="radio"
              name={direction}
              value={flight.id}
              checked={(direction === 'outbound' ? outboundFlightId : inboundFlightId) === flight.id}
              onChange={() => (direction === 'outbound' ? setOutboundFlightId(flight.id) : setInboundFlightId(flight.id))}
            />
            <span>
              <strong>
                {flight.airline} {flight.flightNumber}
              </strong>
              <span>
                {flight.departureTime} to {flight.arrivalTime}, {flight.duration}, {flight.stops} stop
                {flight.stops === 1 ? '' : 's'}
              </span>
            </span>
            <span className="price">EUR {flight.price}</span>
          </label>
        ))}
    </div>
  );

  return (
    <section className="flow-page" aria-labelledby="flights-title">
      <div className="page-heading">
        <h1 id="flights-title">Select flights</h1>
        <p id="flight-status" aria-live="polite">
          {status}
        </p>
      </div>

      <div className="two-column">
        <section aria-labelledby="outbound-title">
          <h2 id="outbound-title">Outbound</h2>
          {renderOptions('outbound')}
        </section>
        <section aria-labelledby="inbound-title">
          <h2 id="inbound-title">Inbound</h2>
          {renderOptions('inbound')}
        </section>
      </div>

      <button className="primary-action" type="button" disabled={!outboundFlightId || !inboundFlightId} onClick={submit}>
        <Plane aria-hidden="true" size={18} />
        Continue to fares
      </button>
    </section>
  );
};
