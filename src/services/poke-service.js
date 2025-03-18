class PokeService {
    static BASE_URL = "https://pokeapi.co/api/v2/"

    static POKE_URL = "pokemon/"

    static TOT_POKEMON = 1302

    constructor(limit = 20, offset = 0) {
        this.limit = limit
        this.offset = offset

    }

    getData() {
        const url = PokeService.BASE_URL + PokeService.POKE_URL + '?limit=' + this.limit + '&offset=' + this.offset;

        return fetch(url)
            .then(res => res.json())
            .then(data => {
                const array = [] //conterrà nome e immagine

                for (const pokemon of data.results) {

                    const request = fetch(pokemon.url)
                        .then(res => res.json())
                        .then(data => {
                            const pokemonObj = {}
                            pokemonObj.name = data.name;
                            pokemonObj.img = data.sprites.front_default;

                            return pokemonObj
                        })


                    array.push(request)

                }
                return Promise.all(array)

            })
            .catch(err => err)

    }

    previousPage() {
        const maxPage = Math.floor(PokeService.TOT_POKEMON / this.limit)
        const currentPage = this.offset / this.limit

        if (currentPage > 0) {
            this.offset -= this.limit //diminusce pagina
        } else {
            this.offset = maxPage * this.limit
        }
        console.log(this.offset)
    }

    nextPage() {
        const maxPage = Math.floor(PokeService.TOT_POKEMON / this.limit)
        const currentPage = this.offset / this.limit

        if (currentPage < maxPage) {
            this.offset += this.limit //aumenta pagina
        } else {
            this.offset = 0
        }
        console.log(this.offset)
    }
}

export default PokeService

