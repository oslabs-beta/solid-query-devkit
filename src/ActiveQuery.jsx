import OverviewData from "./OverviewData";
import DataExplorer from "./DataExplorer";
import QueryExplorer from "./QueryExplorer";
import { useContext } from "solid-js";
import { QueryContext } from "./QueryContext";


export default function ActiveQuery()   {
    const {count, setCount} = useContext(QueryContext)
    console.log(count)
    return (
        <>
            <div id="activeQuery">
                <OverviewData />
            </div>
            <section class="queryActions">
                <div class="queryActionsHeader">
                    <h3>Actions</h3>
                </div>
                <div class="queryActionsButtons">
                    <button id="refetch">Refetch</button>
                    <button id="remove">Remove</button>
                </div>
            </section>
            <DataExplorer />
            <QueryExplorer />
        </>

    )

}