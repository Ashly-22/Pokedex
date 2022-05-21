# Pokedex

In this project a web page was created that simulates a Pokédex, you can see the information of each pokemon.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites


```
Install the last version of node.js in https://nodejs.org/en/download/
```
```
Update NPM 
npm install -g npm@latest
```

### Installing

A step by step series of examples that tell you how to get a development env running

Clone de proyect

```
https://github.com/Ashly-22/Pokedex.git
```

Install de package necesary

```
npm install
```
To start the project

```
npm start
```

You're ready!

Go to
```
http://localhost:3000
```

Entering the website, you can see the scroll with the different Pokémon’s.
![image](https://user-images.githubusercontent.com/38229758/169646991-6e6fa960-f0b8-4477-973f-3226bc3e3d04.png)

When you click on one, its information is displayed
![image](https://user-images.githubusercontent.com/38229758/169647039-f3a74432-116f-42f7-a7a6-59f518b2c59d.png)

### Solution

Function to get the data of each pokemon
```
 const reqApi = async () => {
    const api = await fetch(loadMore);
    const resp = await api.json();
    let list = [];
    function createPokemonObj(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const resp = await res.json();
        setCharacters((currentList) => [...currentList, resp]);
        characters?.sort((a, b) => (a.id > b.id ? 1 : -1));
      });
    }
    createPokemonObj(resp.results);
    setCharacters(list);
  };
  ```
Function to get the images of the evolution of each pokemon
```
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
  ```
Function to search the images of the evolution of each pokemon
  ```
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
  ```
For the solution of the project, two components were created, in the first the cards and the scroll are rendered, in the second the information of the chosen pokemon is shown.

## Built With

* [React](https://es.reactjs.org/docs/getting-started.html) - The web framework used
* [Pokeapi](https://pokeapi.co/docs/v2
) - Data consumed


## Authors

* **Daniela Alvarado** - [Ashly-22](https://github.com/Ashly-22)



