import { createContext, createSignal } from "solid-js";
import { createStore } from 'solid-js/store';
import { useQueryClient } from "@tanstack/solid-query";

export const QueryContext = createContext();

export function QueryProvider (props) {

  const [activeQuery, setActiveQuery] = createSignal()
  const [queries, setQueries] = createSignal([]);
  const [status, setStatus] = createSignal('loading');
  const [loading, setLoading] = createSignal(0);

  //showData & showModal
  const [showModal, setShowModal] = createSignal(false);
  const [showData, setShowData] = createSignal(false);


  const queryClient = useQueryClient();

  //subscribing to the query cache, which runs the function every time the queryCache updates 
  queryClient.queryCache.subscribe(() => {
    setQueries(() => [...queryClient.queryCache.queries]);
    setLoading(queryClient.isFetching());
    console.log('queryCache updated', queries());
    if (activeQuery()) {
      setActiveQuery({...queries().filter((query) => query.queryHash == activeQuery().queryHash)[0]});
    }
  });

  return (
    <QueryContext.Provider value={{queries, setQueries, activeQuery, setActiveQuery, status, setStatus, showModal, setShowModal, showData, setShowData, loading, setLoading}}>
      {props.children}
    </QueryContext.Provider>
  )
}