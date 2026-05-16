import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, ChevronDown, Info, Pencil, Plane, SlidersHorizontal, UsersRound } from 'lucide-react';
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

  const outboundFlights = flights.filter((flight) => flight.direction === 'outbound');
  const inboundFlights = flights.filter((flight) => flight.direction === 'inbound');
  const selectedOutbound = outboundFlights.find((flight) => flight.id === outboundFlightId);
  const selectedInbound = inboundFlights.find((flight) => flight.id === inboundFlightId);
  const passengerCount = booking.search
    ? booking.search.passengers.adult + booking.search.passengers.child + booking.search.passengers.senior
    : 1;
  const routeText = `${booking.search?.origin ?? 'Origin'} to ${booking.search?.destination ?? 'Destination'}`;
  const returnRouteText = `${booking.search?.destination ?? 'Destination'} to ${booking.search?.origin ?? 'Origin'}`;
  const lowestPrice = flights.length ? Math.min(...flights.map((flight) => flight.price)) : 0;
  const dateCards = [
    { day: 'Mon', date: 'May 12', price: lowestPrice + 10 },
    { day: 'Tue', date: 'May 13', price: lowestPrice + 4 },
    { day: 'Wed', date: 'May 14', price: lowestPrice + 7 },
    { day: 'Thu', date: 'May 15', price: lowestPrice || 35, active: true },
    { day: 'Fri', date: 'May 16', price: lowestPrice + 23 },
    { day: 'Sat', date: 'May 17', price: lowestPrice + 37 },
    { day: 'Sun', date: 'May 18', price: lowestPrice + 30 },
  ];

  const selectFlight = (direction: FlightOption['direction'], flightId: string) => {
    if (direction === 'outbound') {
      setOutboundFlightId(flightId);
      return;
    }

    setInboundFlightId(flightId);
  };

  const renderFlightCard = (flight: FlightOption) => {
    const checked = flight.direction === 'outbound' ? outboundFlightId === flight.id : inboundFlightId === flight.id;

    return (
      <label className="availability-card" data-selected={checked} key={flight.id}>
        <input
          type="radio"
          name={flight.direction}
          value={flight.id}
          checked={checked}
          aria-label={`Select ${flight.direction} flight ${flight.airline} ${flight.flightNumber}, ${flight.departureTime} to ${flight.arrivalTime}, EUR ${flight.price}`}
          onChange={() => selectFlight(flight.direction, flight.id)}
        />
        <span className="flight-airline">
          <strong>{flight.airline}</strong>
          <span>{flight.flightNumber}</span>
          <span className="flight-details">
            <Info aria-hidden="true" size={15} />
            Flight details
          </span>
        </span>
        <span className="flight-time">
          <strong>{flight.departureTime}</strong>
          <span>{flight.direction === 'outbound' ? booking.search?.origin : booking.search?.destination}</span>
        </span>
        <span className="flight-duration">
          <span>{flight.duration}</span>
          <span className="duration-line">
            <Plane aria-hidden="true" size={16} />
          </span>
          <span>
            {flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops === 1 ? '' : 's'}`}
          </span>
        </span>
        <span className="flight-time">
          <strong>{flight.arrivalTime}</strong>
          <span>{flight.direction === 'outbound' ? booking.search?.destination : booking.search?.origin}</span>
        </span>
        <span className="flight-price">
          <span>from</span>
          <strong>EUR {flight.price}</strong>
          <span className="view-fares">
            {checked ? 'Selected' : 'Select'}
            <ChevronDown aria-hidden="true" size={16} />
          </span>
        </span>
      </label>
    );
  };

  const renderSelectedSummary = (title: string, route: string, selectedFlight?: FlightOption) => (
    <div className="summary-flight-slot" data-complete={Boolean(selectedFlight)}>
      <strong>{title}</strong>
      <span>{route}</span>
      {selectedFlight ? (
        <span>
          {selectedFlight.departureTime} - {selectedFlight.arrivalTime}, {selectedFlight.flightNumber}
        </span>
      ) : (
        <span>Select flight</span>
      )}
    </div>
  );

  return (
    <section className="availability-screen" aria-labelledby="flights-title">
      <div className="availability-trip-bar" aria-label="Current search">
        <div>
          <Plane aria-hidden="true" size={19} />
          <strong>{routeText}</strong>
        </div>
        <div>
          <CalendarDays aria-hidden="true" size={18} />
          <span>{booking.search?.departureDate}</span>
          <span aria-hidden="true">-</span>
          <span>{booking.search?.returnDate}</span>
        </div>
        <div>
          <UsersRound aria-hidden="true" size={18} />
          <span>
            {passengerCount} passenger{passengerCount === 1 ? '' : 's'}
          </span>
        </div>
        <button type="button">
          <Pencil aria-hidden="true" size={18} />
          Modify search
        </button>
      </div>

      <div className="date-strip" aria-label="Departure date prices">
        {dateCards.map((date) => (
          <button type="button" className="date-price-card" data-active={date.active} key={`${date.day}-${date.date}`}>
            <span>{date.day}</span>
            <strong>{date.date}</strong>
            <span>EUR {date.price}</span>
          </button>
        ))}
      </div>

      <div className="availability-toolbar">
        <label>
          Sort by
          <select defaultValue="best-value">
            <option value="best-value">Best value</option>
            <option value="lowest-price">Lowest price</option>
            <option value="departure-time">Departure time</option>
          </select>
        </label>
        <button type="button">
          <SlidersHorizontal aria-hidden="true" size={18} />
          Filters
        </button>
      </div>

      <div className="availability-layout">
        <div className="flight-results">
          <section aria-labelledby="flights-title">
            <div className="availability-heading">
              <h1 id="flights-title">Choose your outbound flight</h1>
              <p>
                {routeText} - {booking.search?.departureDate}
              </p>
              <p id="flight-status" aria-live="polite">
                {status}
              </p>
            </div>
            <div className="availability-list">{outboundFlights.map(renderFlightCard)}</div>
          </section>

          <section aria-labelledby="return-flights-title">
            <div className="availability-heading">
              <h2 id="return-flights-title">Choose your return flight</h2>
              <p>
                {returnRouteText} - {booking.search?.returnDate}
              </p>
            </div>
            <div className="availability-list">{inboundFlights.map(renderFlightCard)}</div>
          </section>
        </div>

        <aside className="trip-summary-card" aria-label="Trip summary">
          <h2>Trip summary</h2>
          <div className="summary-route">
            <span>{booking.search?.origin}</span>
            <Plane aria-hidden="true" size={16} />
            <span>{booking.search?.destination}</span>
          </div>
          {renderSelectedSummary('Outbound flight', routeText, selectedOutbound)}
          {renderSelectedSummary('Return flight', returnRouteText, selectedInbound)}
          <div className="summary-total">
            <span>Flights from</span>
            <strong>
              EUR {(selectedOutbound?.price ?? 0) + (selectedInbound?.price ?? 0)}
            </strong>
          </div>
          <button className="summary-continue" type="button" disabled={!outboundFlightId || !inboundFlightId} onClick={submit}>
            Continue to fares
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </aside>
      </div>
    </section>
  );
};
