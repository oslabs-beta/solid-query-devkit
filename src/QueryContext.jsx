import { createContext, createSignal } from "solid-js";

export const QueryContext = createContext();

export function QueryProvider (props) {

  const [count, setCount] = createSignal(0)

  return (
    <QueryContext.Provider value={{count, setCount}}>
      {props.children}
    </QueryContext.Provider>
  )
}