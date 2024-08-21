import { createSlice } from "@reduxjs/toolkit";

//This slice gets the pokemons array and sets it to the state so It can be used through the web App
export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState: {
    isLoading: false,
    current: {},
    pokemons: [],
  },
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setCurrentPokemon: (state, action) => {
      state.current = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default pokemonsSlice.reducer;

export const { setPokemons, setCurrentPokemon, setIsLoading } =
  pokemonsSlice.actions;
