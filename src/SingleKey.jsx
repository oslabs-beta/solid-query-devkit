import { useContext, createSignal } from "solid-js";
import { QueryContext } from "./QueryContext";
import { useQueryClient } from "@tanstack/solid-query";


export default function SingleKey(props)   {
  const queryClient = useQueryClient();
  const {activeQuery, setActiveQuery} = useContext(QueryContext)
  const {queries, setQueries} = useContext(QueryContext)
  
  const query = () => (queries().filter((query) => query.queryHash === props.key)[0])

  return (
    <div onClick={() => {
      setActiveQuery(query())
      console.log('acitve query:', activeQuery())
    }}>
      <span>{query().state.status || 'undefined'}</span>
    </div>
  );
};