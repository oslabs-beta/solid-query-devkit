import SingleKey from './SingleKey';
import { For, useContext, createSignal } from 'solid-js';
import { QueryContext } from "./QueryContext";
import { useQueryClient } from "@tanstack/solid-query";

export default function QueryKeyList(props) {

  const { queries, setQueries } = useContext(QueryContext);
  const { status, setStatus } = useContext(QueryContext);
  const { sort } = useContext(QueryContext);
  const { sortReverse } = useContext(QueryContext);
  const { filter } = useContext(QueryContext);
  const { statusFilters, setStatusFilters } = useContext(QueryContext);

  const derivedQueries = () => {
    if (sort() === 'last-updated') {
      let toReturn = queries().sort((a, b) => {
        const nameA = a.state.dataUpdatedAt
        const nameB = b.state.dataUpdatedAt
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        console.log(nameA)
      })

      // fetching
      if (statusFilters().active && statusFilters().status === 'fetching') {
        toReturn = toReturn.filter(query => query.state.fetchStatus == 'fetching');
      }

      // paused
      else if (statusFilters().active && statusFilters().status === 'paused') {
        toReturn = toReturn.filter(query => query.state.fetchStatus == 'paused');
      }

      // fresh
      else if (statusFilters().active && statusFilters().status === 'fresh') {
        toReturn = toReturn.filter(query => !query.isStale() && query.getObserversCount());
      }

      // stale
      else if (statusFilters().active && statusFilters().status === 'stale') {
        toReturn = toReturn.filter(query => query.isStale());
      }

      // inactive
      else if (statusFilters().active && statusFilters().status === 'inactive') {
        toReturn = toReturn.filter(query => !query.observers.length);
      }

      if (filter().length) {
        return sortReverse() ? toReturn.reverse().filter((query) => query.queryHash.includes(filter())) : toReturn.filter((query) => query.queryHash.includes(filter()))
      } else {
        return sortReverse() ? toReturn.reverse() : toReturn
      }

    }
    if (sort() === 'hash') {
      let toReturn = queries().sort((a, b) => {
        const nameA = a.queryHash.toUpperCase()
        const nameB = b.queryHash.toUpperCase()
        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
      })


      // fetching
      if (statusFilters().active && statusFilters().status === 'fetching') {
        toReturn = toReturn.filter(query => query.state.fetchStatus == 'fetching');
      }

      // paused
      else if (statusFilters().active && statusFilters().status === 'paused') {
        toReturn = toReturn.filter(query => query.state.fetchStatus == 'paused');
      }

      // fresh
      else if (statusFilters().active && statusFilters().status === 'fresh') {
        toReturn = toReturn.filter(query => !query.isStale() && query.getObserversCount());
      }

      // stale
      else if (statusFilters().active && statusFilters().status === 'stale') {
        toReturn = toReturn.filter(query => query.isStale());
      }

      // inactive
      else if (statusFilters().active && statusFilters().status === 'inactive') {
        toReturn = toReturn.filter(query => !query.observers.length);
      }

      if (filter().length) {
        return sortReverse() ? toReturn.reverse().filter((query) => query.queryHash.includes(filter())) : toReturn.filter((query) => query.queryHash.includes(filter()))
      } else {
        return sortReverse() ? toReturn.reverse() : toReturn
      }
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