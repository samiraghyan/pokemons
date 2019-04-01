import { ObservableMap, observable, action, computed, autorun, toJS, useStrict, extendObservable } from 'mobx';
//useStrict(true);
const ApiRoot = `http://pokeapi.co/api/v2`


export default class Pokemons {

    @observable highlightPattern = ''

    @observable count = 0
    @observable busy = false
    previous = null
    next = `${ApiRoot}/pokemon/`

    @observable offset = 0
    @observable itemsOnPage = 20

    @observable pokemons = []

    @observable pokemonsInfo = new ObservableMap()

    @computed get showNext() {
        return this.offset + this.itemsOnPage < this.count
    }

    @computed get pokemonsOnPage() {
        if (this.offset > this.count) return []
        return this.pokemons.slice(this.offset, this.offset + this.itemsOnPage);
        /*}*/
    }

    @observable types = []
    @observable category = null
    @observable itemsOnPage = 20
    @observable infoOpenedForId = 0

    @action init = (cat) => {
        if (this.populated) return;

        this.category = cat
        this.offset = 0;
        this.next = null;
        this.pokemons = []
        this.count = 0;
        Promise.all([this.getTypes(), this.getPockemons()]).then(() => this.populated = true)
    }

    @action setType = (cat) => {
        this.category = cat
        this.offset = 0;
        this.next = null;
        this.pokemons = []
        this.count = 0;
        this.getPockemons()
    }



    @action nextPage = async() => {
        if (this.pokemons.length <= this.offset + this.itemsOnPage && this.next) {

            try {
                await this.getPockemons(this.next)
            } catch (err) {

            }
        }
        if (this.offset + this.itemsOnPage >= this.count) this.offset = this.count
        else this.offset = this.offset + this.itemsOnPage
    }

    @action previousPage = () => {
        const result = this.offset - this.itemsOnPage
        this.offset = result > 0 ? result : 0
    }

    @action setItemsOnPage = (itemsNum) => this.itemsOnPage = itemsNum

    @action setHighlightPattern = (pattern) => {
        //add to favorite

        //to server
        this.highlightPattern = pattern.toLowerCase()
            //select here
    }




    @action changePockemonInoState = async(val) => {
        const that = this;
        const id = parseInt(val);
        if (that.infoOpenedForId === id) {
            that.infoOpenedForId = null

        } else {

            that.infoOpenedForId = id
            if (that.pokemonsInfo.has(id)) return
            try {
                that.pokemonsInfo.set(id, await that.getInfo(id))
            } catch (e) {
                console.log(e)
            }
        }
    }


    getInfo = (id) => {

        const that = this;
        return fetch(`${ApiRoot}/pokemon/${id}/`) // Call the fetch function passing the url of the API as a parameter
            .then(r => {
                if (r.status !== 200) throw r;
                return r;
            })
            .then(r => r.json())
            .catch(r => {
                console.error(r);
                throw e
            });
    }

    getTypes = () => {
        const that = this;
        return fetch(`${ApiRoot}/type/`) // Call the fetch function passing the url of the API as a parameter
            .then(r => {
                if (r.status !== 200) throw r;
                return r;
            })
            .then(r => r.json())
            .then(r => {
                if (!r.results) return;
                that.types = r.results
            })
            .catch(r => {
                console.error(r);
                throw e
            });
    }

    getPockemons = async(url = `${ApiRoot}/pokemon/`, q = null) => {
        const that = this
        that.busy = true

        const query = q || {};
        let promise = null;

        return (that.category ? fetch(that.category) // Call the fetch function passing the url of the API as a parameter
                
                .then(r => {

                    if (r.status !== 200) throw r;
                    return r;
                })
                .then(r => r.json())
                .then(r => {
    
                    that.pokemons = r.pokemon.map(el => el.pokemon)

                    that.count = r.pokemon.length

                    return that.pokemons
                }) :
                promise = fetch(url, query) // Call the fetch function passing the url of the API as a parameter
                .then(r => {
                    if (r.status !== 200) throw r;
                    return r;
                })
                .then(r => r.json())
                .then(r => {

                    //add to the end
                    that.previous = r.previous
                    that.next = r.next
                    that.count = r.count
                    that.pokemons = that.pokemons.concat(r.results)
                    return that.pokemons
                })
            )
            .then(() => that.busy = false)
            .catch(e => {
                that.busy = false;
                throw e
            })
    }

}
