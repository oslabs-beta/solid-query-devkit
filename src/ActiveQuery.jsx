import OverviewData from "./OverviewData";
import Explorer from "./Explorer";
import { useContext } from "solid-js";
import { QueryContext } from "./QueryContext";
import { useQueryClient } from "@tanstack/solid-query";


export default function ActiveQuery()   {

    const queryClient = useQueryClient()

    const { activeQuery, setActiveQuery } = useContext(QueryContext);
    const { showData, setShowData } = useContext(QueryContext);

    const refetch = () => {
        queryClient.refetchQueries({ queryKey: JSON.parse(activeQuery().queryHash) });
        console.log('query refetched: ', activeQuery());
    }

    const invalidate = async () => {
        await queryClient.invalidateQueries({
            queryKey: JSON.parse(activeQuery().queryHash),
            exact: true,
            refetchType: 'active',
        });
        console.log('query invalidated');
    }

    const reset = () => {
        queryClient.resetQueries({ queryKey: JSON.parse(activeQuery().queryHash) });
        console.log('query reset');
    }

    const remove = () => {
        setShowData(false);
        queryClient.removeQueries({ queryKey: JSON.parse(activeQuery().queryHash), exact: true });
        setActiveQuery();
        console.log('query removed');
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
                    <button id="refetch" onClick={refetch}>Refetch</button>
                    <button id="invalidate" onClick={invalidate}>Invalidate</button>
                    <button id="reset" onClick={reset}>Reset</button>
                    <button id="remove" onClick={remove}>Remove</button>
                </div>
            </section>
            <div class="dataExplorer">
                <Explorer name={'Query Explorer'} obj={activeQuery().state.data} key={'Data'} />
            </div>
            <div class="queryExplorer">
                <Explorer name={'Query Explorer'} obj={activeQuery()} key={'Query'}/>
            </div>
        </section>

    )

}