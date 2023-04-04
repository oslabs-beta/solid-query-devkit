// NOTE: It's likely that not all queries will exactly match the shape required by 
// the constant definitions within the <For> component. It may be necessary to 
// include some conditional logic there to ensure that all props are properly 
// captured and passed to the <SingleKey> components.

// ALSO: Ideally the data() passed into <For> will automatically update any time
// the corresponding resource is updated (currently onMount), but this 
// isn't built out yet.

import SingleKey from './SingleKey';
import { For, useContext, createSignal } from 'solid-js';
import { QueryContext } from "./QueryContext";
import { useQueryClient } from "@tanstack/solid-query";

export default function QueryKeyList (props)   {

 const {queries, setQueries} = useContext(QueryContext)
 const {status, setStatus} = useContext(QueryContext)
 const {sort} = useContext(QueryContext)
 const {sortReverse} = useContext(QueryContext)
 const {filter} = useContext(QueryContext)

 const derivedQueries = () => {
  if (sort() === 'last-updated') {
    let toReturn =  queries().sort((a, b) => {
      const nameA = a.state.dataUpdatedAt
      const nameB = b.state.dataUpdatedAt
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      console.log(nameA)
    })

    if (filter().length) {
      return sortReverse() ? toReturn.reverse().filter((query) => query.queryHash.includes(filter())) : toReturn.filter((query) => query.queryHash.includes(filter()))
    } else {
      return sortReverse() ? toReturn.reverse() : toReturn
    }
    
  } 
  if (sort() === 'hash') {
    return queries().sort((a, b) => {
      const nameA = a.queryHash.toUpperCase()
      const nameB = b.queryHash.toUpperCase()
      if (nameA > nameB) return 1;
      if (nameA < nameB) return -1;
    })
  } 
  
  else {
    return queries()
  }
 }

  return (
    <div>
      {/* For each query, render a SingleKey component, passing down the necessary information from the query cache as props */}
      <For each={derivedQueries()}>
        {(query, i) => {
          console.log(query)
          return <SingleKey
            key={query.queryHash}
            index={i()}
          />
        }}
      </For>
    </div>
  );
};