import React from 'react';

import HeaderItem from '../components/headerItem';
class Header extends React.Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="navbar-brand">Application</div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor03">
                            <ul className="navbar-nav me-auto">
                                <HeaderItem href="#/Home" label="Inicio" />
                                <HeaderItem href="#/consulta-processos" label="Consulta Processos" />
                                <HeaderItem href="#/cadastro-processos" label="Cadastro Processos" />
                                <HeaderItem href="#/consulta-pessoa" label="Consulta Pessoa" />
                            </ul>
                                <a className="btn btn-secondary my-2 my-sm-0" href="#/cadastro-pessoa"> Cadastrar Pessoa </a>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header