import React, { useEffect, useState } from "react";
import axios from "axios";

const PainelAluno = () => {
  const [turma, setTurma] = useState(null);

  useEffect(() => {
    async function fetchTurma() {
      try {
        const response = await axios.get("/api/minha-turma"); // baseado no token do aluno logado
        setTurma(response.data);
      } catch (err) {
        console.error("Erro ao buscar turma", err);
      }
    }
    fetchTurma();
  }, []);

  if (!turma) return <p>Carregando sua turma...</p>;

  return (
    <div>
      <h1>Painel do Aluno</h1>
      <h2>Turma: {turma.nome}</h2>
      {/* Aqui viriam os cards de tarefas, materiais etc */}
    </div>
  );
};

export default PainelAluno;
