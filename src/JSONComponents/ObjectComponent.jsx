import { Primitive } from "./Primitive";
import { createSignal } from "solid-js";

export function ObjectComponent(props) {
  const [enabled, setEnabled] = createSignal(false)

  const objText = Array.isArray(props.obj) ? 
  `[${props.obj.length} items]` : 
  `{${Object.keys(props.obj).length} item${Object.keys(props.obj).length > 1 ? 's' : ''}}`

  return (
    <>
    <div style = { `margin-left: ${props.level * 15}px; color: white; cursor: pointer; width: fit-content;`} >
      <span onClick={() => setEnabled(!enabled())}>
        <span style={'font-weight: bold'}>{!enabled() ? '\u25B6' : '\u25BC'} {props.key} </span>
        <Show when={!enabled()}>
          <span style={'font-size: 75%'}>{objText}</span>
        </Show>
      </span>
    </div>

    <Show when={enabled()}>
      <For each={Object.keys(props.obj)}>
      {(key) => 
        <Switch>
          <Match when={props.obj[key] === null || props.obj[key] === undefined || typeof props.obj[key] !== 'object'} >
              <Primitive level={props.level + 1} key={key} value={props.obj[key]} type={props.obj[key] === null ? 'null' : props.obj[key] === undefined ? 'undefined' : typeof props.obj[key]} />
          </Match>
          <Match when={typeof props.obj[key] === 'object'}>
                <ObjectComponent key={key} obj={props.obj[key]} level={props.level + 1}/>
          </Match>
        </Switch>
        }
      </For>
    </Show>
    
    </>
  )
}