<?php

use Illuminate\Support\Facades\Route;
use App\Models\Tender;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('app');

});

Route::get('api',function(){

    $tender=Tender::with(['submittedBy','refferedTo'])->get();
    $json_string = json_encode($tender, JSON_PRETTY_PRINT);
    echo "<h2>Tenders</h2>";
    echo "<pre>$json_string</pre>";
    echo "<br>";
    echo "<h2>Users</h2>";
    $users=User::with('userType')->get();
        $json_string = json_encode($users, JSON_PRETTY_PRINT);

    echo "<pre>$json_string</pre>";

});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

