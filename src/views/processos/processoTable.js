import React from 'react'

const processoTable =  props =>{

    const rows = props.processos.map( processos => {
        return(
            <tr key={processos.id}>
                <td>{processos.numero}</td>
                <td>{processos.ano}</td>
                <td>{processos.pessoa.nome}</td>
                <td>
                    <button type="button" 
                        className="btn btn-primary"
                        onClick={ e => props.editAction(processos.id) }   
                    >Editar</button>
                    <button type="button" 
                        className="btn btn-danger"
                        onClick={ e => props.deleteAction(processos) }   
                    >Deletar</button>
                </td>
            </tr>
        )
    } )

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Numero</th>
                    <th scope="col">Ano</th>
                    <th scope="col">Pessoa</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default processoTable