<?php

namespace App\Http\Controllers;

use App\Models\Convite;
use App\Models\SalaAula;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class ConviteController extends Controller
{
    // Apenas diretores devem ter acesso a isso (middleware)
    public function convidar(Request $request)
    {
        $request->validate([
            'email_convidado' => 'required|email',
            'perfil_convidado' => 'required|in:aluno,professor',
            'sala_id' => 'required|exists:salas_aula,id',
        ]);

        $token = Str::uuid(); // Gera token único

        $convite = Convite::create([
            'email_convidado' => $request->email_convidado,
            'perfil_convidado' => $request->perfil_convidado,
            'sala_id' => $request->sala_id,
            'token' => $token,
        ]);

        // (Opcional) Enviar e-mail com o token
        // Mail::to($request->email_convidado)->send(new ConviteEmail($convite));

        return response()->json([
            'message' => 'Convite enviado com sucesso.',
            'token' => $token,
        ], 201);
    }

    // Verifica se o token é válido
    public function verificar($token)
    {
        $convite = Convite::where('token', $token)->where('usado', false)->first();

        if (!$convite) {
            return response()->json(['message' => 'Convite inválido ou já utilizado.'], 404);
        }

        return response()->json([
            'message' => 'Convite válido.',
            'convite' => $convite
        ]);
    }
}
