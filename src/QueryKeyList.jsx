// NOTE: It's likely that not all queries will exactly match the shape required by 
// the constant definitions within the <For> component. It may be necessary to 
// include some conditional logic there to ensure that all props are properly 
// captured and passed to the <SingleKey> components

// ALSO: Ideally the data() passed into <For> will automatically update any time
// the corresponding resource is updated (currently once per second), but this 
// isn't working yet.

import SingleKey from './SingleKey';
import { useQueryClient } from '@tanstack/solid-query';
import { For, createSignal, createResource, Show, Suspense } from 'solid-js';

export default function QueryKeyList (props)   {

  // create fetchTimer signal to be passed into createResource
  const [ fetchTimer, setFetchTimer ] = createSignal(0);

  // update fetchTimer every second
  setInterval(() => {
    setFetchTimer(() => fetchTimer() + 1);
  }, 10);

  // define the data fetch function to pass into createResource
  const fetchQueryCache = async (source, { value, refetching }) => {
    const queryClient = useQueryClient();
    const queries = await queryClient.getQueryCache().queries;
    return queries;
  };

  // define the query data coming out of createResource
  const [ data, { mutate, refetch } ] = createResource(fetchTimer, fetchQueryCache);

  // create a signal delay with a default value of false
  const [ delay, setDelay ] = createSignal(false);

  // delay by 2ms to give time for the querycache fetch to fully load
  setTimeout(() => {
    setDelay(true);
  }, 100);

  return (
    <div>
      {/* delay the singlekey components until the fetch has finished loading */}
      <Show when={delay()}>
        {/* For each query, render a SingleKey component, passing down the necessary information from the query cache as props */}
        <For each={data()}>
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
      </Show>
    </div>
  );
};