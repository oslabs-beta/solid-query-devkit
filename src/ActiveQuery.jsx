import OverviewData from "./OverviewData";
import DataExplorer from "./DataExplorer";
import QueryExplorer from "./QueryExplorer";


export default function ActiveQuery()   {

    return (
        <div id="activeQuery">
            <h1>Active Query Content Box</h1>
            <OverviewData />
            <DataExplorer />
            <QueryExplorer />
        </div>

    )

}