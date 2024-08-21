import { setCurrentPokemon, setIsLoading, setPokemons } from "./slice";

const baseUrl = "https://pokeapi.co/api/v2/pokemon/";

export const startLoadingPokemons = (offset) => {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    const resp = await fetch(`${baseUrl}?offset=${offset}&limit=20`);

    //This is one of the changes I made, I was sending the data directly but decided tu desestructure the results so I don't have to handle this logic in the Home page
    const { results } = await resp.json();
    dispatch(setPokemons(results));
    dispatch(setIsLoading(false));
  };
};

export const startSettingCurrentPokemons = (name) => {
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const resp = await fetch(`${baseUrl}${name}`);

      if (!resp.ok) {
        throw new Error(`Error getting the pokemon ${resp.status}`);
      }

      const data = await resp.json();
      dispatch(setCurrentPokemon(data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };
};
