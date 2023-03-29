// NOTE: There is a bug that is not rendering each of the SingleKey components - instead only one of the 
// components is rendered unless a code edit triggers hot module reloading, in which case all of the 
// components render. On refresh, however, only the first component renders.

// I suspect that getQueryCache() is asynchronous, and so only the first query has been made when 
// the initial render happens.

import SingleKey from './SingleKey';
import { useQueryClient } from '@tanstack/solid-query';
import { For, createSignal, createResource } from 'solid-js';

export default function QueryKeyList ()   {
    // initialize queryClient
    const queryClient = useQueryClient();

    // TRIED: holding the query data in a constant; didn't work
    const queries = queryClient.getQueryCache().queries;
    console.log('queries: ', queries);

    // TRIED: using createSignal to hold the query list in state; didn't work
    // const [ queryList, setQueryList ] = createSignal([])
    // setQueryList(() => queryClient.getQueryCache().queries);
    // console.log('queries: ', queries);

    // TRIED: using createResource() to manage potential asynchronicity; didn't work
    // const [ queryList, { mutate, refetch } ] = createResource(() => queryClient.getQueryCache().queries)
    // console.log('queryList: ', queryList());
   
    return (
        <div>
            {/* For each query, render a SingleKey component, passing down the necessary information from the query cache as props */}
            <For each={queries}>
                {(query, index) => {
                    const queryKey = query.queryKey[1];
                    const numOfObservers = query.observers.length;
                    const isStale = query.observers[0].currentResult.isStale;
                    const isFetching = query.observers[0].currentResult.isFetching;
                    const enabled = query.observers[0].options.enabled;
                    const queryHash = query.queryHash;
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
    )
}