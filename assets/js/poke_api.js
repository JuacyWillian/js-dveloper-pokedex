
let pokeApi = {}

function convertToPokemonModel(pokemonObj) {
    const pokemon = new Pokemon();
    pokemon.numero = pokemonObj.order
    pokemon.nome = pokemonObj.name;
    pokemon.tipos = pokemonObj.types.map((pkType) => pkType.type.name);
    pokemon.tipo = pokemon.tipos[0]
    pokemon.imagem = pokemonObj.sprites.front_default
    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((r) => r.json())
}

pokeApi.getPokemons = (offset, limit) => {
    const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(pokeApiUrl)
        .then((resp) => resp.json())
        .then((json) => json.results)
        .then((pokemonList) => pokemonList.map(pokeApi.getPokemonDetail))
        .then((detailequests) => Promise.all(detailequests))
        .then((pokeDetails) => pokeDetails.map(convertToPokemonModel))
}
