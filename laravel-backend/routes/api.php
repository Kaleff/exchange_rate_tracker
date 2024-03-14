<?php

use App\Http\Controllers\CurrencyRateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resources([
    /**
     * GET api/rates -> index();
     * POST api/rates -> store($request);
     */
    'rates' => CurrencyRateController::class
]);