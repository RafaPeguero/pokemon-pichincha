
const baseUrl = 'https://pokemon-pichincha.herokuapp.com/pokemons';

export const ApiUrls = {
    getPokemon:`${baseUrl}`,
    getAllPokemons:`${baseUrl}/?idAuthor=1`,
    getPokemonsAmount:`${baseUrl}/count?idAuthor=1`,
    addPkemon:`${baseUrl}/?dAuthor=1`,
    updatePokemon:`${baseUrl}`
};