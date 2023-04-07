import { ObjectComponent } from "./JSONComponents/ObjectComponent"

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