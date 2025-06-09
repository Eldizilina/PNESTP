// PainelProfessor.jsx
import React from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";

import { Plus, Upload, FileText, Mail, Users, BookOpen, ClipboardList } from 'lucide-react';
import '../views/style.css';

const PainelProfessor = () => {
  return (
    <div className="p-6 space-y-6 min-h-screen painel-professor-bg">
      <h1 className="text-2xl font-bold text-gray-800">Painel do Professor</h1>

      {/* Ações rápidas */}
      <div className="flex flex-wrap gap-3">
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white transition-colors">
          <Plus className="h-4 w-4" />
          Nova Turma
        </Button>
        <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
          <Upload className="h-4 w-4" />
          Adicionar Material
        </Button>
        <Button className="gap-2 bg-amber-500 hover:bg-amber-600 text-white transition-colors">
          <FileText className="h-4 w-4" />
          Nova Tarefa
        </Button>
        <Button className="gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 transition-colors">
          <Mail className="h-4 w-4" />
          Mensagens
        </Button>
      </div>

      {/* Resumo estatístico */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow border border-gray-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-full">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de Turmas</p>
              <p className="text-2xl font-semibold">5</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow border border-gray-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-full">
              <BookOpen className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Disciplinas</p>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow border border-gray-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-full">
              <ClipboardList className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Alunos Matriculados</p>
              <p className="text-2xl font-semibold">120</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Abas principais */}
      <Tabs defaultValue="turmas" className="w-full mt-6">
        <TabsList className="grid grid-cols-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="turmas" className="flex gap-2 items-center justify-center py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <BookOpen className="h-4 w-4" />
            <span>Turmas</span>
          </TabsTrigger>
          <TabsTrigger value="tarefas" className="flex gap-2 items-center justify-center py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <FileText className="h-4 w-4" />
            <span>Tarefas</span>
          </TabsTrigger>
          <TabsTrigger value="avaliacoes" className="flex gap-2 items-center justify-center py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <ClipboardList className="h-4 w-4" />
            <span>Avaliações</span>
          </TabsTrigger>
          <TabsTrigger value="mensagens" className="flex gap-2 items-center justify-center py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Mail className="h-4 w-4" />
            <span>Mensagens</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="turmas" className="mt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Suas Turmas</h2>
              <Button variant="outline" size="sm" className="border-indigo-500 text-indigo-600 hover:bg-indigo-50">
                <Plus className="h-4 w-4 mr-2" />
                Gerar Código
              </Button>
            </div>
            <div className="border rounded-lg p-4 text-center text-gray-500 bg-white">
              Lista de turmas será exibida aqui
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tarefas" className="mt-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Tarefas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-full">
                      <FileText className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tarefas Pendentes</h3>
                      <p className="text-sm text-gray-500">5 para corrigir</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-full">
                      <Upload className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tarefas Criadas</h3>
                      <p className="text-sm text-gray-500">12 no total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="avaliacoes" className="mt-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Avaliações</h2>
            <div className="border rounded-lg p-4 text-center text-gray-500 bg-white">
              Gráficos de desempenho serão exibidos aqui
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mensagens" className="mt-4">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Mensagens</h2>
            <div className="border rounded-lg p-4 text-center text-gray-500 bg-white">
              Suas conversas com alunos aparecerão aqui
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PainelProfessor;
