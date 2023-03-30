import { useContext, createSignal } from "solid-js";
import { QueryContext } from "./QueryContext";
import { useQueryClient } from "@tanstack/solid-query";


export default function SingleKey(props)   {
  const queryClient = useQueryClient();
  const {activeQuery, setActiveQuery} = useContext(QueryContext)
  const {queries, setQueries} = useContext(QueryContext)

  return (
    <div onClick={() => {
      
      setActiveQuery(queries().filter(obj => obj.queryHash == props.queryHash)[0])
      console.log('acitve query: ', activeQuery())
      // console.log(queryClient.getQueryCache().queries)
    }}>
      <span>{props.numOfObservers}</span>
      <span>{props.queryHash}</span>
      <span>test: {activeQuery().state ? queries()[1].state.status : 'test' }</span>
    </div>
  );
};