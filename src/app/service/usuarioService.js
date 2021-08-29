import ApiService from '../apiService'


class UsuarioService extends ApiService{
    constructor(){
        super('/api/pessoas')
    }

    salvar(usuario){
        return this.post('/salvarpessoa', usuario)
    }
}

export default UsuarioService