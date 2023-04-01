import { createContext, createSignal } from "solid-js";
import { createStore } from 'solid-js/store';
import { useQueryClient } from "@tanstack/solid-query";

export const QueryContext = createContext();

export function QueryProvider (props) {

  const [activeQuery, setActiveQuery] = createSignal({})
  const [queries, setQueries] = createStore([]);
  console.log(queries, setQueries);
  const [status, setStatus] = createSignal('loading');

  const queryClient = useQueryClient()

  queryClient.queryCache.subscribe(() => {
    setQueries(() => [...queryClient.queryCache.queries])
    console.log('queries in signal:', queries)
  });

  return (
    <QueryContext.Provider value={{queries, setQueries, activeQuery, setActiveQuery, status, setStatus}}>
      {props.children}
    </QueryContext.Provider>
  )
}