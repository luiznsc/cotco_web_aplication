import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from './componentes/Header/Header';
import Home from './componentes/Home/Home';
import Teste from './componentes/Testegratis/Teste';
import Login from './componentes/Login/Login';
import Cadastro from './componentes/Cadastro/Cadastro';

export default function App() {
  return (
    <BrowserRouter>
      <div className='tudo'>
        <Helmet>
          <meta charSet='utf-8'/>
          <title>COT&CO</title>
        </Helmet>

        <Routes>
          <Route path='/home' element={<>
            <Home />
          </>} />

          <Route path='/login' element={<>
            <Header />
            <Login />
          </>} />

          <Route path='/cadastro' element={<>
            <Header />
            <Cadastro />
          </>} />

          <Route path='/teste' element={<>
            <Header />
            <Teste />
          </>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
