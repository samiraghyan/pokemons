import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';



@inject('pokemons')
@observer
 class Search extends Component {
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
				  <input  type="text" className="form-control" placeholder="type a name to highlight pokemons" onChange={this.onSearch} value={highlightPattern} style={ { flexGrow: 1, flexBasis: 'fill', flex: 1, width: 'auto' ,marginLeft: '10px'} } />
			      <span style={ { flex: 1} } >
			      </span>
		    </div>
        );
    }
}
export default Search

