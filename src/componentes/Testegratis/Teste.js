import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ResponseCard } from './Responsecard';
import axios from 'axios';
import './Teste.css';
import 'react-toastify/dist/ReactToastify.css';


export default function Teste() {
    const [file, setFile] = useState(null);
    const [productname, setproductname] = useState('');
    const [criterio, setcriterio] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !file.name.endsWith('.csv')) {
            toast.error('Por favor, selecione um arquivo CSV.');
            return;
        }
        if (!productname) {
            toast.error('Por favor, informe o nome do produto.');
            return;
        }
          

        let formData = new FormData();
        formData.append("productname", productname);
        formData.append("file", file);

        try {
            const response = await axios.post('http://localhost:8080/enviarAnalise', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResponse(response.data);
        } catch (error) {
            if (error.response) {
                setResponse(error.response.data);
            } else if (error.request) {
                setResponse("Não foram recebidor dados do servidor.");
            } else {
                setResponse(error.message);
            }
        }
    };

    return (
        <div className="container-teste">
            <h1>Faça uma análise de cotação de compras:</h1>

            {/* arquivo */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fileInput" className="form-label">1. Anexe o arquivo de base de dados:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="fileInput"
                        onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <br></br>

                {/* campo 2 */}
                <div className="mb-3">
                    <label htmlFor="criterioInput" className="form-label">2. Selecione uma opção:</label>
                    <select
                        className="form-control"
                        id="criterioInput"
                        value={criterio}
                        onChange={(e) => setcriterio(e.target.value)}>
                        <option value="custo benefício">custo benefício</option>
                    </select>
                </div>
                <br></br>

                {/* nome produto */}
                <div className="mb-3">
                    <label htmlFor="textInput" className="form-label">3. Informe o nome do produto:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="textInput"
                        value={productname}
                        onChange={(e) => setproductname(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>

            {response && Array.isArray(response) ? (
                response.map((item, index) => <ResponseCard key={index} response={item} />)
                ) : (
                <div className="response-message">{response.message}</div>
            )}
            <ToastContainer />
        </div>
    );
}
