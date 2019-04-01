import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';



@inject('pokemons') @observer
class Pagination extends Component {

    changeOnPage = (ev) => {
      const {  setItemsOnPage } = this.props.pokemons;
      setItemsOnPage( parseInt( ev.currentTarget.value ) ) 
    }

    onNext = (ev) => {
      ev.preventDefault();
      const {  nextPage } = this.props.pokemons;
      nextPage( ) 
    }

    onBack = (ev) => {
      ev.preventDefault();
      const {  previousPage } = this.props.pokemons;
      previousPage(  ) 
    }

    render() {
        const {offset,  itemsOnPage,  showNext } = this.props.pokemons;

        return (
            <div>
              <div className="form-group">
                <label htmlFor="onpage">On page:</label>
                <select htmlFor="id" className="form-control" name="onpage" value={itemsOnPage} onChange={this.changeOnPage}>
                  <option value="10" >10</option>
                  <option value="20" >20</option>
                  <option value="50" >50</option>
                </select>
              </div>
             	<nav aria-label="...">
                    <ul className="pager">
                      { offset > 0 && 
                        <li className="previous" onClick={null}><a  onClick={this.onBack} href="#">Previous</a></li>
                      }
                      { showNext &&
                        <li className="next" onClick={null} ><a  onClick={this.onNext} href="#">Next</a></li>
                      }
                    </ul>
              </nav>
            </div>
        );
    }
}
export default Pagination

