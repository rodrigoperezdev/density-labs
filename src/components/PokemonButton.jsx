import { useNavigate } from "react-router-dom";

export const PokemonButton = ({ pokemon, handleActivePokemon }) => {
  const navigate = useNavigate();

  const handleDoubleClick = (pokemon) => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <div className="pokemon-home__name">
      <div
        onClick={() => handleActivePokemon(pokemon.url)}
        onDoubleClick={() => handleDoubleClick(pokemon)}
      >
        {pokemon.name}
      </div>
    </div>
  );
};
