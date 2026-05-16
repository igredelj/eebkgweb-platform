<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MockBookingApi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TenantConfigController extends Controller
{
    public function __invoke(Request $request, MockBookingApi $api): JsonResponse
    {
        $tenantId = $request->query('tenant', 'acme-air');

        return response()->json($api->tenantConfig($tenantId));
    }
}
