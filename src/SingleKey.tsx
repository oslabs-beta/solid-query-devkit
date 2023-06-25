import { useContext, createSignal, JSX } from "solid-js";
import { QueryContext } from "./Context";
import { getQueryStatus } from './Helpers'
import type { singleKeyProps, backgroundColor, stylings } from "./types";
import type { Query } from "@tanstack/solid-query";

export default function SingleKey(props: singleKeyProps): JSX.Element {

  //Styles for observers box
  const stylings: stylings = {
    fresh: {"background-color": "green", "color": "white", "font-weight": "bold"},
    inactive: {"background-color": "rgb(63, 78, 96)", "color": "white", "font-weight": "bold"},
    stale: {"background-color": "rgb(255, 169, 8)", "color": "black", "font-weight": "bold"},
    fetching: {"background-color": "blue", "color": "white", "font-weight": "bold"},
    paused: {"background-color": "rgb(150, 71, 166)", "color": "white", "font-weight": "bold"},
  }
  
  const { activeQuery, setActiveQuery, queries } = useContext<any>(QueryContext);

  //signal to set style:
  const [backgroundColor, setBackgroundColor] = createSignal<backgroundColor>({"background-color": ''});
  
  const query = () => {
    return queries().find((query: Query) => query.queryHash === props.key);
  }
  
  return (
    <section class="sqd-queryKey">
      <div class="sqd-observers" style={stylings[getQueryStatus(query())]}>{query().observers.length}</div>
      <div id="sqd-singleKey" style={backgroundColor()} onClick={() => {
        setBackgroundColor({
          "background-color": 'rgba(13, 21, 32, 0.5)'
        });
        if (activeQuery() == undefined || activeQuery().queryHash !== props.key)  {
          setActiveQuery(query());
        } else {
          setActiveQuery(undefined);
        }
      }}>
        <span id="queryColor">{query().queryHash}</span>
      </div>
    </section>
  );
};