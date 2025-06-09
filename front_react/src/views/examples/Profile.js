import { useState, useEffect } from "react";
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
  Badge
} from "reactstrap";
import UserHeader from '../../components/Headers/UserHeader';
import { Edit, Save, Lock, Book, Users, Mail, X, User, Camera } from 'react-feather';

const LOCAL_STORAGE_KEY = "userProfileData";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "Aline jesse",
    email: "jesse@example.com",
    firstName: "Aline",
    lastName: "Jesse",
    address: "São Tomé",
    city: "Água Grande",
    country: "São Tomé e Príncipe",
    aboutMe: "Sou estudante universitário.",
    userType: "student",
    profilePhoto: "", // base64 ou URL da imagem
    courses: [
      { id: 1, name: "Matemática Avançada", code: "MAT202" },
      { id: 2, name: "Física Quântica", code: "FIS301" }
    ]
  });

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    setEditMode(false);
  };

  const handleCancel = () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    setEditMode(false);
  };

  return (
    <>
      <UserHeader />
      <Container style={{ marginTop: '-280px' }} fluid>
        <Row>
          <Col className="order-xl-1" xl="10" lg="12" md="12" sm="12">
            <Card className="bg-secondary shadow" style={{ marginTop: '-280px' }}>
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Minha Conta</h3>
                    <Badge color={formData.userType === 'teacher' ? 'info' : 'success'} className="mt-2">
                      {formData.userType === 'teacher' ? 'Professor' : 'Aluno'}
                    </Badge>
                  </Col>
                  <Col className="text-right" xs="4">
                    {editMode ? (
                      <>
                        <Button color="danger" onClick={handleCancel} size="sm" className="mr-2">
                          <X size={14} className="mr-1" />
                          Cancelar
                        </Button>
                        <Button color="primary" onClick={handleSave} size="sm">
                          <Save size={14} className="mr-1" />
                          Salvar
                        </Button>
                      </>
                    ) : (
                      <Button color="primary" onClick={() => setEditMode(true)} size="sm">
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
                      src={formData.profilePhoto || "https://via.placeholder.com/150"}
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
                    Informações do Usuário
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label htmlFor="input-username">Nome de utilizador</label>
                          <Input
                            id="input-username"
                            name="username"
                            type="text"
                            value={formData.username}
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
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label htmlFor="input-first-name">Nome</label>
                          <Input
                            id="input-first-name"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label htmlFor="input-last-name">Sobrenome</label>
                          <Input
                            id="input-last-name"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
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
                          <label htmlFor="input-address">Endereço</label>
                          <Input
                            id="input-address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label htmlFor="input-city">Cidade</label>
                          <Input
                            id="input-city"
                            name="city"
                            type="text"
                            value={formData.city}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label htmlFor="input-country">País</label>
                          <Input
                            id="input-country"
                            name="country"
                            type="text"
                            value={formData.country}
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
                        name="aboutMe"
                        rows="4"
                        type="textarea"
                        value={formData.aboutMe}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </FormGroup>
                  </div>

                  <hr className="my-4" />

                  {/* Cursos ou Disciplinas */}
                  <h6 className="heading-small text-muted mb-4">
                    {formData.userType === 'teacher' ? <Book size={16} className="mr-2" /> : <Users size={16} className="mr-2" />}
                    {formData.userType === 'teacher' ? 'Disciplinas Ministradas' : 'Minhas Turmas'}
                  </h6>
                  <div className="pl-lg-4">
                    {formData.courses.map(course => (
                      <div key={course.id} className="mb-3 p-3 bg-light rounded">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0">{course.name}</h6>
                            <small className="text-muted">Código: {course.code}</small>
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
