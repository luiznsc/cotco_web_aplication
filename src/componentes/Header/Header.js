//import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Header.css'


export default function Header() {    
 /*const [showMenu, setShowMenu] = useState(false);

  function handleMenuClick() {
    setShowMenu(!showMenu);
  }

  function Disconect(){
    const confirmDisconnect = window.confirm("Tem certeza de que deseja desconectar?");
    if (confirmDisconnect) {
      localStorage.clear();
      window.location.href = "/";
    }
  }*/

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-orange">
      <Link className="navbar-brand" to="/home">
        <p id='title_logo' >COT&CO</p>
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end mr-auto" id="navbarNav">
        <ul className="navbar-nav">
          <li className="item-menu">
            <Link className="item-menu a" to="/home">CONHEÇA-NOS</Link>
          </li>
          <li className="item-menu">
            <Link className="item-menu a" to="/teste">TESTE GRÁTIS</Link>
          </li>
          <li className="item-menu">
            <Link className="item-menu a" to="/login">LOGIN</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}