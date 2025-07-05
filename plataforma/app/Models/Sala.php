<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sala extends Model
{
    protected $table = 'salas_aula'; // se o nome da tabela não for o plural padrão

    protected $fillable = [
        'name', 'codigo', 'descricao', 'professor_id'
    ];

    // Relacionamento com alunos
    public function alunos()
    {
        return $this->belongsToMany(Utilizador::class, 'estudantes_sala', 'salas_aula_id', 'aluno_id');
    }

    // Relacionamento com professores (se tiveres a tabela `professores_sala`)
    public function professores()
    {
        return $this->belongsToMany(Utilizador::class, 'professores_sala', 'salas_aula_id', 'professor_id');
    }

    // Diretor criador da sala (se quiseres manter o campo `diretor_id`)
    public function diretor()
    {
        return $this->belongsTo(Utilizador::class, 'diretor_id');
    }
}
