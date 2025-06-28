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

// metodo para apresentar o perfil
public function showProfile(Request $request)
{
    $user = auth()->user();

    return response()->json([
        'nome' => $user->nome,
        'email' => $user->email,
        'primeiro_nome' => $user->primeiro_nome,
        'ultimo_nome' => $user->ultimo_nome,
        'endereco' => $user->endereco,
        'cidade' => $user->cidade,
        'pais' => $user->pais,
        'sobre_mim' => $user->sobre_mim,
        'userType' => $user->perfil,
        'foto_perfil' => $user->foto_perfil,
    ]);
}

// Metodo para atualização do perfil
public function atualizarPerfil(Request $request)
{
    $user = auth()->user();

    $request->validate([
        'nome' => 'sometimes|string|max:255',
        'email' => 'sometimes|email|unique:utilizadores,email,' . $user->id,
        'password' => 'sometimes|string|min:6|confirmed',
        'primeiro_nome' => 'nullable|string|max:100',
        'ultimo_nome' => 'nullable|string|max:100',
        'endereco' => 'nullable|string|max:255',
        'cidade' => 'nullable|string|max:100',
        'pais' => 'nullable|string|max:100',
        'sobre_mim' => 'nullable|string',
        'foto_perfil' => 'nullable|string', // Base64 ou URL
    ]);

     if ($request->has('nome')) $user->nome = $request->nome;
    if ($request->has('email')) $user->email = $request->email;
    if ($request->has('password')) $user->password = Hash::make($request->password);
    if ($request->has('firstName')) $user->primeiro_nome = $request->primeiro_nome;
    if ($request->has('lastName')) $user->ultimo_nome = $request->ultimo_nome;
    if ($request->has('endereco')) $user->endereco = $request->endereco;
    if ($request->has('cidade')) $user->cidade = $request->cidade;
    if ($request->has('pais')) $user->pais = $request->pais;
    if ($request->has('sobre_mim')) $user->sobre_mim = $request->sobre_mim;
    if ($request->has('foto_perfil')) $user->foto_perfil = $request->foto_perfil;

    $user->save();

    return response()->json(['message' => 'Perfil atualizado com sucesso.', 'utilizador' => $user]);
}


public function perfil(Request $request)
{
    return response()->json([
        'utilizador' => $request->user(),
    ]);
}









}
