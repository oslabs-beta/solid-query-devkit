import { ObjectComponent } from "./ObjectComponent"

export function Explorer(props)   {
  return (
    <>
      <div class="sqd-detailsHeader">
        <h3>{props.name}</h3>
      </div>
      <div class="sqd-object-component">
        <ObjectComponent obj={props.obj || {}} key={props.key} level={1}/>
      </div>
    </>
  )
}