import { ObjectComponent } from "./JSONComponents/ObjectComponent"
import { useContext } from "solid-js";
import { QueryContext } from "./QueryContext";

export default function Explorer(props)   {
    return (
        <>
        <div class="detailsHeader">
            <h3>{props.name}</h3>
        </div>
        <ObjectComponent obj={props.obj || {}} key={props.key} level={1}/>
        </>
    )

}