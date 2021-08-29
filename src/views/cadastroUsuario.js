import React from 'react'
import Card from '../components/card'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'

import { toastrError, toastrSuccess } from '../components/toastr'

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        cpf: '',
        dataNascimento: ''
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }


    validar(){
        const msg = [ ];
        if(!this.state.nome){
            msg.push('O campo nome é OBRIGATÓRIO')
        }

        if(!this.state.cpf){
            msg.push('O campo cpf é OBRIGATÓRIO')
        }

        if(!this.state.dataNascimento){
            msg.push('O campo cpf é OBRIGATÓRIO')
        }
        return msg
    }


    cadastrar = () =>{
        const msg = this.validar()

        if(msg && msg.length > 0){
            msg.forEach( (msg, index)=>{
                toastrError(msg)
            })
            return false
        }

        const usuario = {
            nome: this.state.nome,
            cpf: this.state.cpf,
            dataNascimento: this.state.dataNascimento
        }

        this.service.salvar(usuario).then( response =>{
            toastrSuccess('Usuario cadastrado com sucesso')
        }).catch( erro =>{
            toastrError(erro.response.data)
        })
    }


    cancelarCadastro = () =>{
        this.props.history.push('/home')
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style= { {position: 'relative', left: '300px'} }>
                        <div className="bs-docs-section">
                            <Card title="Cadastro de Usuario">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="bs-component">
                                            <div className="form-group">
                                                <label htmlFor="inputNome">Nome: *</label>
                                                <input type="text" 
                                                    value={this.state.nome} 
                                                    onChange={ e => this.setState( {nome: e.target.value} ) }
                                                    className="form-control" 
                                                    id="inputNome" 
                                                    name="nome"
                                                    placeholder="Digite Seu Nome"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputCPF">CPF: *</label>
                                                <input type="email" 
                                                    value={this.state.cpf} 
                                                    onChange={ e => this.setState( {cpf: e.target.value} ) }
                                                    className="form-control" 
                                                    id="inputCPF" 
                                                    name="CPF"
                                                    placeholder="Digite Seu CPF"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputDataNascimento">Data de Nascimento: *</label>
                                                <input type="text" 
                                                    value={this.state.dataNascimento} 
                                                    onChange={ e => this.setState( {dataNascimento: e.target.value} ) }
                                                    className="form-control" 
                                                    id="inputDataNascimento" 
                                                    name="dataNascimento"/>
                                            </div>
                                            <button type="button" className="btn btn-success" onClick={this.cadastrar}>Confirmar</button>
                                            <button type="button" className="btn btn-danger" onClick={this.cancelarCadastro}>Cancelar</button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>    
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CadastroUsuario)