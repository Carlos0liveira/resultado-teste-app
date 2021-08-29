import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import ProcessoTable from './processoTable'

import ProcessoService from '../../app/service/processoService'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button';


import * as message from '../../components/toastr'

class consultaProcessos extends React.Component{

    state = {
        id: '',
        ano: '',
        numero: '',
        pessoa: '',
        processos: [],
        visible: false,
        processoDeletar: []
    }
    
    constructor(){
        super();
        this.service = new ProcessoService();
    }

    buscar = () => {

        const processoFiltro = {
            numero: this.state.numero,
            ano: this.state.ano,
        }

        this.service
            .consultar(processoFiltro)
            .then( response =>{
                this.setState( { processos: response.data } )
            }).catch( error =>{
                console.log('erro')
            })
    }

    editar = (id) =>{
        this.props.history.push(`/cadastro-processos/${id}`)
    }

    confirmaDeletar = ( processo ) => {
        this.setState( {visible : true, processoDeletar: processo} )
    }

    cancelarDelecao = () =>{
        this.setState( {visible: false, processoDeletar: []} )
    }

    deletar = ( ) =>{
        this.service.deletar(this.state.processoDeletar.id)
            .then( response => {
                const processos = this.state.processos
                const index = processos.indexOf(this.processoDeletar)
                processos.splice(index, 1)
                this.setState(processos)
                this.setState( {visible: false} )
                message.toastrSuccess('Deletado com sucesso')
            }).catch( error=>{
                message.toastrError('Ocorreu um erro ao deletar o Processo')
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
                    <Card title="Consulta de Processos">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="bs-component">
                                    <div className="form-group">
                                        <label htmlFor="inputAno">Ano: </label>
                                        <input type="number" 
                                            value={this.state.ano} 
                                            onChange={ e => this.setState( {ano: e.target.value} ) }
                                            className="form-control" 
                                            id="inputAno" 
                                            placeholder="Informe o ano do processo"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputNumero">Numero: </label>
                                        <input type="number" 
                                            value={this.state.numero} 
                                            onChange={ e => this.setState( {numero: e.target.value} ) }
                                            className="form-control" 
                                            id="inputNumero" 
                                            placeholder="Informe o numero do processo"/>
                                    </div>
                                    <button type="button" onClick={this.buscar} className="btn btn-success">Buscar</button>
                                    <button type="button" className="btn btn-warning"  onClick={ e => this.props.history.push('/cadastro-processos') } >Cadastrar</button>
                                </div>
                            </div>
                        </div>
                        <div>
                        <Dialog header="Aviso" visible={this.state.visible} footer={dialogFooter} style={{ width: '50vw' }} modal={true} onHide={() => this.setState({visible: false})}>
                            <p>Deseja Realmente cancelar seu Processo?</p>
                        </Dialog>

                        </div>
                    </Card>
                    <ProcessoTable 
                        Processos={this.state.processos}
                        deleteAction={this.confirmaDeletar}
                        editAction={this.editar} />
                </div>
            </div> 
        )
    }
}

export default withRouter(consultaProcessos)