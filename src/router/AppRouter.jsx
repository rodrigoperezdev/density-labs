import { Route, Router, Routes } from "react-router-dom";
import { Home } from "../pages";
import { Pokemon } from "../pages/Pokemon";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />}></Route>
        <Route element={<Pokemon />} path="pokemon/:pokemonName"></Route>
      </Routes>
    </>
  );
};
