import React from "react";
import { useState} from "react";
import "../styles/CardsPokemon.css";
import PokemonView from "./PokemonView";
import { Card } from "react-bootstrap";

const Cardspokemons = ({ values }) => {
  const [pokeDex, setPokeDex] = useState();
  const [characters, setCharacters] = useState();
  const [images, setImages] = useState([]);

  //Método para obtener las imagenes de la evolución de cada Pokemon
  const evolution = async (infoPokemon) => {
    if (infoPokemon != null) {
      const api = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${infoPokemon.id}`
      );
      const resp = await api.json();
      const api2 = await fetch(resp.evolution_chain.url);
      const resp2 = await api2.json();
      searchImage(resp2.chain.species.url);
      if(resp2.chain.evolves_to.length !== 0){
        searchImage(resp2.chain.evolves_to[0].species.url);
      }
      if(resp2.chain.evolves_to[0].evolves_to[0]!== undefined && resp2.chain.evolves_to[0].evolves_to[0].length !== 0 ){
        searchImage(resp2.chain.evolves_to[0].evolves_to[0].species.url);
      }
      let list = {
        egg_groups: resp.egg_groups
      };
      setCharacters(list);
    }
  };

  //Método que extrae la imagen de la API y la setea en el useState
  const searchImage = async (url) => {
    const getId = await fetch(url);
    const resp = await getId.json();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${resp.id}`);
    const resp2 = await res.json();
    let image = {
      "image":resp2.sprites.other.dream_world.front_default,
      "id":resp.id,
      "name":resp.name
    };
    setImages(currentList => [...currentList, image]);
    images?.sort((a,b)=>a.id>b.id?1:-1);
  };

  return (
    <div className="container-components">
      <div className="container-cards">
        <scroll-container>
          {values?.map((pokemon) => {
            return (
              <div className="container" key={pokemon.id}>
                <Card className="card" onClick={() => {setImages([]);
                                                      setPokeDex(pokemon);
                                                      evolution(pokemon);}}>
                  <img className="image-cont" src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name}/>
                  <h1>{pokemon.name}</h1>
                  <small>#00{pokemon.id}</small>
                </Card>
              </div>);})}
        </scroll-container>
      </div>
      <PokemonView infoPokemon={pokeDex} species={characters} EvolutionImages={images}/>
    </div>
  );
};

export default Cardspokemons;
