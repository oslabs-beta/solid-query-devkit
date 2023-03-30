// NOTE: It's likely that not all queries will exactly match the shape required by 
// the constant definitions within the <For> component. It may be necessary to 
// include some conditional logic there to ensure that all props are properly 
// captured and passed to the <SingleKey> components.

// ALSO: Ideally the data() passed into <For> will automatically update any time
// the corresponding resource is updated (currently onMount), but this 
// isn't built out yet.

import SingleKey from './SingleKey';
import { useQueryClient } from '@tanstack/solid-query';
import { For, createSignal, onMount } from 'solid-js';

export default function QueryKeyList (props)   {
  const queryClient = useQueryClient();


    // create a queries signal
    const [ queries, setQueries ] = createSignal([]);

    // onMount, fetch the queries and use setQueries to update the appropriate signal
    onMount(async () => {
      const queryClient = useQueryClient();
      const newQueries = await queryClient.getQueryCache().queries;
      setQueries(newQueries);
    })

  return (
    <div>
      {/* For each query, render a SingleKey component, passing down the necessary information from the query cache as props */}
      <For each={queries()}>
        {(query, index) => {
          const queryKey = query.queryKey;
          const numOfObservers = query.observers.length;
          const { isStale } = query.observers[0].currentResult;
          const { isFetching } = query.observers[0].currentResult;
          const { enabled } = query.observers[0].options;
          const { queryHash } = query;
          return <SingleKey
            queryKey={queryKey}
            numOfObservers={numOfObservers}
            isStale={isStale}
            isFetching={isFetching}
            enabled={enabled}
            queryHash={queryHash}
            index={index()}
          />
        }}
      </For>
    </div>
  );
};