import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Img                  from 'react-image'
import Pagination           from './Pagination';


@inject('pokemons') @observer
 class PokemonList extends Component {
    constructor(props){
        super(props)
       
    }

    componentDidMount(){
        this.props.pokemons.init()
    }


    render() {
        const {pokemonsOnPage, highlightPattern} = this.props.pokemons ;

        const raws = [];
        (pokemonsOnPage).forEach((el, key) => {
            const val = Object.assign({}, el)
            const id = parseInt( val.url.replace(/\/$/, '').split('/').pop()  )
            val.id = id
            val.avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`;
            console.log("val",val)
            const isNotSelected = !highlightPattern.length ||  val.name.toLowerCase().startsWith(highlightPattern);

            const addedStyle = {}
            if(!isNotSelected){
                addedStyle.opacity = 0.1
            }
            raws.push( 
                <tr  key={val.name} style={ Object.assign( {height: '100px', verticalAlign: 'middle' }, addedStyle ) }>
                    <td>
                        {val.id}
                    </td>
                    <td style={{width:'100px', minHeight: '96px'}}>
                        <Img src={val.avatar} style={{verticalAlign: 'middle', height: '96px'}}/>
                    </td>
                    <td style={{textAlign:'center'}}>
                     {val.name}
                    </td>
                    <td>
                        {val.type}
                    </td>
                </tr>
                )
        }) 
        return (
            <div style={{width:'100%'}}>
                <Pagination/>
                {raws.length > 0 

                ?
              
                    <table style={{width:'100%', maxWidth:'560px', borderCollapse: 'collapse'}}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Type</th>
                        </tr>
                          </thead>
                         <tbody>
                          { 
                            raws
                          }
                        </tbody>
                    </table>

                :

                    <h5 style={{textAlign:'center'}}>
                        No pokemons to show
                    </h5>
                }
                
                <Pagination/>
            </div>
        );
    }
}
export default  PokemonList