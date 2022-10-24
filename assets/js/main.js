
// carregar lista de pokemons
// carregar detalhes do pokemon

// converter pokemon para LI
// classe Pokemon

// paginação


// fetch(url)
// .then(()=>{})
// .catch(()=>{})
// .finally(()=>{})


class Pokemon {
    numero = 0;
    nome = "";
    tipo = "";
    tipos = [];
    imagem = "";
}

function converterPokemonToLi(pokemon) {
    return `
    <li class="pokemon">
        <span class="number">${pokemon.numero}</span>
        <span class="name">${pokemon.nome}</span>
        <div class="detail">
            <ol class="types">
                <li class="type">grass</li>
                <li class="type">poison</li>
            </ol>
            <img src="${pokemon.imagem}"
                alt="${pokemon.nome}">
        </div>
    </li>
    `;
}

// function pokemonDetails(){
//     return ``;
// }


const pokeApiUrl = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`;

let getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((r) => r.json())
}

function convertToPokemonModel(pokemonObj) {
    const pokemon = new Pokemon();
    pokemon.numero = pokemonObj.order
    pokemon.nome = pokemonObj.name;
    pokemon.tipos = pokemonObj.types.map((pkType) => pkType.type.name);
    pokemon.tipo = pokemon.tipos[0]
    pokemon.imagem = pokemonObj.sprites.front_default
    return pokemon;
}

fetch(pokeApiUrl)
    .then((resp) => resp.json())
    .then((json) => json.results)
    .then((pokemonList) => pokemonList.map(getPokemonDetail))
    .then((detailequests) => Promise.all(detailequests))
    .then((pokeDetails) => pokeDetails.map(convertToPokemonModel))
    .then((pokemons) => {
        let pokeLI = pokemons.map(converterPokemonToLi).join("");

        document.getElementById("pokemonList")
            .innerHTML = pokeLI;

    })
