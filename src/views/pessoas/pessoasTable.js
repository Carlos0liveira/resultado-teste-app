import React from 'react'

const pessoasTable =  props =>{

    const rows = props.Pessoas.map( pessoas => {
        return(
            <tr key={pessoas.id}>
                <td>{pessoas.nome}</td>
                <td>{pessoas.cpf}</td>
                <td>
                    <button type="button" 
                        className="btn btn-primary"
                        onClick={ e => props.editAction(pessoas.id) }   
                    >Editar</button>
                    <button type="button" 
                        className="btn btn-danger"
                        onClick={ e => props.deleteAction(pessoas) }   
                    >Deletar</button>
                </td>
            </tr>
        )
    } )

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default pessoasTable