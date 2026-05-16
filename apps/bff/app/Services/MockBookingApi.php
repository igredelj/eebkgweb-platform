<?php

namespace App\Services;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MockBookingApi
{
    public function tenantConfig(string $tenantId): array
    {
        return $this->readJson("tenants/{$tenantId}/config.json");
    }

    public function searchFlights(array $criteria): array
    {
        return $this->readJson('api-responses/search-results.json');
    }

    public function fares(array $selection): array
    {
        return $this->readJson('api-responses/fares.json');
    }

    public function ancillaries(array $booking): array
    {
        return $this->readJson('api-responses/ancillaries.json');
    }

    public function confirm(array $booking): array
    {
        $confirmation = $this->readJson('api-responses/confirmation.json');

        return [
            'confirmationCode' => Arr::get($confirmation, 'confirmationCode', 'BOOKING-CONFIRMED'),
        ];
    }

    private function readJson(string $relativePath): array
    {
        $path = config('booking.mock_data_path').DIRECTORY_SEPARATOR.$relativePath;

        if (! File::exists($path)) {
            throw new NotFoundHttpException("Mock response was not found: {$relativePath}");
        }

        return json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);
    }
}
