<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class MaterialController extends Controller
{
    // Upload de material
    public function store(Request $request)
    {
        $request->validate([
            'salas_aula_id' => 'required|exists:salas_aula,id',
            'titulo' => 'required|string|max:100',
            'descricao' => 'nullable|string',
            'type' => 'required|in:pdf,video,ppt,excel,link,text,image',
            'file' => 'nullable|file|mimes:pdf,mp4,ppt,pptx,xlsx,xls,jpeg,png,jpg',
            'external_link' => 'nullable|url'
        ]);

        $filePath = null;

        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('materiais', 'public');
        }

        $material = Material::create([
            'salas_aula_id' => $request->salas_aula_id,
            'titulo' => $request->titulo,
            'descricao' => $request->descricao,
            'type' => $request->type,
            'file_url' => $filePath,
            'external_link' => $request->external_link
        ]);

        return response()->json(['message' => 'Material enviado com sucesso!', 'material' => $material], 201);
    }

    // Listar materiais de uma sala
    public function listarPorSala($sala_id)
    {
        $materiais = Material::where('salas_aula_id', $sala_id)->get();
        return response()->json($materiais);
    }

    // Deletar material
    public function destroy($id)
    {
        $material = Material::findOrFail($id);

        if ($material->file_url) {
            Storage::disk('public')->delete($material->file_url);
        }

        $material->delete();
        return response()->json(['message' => 'Material excluído com sucesso!']);
    }
}
