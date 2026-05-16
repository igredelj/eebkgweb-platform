import { UserRoundCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import { completePassengers } from '../features/booking/bookingSlice';

interface PassengerFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const PassengerDetailsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<PassengerFormValues>();

  const onSubmit = () => {
    dispatch(completePassengers());
    navigate('/extras');
  };

  return (
    <section className="flow-page" aria-labelledby="passengers-title">
      <div className="page-heading">
        <h1 id="passengers-title">Passenger details</h1>
        <p>Enter lead passenger and contact information.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          First name
          <input {...register('firstName', { required: true })} aria-invalid={Boolean(formState.errors.firstName)} />
        </label>
        <label>
          Last name
          <input {...register('lastName', { required: true })} aria-invalid={Boolean(formState.errors.lastName)} />
        </label>
        <label>
          Email
          <input type="email" {...register('email', { required: true })} aria-invalid={Boolean(formState.errors.email)} />
        </label>
        <label>
          Phone
          <input type="tel" {...register('phone', { required: true })} aria-invalid={Boolean(formState.errors.phone)} />
        </label>
        <button className="primary-action" type="submit">
          <UserRoundCheck aria-hidden="true" size={18} />
          Continue to extras
        </button>
      </form>
    </section>
  );
};
