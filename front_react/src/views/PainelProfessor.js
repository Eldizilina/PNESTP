"use client"

import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { Plus, Upload, FileText, Mail, Users, BookOpen, ClipboardList, TrendingUp, Bell } from "lucide-react"
import "./PainelProfessor.css"
import { useState } from "react"
import "./PainelProfessor.css"

const PainelProfessor = () => {
  // Estado das notificações
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Tarefa Corrigida",
      message: "Você corrigiu 5 tarefas da Turma A",
      time: "2 min atrás",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Prazo Próximo",
      message: "Entrega da avaliação do 2º período em 2 dias",
      time: "1 hora atrás",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "Nova Mensagem",
      message: "Pai do aluno João enviou uma mensagem",
      time: "3 horas atrás",
      read: true,
    },
  ])

  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Maria Silva",
      role: "Responsável",
      student: "João Silva",
      lastMessage: "Gostaria de saber sobre o desempenho do João na última prova",
      time: "10:30",
      unread: true,
      avatar: "MS",
    },
    {
      id: 2,
      sender: "Ana Costa",
      role: "Responsável",
      student: "Pedro Costa",
      lastMessage: "Pedro está com dificuldades em matemática, podemos conversar?",
      time: "09:15",
      unread: true,
      avatar: "AC",
    },
    {
      id: 3,
      sender: "Carlos Oliveira",
      role: "Responsável",
      student: "Lucas Oliveira",
      lastMessage: "Obrigado pela atenção com o Lucas",
      time: "Ontem",
      unread: false,
      avatar: "CO",
    },
  ])

  const [conversationMessages, setConversationMessages] = useState({
    1: [
      {
        id: 1,
        sender: "Maria Silva",
        message: "Boa tarde, professora! Gostaria de saber sobre o desempenho do João na última prova de matemática.",
        time: "10:25",
        isTeacher: false,
      },
      {
        id: 2,
        sender: "Você",
        message:
          "Boa tarde, Maria! O João teve um bom desempenho, tirou 8,5. Ele demonstrou boa compreensão dos conceitos.",
        time: "10:30",
        isTeacher: true,
      },
    ],
    2: [
      {
        id: 1,
        sender: "Ana Costa",
        message: "Olá! Tenho notado que o Pedro está com dificuldades em matemática. Podemos conversar sobre isso?",
        time: "09:10",
        isTeacher: false,
      },
      {
        id: 2,
        sender: "Você",
        message: "Olá, Ana! Sim, também percebi isso. Que tal marcarmos uma reunião para conversarmos melhor?",
        time: "09:15",
        isTeacher: true,
      },
    ],
  })

  // Funções para gerenciar notificações
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return "✅"
      case "warning":
        return "⚠️"
      case "error":
        return "❌"
      case "info":
      default:
        return "ℹ️"
    }
  }
  return (
    <div className="painel-container">
      <div className="painel-content">
        {/* Header */}
        <div className="header-section">
          <div className="header-title">
            <h1 className="main-title">Painel do Professor</h1>
            <p className="subtitle">Gerencie suas turmas e atividades</p>
          </div>
          <div className="header-actions">
            <div className="notification-container">
              <button className="notification-btn" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                <Bell className="icon-sm" />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </button>

              {/* Dropdown de Notificações */}
              {isNotificationOpen && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3>Notificações</h3>
                    <div className="notification-actions">
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} title="Marcar todas como lidas">
                          ✓
                        </button>
                      )}
                      <button onClick={() => setIsNotificationOpen(false)}>×</button>
                    </div>
                  </div>

                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <div className="empty-notifications">
                        <p>Nenhuma notificação</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`notification-item ${notification.read ? "read" : "unread"}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="notification-content">
                            <span className="notification-icon">{getNotificationIcon(notification.type)}</span>
                            <div className="notification-details">
                              <h4>{notification.title}</h4>
                              <p>{notification.message}</p>
                              <span className="notification-time">{notification.time}</span>
                            </div>
                            <button
                              className="remove-btn"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeNotification(notification.id)
                              }}
                            >
                              ×
                            </button>
                          </div>
                          {!notification.read && <div className="unread-dot"></div>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ações rápidas */}
        <div className="quick-actions">
          <Button className="action-btn action-btn-purple">
            <Plus className="icon-md" />
            <span className="btn-text">Nova Turma</span>
          </Button>
          <Button className="action-btn action-btn-green">
            <Upload className="icon-md" />
            <span className="btn-text">Material</span>
          </Button>
          <Button className="action-btn action-btn-orange">
            <FileText className="icon-md" />
            <span className="btn-text">Nova Tarefa</span>
          </Button>
          <Button className="action-btn action-btn-gray" onClick={() => setIsMessageModalOpen(true)}>
            <Mail className="icon-md" />
            <span className="btn-text">Mensagens</span>
          </Button>
        </div>

        {/* Cards de estatísticas */}
        <div className="stats-grid">
          <Card className="stat-card stat-card-purple">
            <div className="stat-overlay"></div>
            <CardContent className="stat-content">
              <div className="stat-info">
                <div className="stat-details">
                  <p className="stat-label">Total de Turmas</p>
                  <p className="stat-number">5</p>
                  <div className="stat-trend">
                    <TrendingUp className="icon-sm" />
                    <span>+2 este mês</span>
                  </div>
                </div>
                <div className="stat-icon-container">
                  <Users className="stat-icon" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card stat-card-green">
            <div className="stat-overlay"></div>
            <CardContent className="stat-content">
              <div className="stat-info">
                <div className="stat-details">
                  <p className="stat-label">Disciplinas</p>
                  <p className="stat-number">8</p>
                  <div className="stat-trend">
                    <BookOpen className="icon-sm" />
                    <span>Ativas</span>
                  </div>
                </div>
                <div className="stat-icon-container">
                  <BookOpen className="stat-icon" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card stat-card-orange">
            <div className="stat-overlay"></div>
            <CardContent className="stat-content">
              <div className="stat-info">
                <div className="stat-details">
                  <p className="stat-label">Alunos Matriculados</p>
                  <p className="stat-number">120</p>
                  <div className="stat-trend">
                    <TrendingUp className="icon-sm" />
                    <span>+15 este mês</span>
                  </div>
                </div>
                <div className="stat-icon-container">
                  <ClipboardList className="stat-icon" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Abas principais */}
        <Card className="main-tabs-card">
          <CardContent className="tabs-content">
            <Tabs defaultValue="turmas" className="tabs-container">
              <TabsList className="tabs-list">
                <TabsTrigger value="turmas" className="tab-trigger tab-trigger-purple">
                  <BookOpen className="icon-sm" />
                  <span className="tab-text">Turmas</span>
                </TabsTrigger>
                <TabsTrigger value="tarefas" className="tab-trigger tab-trigger-green">
                  <FileText className="icon-sm" />
                  <span className="tab-text">Tarefas</span>
                </TabsTrigger>
                <TabsTrigger value="avaliacoes" className="tab-trigger tab-trigger-orange">
                  <ClipboardList className="icon-sm" />
                  <span className="tab-text">Avaliações</span>
                </TabsTrigger>
                <TabsTrigger value="mensagens" className="tab-trigger tab-trigger-gray">
                  <Mail className="icon-sm" />
                  <span className="tab-text">Mensagens</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="turmas" className="tab-content">
                <div className="section-content">
                  <div className="section-header">
                    <div className="section-title">
                      <h2 className="section-heading">Suas Turmas</h2>
                      <p className="section-description">Gerencie e monitore suas turmas ativas</p>
                    </div>
                    <Button className="generate-code-btn">
                      <Plus className="icon-sm" />
                      Gerar Código
                    </Button>
                  </div>
                  <div className="turmas-grid">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="turma-card">
                        <CardContent className="turma-content">
                          <div className="turma-header">
                            <span className="subject-badge">Matemática</span>
                            <span className="turma-number">Turma {i}</span>
                          </div>
                          <h3 className="turma-title">9º Ano - Turma {i}</h3>
                          <div className="turma-stats">
                            <div className="turma-stat">
                              <Users className="icon-sm" />
                              <span>25 alunos</span>
                            </div>
                            <div className="turma-stat">
                              <FileText className="icon-sm" />
                              <span>8 tarefas</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tarefas" className="tab-content">
                <div className="section-content">
                  <div className="section-title">
                    <h2 className="section-heading">Tarefas</h2>
                    <p className="section-description">Acompanhe o progresso das atividades</p>
                  </div>
                  <div className="tarefas-grid">
                    <Card className="tarefa-card tarefa-card-orange">
                      <CardContent className="tarefa-content">
                        <div className="tarefa-info">
                          <div className="tarefa-icon-container">
                            <FileText className="tarefa-icon" />
                          </div>
                          <div className="tarefa-details">
                            <h3 className="tarefa-title">Tarefas Pendentes</h3>
                            <p className="tarefa-number">5</p>
                            <p className="tarefa-description">Para corrigir</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="tarefa-card tarefa-card-green">
                      <CardContent className="tarefa-content">
                        <div className="tarefa-info">
                          <div className="tarefa-icon-container">
                            <Upload className="tarefa-icon" />
                          </div>
                          <div className="tarefa-details">
                            <h3 className="tarefa-title">Tarefas Criadas</h3>
                            <p className="tarefa-number">12</p>
                            <p className="tarefa-description">No total</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="avaliacoes" className="tab-content">
                <div className="section-content">
                  <div className="section-title">
                    <h2 className="section-heading">Avaliações</h2>
                    <p className="section-description">Análise de desempenho dos alunos</p>
                  </div>
                  <Card className="empty-state-card">
                    <CardContent className="empty-state-content">
                      <div className="empty-state">
                        <TrendingUp className="empty-state-icon" />
                        <h3 className="empty-state-title">Gráficos de Desempenho</h3>
                        <p className="empty-state-description">Os relatórios de avaliação serão exibidos aqui</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="mensagens" className="tab-content">
                <div className="section-content">
                  <div className="section-title">
                    <h2 className="section-heading">Mensagens</h2>
                    <p className="section-description">Comunicação com alunos e responsáveis</p>
                  </div>
                  <Card className="empty-state-card">
                    <CardContent className="empty-state-content">
                      <div className="empty-state">
                        <Mail className="empty-state-icon" />
                        <h3 className="empty-state-title">Central de Mensagens</h3>
                        <p className="empty-state-description">Suas conversas com alunos aparecerão aqui</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      {/* Modal de Mensagens */}
      {isMessageModalOpen && (
        <div className="modal-overlay" onClick={() => setIsMessageModalOpen(false)}>
          <div className="modal-content messages-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Central de Mensagens</h2>
              <button className="modal-close" onClick={() => setIsMessageModalOpen(false)}>
                ×
              </button>
            </div>

            <div className="messages-container">
              {!selectedConversation ? (
                <div className="conversations-list">
                  <div className="conversations-header">
                    <h3>Conversas</h3>
                    <span className="unread-count">{messages.filter((m) => m.unread).length} não lidas</span>
                  </div>

                  <div className="conversations">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`conversation-item ${message.unread ? "unread" : ""}`}
                        onClick={() => setSelectedConversation(message)}
                      >
                        <div className="conversation-avatar">{message.avatar}</div>
                        <div className="conversation-details">
                          <div className="conversation-header">
                            <span className="sender-name">{message.sender}</span>
                            <span className="message-time">{message.time}</span>
                          </div>
                          <div className="student-info">
                            {message.role} - {message.student}
                          </div>
                          <div className="last-message">{message.lastMessage}</div>
                        </div>
                        {message.unread && <div className="unread-indicator"></div>}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="conversation-view">
                  <div className="conversation-header">
                    <button className="back-button" onClick={() => setSelectedConversation(null)}>
                      ← Voltar
                    </button>
                    <div className="conversation-info">
                      <h3>{selectedConversation.sender}</h3>
                      <span>
                        {selectedConversation.role} - {selectedConversation.student}
                      </span>
                    </div>
                  </div>

                  <div className="messages-list">
                    {conversationMessages[selectedConversation.id]?.map((msg) => (
                      <div key={msg.id} className={`message-item ${msg.isTeacher ? "teacher" : "parent"}`}>
                        <div className="message-content">
                          <div className="message-text">{msg.message}</div>
                          <div className="message-time">{msg.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="message-input-container">
                    <input type="text" placeholder="Digite sua mensagem..." className="message-input" />
                    <button className="send-button">Enviar</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PainelProfessor
