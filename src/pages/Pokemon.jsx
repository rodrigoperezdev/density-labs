import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { startSettingCurrentPokemons } from "../store/thunks";
import { Link } from "react-router-dom";
import { StatsBar } from "../components/StatsBar";

export const Pokemon = () => {
  const { pokemonName, isLoading } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startSettingCurrentPokemons(pokemonName));
  }, [dispatch, pokemonName]);

  const { current } = useSelector((state) => state.pokemons);
  console.log(current);

  //I was having a little bit of a problem (actually a pretty huuge problem in my session) so as an async function I needed to make sure the data was fetching and also needed to have a error handling in the component
  if (!current || current.name !== pokemonName) {
    return <div>Loading...</div>;
  }

  return (
    <section className="pokemon-individual">
      {isLoading ? (
        <div>
          <h3>Loading...</h3>
        </div>
      ) : (
        <>
          {" "}
          <div className="pokemon-individual__image-container">
            <img
              src={current.sprites?.other.home.front_default}
              alt={`${current.name} pokemon`}
            />
          </div>
          <div className="pokemon-individual__list">
            <div>
              <h1>{current.name}</h1>
              <div className="pokemon-individual__description">
                <p>Height: {current.height}</p>
                <p>Experience: {current.base_experience}</p>
              </div>
            </div>
            <div>
              <h3>Type</h3>
              <div>
                {Array.isArray(current.types) ? (
                  current.types.map((type) => (
                    <h4 key={type.type.name}>{type.type.name}</h4>
                  ))
                ) : (
                  <div>{current.types.name}</div>
                )}
              </div>
            </div>
            <div>
              <h3>Stats:</h3>

              {current.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <h3>{stat.stat.name}</h3>
                  <StatsBar percent={stat.base_stat} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <Link className="btn" to={"/"}>
              Go back
            </Link>
          </div>
        </>
      )}
    </section>
  );
};
