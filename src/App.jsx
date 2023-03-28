import logo from './logo.svg';
import styles from './App.module.css';

import { QueryClient, QueryClientProvider, createQuery, QueryCache, useQueryClient } from '@tanstack/solid-query'
import { For, useContext } from 'solid-js';
import PokeName from './PokeName';



function App() {
  const query = createQuery(() => ['pokemonList'], 
  async () => {
    let data = await fetch('https://pokeapi.co/api/v2/pokemon/')
    data = await data.json()
    return data.results;
  })

  return (
    <>
     <For each={query.data}>
         {(pokemon, i) => 
        <PokeName name={pokemon.name} url={pokemon.url} num={i() + 1}/>
          }
      </For>
    </>
     
  
  );
}

export default App;
