<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// routes/api.php: endpoints para utilizador
//Route::get('/usuarios', [UsuarioController::class, 'index']);

Route::get('/teste', function () {
    return response()->json([
        'mensagem' => 'API Laravel conectada com sucesso!',
        'status' => 'ok',
    ]);
});
    

