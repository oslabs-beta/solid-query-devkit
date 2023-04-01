// NOTE: It's likely that not all queries will exactly match the shape required by 
// the constant definitions within the <For> component. It may be necessary to 
// include some conditional logic there to ensure that all props are properly 
// captured and passed to the <SingleKey> components.

// ALSO: Ideally the data() passed into <For> will automatically update any time
// the corresponding resource is updated (currently onMount), but this 
// isn't built out yet.

import SingleKey from './SingleKey';
import { For, createSignal, onMount, useContext } from 'solid-js';
import { QueryContext } from "./QueryContext";

export default function QueryKeyList (props)   {

 const {queries, setQueries} = useContext(QueryContext)
 const {status, setStatus} = useContext(QueryContext)

  return (
    <div>
      {/* For each query, render a SingleKey component, passing down the necessary information from the query cache as props */}
      <For each={queries()}>
        {(query, i) => {
          return <SingleKey
            key={query.queryHash}
            index={i()}
          />
        }}
      </For>
    </div>
  );
};