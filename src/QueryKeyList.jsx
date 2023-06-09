import SingleKey from './SingleKey';
import { For, useContext } from 'solid-js';
import { QueryContext } from "./Context";
import {sortQueries, filterQueries} from './Helpers'

export default function QueryKeyList() {

  const { queries, sort, filter } = useContext(QueryContext);

    const derivedQueries = () => {
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