<?php

use App\Http\Controllers\CurrencyRateController;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->everyTenSeconds();
*/

Artisan::command('updaterates', function () {
    $controller = new CurrencyRateController;
    $controller->store();
})->purpose('Updates the exchange rates')->dailyAt('8:00');
// })->purpose('Updates the exchange rates')->everyFifteenSeconds();
// Comment the previous line and uncomment the last for the sake of testing (to populate DB with data within a minute-two instead of days)