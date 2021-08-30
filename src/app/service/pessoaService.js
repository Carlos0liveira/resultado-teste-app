import ApiService from '../apiService'


class PessoaService extends ApiService{
    constructor(){
        super('/api/pessoas')
    }

    salvar(pessoa){
        return this.post('/salvarpessoa', pessoa)
    }

    atualizar( pessoa ) {
        return this.put(`/${pessoa.id}`, pessoa)
    }

    obterPorId(id){
        return this.get(`/${id}`)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    consultar(pessoaFiltro){
        let params = `?nome=${pessoaFiltro.nome}`

        if (pessoaFiltro.cpf) {
            params = `${params}&cpf=${pessoaFiltro.cpf}`
        }
        
        return this.get(params)
    }
}

export default PessoaService