import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [emailEmpresa, setEmailEmpresa] = useState('');
    const [senhaEmpresa, setSenhaEmpresa] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const schema = Yup.object().shape({
        emailEmpresa: Yup.string().email('E-mail inválido').required('Informe o e-mail.'),
        senhaEmpresa: Yup.string().required('Informe a senha.'),
    });

    const handleEmailChange = (event) => {
      setEmailEmpresa(event.target.value);
    };

    const handlePasswordChange = (event) => {
      setSenhaEmpresa(event.target.value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setError(null); // Reseta o estado de erro ao submeter o formulário
    
        try {
            await schema.validate({ emailEmpresa, senhaEmpresa }, { abortEarly: false });
    
            const situacaoEmpresa = 'ATIVA';
            const response = await axios.get('http://localhost:8080/empresas/buscar', {
                params: { emailEmpresa, senhaEmpresa, situacaoEmpresa },
            });

            console.log('Response:', response); // Log da resposta para debug

            const empresa = response.data;
            if (empresa && empresa.situacaoEmpresa === 'ATIVA') {
                toast.success('Login realizado com sucesso!');
                navigate('/teste');
            } else {
                toast.error('Empresa Inativa.');

            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
            } else if (error.request) {
                toast.error('Sem resposta do servidor.');
            } else {
                toast.error('Erro na configuração da requisição.');
            }
            toast.error('Dados de acesso não encontrados no banco de dados.');
        }
    };
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Form className="w-50" onSubmit={handleFormSubmit}>
                <h1>LOGIN</h1>

                {error && <Alert variant="danger">{error}</Alert>}
                <br></br>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>E-MAIL:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Insira seu e-mail"
                        value={emailEmpresa}
                        onChange={handleEmailChange}
                        isInvalid={!!error}/>
                </Form.Group>

                <br></br>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>SENHA:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Insira sua senha"
                        value={senhaEmpresa}
                        onChange={handlePasswordChange}
                        isInvalid={!!error}/>
                </Form.Group>

                <br></br>

                <Button variant="warning" type="submit" className="w-100">
                    ENTRAR
                </Button>
                <br></br><br></br>

                <div className="text-center mt-3">
                    <a href="">Esqueci minha senha</a>
                </div>

                <div className="text-center mt-3">
                    <Link to="/cadastro">
                        <button className="conheca-btn">QUERO SER CLIENTE</button>
                    </Link>
                </div>
            </Form>
            <ToastContainer />
        </Container>
    );
};

export default Login;