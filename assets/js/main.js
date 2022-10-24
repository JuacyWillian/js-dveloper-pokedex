(() => {

    let convertPokemonToLi = (pokemon) => {
        return `
    <li class="pokemon ${pokemon.tipo}">
        <span class="number">${pokemon.numero}</span>
        <span class="name">${pokemon.nome}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.tipos.map((tipo) => `<li class="type">${tipo}</li>`).join("")}
            </ol>
            <img src="${pokemon.imagem}"
                alt="${pokemon.nome}">
        </div>
    </li>
    `;
    }

    let loadPokemonItens = (offset, limit) => {
        pokeApi.getPokemons(offset, limit).then((pokemons) => {
            let pokeLI = pokemons.map(convertPokemonToLi).join("");

            document.getElementById("pokemonList").innerHTML += pokeLI;
        })
    }

    let offset = 0
    let limit = 25
    const maxRecords = 150

    loadPokemonItens(offset, limit);
    loadMorePokemons.addEventListener('click', () => {
        offset += limit
        if (offset + limit > maxRecords) limit = maxRecords - offset;

        if (limit > 0) {
            loadPokemonItens(offset, limit);
        }
    });

})();
