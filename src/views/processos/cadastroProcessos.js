import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'


import ProcessoService from '../../app/service/processoService'
import * as message from '../../components/toastr'
import { toastrError} from '../../components/toastr'
// import SelectMenu from '../../components/selectMenu'
import PessoaService from '../../app/service/pessoaService'

class CadastroProcessos extends React.Component{

    componentDidMount(){
        const params = this.props.match.params

        if (params.id) {
            this.service.obterPorId(params.id)
            .then( response =>{
                this.setState( {...response.data, atualizando: true}  )
            }).catch( error =>{
                message.toastrError(error.response.data)
            })
        }


    }

    state = {
        id: null,
        numero: '',
        ano: '',
        pessoa: '',
        atualizando: false,
        pessoas: []
    }

    validar(){
        const msg = [ ];
        if(!this.state.numero){
            msg.push('O campo numero é OBRIGATÓRIO')
        }

        if(!this.state.ano){
            msg.push('O campo ano é OBRIGATÓRIO')
        }

        if(!this.state.pessoa){
            msg.push('O campo pessoa é OBRIGATÓRIO')
        }
        return msg
    }

    constructor(){
        super()
        this.service = new ProcessoService()
        this.pessoaService = new PessoaService()
    }

    submit = () => {
        const msg = this.validar()

        if(msg && msg.length > 0){
            msg.forEach( (msg, index)=>{
                toastrError(msg)
            })
            return false
        }
        const processo = {
            ano: this.state.ano,
            numero: this.state.numero,
            pessoa: this.state.pessoa

        }

        this.service.salvar(processo)
            .then( response =>{
                // this.props.history.push('/consulta-processos')
                message.toastrSuccess('Processo Cadastrado!')
            }).catch( error =>{
                message.toastrError(error.response.data)
            })
    }

    atualizar = () => {


        const processos = {
            ano: this.state.ano,
            numero: this.state.numero,
            pessoa: this.state.pessoa,
            id: this.props.match.params.id
        }

        this.service.atualizar(processos)
            .then( response =>{
                this.props.history.push('/consulta-processos')
                message.toastrSuccess('Atualizado com Sucesso!')
            }).catch( error =>{
                console.log(error.response.data)
            })
    }



    render(){

        // const pessoaFiltro = {
        //     nome: '',
        //     cpf: '',
        // }

        // this.pessoaService.consultar(pessoaFiltro)
        //         .then( response =>{
        //             this.setState( { pessoas: response.data } )
        //         }).catch( error =>{
        //             console.log('erro')
        //         }) 

        return(
            <Card title= { this.state.atualizando ?  'Atualizar Processo' : 'Cadastro de Processo'   }>
                <div className="row"> 
                    <div className="cold-md-6">
                        <div className="form-group">
                            <div className="col-md-12">
                                <label htmlFor="inputNumero">Numero: *</label>
                                <input type="number" 
                                    value={this.state.numero} 
                                    onChange={ e => this.setState( {numero: e.target.value} ) }
                                    className="form-control" 
                                    id="inputNumero" 
                                    placeholder="Informe o Numero"
                                />
                            </div>    
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group">
                        <div className="col-md-12">
                            <label htmlFor="inputAno">Ano: *</label>
                            <input type="number" 
                                value={this.state.ano} 
                                onChange={ e => this.setState( {ano: e.target.value} ) }
                                className="form-control" 
                                id="inputAno" 
                                placeholder="Informe o ano"
                            />
                        </div>    
                    </div>
                    <div className="form-group">
                        <div className="col-md-12">
                            <label htmlFor="inputPessoa">Pessoa: *</label>
                            <input type="number" 
                                value={this.state.pessoa} 
                                onChange={ e => this.setState( {pessoa: e.target.value} ) }
                                className="form-control" 
                                id="inputPessoa" 
                                placeholder="Informe a Pessoa"
                            />
                        </div>    
                    </div>
                    {/* <div className="form-group">
                        <div className="col-md-12">
                            <label htmlFor="inputPessoa">Pessoa: *</label>
                            <SelectMenu 
                                id="inputPessoa" 
                                lista={this.state.pessoas} 
                                value={this.state.pessoa} 
                                onChange={ e => this.setState( {pessoa: e.target.value} )}
                            />
                         </div>   
                    </div>    */}
                </div>
                { this.state.atualizando ? (
                    <button className="btn btn-success" onClick={this.atualizar} >Atualizar</button>
                    ) : (
                        <button className="btn btn-success" onClick={this.submit} >Salvar</button>
                    )

                }
                <button className="btn btn-danger" onClick={ e => this.props.history.push('/home')} >Cancelar</button>
            </Card>
        )
    }

}

export default withRouter(CadastroProcessos)