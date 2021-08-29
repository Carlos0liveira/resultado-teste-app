import React from 'react'
import UsuarioService from '../app/service/usuarioService'


class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor(){
        super()
        this.UsuarioService = new UsuarioService();
    }


    render(){
        return(
            <figure className="text-center">
                <blockquote className="blockquote">
                    <h1 className="display-3">Bem vindo!</h1>
                    <p className="lead">Esta é minha aplicação da avaliação</p>
                    <a className="btn btn-outline-info" href="/processos#/cadastro-processos" role="button"><i className="fa fa-users"></i> Cadastrar Processo</a>
                    <hr className="my-4"/>
                </blockquote>
            </figure>
        )
    }
}

export default Home