<?php

use App\Http\Controllers\UtilizadorController;
use App\Http\Controllers\SalaController;
use Illuminate\Support\Facades\Route;


/*
--------------------------------------------------------------------------
 Rotas Públicas
Acesso livre — não requer autenticação
*/

// Rota para cadastro de utilizadores (aluno, professor, diretor)
Route::post('/cadastro', [UtilizadorController::class, 'store']);

// Rota para login — retorna um token JWT do Passport se sucesso
Route::post('/login', [UtilizadorController::class, 'login']);

Route::get('/convites/verificar/{token}', [ConviteController::class, 'verificar']);

/*
|--------------------------------------------------------------------------
| Rotas Protegidas
|--------------------------------------------------------------------------
| Essas rotas exigem um token de autenticação válido (Bearer token)
| Para acessar, é necessário enviar no cabeçalho:
*/

Route::middleware('auth:api')->group(function () {

    // Lista todos os utilizadores (apenas acessível com token válido)
    Route::get('/utilizadores', [UtilizadorController::class, 'index']);

    // Logout — revoga o token atual
    Route::post('/logout', [UtilizadorController::class, 'logout']);

    // Aqui poderias adicionar mais rotas protegidas:
    // Route::get('/perfil', [UtilizadorController::class, 'perfil']);
});

// Rota protegida para buscar o perfil do utilizador logado para alterar o Perfil
Route::middleware('auth:api')->get('/perfil', [UtilizadorController::class, 'perfil']);

// Rota para atualização do perfil
Route::middleware('auth:api')->put('/perfil/atualizar', [UtilizadorController::class, 'atualizarPerfil']);

// Apenas alunos podem se inscrever
Route::middleware(['auth:api', 'aluno'])->post('/turmas/{id}/inscrever', [SalaController::class, 'inscrever']);

// Apenas diretores podem ver todos os utilizadores
Route::middleware(['auth:api', 'diretor'])->get('/admin/utilizadores', [UtilizadorController::class, 'index']);

// Rotas protegidas para diretores
Route::middleware(['auth:api', 'diretor'])->group(function () {
    Route::post('/salas', [SalaController::class, 'store']);         // Criar sala
    Route::get('/salas', [SalaController::class, 'index']);          // Listar salas do diretor
    Route::post('/salas/{sala}/convidar', [SalaController::class, 'convidar']); // Convidar membro
    Route::put('/salas/{id}', [SalaController::class, 'update']); // Atualizar sala
    Route::post('/salas/{salaId}/adicionar-professor', [SalaController::class, 'associarProfessor']); // add professor
    Route::delete('/salas/{salaId}/remover-professor/{professorId}', [SalaController::class, 'removerProfessor']); // remover prof

});

// if convite for mandado para um aluno que não está cadastrado então essa rota é  usada no front para verificar se o convite é valido no momento do cadastro
Route::middleware(['auth:api', 'diretor'])->group(function () {
    Route::post('/convites', [ConviteController::class, 'convidar']); 
});

/*
* rota para aceitar convite
 * também serve para mostrar ao utilizador para que sala ele foi convidado,com que perfil e o nome do diretor da sala
 *  */
Route::middleware(['auth:api'])->post('/convites/aceitar/{token}', [ConviteController::class, 'aceitar']);

// rotas para materiais
Route::middleware('auth:api','professor')->group(function () {
    Route::post('/materiais', [MaterialController::class, 'store']); // Upload
    Route::get('/salas/{id}/materiais', [MaterialController::class, 'listarPorSala']); // Listar materiais por sala
    Route::delete('/materiais/{id}', [MaterialController::class, 'destroy']); // Deletar
});
