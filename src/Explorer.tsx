import { ObjectComponent } from "./ObjectComponent"
import { JSX } from 'solid-js';
import type { explorerProps } from './types'

export function Explorer(props: explorerProps): JSX.Element {
  return (
    <>
      <div class="sqd-detailsHeader">
        <h3 data-testid="name-head">{props.name}</h3>
      </div>
      <div class="sqd-object-component" data-testid="ocdiv">
        <ObjectComponent obj={props.obj || {}} key={props.key} level={1} data-testid="oc"/>
      </div>
    </>
  )
}