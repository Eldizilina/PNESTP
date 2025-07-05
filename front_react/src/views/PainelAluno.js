"use client"

import { useEffect, useState } from "react"

export default function PainelAluno() {
  const [usuarioLogado, setUsuarioLogado] = useState(null)
  const [notificacoes, setNotificacoes] = useState([])
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Aqui você faria a chamada para pegar o usuário logado e notificações
    async function buscarDados() {
      try {
        // const responseUsuario = await axios.get("/api/usuario-logado")
        // const responseNotificacoes = await axios.get("/api/notificacoes")
        // setUsuarioLogado(responseUsuario.data)
        // setNotificacoes(responseNotificacoes.data)

        // Por enquanto, simulando dados:
        setTimeout(() => {
          setUsuarioLogado({
            nome: "Miriam Santos",
            iniciais: "MS",
            turma: "Turma A",
            email: "miriam.santos@escola.com",
          })

          setNotificacoes([
            {
              id: "1",
              titulo: "Nova tarefa de Matemática",
              descricao: "Lista de Exercícios - Cap. 5 foi adicionada",
              tipo: "tarefa",
              lida: false,
              tempo: "5 min atrás",
              cor: "#EF4444",
            },
            {
              id: "2",
              titulo: "Material de História disponível",
              descricao: "Slides sobre Segunda Guerra Mundial",
              tipo: "material",
              lida: false,
              tempo: "1 hora atrás",
              cor: "#059669",
            },
            {
              id: "3",
              titulo: "Prazo se aproximando",
              descricao: "Redação sobre Meio Ambiente vence em 2 dias",
              tipo: "prazo",
              lida: true,
              tempo: "2 horas atrás",
              cor: "#F59E0B",
            },
            {
              id: "4",
              titulo: "Mensagem do Prof. João",
              descricao: "Aula de laboratório foi reagendada",
              tipo: "mensagem",
              lida: false,
              tempo: "1 dia atrás",
              cor: "#3B82F6",
            },
          ])

          setLoading(false)
        }, 500)
      } catch (err) {
        console.error("Erro ao buscar dados", err)
        setLoading(false)
      }
    }

    buscarDados()
  }, [])

  const materiais = [
    {
      id: "1",
      disciplina: "Matemática",
      titulo: "Equações do 2º Grau",
      tipo: "PDF",
      cor: "linear-gradient(135deg, #8B5CF6, #A855F7)",
      dataUpload: "Hoje",
    },
    {
      id: "2",
      disciplina: "História",
      titulo: "Segunda Guerra Mundial",
      tipo: "PDF",
      cor: "linear-gradient(135deg, #059669, #10B981)",
      dataUpload: "Ontem",
    },
    {
      id: "3",
      disciplina: "Química",
      titulo: "Tabela Periódica",
      tipo: "PDF",
      cor: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
      dataUpload: "2 dias atrás",
    },
  ]

  const tarefas = [
    {
      id: "1",
      disciplina: "Matemática",
      titulo: "Lista de Exercícios - Cap. 5",
      prazo: "Amanhã",
      status: "pendente",
      cor: "#EF4444",
    },
    {
      id: "2",
      disciplina: "Português",
      titulo: "Redação sobre Meio Ambiente",
      prazo: "3 dias",
      status: "pendente",
      cor: "#F59E0B",
    },
    {
      id: "3",
      disciplina: "História",
      titulo: "Pesquisa sobre São Tomé na era Colonial",
      prazo: "1 semana",
      status: "em_andamento",
      cor: "#10B981",
    },
    {
      id: "4",
      disciplina: "Física",
      titulo: "teoria de Isaac Newton",
      prazo: "Entregue",
      status: "concluida",
      cor: "#6B7280",
    },
  ]

  const professores = [
    {
      id: "1",
      nome: "Prof. Ana Silva",
      disciplina: "Matemática",
      email: "ana.silva@escola.com",
      cor: "#8B5CF6",
    },
    {
      id: "2",
      nome: "Prof. Carlos Santos",
      disciplina: "História",
      email: "carlos.santos@escola.com",
      cor: "#059669",
    },
    {
      id: "3",
      nome: "Prof. Maria Oliveira",
      disciplina: "Português",
      email: "maria.oliveira@escola.com",
      cor: "#DC2626",
    },
    {
      id: "4",
      nome: "Prof. João Costa",
      disciplina: "Química",
      email: "joao.costa@escola.com",
      cor: "#3B82F6",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "pendente":
        return "#EF4444"
      case "em_andamento":
        return "#F59E0B"
      case "concluida":
        return "#10B981"
      default:
        return "#6B7280"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "pendente":
        return "Pendente"
      case "em_andamento":
        return "Em andamento"
      case "concluida":
        return "Concluída"
      default:
        return "Indefinido"
    }
  }

  const marcarComoLida = (notificacaoId) => {
    setNotificacoes((prev) => prev.map((notif) => (notif.id === notificacaoId ? { ...notif, lida: true } : notif)))
  }

  const notificacaoNaoLidas = notificacoes.filter((n) => !n.lida).length

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #e5e7eb",
              borderTop: "4px solid #3B82F6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}
          ></div>
          <p style={{ color: "#6b7280" }}>Carregando perfil...</p>
        </div>
      </div>
    )
  }

  if (!usuarioLogado) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "#6b7280" }}>Erro ao carregar perfil do usuário</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "none", // Removido limite de largura
            margin: "0 auto",
            padding: "0 2rem", // Aumentado padding lateral
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "64px",
          }}
        >
          <h1
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              margin: 0,
            }}
          >
            Olá {usuarioLogado.nome.split(" ")[0]}, Bem-vindo(a) de Volta!
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Notificações */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setMostrarNotificacoes(!mostrarNotificacoes)}
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  padding: "0.5rem",
                  cursor: "pointer",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                🔔
                {notificacaoNaoLidas > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      backgroundColor: "#EF4444",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {notificacaoNaoLidas}
                  </div>
                )}
              </button>

              {/* Dropdown de Notificações */}
              {mostrarNotificacoes && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: "0",
                    marginTop: "0.5rem",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e5e7eb",
                    width: "350px",
                    maxHeight: "400px",
                    overflowY: "auto",
                    zIndex: 50,
                  }}
                >
                  <div
                    style={{
                      padding: "1rem",
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#111827",
                        margin: 0,
                      }}
                    >
                      Notificações
                    </h3>
                  </div>

                  <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {notificacoes.length === 0 ? (
                      <div
                        style={{
                          padding: "2rem",
                          textAlign: "center",
                          color: "#6b7280",
                        }}
                      >
                        Nenhuma notificação
                      </div>
                    ) : (
                      notificacoes.map((notificacao) => (
                        <div
                          key={notificacao.id}
                          onClick={() => marcarComoLida(notificacao.id)}
                          style={{
                            padding: "1rem",
                            borderBottom: "1px solid #f3f4f6",
                            cursor: "pointer",
                            backgroundColor: notificacao.lida ? "white" : "#f8fafc",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#f1f5f9"
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = notificacao.lida ? "white" : "#f8fafc"
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "0.75rem",
                            }}
                          >
                            <div
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: notificacao.lida ? "#d1d5db" : notificacao.cor,
                                marginTop: "0.5rem",
                                flexShrink: 0,
                              }}
                            ></div>
                            <div style={{ flex: 1 }}>
                              <h4
                                style={{
                                  fontSize: "0.875rem",
                                  fontWeight: notificacao.lida ? "normal" : "600",
                                  color: "#111827",
                                  margin: "0 0 0.25rem 0",
                                }}
                              >
                                {notificacao.titulo}
                              </h4>
                              <p
                                style={{
                                  fontSize: "0.75rem",
                                  color: "#6b7280",
                                  margin: "0 0 0.25rem 0",
                                  lineHeight: "1.4",
                                }}
                              >
                                {notificacao.descricao}
                              </p>
                              <p
                                style={{
                                  fontSize: "0.75rem",
                                  color: "#9ca3af",
                                  margin: 0,
                                }}
                              >
                                {notificacao.tempo}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {notificacoes.length > 0 && (
                    <div
                      style={{
                        padding: "0.75rem 1rem",
                        borderTop: "1px solid #e5e7eb",
                        textAlign: "center",
                      }}
                    >
                      <button
                        onClick={() => {
                          setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })))
                        }}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          color: "#3B82F6",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          fontWeight: "500",
                        }}
                      >
                        Marcar todas como lidas
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#4b5563",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                title: usuarioLogado.nome,
              }}
            >
              {usuarioLogado.iniciais}
            </div>
          </div>
        </div>
      </header>

      {/* Clique fora para fechar notificações */}
      {mostrarNotificacoes && (
        <div
          onClick={() => setMostrarNotificacoes(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
          }}
        ></div>
      )}

      <main
        style={{
          maxWidth: "none", // Removido limite de largura
          margin: "0 auto",
          padding: "2rem 2rem", // Aumentado padding lateral
        }}
      >
        {/* Materiais da Disciplina */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#111827",
              margin: "0 0 1.5rem 0",
            }}
          >
            Materiais da Disciplina
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", // Aumentado minWidth
              gap: "2rem", // Aumentado gap
            }}
          >
            {materiais.map((material) => (
              <div
                key={material.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div
                  style={{
                    background: material.cor,
                    color: "white",
                    padding: "1rem",
                    height: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "bold",
                        margin: 0,
                      }}
                    >
                      {material.disciplina}
                    </h3>
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    {material.tipo}
                  </div>
                </div>

                <div style={{ padding: "1rem" }}>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#111827",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    {material.titulo}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      margin: 0,
                    }}
                  >
                    Adicionado {material.dataUpload}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tarefas */}
        <section style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#111827",
              margin: "0 0 1.5rem 0",
            }}
          >
            Tarefas
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", // Aumentado minWidth
              gap: "1.5rem", // Aumentado gap
            }}
          >
            {tarefas.map((tarefa) => (
              <div
                key={tarefa.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "1rem",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderLeft: `4px solid ${getStatusColor(tarefa.status)}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "#111827",
                        margin: "0 0 0.25rem 0",
                      }}
                    >
                      {tarefa.titulo}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      {tarefa.disciplina}
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundColor: getStatusColor(tarefa.status),
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    {getStatusText(tarefa.status)}
                  </div>
                </div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: tarefa.status === "pendente" ? "#EF4444" : "#6b7280",
                    margin: 0,
                    fontWeight: tarefa.status === "pendente" ? "500" : "normal",
                  }}
                >
                  {tarefa.status === "concluida" ? "✓ " : "⏰ "}
                  {tarefa.prazo}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Professores da Turma */}
        <section>
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#111827",
              margin: "0 0 1.5rem 0",
            }}
          >
            Professores da {usuarioLogado.turma}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Mantido mas com melhor distribuição
              gap: "1.5rem", // Aumentado gap
            }}
          >
            {professores.map((professor) => (
              <div
                key={professor.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "1rem",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: professor.cor,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                  }}
                >
                  {professor.nome.split(" ")[1][0]}
                </div>
                <div style={{ flex: 1 }}>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#111827",
                      margin: "0 0 0.25rem 0",
                    }}
                  >
                    {professor.nome}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: professor.cor,
                      margin: "0 0 0.25rem 0",
                      fontWeight: "500",
                    }}
                  >
                    {professor.disciplina}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      margin: 0,
                    }}
                  >
                    {professor.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}