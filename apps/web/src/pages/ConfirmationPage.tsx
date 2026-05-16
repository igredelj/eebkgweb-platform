import { CheckCircle2 } from 'lucide-react';
import { useAppSelector } from '../app/hooks';

export const ConfirmationPage = () => {
  const booking = useAppSelector((state) => state.booking);

  return (
    <section className="flow-page confirmation" aria-labelledby="confirmation-title">
      <CheckCircle2 aria-hidden="true" size={44} />
      <div className="page-heading">
        <h1 id="confirmation-title">Booking confirmed</h1>
        <p>Your confirmation code is {booking.confirmationCode}.</p>
      </div>
    </section>
  );
};
