import './Teste.css';
import React, { useState } from 'react';
import axios from 'axios';

export default function Teste() {
    const [file, setFile] = useState(null);
    const [productname, setproductname] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("productname", productname);
        formData.append("file", file);

        try {
            const response = await axios.post('http://localhost:8080/enviarAnalise', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response Data:", response.data);
            setResponse(response.data);
        } catch (error) {
            if (error.response) {
                console.log("Response Data:", error.response.data);
                console.log("Response Status:", error.response.status);
                console.log("Response Headers:", error.response.headers);
                setResponse(error.response.data);
            } else if (error.request) {
                console.log("Request Data:", error.request);
                setResponse("No response received from the server");
            } else {
                console.log("Error Message:", error.message);
                setResponse(error.message);
            }
            console.log("Error Config:", error.config);
        }
    };

    return (
        <div className="container-teste">
            <h1>Faça um teste de análise de cotação de compras:</h1>

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
            {response && <div className="response-message">{typeof response === 'object' ? JSON.stringify(response, null, 2) : response}</div>}
        </div>
    );
}
