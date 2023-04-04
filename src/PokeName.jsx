import { useQueryClient, QueryCache, createQuery } from '@tanstack/solid-query'
import { createSignal } from 'solid-js'

export default function PokeName(props) {
  const queryClient = useQueryClient()
  // console.log(queryClient.getQueryCache())

  const [enabled, setEnabled] = createSignal(false)

  const query = createQuery(() => ['pokemon', props.num],
  async () => {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.num}`)
    data = await data.json()
    return data;
  }, 
  {
    get enabled() {
      return enabled();
    },
    staleTime: 5000
  },
  )



  return(
    <div>
      <button onClick={() => {
        setEnabled(true)
        console.log(queryClient.getQueryCache())
        }
        }>log query</button>
      <h1>{props.name}</h1>
      <h2>{props.url}</h2>
      <Switch>
      <Match when={query.isLoading}>
          <p></p>
        </Match>
        <Match when={query.isError}>
          <p>Error: {query.error.message}</p>
        </Match>
        <Match when={query.isSuccess}>
          <For each={query.data.types}>
            {(type) => <p>{type.type.name}</p>}
          </For>
          </Match>
          </Switch>
    </div>
  )
}