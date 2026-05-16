import type { TenantConfig } from '@eebkg/config-schema';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import { setSearch, type SearchCriteria } from '../features/booking/bookingSlice';

interface SearchPageProps {
  config: TenantConfig;
}

export const SearchPage = ({ config }: SearchPageProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<SearchCriteria>({
    defaultValues: {
      origin: 'ZAG',
      destination: 'AMS',
      departureDate: '2026-06-20',
      returnDate: '2026-06-27',
      passengers: {
        adult: 1,
        child: 0,
        senior: 0,
      },
    },
  });

  const onSubmit = (values: SearchCriteria) => {
    dispatch(setSearch(values));
    navigate('/flights');
  };

  return (
    <section className="flow-page" aria-labelledby="search-title">
      <div className="page-heading">
        <h1 id="search-title">Search flights</h1>
        <p>Choose your route, travel dates, and passengers.</p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          From
          <input {...register('origin', { required: 'Origin is required' })} aria-invalid={Boolean(formState.errors.origin)} />
        </label>
        <label>
          To
          <input
            {...register('destination', { required: 'Destination is required' })}
            aria-invalid={Boolean(formState.errors.destination)}
          />
        </label>
        <label>
          Departure
          <input type="date" {...register('departureDate', { required: true })} />
        </label>
        <label>
          Return
          <input type="date" {...register('returnDate', { required: true })} />
        </label>
        <label>
          Adults
          <input type="number" min="1" {...register('passengers.adult', { valueAsNumber: true, min: 1 })} />
        </label>
        <label>
          Children
          <input type="number" min="0" {...register('passengers.child', { valueAsNumber: true, min: 0 })} />
        </label>
        {config.features.seniorPassenger ? (
          <label>
            Seniors
            <input type="number" min="0" {...register('passengers.senior', { valueAsNumber: true, min: 0 })} />
          </label>
        ) : null}
        <button className="primary-action" type="submit">
          <Search aria-hidden="true" size={18} />
          Search flights
        </button>
      </form>
    </section>
  );
};
