import type { BookingStep } from '@eebkg/config-schema';
import { Navigate } from 'react-router';
import { stepRoutes } from '../app/steps';
import { useAppSelector } from '../app/hooks';
import { isStepAvailable } from '../features/booking/selectors';

interface RouteGuardProps {
  step: BookingStep;
  children: React.ReactNode;
}

export const RouteGuard = ({ step, children }: RouteGuardProps) => {
  const available = useAppSelector((state) => isStepAvailable(state, step));

  if (!available) {
    return <Navigate to={stepRoutes.search} replace />;
  }

  return children;
};
