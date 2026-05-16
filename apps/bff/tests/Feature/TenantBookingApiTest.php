<?php

namespace Tests\Feature;

use Tests\TestCase;

class TenantBookingApiTest extends TestCase
{
    public function test_tenant_config_defaults_to_skywing(): void
    {
        $this->getJson('/api/tenant-config')
            ->assertOk()
            ->assertJsonPath('tenantId', 'skywing')
            ->assertJsonPath('brand.name', 'SkyWing');
    }

    public function test_search_results_are_branded_for_tenant(): void
    {
        $this->withHeader('X-Tenant-Id', 'skywing')
            ->postJson('/api/flights/search', [
                'origin' => 'ZAG',
                'destination' => 'AMS',
                'departureDate' => '2026-06-20',
                'returnDate' => '2026-06-27',
                'passengers' => [
                    'adult' => 1,
                    'child' => 0,
                    'senior' => 0,
                ],
            ])
            ->assertOk()
            ->assertJsonPath('flights.0.airline', 'SkyWing')
            ->assertJsonPath('flights.0.flightNumber', 'SW101');
    }
}
