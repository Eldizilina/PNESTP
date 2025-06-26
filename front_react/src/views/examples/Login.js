import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert,
  Container
} from "reactstrap";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [perfil, setPerfil] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password || !perfil) {
      setError("Preencha todos os campos!");
      return;
    }

    const passwordValida = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);
    if (!passwordValida) {
      setError("A senha deve conter letras e números!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/login", { 
        email,
        password,
        perfil
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userData", JSON.stringify({ email, perfil }));

      switch(perfil) {
        case "professor": navigate("/professor/dashboard"); break;
        case "aluno": navigate("/aluno/dashboard"); break;
        case "diretor": navigate("/diretor/dashboard"); break;
        default: navigate("/");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Row className="justify-content-center w-100">
        <Col lg="5" md="7" xs="12">
          <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <CardHeader className="bg-transparent pb-4">
              <div className="text-center">
                <h3>Acesse sua conta</h3>
              </div>
            </CardHeader>
            
            <CardBody className="px-lg-5 py-lg-4">
              {error && <Alert color="danger">{error}</Alert>}
              
              <Form onSubmit={handleLogin}>
                {/* Formulário mantido igual */}
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Senha"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <small className="text-muted">A senha deve conter letras e números</small>
                </FormGroup>

                <FormGroup className="mb-4">
                  <Input
                    type="select"
                    value={perfil}
                    onChange={(e) => setPerfil(e.target.value)}
                    required
                    className="form-control-alternative"
                  >
                    <option value="">Selecione seu perfil</option>
                    <option value="professor">Professor</option>
                    <option value="aluno">Aluno</option>
                    <option value="diretor">Diretor de Turma</option>
                  </Input>
                </FormGroup>

                <div className="text-center">
                  <Button 
                    className="my-3" 
                    color="primary" 
                    type="submit"
                    disabled={loading}
                    block
                  >
                    {loading ? "Carregando..." : "Entrar"}
                  </Button>
                </div>
              </Form>
            </CardBody>

            <div className="px-4 pb-4">
              <Row>
                <Col xs="6">
                  <a className="text-muted" href="/recuperar-senha">
                    <small>Esqueceu a senha?</small>
                  </a>
                </Col>
                <Col xs="6" className="text-right">
                  <Link to="/auth/register" className="text-primary">
                    <small>Criar nova conta</small>
                  </Link>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;