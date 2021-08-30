import React from 'react'

 const selectMenu = (props) =>{

    const options = props.lista.map( (option, index) =>{
        return(
            <option key={ index } value={option.id}> {option.nome} -- {option.cpf}</option>
        )
    })

    return(
        <select {...props}>
            {options}
        </select>
    )
}

export default selectMenu