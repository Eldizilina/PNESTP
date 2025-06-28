<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AlunoMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->perfil === 'aluno') {
            return $next($request);
        }

        return response()->json(['message' => 'Acesso não autorizado (somente alunos).'], 403);
    }
}
