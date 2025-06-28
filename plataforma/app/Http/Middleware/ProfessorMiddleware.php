<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ProfessorMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->perfil === 'professor') {
            return $next($request);
        }

        return response()->json(['message' => 'Acesso não autorizado (somente Professores).'], 403);
    }
}
