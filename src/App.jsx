import logo from './logo.svg';
import styles from './App.module.css';

import { QueryClient, QueryClientProvider, createQuery, QueryCache, useQueryClient } from '@tanstack/solid-query'
import { For, useContext } from 'solid-js';
import PokeName from './PokeName';
import { ObjectComponent } from './JSONComponents/ObjectComponent';
import { Header } from './Header'



function App() {
  const query = createQuery(() => ['pokemonList'], 
  async () => {
    let data = await fetch('https://pokeapi.co/api/v2/pokemon/')
    data = await data.json()
    return data.results;
  })

  const testObj = {
    name: 'dakota',
    age: 28,
    cool: true,
    lilBit: true,
    somethingElse: undefined,
    testNull: null,
    arrTest: [1,2,3],
    arr2Test: ['test', 3, null, true, {'please': 'work'},{'hello': 'bye'}]
  }

  return (
    <>
    <Header name={'Data Explorer'} />
    <ObjectComponent obj={testObj} key={"testObj"} level={0} />
     <For each={query.data}>
         {(pokemon, i) =>
        <PokeName name={pokemon.name} url={pokemon.url} num={i() + 1}/>
          }
      </For>
    </>
     
  
  );
}

export default App;
