import {inject}             from 'mobx-react';
import React, { Component } from 'react';
import Search               from './components/pokemons/Search';
import PokemonList          from './components/pokemons/PokemonList';

@inject('pokemons')
class Main extends Component {

    render() {
        return (
            <div>
                <h1>All Pokemons</h1>
                <section  className="main_container">
                    <div className="wrapper" style={{maxWidth: '580px', margin: '0 auto'}}>
                        <main className="main_content">
                            <Search/>
                            <PokemonList/>
                        </main>
                    </div>
                </section>
            </div>
        );
    }
}
export default Main
