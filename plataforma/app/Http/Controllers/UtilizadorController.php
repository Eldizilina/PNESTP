<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Utilizador;

class UtilizadorController extends Controller
{
    /**
     * Retorna todos os utilizadores cadastrados (requer autenticação).
     */
    public function index()
    {
        return Utilizador::all(); // Retorna como JSON
    }

    /**
     * Registra um novo utilizador (aluno, professor ou diretor).
     */
    public function store(Request $request)
    {
        // Validação dos dados
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:utilizadores,email',
            'password' => 'required|string|min:6',
            'perfil' => 'required|in:aluno,professor,diretor',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Criação do utilizador
        $utilizador = new Utilizador();
        $utilizador->nome = $request->nome;
        $utilizador->email = $request->email;
        $utilizador->password = Hash::make($request->password); // Encriptação da senha
        $utilizador->perfil = $request->perfil;
        $utilizador->save();

        return response()->json(['message' => 'Utilizador cadastrado com sucesso!'], 201);
    }

    /**
     * Faz login do utilizador e gera um token de acesso com Passport.
     */
    public function login(Request $request)
    {
        $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

        // Verifica se as credenciais são válidas

      $utilizador = Utilizador::where('email', $request->email)->first();

    if (!$utilizador || !Hash::check($request->password, $utilizador->password)) {
        return response()->json(['message' => 'Credenciais inválidas'], 401);
    }

        // Gera token com Passport
    $token = $utilizador->createToken('Token_Pessoal')->accessToken;

    return response()->json([
        'message' => 'Login efetuado com sucesso!',
        'token' => $token,
        'utilizador' => $utilizador,
    ]);
}

    public function logout(Request $request)
{
    // Revoga o token de acesso atual do utilizador
    $request->user()->token()->revoke();

    return response()->json(['message' => 'Logout efetuado com sucesso.']);
}

}
