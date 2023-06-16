import { ObjectComponent } from "./ObjectComponent"
import { JSX } from 'solid-js';
import type { explorerProps } from './types'

export function Explorer(props: explorerProps): JSX.Element {
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