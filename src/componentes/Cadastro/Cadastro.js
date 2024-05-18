import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';

const Cadastro = () => {
    const navigate = useNavigate();

    const [respEmpresa, setrespEmpresa] = useState('');
    const [rzSocialEmpresa, setrzSocialEmpresa] = useState('');
    const [cnpjEmpresa, setCnpjEmpresa] = useState('');
    const [telEmpresa, settelEmpresa] = useState('');
    const [emailEmpresa, setEmailEmpresa] = useState('');
    const [senhaEmpresa, setSenhaEmpresa] = useState('');

    const schema = Yup.object().shape({
        respEmpresa: Yup.string().required('Nome do responsável é obrigatório'),
        rzSocialEmpresa: Yup.string().required('Nome da empresa é obrigatório'),
        cnpjEmpresa: Yup.string().required('CNPJ da empresa é obrigatório')
            .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, 'CNPJ inválido. Formato esperado: XX.XXX.XXX/XXXX-XX'),
        telEmpresa: Yup.string().required('Telefone da empresa é obrigatório')
            .matches(/^(\(?\d{2}\)?\s?)?\d{4,5}\-\d{4}$/, 'Telefone inválido. Formato esperado: (XX) XXXX-XXXX ou XXXXX-XXXX'),
        emailEmpresa: Yup.string().email('E-mail inválido').required('E-mail é obrigatório')
            .matches(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/, 'E-mail inválido'),
        senhaEmpresa: Yup.string().required("Preencha o campo senha")
                    .min(8, 'A senha deve ter no mínimo 8 caracteres')
                    .max(8, 'A senha deve ter no máximo 8 caracteres')
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'A senha deve conter pelo menos um caractere especial, uma letra maiúscula e um número')
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await schema.validate({ respEmpresa, rzSocialEmpresa, cnpjEmpresa, telEmpresa, emailEmpresa, senhaEmpresa });
        } catch (err) {
            toast.error(err.errors[0]);
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/empresas/cadastrar', { respEmpresa, rzSocialEmpresa, cnpjEmpresa, telEmpresa, emailEmpresa, senhaEmpresa });
                console.log(response.status.sucess);
                if (response.status === 200) {
                  toast.success('Cadastro realizado com sucesso!');
                  setTimeout(() => {
                    navigate('/login');
                }, 2000);
              } else {
                 toast.error('Não foi possível realizar o cadastro.');
              }
        } catch (error) {
            toast.error('Não foi possível realizar o cadastro.');
        }
    };

    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
          <Form className="w-50" onSubmit={handleFormSubmit}>
              <h1>CADASTRO</h1>
              <br></br>
              <Form.Group controlId="formrespEmpresa">
                  <Form.Label>NOME DO RESPONSÁVEL EMPRESA:</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Insira o nome do responsável"
                      value={respEmpresa}
                      onChange={(e) => setrespEmpresa(e.target.value)}
                  />
              </Form.Group><br />

              <Form.Group controlId="formrzSocialEmpresa">
                  <Form.Label>NOME DA EMPRESA:</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Insira o nome da empresa"
                      value={rzSocialEmpresa}
                      onChange={(e) => setrzSocialEmpresa(e.target.value)}
                  />
              </Form.Group><br />

              <Form.Group controlId="formCnpjEmpresa">
                  <Form.Label>CNPJ EMPRESA:</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Insira o CNPJ da empresa"
                      value={cnpjEmpresa}
                      onChange={(e) => setCnpjEmpresa(e.target.value)}
                  />
              </Form.Group><br />

              <Form.Group controlId="formtelEmpresa">
                  <Form.Label>TELEFONE EMPRESA:</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Insira o telefone da empresa"
                      value={telEmpresa}
                      onChange={(e) => settelEmpresa(e.target.value)}
                  />
              </Form.Group><br />

              <Form.Group controlId="formEmailEmpresa">
                  <Form.Label>EMAIL EMPRESA:</Form.Label>
                  <Form.Control
                      type="email"
                      placeholder="Insira o e-mail da empresa"
                      value={emailEmpresa}
                      onChange={(e) => setEmailEmpresa(e.target.value)}
                  />
              </Form.Group><br />
              <Form.Group controlId="formSenhaEmpresa">
                  <Form.Label>SENHA:</Form.Label>
                  <Form.Control
                      type="password"
                      placeholder="Informe uma senha"
                      value={senhaEmpresa}
                      onChange={(e) => setSenhaEmpresa(e.target.value)}
                  />
              </Form.Group><br />

              <Button variant="warning" type="submit" className="w-100">
                  ENVIAR
              </Button>

              <br></br><br></br>

              <div className="text-center mt-3">
                  <Link to="/login">
                      <button className="conheca-btn">JÁ SOU CLIENTE</button>
                  </Link>
              </div>
          </Form>
          <ToastContainer />
      </Container>
  );
};

export default Cadastro;