<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use App\Models\Convite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class SalaController extends Controller
{
    // Diretor cria uma nova sala
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

    // Diretor lista suas salas
    public function index()
    {
        $salas = Sala::where('diretor_id', Auth::id())->get();
        return response()->json($salas);
    }

    // Diretor envia convite para aluno/professor
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
}
