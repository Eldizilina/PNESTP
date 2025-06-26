<?php

use App\Http\Controllers\UtilizadorController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Rotas Públicas
|--------------------------------------------------------------------------
| Acesso livre — não requer autenticação
*/

// Rota para cadastro de utilizadores (aluno, professor, diretor)
Route::post('/cadastro', [UtilizadorController::class, 'store']);

// Rota para login — retorna um token JWT do Passport se sucesso
Route::post('/login', [UtilizadorController::class, 'login']);



/*
|--------------------------------------------------------------------------
| Rotas Protegidas
|--------------------------------------------------------------------------
| Essas rotas exigem um token de autenticação válido (Bearer token)
| Para acessar, é necessário enviar no cabeçalho:
| Authorization: Bearer SEU_TOKEN
*/

Route::middleware('auth:api')->group(function () {

    // Lista todos os utilizadores (apenas acessível com token válido)
    Route::get('/utilizadores', [UtilizadorController::class, 'index']);

    // Logout — revoga o token atual
    Route::post('/logout', [UtilizadorController::class, 'logout']);

    // Aqui poderias adicionar mais rotas protegidas:
    // Route::get('/perfil', [UtilizadorController::class, 'perfil']);
});


