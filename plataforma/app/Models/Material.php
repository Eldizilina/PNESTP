<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $table = 'materiais';

    protected $fillable = [
        'salas_aula_id',
        'titulo',
        'descricao',
        'type',
        'file_url',
        'external_link',
    ];

    public $timestamps = false;

    public function sala()
    {
        return $this->belongsTo(SalaAula::class, 'salas_aula_id');
    }
}
