import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadingPokemons } from "../store/thunks";
import { PokemonButton } from "../components/PokemonButton";

import defaultImage from "../assets/images/pokemon-home.png";

export const Home = () => {
  const [offset, setOffset] = useState(0);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [imgUrl, setImgUrl] = useState(defaultImage);
  const [isLoadingLocally, setIsLoadingLocally] = useState(false);

  const { pokemons, isLoading } = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadingPokemons(offset));
  }, [dispatch, offset]);

  const handleOffsetIncrement = () => {
    setOffset(offset + 20);
    setPrevDisabled(false);
    if (offset + 20 >= 131) {
      setOffset(131);
      setNextDisabled(true);
      return;
    }
  };

  const handleOffsetDecrement = () => {
    setNextDisabled(false);
    setOffset(offset - 20);
    if (offset <= 20) {
      setOffset(0);
      setPrevDisabled(true);
      return;
    }
  };

  //Since this is a pretty simple state and because of lack of time only used here i prefer not to use Redux and complicate the code for free
  const handleActivePokemon = async (url) => {
    try {
      setIsLoadingLocally(true);
      const response = await fetch(url);
      const data = await response.json();
      setImgUrl(data.sprites.other.home.front_default);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setIsLoadingLocally(false);
    }
  };

  return (
    <section className="pokemon-home">
      <div className="pokemon-home__image-container">
        {isLoadingLocally ? (
          <div>Loading...</div>
        ) : (
          <img src={imgUrl} alt="Pokemon" />
        )}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="pokemon-home__list">
          <div className="pagination-button">
            <button onClick={handleOffsetDecrement} disabled={prevDisabled}>
              {"<"}
            </button>
          </div>
          <div className="pokemon-home__names">
            {pokemons.map((pokemon) => (
              <PokemonButton
                handleActivePokemon={handleActivePokemon}
                key={pokemon.name}
                pokemon={pokemon}
              />
            ))}
          </div>
          <div className="pagination-button">
            <button onClick={handleOffsetIncrement} disabled={nextDisabled}>
              {">"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
