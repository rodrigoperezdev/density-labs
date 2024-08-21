import { configureStore } from "@reduxjs/toolkit";
import { pokemonsSlice } from "./slice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsSlice.reducer,
  },
});
