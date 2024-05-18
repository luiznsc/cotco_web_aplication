
import React from 'react';
import './Responsecard.css';

export function ResponseCard({ response }) {
    return (
      <div className="response-card">
        <img src={response.Imagem} alt={response.Produto} className="response-image" />
        <div className="response-info">
          <h3>{response.Produto}</h3>
          <p className="response-price">{response.Preço}</p>
        </div>
      </div>
    );
  }
  