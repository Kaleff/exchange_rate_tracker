<?php

namespace App\Http\Controllers;

use App\Models\CurrencyRate;
use Illuminate\Http\Request;

class CurrencyRateController extends Controller
{
    /**
     * Route GET api/rates
     */
    public function index()
    {
        // Get all rates except base currency (EUR)
        $rates = CurrencyRate::all();
        // Return 404 if there are no rates
        if (!count($rates)) {
            return response()->json([
                'errors' => ['No rates were found, please try again later.'],
                'success' => false
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $rates
        ]);
    }
    /**
     * Route POST api/rates
     */
    public function store()
    {
        // Get the API data via CURL
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.apilayer.com/fixer/latest?symbols=USD%2C%20AUD%2C%20GBP&base=EUR",
            CURLOPT_HTTPHEADER => array(
                "Content-Type: text/plain",
                "apikey: sFPGZuddQknkkLST8Cq2qbV7ydxMVTSb"
            ),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET"
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        $jsonResponse = json_decode($response ,true);
        // Check if base currency is Euro and request was successful
        if ($jsonResponse['base'] != "EUR" || !$jsonResponse['success'] || count($jsonResponse['rates']) == 0) {
            return response()->json([
                'success' => false,
                'errors' => ['Invalid request'],
            ], 406);
        }
        // Store new Rates
        foreach($jsonResponse['rates'] as $currency => $rate) {
            CurrencyRate::create([
                'currency' => $currency,
                'exchange_rate' => $rate
            ]);
        }
        // Display the message in the terminal about the successful update
        echo 'The exchange rates were updated successfully';
        return 'The exchange rates were updated successfully';
    }
    /**
     * Route GET api/rates/{currency}
     */
    public function show(String $currency) {
        if(!in_array($currency, config('currency.all_currencies'))) {
            return response()->json([
                'success' => false,
                'errors' => ['Requested currency was not found'],
            ]);
        }
        $history = CurrencyRate::where('currency', $currency)->get();
        // Return 404 if currency history is not found
        if(!count($history)) {
            return response()->json([
                'errors' => ['Currency rate history was not found'],
                'success' => false
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $history
        ]);
    }
}
