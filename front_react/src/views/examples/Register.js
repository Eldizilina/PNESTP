import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Col,
  Alert,
  Container
} from 'reactstrap';

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    categoria: '',
    escola: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    setError('');

    if (!/^[A-Za-zÀ-ÿ\s]{3,}$/.test(formData.nome)) {
      setError('Nome deve conter apenas letras e no mínimo 3 caracteres');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Por favor, insira um email válido');
      return false;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(formData.senha)) {
      setError('A senha deve conter letras e números, com no mínimo 6 caracteres');
      return false;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem!');
      return false;
    }

    if (!formData.categoria) {
      setError('Selecione uma categoria');
      return false;
    }

    if (formData.categoria === 'aluno' && !formData.escola) {
      setError('Nome da escola é obrigatório para alunos');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const userData = {
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        senha: formData.senha,
        categoria: formData.categoria,
        ...(formData.categoria === 'aluno' && { 
          escola: formData.escola.trim() 
        })
      };

      await axios.post('http://localhost:8000/api/cadastro', userData);

      setSuccess('Cadastro realizado com sucesso! Redirecionando...');
      
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);

    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError(err.response?.data?.message || 'Erro ao realizar cadastro. Tente novamente.');
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
      background: 'linear-gradient(to right, #eef2f3, #8e9eab)',
      padding: '20px'
    }}>
      <Row className="justify-content-center w-100">
        <Col lg="5" md="7" xs="12">
          <Card className="shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <CardHeader className="bg-transparent pb-3">
              <div className="text-center">
                <h3 style={{ fontSize: '1.5rem' }}>Criar nova conta</h3>
                <small className="text-muted">Todos os campos são obrigatórios</small>
              </div>
            </CardHeader>

            <CardBody className="px-4 py-3">
              {error && <Alert color="danger" className="py-2">{error}</Alert>}
              {success && <Alert color="success" className="py-2">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-2">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Nome completo"
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                  <small className="text-muted">Mínimo 3 letras, sem números</small>
                </FormGroup>

                <FormGroup className="mb-2">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <Row>
                  <Col md="6">
                    <FormGroup className="mb-2">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Senha"
                          type="password"
                          name="senha"
                          value={formData.senha}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup className="mb-2">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Confirmar senha"
                          type="password"
                          name="confirmarSenha"
                          value={formData.confirmarSenha}
                          onChange={handleChange}
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <small className="text-muted d-block mb-2">Senha deve conter letras e números (mínimo 6 caracteres)</small>

                <FormGroup className="mb-2">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-badge" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="select"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Selecione seu perfil</option>
                      <option value="professor">Professor</option>
                      <option value="aluno">Aluno</option>
                      <option value="diretor">Diretor de Turma</option>
                    </Input>
                  </InputGroup>
                </FormGroup>

                {formData.categoria === 'aluno' && (
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Nome da escola"
                        type="text"
                        name="escola"
                        value={formData.escola}
                        onChange={handleChange}
                        required
                        minLength={3}
                      />
                    </InputGroup>
                    <small className="text-muted">Mínimo 3 caracteres</small>
                  </FormGroup>
                )}

                <div className="text-center">
                  <Button
                    color="primary"
                    type="submit"
                    disabled={loading}
                    block
                    className="mt-3"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm mr-2"></span>
                        Registrando...
                      </>
                    ) : (
                      'Criar conta'
                    )}
                  </Button>
                </div>
              </Form>
            </CardBody>

            <div className="px-4 pb-3 text-center">
              <small className="text-muted">
                Já tem uma conta?{' '}
                <Link to="/auth/login" className="text-primary font-weight-bold">
                  Faça login
                </Link>
              </small>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cadastro;