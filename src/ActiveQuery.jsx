import OverviewData from "./OverviewData";
import DataExplorer from "./DataExplorer";
import QueryExplorer from "./QueryExplorer";


export default function ActiveQuery()   {

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