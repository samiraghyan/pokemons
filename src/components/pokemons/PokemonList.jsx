/**
 * Created by signumcode
 */
 'use strict'
import React, { Component } from 'react';
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react';

import Img from 'react-image'
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import MDSpinner from "react-md-spinner";




const Greet = ( ) => <div>Please Login first, to select choose favorites</div>

@inject('pokemons') @observer
export default class PokemonList extends Component {
    constructor(props){
        super(props)
       
    }

    componentDidMount(){
        this.props.pokemons.init()
  
    }

    onInfo = (ev) => {
        
        this.props.pokemons.changePockemonInoState(ev.currentTarget.getAttribute('id'))
    }

    render() {
        const {offset, pokemonsOnPage, highlightPattern, infoOpenedForId, pokemonsInfo } = this.props.pokemons ;

        const raws = [];

        (pokemonsOnPage).forEach((el, key) => {
            const val = Object.assign({}, el)
            const id = parseInt( val.url.replace(/\/$/, '').split('/').pop()  ) 
            val.id = id
            val.avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`

            const isNotSelected = !highlightPattern.length ||  val.name.toLowerCase().startsWith(highlightPattern)
            const detailedInfo = pokemonsInfo.get(id )

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
                    <td>
                     {val.name}
                    </td>
                  
                     <td>
                        <button id={id} onClick={this.onInfo} className="no_button"><i className="material-icons" style={infoOpenedForId == val.id? {color:'green'}:{}  }>&#xE88F;</i></button>
                    </td>
                </tr>
                )
                
            raws.push( 
                <tr  key={`${val.name}_info`} style={ Object.assign( { verticalAlign: 'middle', borderBottom: 'solid 1px rgba(21,21,21,0.15)' }, addedStyle ) }>
                    <td colSpan="4" >
                    {infoOpenedForId == val.id && (
                        <div>
                            { detailedInfo === undefined  && 
                                <div style={{width:'70px', height: '70px', margin: '0 auto'}}>
                                    <MDSpinner />
                                </div>
                            }
                            <div className="row" style={{maxWidth: '560px', maxHeight:'380px', overflow: 'auto', marginBottom: '10px' }}>
                                <pre>
                                    {JSON.stringify( detailedInfo,  null, 4 ) }
                                </pre>
                            </div>
                        </div>
                    )}
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
                            <th></th>
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
