<?php

return [
    'api_mode' => env('BOOKING_API_MODE', 'mock'),
    'mock_data_path' => realpath(base_path('../../mock-data')) ?: base_path('../../mock-data'),
];
