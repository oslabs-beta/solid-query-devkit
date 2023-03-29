import QueryKeyList from "./QueryKeyList";
import ActiveQuery from "./ActiveQuery";
import { useQueryClient } from '@tanstack/solid-query'

export default function SolidQueryDevtools()  {

    // initialize queryClient
    const queryClient = useQueryClient();

    // TRIED: holding the query data in a constant; didn't work
    const queries = queryClient.getQueryCache().queries;
    console.log('queries in parent: ', queries);


    return (
        <>
            <QueryKeyList queries={queries} />
            <ActiveQuery />
        </>
    )
}

