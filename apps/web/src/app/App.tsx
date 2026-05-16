import { useEffect, useState } from 'react';
import type { TenantConfig } from '@eebkg/config-schema';
import { Navigate, Route, Routes } from 'react-router';
import { AppLayout } from '../components/AppLayout';
import { RouteGuard } from '../components/RouteGuard';
import { applyTenantTheme, loadTenantConfig } from '../features/config/tenant';
import { ConfirmationPage } from '../pages/ConfirmationPage';
import { ExtrasPage } from '../pages/ExtrasPage';
import { FareSelectionPage } from '../pages/FareSelectionPage';
import { FlightSelectionPage } from '../pages/FlightSelectionPage';
import { PassengerDetailsPage } from '../pages/PassengerDetailsPage';
import { PaymentPage } from '../pages/PaymentPage';
import { ReviewPage } from '../pages/ReviewPage';
import { SearchPage } from '../pages/SearchPage';

export const App = () => {
  const [config, setConfig] = useState<TenantConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTenantConfig()
      .then((tenantConfig) => {
        applyTenantTheme(tenantConfig);
        setConfig(tenantConfig);
      })
      .catch(() => {
        setError('We could not load this booking experience. Please check the tenant configuration.');
      });
  }, []);

  if (error) {
    return (
      <main className="centered-state" role="alert">
        <h1>Booking is unavailable</h1>
        <p>{error}</p>
      </main>
    );
  }

  if (!config) {
    return (
      <main className="centered-state" aria-busy="true">
        <h1>Loading booking experience</h1>
      </main>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout config={config} />}>
        <Route index element={<Navigate to="/search" replace />} />
        <Route path="/search" element={<SearchPage config={config} />} />
        <Route
          path="/flights"
          element={
            <RouteGuard step="flight-selection">
              <FlightSelectionPage />
            </RouteGuard>
          }
        />
        <Route
          path="/fares"
          element={
            <RouteGuard step="fare-selection">
              <FareSelectionPage />
            </RouteGuard>
          }
        />
        <Route
          path="/passengers"
          element={
            <RouteGuard step="passenger-details">
              <PassengerDetailsPage />
            </RouteGuard>
          }
        />
        <Route
          path="/extras"
          element={
            <RouteGuard step="extras">
              <ExtrasPage />
            </RouteGuard>
          }
        />
        <Route
          path="/review"
          element={
            <RouteGuard step="review">
              <ReviewPage />
            </RouteGuard>
          }
        />
        <Route
          path="/payment"
          element={
            <RouteGuard step="payment">
              <PaymentPage />
            </RouteGuard>
          }
        />
        <Route
          path="/confirmation"
          element={
            <RouteGuard step="confirmation">
              <ConfirmationPage />
            </RouteGuard>
          }
        />
      </Route>
    </Routes>
  );
};
