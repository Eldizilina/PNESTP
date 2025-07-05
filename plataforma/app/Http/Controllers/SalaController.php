<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use App\Models\Convite;
use App\Models\Utilizador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class SalaController extends Controller
{
    // Diretor cria uma nova sala, ela é associada ao diretor autenticado,valida o nome e a descrição
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
        ]);

        $sala = new Sala();
        $sala->nome = $request->nome;
        $sala->descricao = $request->descricao;
        $sala->diretor_id = Auth::id(); // ID do diretor autenticado
        $sala->save();

        return response()->json(['message' => 'Sala criada com sucesso!', 'sala' => $sala]);
    }

    // Diretor lista as salas criadas por ele
    public function index()
    {
        $salas = Sala::where('diretor_id', Auth::id())->get();
        return response()->json($salas);
    }

    // Diretor edita uma sala existente
public function update(Request $request, $id)
{
    $sala = Sala::findOrFail($id);

    // Verifica se o diretor é dono da sala
    if ($sala->diretor_id !== Auth::id()) {
        return response()->json(['message' => 'Acesso não autorizado.'], 403);
    }

    $request->validate([
        'nome' => 'required|string|max:255',
        'descricao' => 'nullable|string',
    ]);

    $sala->nome = $request->nome;
    $sala->descricao = $request->descricao;
    $sala->save();

    return response()->json(['message' => 'Sala atualizada com sucesso.', 'sala' => $sala]);
}

// Adicionar Alunos 
public function adicionarAluno($salaId, Request $request)
{
    $request->validate([
        'aluno_id' => 'required|exists:utilizadores,id'
    ]);

    $sala = Sala::findOrFail($salaId);
    if ($sala->diretor_id !== Auth::id()) {
        return response()->json(['message' => 'Acesso não autorizado.'], 403);
    }

    DB::table('estudantes_sala')->updateOrInsert([
        'salas_aula_id' => $sala->id,
        'aluno_id' => $request->aluno_id
    ]);

    return response()->json(['message' => 'Aluno adicionado com sucesso.']);
}

// Remover Alunos
public function removerAluno($salaId, $alunoId)
{
    $sala = Sala::findOrFail($salaId);
    if ($sala->diretor_id !== Auth::id()) {
        return response()->json(['message' => 'Acesso não autorizado.'], 403);
    }

    DB::table('estudantes_sala')
        ->where('salas_aula_id', $salaId)
        ->where('aluno_id', $alunoId)
        ->delete();

    return response()->json(['message' => 'Aluno removido com sucesso.']);
}


    // Diretor envia convite para aluno/professor
    // valida o email e o perfil do convidado,busca a sala pelo id
    public function convidar(Request $request, $salaId)
    {
        $request->validate([
            'email' => 'required|email',
            'perfil' => 'required|in:aluno,professor',
        ]);

        $sala = Sala::findOrFail($salaId);

        // Gera token único para o convite
        $token = Str::random(40);

        $convite = new Convite();
        $convite->email_convidado = $request->email;
        $convite->sala_id = $sala->id;
        $convite->perfil_convidado = $request->perfil;
        $convite->token = $token;
        $convite->usado = false;
        $convite->save();

        // Aqui você pode enviar email real (exemplo simulado)
        // Mail::to($request->email)->send(new ConviteSalaMail($convite));

        return response()->json(['message' => 'Convite enviado com sucesso!', 'token' => $token]);
    }

/**
 * Verifica se o email pertence a um utilizador já registrado
 * if sim, verifica se ele pertence a sala, else, adiciona a sala sem precisar de token ou convite por email
 */

public function convidarUtilizadorExistente(Request $request, $salaId)
{
    $request->validate([
        'email' => 'required|email',
        'perfil' => 'required|in:aluno,professor',
    ]);

    $sala = Sala::findOrFail($salaId);
    $utilizador = Utilizador::where('email', $request->email)->first();

    if (!$utilizador) {
        return response()->json(['message' => 'Utilizador não encontrado.'], 404);
    }

    // Verifica se já está associado à sala
    $jaAssociado = DB::table('sala_utilizador')
        ->where('sala_id', $sala->id)
        ->where('utilizador_id', $utilizador->id)
        ->exists();

    if ($jaAssociado) {
        return response()->json(['message' => 'Utilizador já faz parte desta sala.'], 409);
    }

    // Insere associação na tabela pivô
    DB::table('sala_utilizador')->insert([
        'sala_id' => $sala->id,
        'utilizador_id' => $utilizador->id,
        'perfil' => $request->perfil,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    return response()->json(['message' => 'Utilizador associado à sala com sucesso.']);
}

    // Utilizador autenticado aceita convite existente
    public function aceitar($token)
    {
        $convite = Convite::where('token', $token)
            ->where('usado', false)
            ->first();

        if (!$convite) {
            return response()->json(['message' => 'Convite inválido ou já utilizado.'], 404);
        }

        $utilizador = Auth::user();

        // Verifica se o e-mail do convite corresponde ao utilizador logado
        if ($utilizador->email !== $convite->email_convidado) {
            return response()->json(['message' => 'Este convite não pertence ao seu email.'], 403);
        }

        // Adiciona o utilizador à sala
        if ($convite->perfil_convidado === 'aluno') {
            DB::table('estudantes_sala')->insert([
                'salas_aula_id' => $convite->sala_id,
                'aluno_id' => $utilizador->id
            ]);
            
        }elseif ($convite->perfil_convidado === 'professor') {
            // Suporte a múltiplos professores na mesma sala
        DB::table('professores_sala')->insertOrIgnore([
        'salas_aula_id' => $convite->sala_id,
        'professor_id' => $utilizador->id
    ]);
}
        $convite->usado = true;
        $convite->save();

        return response()->json(['message' => 'Convite aceito com sucesso. Você foi adicionado à sala.']);
    }
}






