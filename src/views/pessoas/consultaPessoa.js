import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'


import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button';
import PessoaService from '../../app/service/pessoaService'
import PessoasTable from './pessoasTable'

import * as message from '../../components/toastr'


class consultaPessoa extends React.Component{
    state = {
        id: '',
        nome: '',
        cpf: '',
        pessoas: [],
        visible: false,
        pessoaDeletar: []
    }

    constructor(){
        super();
        this.service = new PessoaService();
    }

    buscar = () => {

        const pessoaFiltro = {
            nome: this.state.nome,
            cpf: this.state.cpf,
        }

        console.log(pessoaFiltro)

        this.service
            .consultar(pessoaFiltro)
            .then( response =>{
                this.setState( { pessoas: response.data } )
            }).catch( error =>{
                console.log('erro')
            })
    }

    editar = (id) =>{
        this.props.history.push(`/cadastro-processos/${id}`)
    }

    confirmaDeletar = ( processo ) => {
        this.setState( {visible : true, pessoaDeletar: processo} )
    }

    cancelarDelecao = () =>{
        this.setState( {visible: false, pessoaDeletar: []} )
    }

    deletar = ( ) =>{
        this.service.deletar(this.state.pessoaDeletar.id)
            .then( response => {
                const pessoas = this.state.pessoas
                const index = pessoas.indexOf(this.pessoaDeletar)
                pessoas.splice(index, 1)
                this.setState(pessoas)
                this.setState( {visible: false} )
                message.toastrSuccess('Deletado com sucesso')
            }).catch( error=>{
                message.toastrError('Ocorreu um erro ao deletar o Pessoa')
            })
    }



    render(){

        const dialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} />
            </div>
        );

        return(
            <div className="container">
                <div className="row">
                    <div className="bs-docs-section"></div>
                    <Card title="Consulta de Pessoa">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <div className="form-group">
                                        <label htmlFor="inputNome">Nome: </label>
                                        <input type="text" 
                                            value={this.state.nome} 
                                            onChange={ e => this.setState( {nome: e.target.value} ) }
                                            className="form-control" 
                                            id="inputNome" 
                                            placeholder="Informe o Nome da Pessoa"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputCPF">CPF: </label>
                                        <input type="text" 
                                            value={this.state.cpf} 
                                            onChange={ e => this.setState( {cpf: e.target.value} ) }
                                            className="form-control" 
                                            id="inputCPF" 
                                            placeholder="Informe o numero do CPF"/>
                                    </div>
                                    <button type="button" onClick={this.buscar} className="btn btn-success">Buscar</button>
                                    <button type="button" className="btn btn-warning"  onClick={ e => this.props.history.push('/cadastro-pessoa') } >Cadastrar</button>
                                </div>
                            </div>
                        </div>
                        <div>
                        <Dialog header="Aviso" visible={this.state.visible} footer={dialogFooter} style={{ width: '50vw' }} modal={true} onHide={() => this.setState({visible: false})}>
                            <p>Deseja Realmente cancelar seu Processo?</p>
                        </Dialog>

                        </div>
                    </Card>
                    <PessoasTable 
                        Pessoas={this.state.pessoas}
                        deleteAction={this.confirmaDeletar}
                        editAction={this.editar} />
                </div>
            </div> 
        )
    }
}

export default withRouter(consultaPessoa)