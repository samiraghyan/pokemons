import React from 'react'
import { Match } from 'react-router'
import { Provider } from 'mobx-react'
import { observer, inject } from 'mobx-react';
import Main from "./main"

class App extends React.Component {
    render() {
        const { stores } = this.props


        // Wrapping with provider gives children access to stores
        return (<Provider {...stores}>
            <LoadableWrapper/>
        </Provider>)
    }
}

@inject('pokemons')
@observer
class LoadableWrapper extends React.Component {

    render() {
        return (
                <div>
                    <Match exactly pattern="/" component={Main}/>
                </div>
        )
    }
}



export default App