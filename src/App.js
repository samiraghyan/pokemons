import React            from 'react'
import {Provider}       from 'mobx-react'
import Main             from "./main"
import Pokemons         from './store/pokemons'

const pokemons = new Pokemons();

class App extends React.Component {
    render() {
        return <Provider pokemons={pokemons}>
                     <Main/>
                </Provider>
    }
}


export default App