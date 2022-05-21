import React from "react";
import "../styles/PokemonView.css";

const PokemonView = ({ infoPokemon, species, EvolutionImages}) => {
  return (
    <>
      {!infoPokemon ? ("") : (
        <div className="panel-info">
          <div className="container-info">
            <div className="cont-imag">
              <img className="principal-image" src={infoPokemon.sprites.other.dream_world.front_default} alt={infoPokemon.name}/>
              <h2>{infoPokemon.name}</h2>
              <div className="Types">{infoPokemon.types.map((poke) => {return (<div className="group" key={poke.type.name}><h5>{poke.type.name}</h5></div>);})}
              </div>
            </div>
            <div className="cont-information">
              <h2>Information</h2>
                  <h4><b>Weigth</b> {infoPokemon.weight}</h4>
                  <h4><b>Height:</b> {infoPokemon.height}</h4>
                  <h4><b>Egg-groups:</b> <div className="in-line">{!species? "": species?.egg_groups.map((poke) => {return (<div key={poke.name}> {poke.name}</div>);})}</div></h4>
                  <h4><b>Abilities:</b> <div className="in-line">{infoPokemon.abilities.map((poke) => {return (<div key={poke.ability.name}> {poke.ability.name} </div>);})}</div></h4>
            </div>
          </div>
          <div className="divide"/>
          <h2>Evolution Chart</h2>
          <div className="images_evolution">
            {!EvolutionImages? "": EvolutionImages?.map((poke) => {return (<div className="cont-evol" key={poke.image} ><img className="evolution-image" src={poke.image}/>{poke.name}</div>);})}
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonView;
