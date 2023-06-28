import SingleKey from './SingleKey';
import { For, useContext, JSX } from 'solid-js';
import { QueryContext } from "./Context";
import {sortQueries, filterQueries} from './Helpers'
import type { Query } from '@tanstack/solid-query'

export default function QueryKeyList(): JSX.Element {

  const { queries, sort, filter } = useContext<any>(QueryContext);

    const derivedQueries = (): Query[] => {
      return sort().reverse ? 
      filterQueries(sortQueries(queries(), sort().type), filter()).reverse()
      : filterQueries(sortQueries(queries(), sort().type), filter())
    }
  
    return (
      <div>
        {/* For each query, render a SingleKey component, passing down the necessary information from the query cache as props */}
        <For each={derivedQueries()}>
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