import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className='img-container'>
                <img src="/img/logo_cotco.png" alt="Cot&Co" className="logo" />
                <p>Cotações inteligentes, compras descomplicadas</p>
            </div>

            <div className="btns">
                <Link to="/login">
                    <button className="cliente-btn" >SOU CLIENTE</button>
                </Link>
                <br></br>

                <Link to="/cadastro">
                    <button className="cadastrar-btn">QUERO SER CLIENTE</button>
                </Link>
            </div>

            <div className="conheca">
                <button className="conheca-btn">CONHEÇA-NOS</button>
            </div>
        </div>
    );
}
export default Home;
