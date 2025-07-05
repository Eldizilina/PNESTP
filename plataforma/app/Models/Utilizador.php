<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable; // necessário para login
use Laravel\Passport\HasApiTokens; // necessário para gerar token
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Utilizador extends Authenticatable 
{
    use HasApiTokens, Notifiable, HasFactory;

    // Laravel assume o nome da tabela como 'utilizadors', então especificamos corretamente:
    protected $table = 'utilizadores';

    // Como a tabela tem as colunas created_at e updated_at, deixei como true
    public $timestamps = true;

    // Campos que podem ser preenchidos em massa
    protected $fillable = [
         'nome',
        'email',
        'password',
        'perfil',
        'first_name',
        'last_name',
        'endereco',
        'cidade',
        'pais',
        'sobre_mim',
        'foto_perfil',
    ];

    // Oculta a senha nas respostas JSON
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Informa ao Laravel qual campo é usado para autenticação
    public function getAuthPassword()
    {
        return $this->password;
    }

public function salasComoProfessor()
{
    return $this->belongsToMany(Sala::class, 'professores_sala', 'professor_id', 'salas_aula_id');
}




}
