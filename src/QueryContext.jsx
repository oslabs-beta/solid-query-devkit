import { createContext, createSignal } from "solid-js";
import { createStore } from 'solid-js/store';
import { useQueryClient } from "@tanstack/solid-query";

export const QueryContext = createContext();

export function QueryProvider (props) {

  const [activeQuery, setActiveQuery] = createSignal({})
  const [queries, setQueries] = createSignal([]);
  const [status, setStatus] = createSignal('loading');
  const [loading, setLoading] = createSignal(0);

  //showData & showModal
  const [showModal, setShowModal] = createSignal(false);
  const [showData, setShowData] = createSignal(false);


  const queryClient = useQueryClient()

  queryClient.queryCache.subscribe(() => {
    setQueries(() => [...queryClient.queryCache.queries]);
    setLoading(queryClient.isFetching());
    console.log('queries in signal:', queries())

  });

  return (
    <QueryContext.Provider value={{queries, setQueries, activeQuery, setActiveQuery, status, setStatus, showModal, setShowModal, showData, setShowData, loading, setLoading}}>
      {props.children}
    </QueryContext.Provider>
  )
}