<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DiretorMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->perfil === 'diretor') {
            return $next($request);
        }

        return response()->json(['message' => 'Acesso não autorizado (somente diretores de turma).'], 403);
    }
}
