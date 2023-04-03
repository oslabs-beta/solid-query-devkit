import { createContext, createSignal } from "solid-js";
import { createStore } from 'solid-js/store';
import { useQueryClient } from "@tanstack/solid-query";

export const QueryContext = createContext();

export function QueryProvider (props) {

  const [activeQuery, setActiveQuery] = createSignal()
  const [queries, setQueries] = createSignal([]);
  const [status, setStatus] = createSignal('loading');

  //showData & showModal
  const [showModal, setShowModal] = createSignal(false);
  const [showData, setShowData] = createSignal(false);


  const queryClient = useQueryClient()

  queryClient.queryCache.subscribe(() => {
    setQueries(() => [...queryClient.queryCache.queries]);
    console.log('updated queries')
    // console.log('queryCache updated');
    if (activeQuery()) {
      setActiveQuery({...queries().filter((query) => query.queryHash == activeQuery().queryHash)[0]});
      console.log('activeQuery updated');
    }
  });

  return (
    <QueryContext.Provider value={{queries, setQueries, activeQuery, setActiveQuery, status, setStatus, showModal, setShowModal, showData, setShowData}}>
      {props.children}
    </QueryContext.Provider>
  )
}