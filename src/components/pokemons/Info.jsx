/**
 * Created by signumcode
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Img from 'react-image'
import { ToastContainer } from 'react-toastify';
import Pagination from './Pagination';



@inject('pokemons') @observer
export default class Todo extends Component {
    constructor(props){
        super(props)
       
    }


    componentDidMount(){
        this.props.pokemons.init()
  
    }

    render() {
        const {offset, pokemonsOnPage, highlightPattern } = this.props.pokemons;
        return (
            <div style={{width:'100%'}}>
                <Pagination/>
                <table style={{width:'100%'}}>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                      </thead>
                     <tbody>
                      { pokemonsOnPage.map((val, key) => { 

                            const id = parseInt( val.url.replace(/\/$/, '').split('/').pop()  ) 
                            const isNotSelected = !highlightPattern.length ||  val.name.startsWith(highlightPattern)

                            const addedStyle = {}
                            if(!isNotSelected){
                                addedStyle.opacity = 0.1
                            }
                            return (
                            <tr  key={val.name} style={ Object.assign( {height: '100px', verticalAlign: 'middle' }, addedStyle ) }>
                                <td>
                                    {id}
                                </td>
                                <td style={{width:'100px', minHeight: '96px'}}>
                                  
                                        <Img src={
                                            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ id }.png`
                                        } style={{verticalAlign: 'middle', height: '96px'}}/>
                             
                                </td>
                                <td>
                                 {val.name}
                                </td>
                              
                                 <td>
                                    <button><i className="material-icons">&#xE87E;</i></button>
                                    <button><i className="material-icons">&#xE88F;</i></button>
                                </td>
                            </tr>
                            )
                        })
                     }
                    </tbody>
                </table>
                
                <Pagination/>
            </div>
        );
    }
}
