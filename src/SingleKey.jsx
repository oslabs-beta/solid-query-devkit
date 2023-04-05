import { useContext, createSignal } from "solid-js";
import { QueryContext } from "./QueryContext";
import { useQueryClient } from "@tanstack/solid-query";

//Stylings for observers box
const stylings = {
  fresh: {"background-color": "green", "color": "white"},
  inactive: {"background-color": "gray", "color": "white"},
  stale: {"background-color": "rgb(204, 150, 49)", "color": "white"},
  fetching: {"background-color": "blue", "color": "white"},
}


export default function SingleKey(props) {
  const queryClient = useQueryClient();
  const { activeQuery, setActiveQuery } = useContext(QueryContext);
  const { queries, setQueries } = useContext(QueryContext);
  const { showData, setShowData } = useContext(QueryContext);

  //signal to set style:
  const [backgroundColor, setBackgroundColor] = createSignal('');

  const query = () => {
    return queries().filter((query) => query.queryHash === props.key)[0];
  }

  function findStatus(query) {
    if (query.state.fetchStatus == 'fetching') {console.log('fff'); return 'fetching'} 
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
        let queryHash = query().queryHash;
        if (activeQuery() === undefined || activeQuery().queryHash !== queryHash)  {
          setActiveQuery(query());
          setShowData(true);
        }
        else if (activeQuery().queryHash === queryHash) {
          setShowData(false);
          setActiveQuery(undefined);
        }

        // console.log("This is the Key Hash:", queryHash);
        // console.log('This is the activeQuery key Hash', activeQuery().queryHash)
        
        
        
      }
      }>
        <span id="queryColor">{query().queryHash}</span>
      </div>
    </section>
  );
};