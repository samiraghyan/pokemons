import { ObservableMap, observable, action, computed} from 'mobx';
const ApiRoot = `https://pokeapi.co/api/v2`


export default class Pokemons {

    @observable highlightPattern = ''

    @observable count = 0
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

        this.highlightPattern = pattern.toLowerCase()

    }

    getTypes = () => {
        return fetch(`${ApiRoot}/type/`) // Call the fetch function passing the url of the API as a parameter
            .then(r => {
                if (r.status !== 200) throw r;
                return r;
            })
            .then(r => r.json())
            .then(r => {
                if (!r.results) return;
                this.types = r.results
            })
            .catch(r => {
                console.error(r);
            });
    }

    getPockemons = async(url = `${ApiRoot}/pokemon/`, q = null) => {
        const query = q || {};
        let promise = null;

        return (this.category ? fetch(this.category) // Call the fetch function passing the url of the API as a parameter
                
                .then(r => {

                    if (r.status !== 200) throw r;
                    return r;
                })
                .then(r => r.json())
                .then(r => {

                    this.pokemons = r.pokemon.map(el => el.pokemon);

                    this.count = r.pokemon.length
                    return this.pokemons
                }) :
                promise = fetch(url, query) // Call the fetch function passing the url of the API as a parameter
                .then(r => {
                    if (r.status !== 200) throw r;
                    return r;
                })
                .then(r => r.json())
                .then(r => {
                    this.previous = r.previous
                    this.next = r.next
                    this.count = r.count
                    this.pokemons = this.pokemons.concat(r.results)
                    return this.pokemons
                })
            )
            .catch(e => {
                console.log(e)
            })
    }

}
