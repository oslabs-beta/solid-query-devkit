import { ObjectComponent } from "./JSONComponents/ObjectComponent"
import { useContext } from "solid-js";
import { QueryContext } from "./QueryContext";

export default function DataExplorer()   {
    const { activeQuery } = useContext(QueryContext);

    return (
        <>
        <div class="detailsHeader">
            <h3>Data</h3>
        </div>
        <ObjectComponent obj={activeQuery().state} key={'Data'} level={1}/>
        </>
        

    )

}