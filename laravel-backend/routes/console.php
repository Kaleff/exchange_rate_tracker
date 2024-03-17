<?php

use App\Http\Controllers\CurrencyRateController;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Artisan::command('updaterates', function () {
    $controller = new CurrencyRateController;
    $controller->store();
})->purpose('Updates the exchange rates');