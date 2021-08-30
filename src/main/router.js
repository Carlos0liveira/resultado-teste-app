import React from 'react'
import CadastroPessoa from '../views/pessoas/cadastroPessoa'
import Home from '../views/home'
import consultaProcessos from '../views/processos/consultaProcessos'
import cadastroProcessos from '../views/processos/cadastroProcessos'
import consultaPessoa from '../views/pessoas/consultaPessoa'


import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

function Rotes(){
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/"><Redirect to="/home"/></Route>
                <Route path="/cadastro-processos/:id?" component={cadastroProcessos} />
                <Route path="/consulta-processos" component={consultaProcessos} />
                <Route path="/home" component={Home} />
                <Route path="/cadastro-pessoa" component={CadastroPessoa} />
                <Route path="/consulta-pessoa" component={consultaPessoa} />
            </Switch>
        </HashRouter>
    )
}

export default Rotes