import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";
import UserHeader from "../../components/Headers/UserHeader";
import {
  Edit,
  Save,
  Lock,
  Book,
  Users,
  Mail,
  X,
  User,
} from "react-feather";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Busca dados do usuário logado ao montar
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // ajuste conforme seu storage de token
        const response = await axios.get('http://localhost:8000/api/perfil', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data.utilizador);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        alert("Erro ao carregar perfil");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  // Enquanto carrega dados, mostra loading
  if (loading) return <div>Carregando perfil...</div>;

  if (!formData)
    return (
      <div>
        Erro ao carregar perfil. Tente novamente mais tarde.
      </div>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          foto_perfil: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:8000/api/perfil/atualizar", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Perfil atualizado com sucesso!");
      setEditMode(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar perfil");
    }
  };

  const handleCancel = () => {
    // Recarrega dados do backend para resetar o form
    setLoading(true);
    axios
      .get("/api/perfil", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setFormData(response.data.utilizador);
        setEditMode(false);
      })
      .catch(() => {
        alert("Erro ao recarregar perfil");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <UserHeader />
      <Container style={{ marginTop: "-280px" }} fluid>
        <Row>
          <Col className="order-xl-1" xl="10" lg="12" md="12" sm="12">
            <Card className="bg-secondary shadow" style={{ marginTop: "-280px" }}>
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Minha Conta</h3>
                    <Badge
                      color={formData.userType === "professor" ? "info" : "success"}
                      className="mt-2"
                    >
                      {formData.userType === "professor" ? "Professor" : "Aluno"}
                    </Badge>
                  </Col>
                  <Col className="text-right" xs="4">
                    {editMode ? (
                      <>
                        <Button
                          color="danger"
                          onClick={handleCancel}
                          size="sm"
                          className="mr-2"
                        >
                          <X size={14} className="mr-1" />
                          Cancelar
                        </Button>
                        <Button color="primary" onClick={handleSave} size="sm">
                          <Save size={14} className="mr-1" />
                          Salvar
                        </Button>
                      </>
                    ) : (
                      <Button
                        color="primary"
                        onClick={() => setEditMode(true)}
                        size="sm"
                      >
                        <Edit size={14} className="mr-1" />
                        Editar Perfil
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
                <Form>
                  {/* Foto de Perfil */}
                  <div className="text-center mb-4">
                    <img
                      src={
                        formData.foto_perfil || "https://via.placeholder.com/150"
                      }
                      alt="Foto de perfil"
                      className="rounded-circle"
                      width="150"
                      height="150"
                    />
                    {editMode && (
                      <div className="mt-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                        />
                      </div>
                    )}
                  </div>

                  {/* Informações do Usuário */}
                  <h6 className="heading-small text-muted mb-4">
                    <Mail size={16} className="mr-2" />
                    Informações do Utilizador
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label htmlFor="input-nome">Nome</label>
                          <Input
                            id="input-nome"
                            name="nome"
                            type="text"
                            value={formData.nome || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label htmlFor="input-email">Email</label>
                          <Input
                            id="input-email"
                            name="email"
                            type="email"
                            value={formData.email || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label htmlFor="input-primeiro-nome">Primeiro Nome</label>
                          <Input
                            id="input-primeiro-nome"
                            name="primeiro_nome"
                            type="text"
                            value={formData.primeiro_nome || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label htmlFor="input-ultimo-nome">Último Nome</label>
                          <Input
                            id="input-ultimo-nome"
                            name="ultimo_nome"
                            type="text"
                            value={formData.ultimo_nome || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />

                  {/* Informações de Contato */}
                  <h6 className="heading-small text-muted mb-4">
                    <Mail size={16} className="mr-2" />
                    Informações de Contato
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label htmlFor="input-endereco">Endereço</label>
                          <Input
                            id="input-endereco"
                            name="endereco"
                            type="text"
                            value={formData.endereco || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label htmlFor="input-cidade">Cidade</label>
                          <Input
                            id="input-cidade"
                            name="cidade"
                            type="text"
                            value={formData.cidade || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormGroup>
                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label htmlFor="input-pais">País</label>
                          <Input
                            id="input-pais"
                            name="pais"
                            type="text"
                            value={formData.pais || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />

                  {/* Sobre Mim */}
                  <h6 className="heading-small text-muted mb-4">
                    <User size={16} className="mr-2" />
                    Sobre Mim
                  </h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Sobre mim</label>
                      <Input
                        name="sobre_mim"
                        rows="4"
                        type="textarea"
                        value={formData.sobre_mim || ""}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </FormGroup>
                  </div>

                  <hr className="my-4" />

                  {/* Cursos ou Disciplinas */}
                  <h6 className="heading-small text-muted mb-4">
                    {formData.userType === "professor" ? (
                      <Book size={16} className="mr-2" />
                    ) : (
                      <Users size={16} className="mr-2" />
                    )}
                    {formData.userType === "professor"
                      ? "Disciplinas Ministradas"
                      : "Minhas Turmas"}
                  </h6>
                  <div className="pl-lg-4">
                    {(formData.courses || []).map((course) => (
                      <div key={course.id} className="mb-3 p-3 bg-light rounded">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0">{course.name}</h6>
                            <small className="text-muted">
                              Código: {course.code}
                            </small>
                          </div>
                          <Button color="link" size="sm" disabled>
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Segurança */}
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    <Lock size={16} className="mr-2" />
                    Segurança
                  </h6>
                  <div className="pl-lg-4">
                    <Button color="secondary" disabled={!editMode}>
                      Alterar Senha
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
