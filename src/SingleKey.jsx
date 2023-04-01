import { useContext, createSignal } from "solid-js";
import { QueryContext } from "./QueryContext";
import { useQueryClient } from "@tanstack/solid-query";


export default function SingleKey(props)   {
  const queryClient = useQueryClient();
  const {activeQuery, setActiveQuery} = useContext(QueryContext)
  const {queries, setQueries} = useContext(QueryContext)

  const status = () => props.status;

  return (
    <div onClick={() => {
      
      setActiveQuery(queries().filter(obj => obj.queryHash == props.queryHash)[0])
      console.log('acitve query: ', activeQuery())
      // console.log(queryClient.getQueryCache().queries)
    }}>
      <span>Observers: {props.numOfObservers}</span>
      <span>Key: {props.queryKey}</span>
      <span>Status: {status()}</span>
      <span>Index: {props.index}</span>
    </div>
  );
};