import SingleKey from './SingleKey';
import { For, useContext } from 'solid-js';
import { QueryContext } from "./QueryContext";
import {sortQueries, filterQueries} from './Helpers'

export default function QueryKeyList(props) {

  const { queries } = useContext(QueryContext);
  const { sort } = useContext(QueryContext);
  const { sortReverse } = useContext(QueryContext);
  const { filter } = useContext(QueryContext);
  const { statusFilters } = useContext(QueryContext);

  const derivedQueries = () => {
    return sortReverse() ? 
    filterQueries(sortQueries(queries(), sort()), filter(), statusFilters()).reverse()
    : filterQueries(sortQueries(queries(), sort()), filter(), statusFilters())
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