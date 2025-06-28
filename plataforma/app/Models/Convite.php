<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Convite extends Model
{
    protected $fillable = [
        'email_convidado',
        'perfil_convidado',
        'sala_id',
        'token',
        'usado',
    ];

    // Uma relação com a sala de aula
    public function sala()
    {
        return $this->belongsTo(SalaAula::class, 'sala_id');
    }
}
