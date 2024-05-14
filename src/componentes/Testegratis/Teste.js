import './Teste.css';
import React, { useState } from 'react';
import axios from 'axios';

export default function Teste() {
    const [file, setFile] = useState(null);
    const [nomeProduto, setNomeProduto] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("productname", nomeProduto);
        formData.append("file", file);

        axios({
            method: 'post',
            url: 'http://localhost:8080/enviarAnalise',
            data: formData,
            headers: {'Content-Type': 'multipart/file' }
        })
        .then(function (response) {
            console.log(formData);
            setResponse(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
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
                        value={nomeProduto}
                        onChange={(e) => setNomeProduto(e.target.value)}/>
                </div>

                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
            {response && <div className="response-message">{response}</div>}
        </div>
    );
}
