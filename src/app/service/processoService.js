import ApiService from '../apiService'

export default class ProcessoService extends ApiService{
    constructor(){
        super('/api/processos')
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    salvar( processo ) {
        return this.post('/', processo)
    }
    atualizar( processo ) {
        return this.put(`/${processo.id}`, processo)
    }

    obterPorId(id){
        return this.get(`/${id}`)
    }

    consultar(processoFiltro){
        let params = `?ano=${processoFiltro.ano}`

        if (processoFiltro.numero) {
            params = `${params}&numero=${processoFiltro.numero}`
        }
        
        return this.get(params)
    }
}

