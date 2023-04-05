import { useContext, createSignal } from "solid-js";
import { QueryContext } from "./QueryContext";
import { useQueryClient } from "@tanstack/solid-query";

//Styles for observers box
const stylings = {
  fresh: {"background-color": "green", "color": "white", "font-weight": "bold"},
  inactive: {"background-color": "gray", "color": "white", "font-weight": "bold"},
  stale: {"background-color": "rgb(255, 169, 8)", "color": "white", "font-weight": "bold"},
  fetching: {"background-color": "blue", "color": "white", "font-weight": "bold"},
  paused: {"background-color": "rgb(150, 71, 166)", "color": "white", "font-weight": "bold"},
}


export default function SingleKey(props) {
  const { activeQuery, setActiveQuery, queries, setShowData } = useContext(QueryContext);

  //signal to set style:
  const [backgroundColor, setBackgroundColor] = createSignal('');

  const query = () => {
    return queries().filter((query) => query.queryHash === props.key)[0];
  }

  function findStatus(query) {
    if (query.state.fetchStatus == 'fetching') return 'fetching'
    if (query.state.fetchStatus == 'paused') return 'paused'
    if (!query.isStale() && query.getObserversCount()) return 'fresh';
    if (query.isStale()) return 'stale'
    if (!query.observers.length) return 'inactive'
  }

  //onClick, the button will set the activeQuery to query
  //the setShowData signal will also be activated, opening the side modal


  return (
    <section class="queryKey">
      <div class="observers" style={stylings[findStatus(query())]}>{query().observers.length}</div>
      <div id="singleKey" style={backgroundColor()} onClick={() => {
        setBackgroundColor({
          "background-color": 'rgba(13, 21, 32, 0.5)'
        });
        // let queryHash = query().queryHash;
        if (activeQuery() == undefined || activeQuery().queryHash !== props.key)  {
          setActiveQuery(query());
          setShowData(true);
        } else {
          setShowData(false);
          setActiveQuery(undefined);
        }
      }
      }>
        <span id="queryColor">{query().queryHash}</span>
      </div>
    </section>
  );
};