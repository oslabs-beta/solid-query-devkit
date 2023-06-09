import { createContext, createSignal } from "solid-js";
import { useQueryClient } from "@tanstack/solid-query";

export const QueryContext = createContext();

export function QueryProvider (props) {
  const queryClient = useQueryClient();

  const [activeQuery, setActiveQuery] = createSignal();
  const [queries, setQueries] = createSignal([]);
  const [sort, setSort] = createSignal({type: 'last-updated', reverse: false});
  const [filter, setFilter] = createSignal({text: '', status: ''});

  //showData & showModal
  const [showModal, setShowModal] = createSignal(false);


  //subscribing to the query cache, which runs the function every time the queryCache updates 
  queryClient.queryCache.subscribe(() => {
    setQueries(() => [...queryClient.queryCache.queries]);
    if (activeQuery()) {
      setActiveQuery({...queries().filter((query) => query.queryHash == activeQuery().queryHash)[0]});
    };
  });

  return (
    <QueryContext.Provider value={{filter, setFilter, sort, setSort, queries, setQueries, activeQuery, setActiveQuery, showModal, setShowModal}}>
      {props.children}
    </QueryContext.Provider>
  )
}