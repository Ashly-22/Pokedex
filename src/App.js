import "./App.css";
import { useState, useEffect } from "react";
import Cardspokemon from "./Components/Cardspokemon";

function App() {
  const [characters, setCharacters] = useState();
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=150"
  );

  //Metodo para obtener la lista de pokemones de la API
  const reqApi = async () => {
    const api = await fetch(loadMore);
    const resp = await api.json();

    //setLoadMore(resp.next)

    let list = [];
    function createPokemonObj(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const resp = await res.json();

        setCharacters((currentList) => [...currentList, resp]);
        characters?.sort((a, b) => (a.id > b.id ? 1 : -1));
      });
    }
    createPokemonObj(resp.results);
    setCharacters(list);
  };

  useEffect(() => reqApi, []);

  return (
    <div className="App">
      <Cardspokemon values={characters} />
    </div>
  );
}

export default App;
