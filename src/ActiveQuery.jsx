import OverviewData from "./OverviewData";
import Explorer from "./Explorer";
import { useContext } from "solid-js";
import { QueryContext } from "./QueryContext";
import { useQueryClient } from "@tanstack/solid-query";


export default function ActiveQuery()   {
    const { activeQuery, setActiveQuery } = useContext(QueryContext);

    const queryClient = useQueryClient()

    const queryFunctions = {
        refetch: () => {
            queryClient.refetchQueries({ queryKey: JSON.parse(activeQuery().queryHash) });
        },
        invalidate: async () => {
            await queryClient.invalidateQueries({
                queryKey: JSON.parse(activeQuery().queryHash),
                exact: true,
                refetchType: 'active',
            });
        },
        reset: () => {
            queryClient.resetQueries({ queryKey: JSON.parse(activeQuery().queryHash) });
        },
        remove: () => {
            const hash = JSON.parse(activeQuery().queryHash)
            setActiveQuery();
            queryClient.removeQueries({ queryKey: hash, exact: true });
        }
    }

    return (
        <section>
            <div id="activeQuery">
                <OverviewData />
            </div>
            <section class="queryActions">
                <div class="queryActionsHeader">
                    <h3>Actions</h3>
                </div>
                <div class="queryActionsButtons">
                    <button id="refetch" onClick={queryFunctions['refetch']}>Refetch</button>
                    <button id="invalidate" onClick={queryFunctions['invalidate']}>Invalidate</button>
                    <button id="reset" onClick={queryFunctions['reset']}>Reset</button>
                    <button id="remove" onClick={queryFunctions['remove']}>Remove</button>
                </div>
            </section>
            <div class="dataExplorer">
                <Explorer name={'Data Explorer'} obj={activeQuery().state.data} key={'Data'} />
            </div>
            <div class="queryExplorer">
                <Explorer name={'Query Explorer'} obj={activeQuery()} key={'Query'}/>
            </div>
        </section>

    )

}