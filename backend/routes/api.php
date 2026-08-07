<?php

use App\Http\Controllers\Api\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/prueba', function () {
    return response()->json([
        'mensaje' => 'API de Laravel funcionando',
        'estado' => true,
    ]);
});

Route::apiResource('projects', ProjectController::class);
