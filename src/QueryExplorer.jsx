import { ObjectComponent } from "./JSONComponents/ObjectComponent"
import { useContext } from "solid-js";
import { QueryContext } from "./QueryContext";

export default function QueryExplorer() {
    const { activeQuery } = useContext(QueryContext);

    return (
        <>
        <div class="detailsHeader">
            <h3>Query Explorer</h3>
        </div>
        <ObjectComponent obj={activeQuery()} key={'Query Data'} level={1}/>
        </>
        
    )

}