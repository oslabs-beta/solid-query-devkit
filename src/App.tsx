
import { ObjectComponent } from './ObjectComponent';
import { createQuery } from '@tanstack/solid-query'
import { For } from 'solid-js';
import PokeName from './PokeName';
import SolidQueryDevtools from './SolidQueryDevtools';
import { JSX } from 'solid-js'


function App(): JSX.Element {
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
    <ObjectComponent obj={testObj} key={"testObj"} level={0} />
     <For each={query.data}>
        {(pokemon, i) =>
          <PokeName name={pokemon.name} url={pokemon.url} num={i() + 1}/>
        }
      </For>
      <SolidQueryDevtools />
    </>
  );
}

export default App;