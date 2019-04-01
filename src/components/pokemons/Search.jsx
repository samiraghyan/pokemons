

    /**
 * Created by Min on 2017/2/9.
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Img from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'



@inject('pokemons') @observer
export default class Search extends Component {
    changeType = (ev) => {
    	const {  setType } = this.props.pokemons;
    	setType( ev.currentTarget.value ) 
    }

   	onSearch = (ev) => {
    	const {  setHighlightPattern } = this.props.pokemons;
    	setHighlightPattern( ev.currentTarget.value ) 
    }

    render() {
    	const { types, category, highlightPattern } = this.props.pokemons;
        return (
             <div className="input-group" style={{ flex: 1,  flexWrap: 'wrap', flexDirection: 'row' }}>
			      <select className="form-control" onChange={this.changeType} defaultValue={category} style={ { flex: 1, width: 'auto'} }>
					  <option value="">All</option>
					  { types.map( el => (
					  		<option key={el.url} value={el.url} >{el.name}</option>
					  	) )
					}
					
				  </select>			
				  <input  type="text" className="form-control" placeholder="type a name to highlight pokemons" onChange={this.onSearch} value={highlightPattern} style={ { flexGrow: 1, flexBasis: 'fill', flex: 1, flex: 1, width: 'auto' } } />
			      <span style={ { flex: 1} } >
			      {/* <button className="btn btn-default" type="button">Go!</button>*/}
			      </span>
		    </div>
        );
    }
}


