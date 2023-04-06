import { QueryContext } from "./QueryContext";
import { useContext, For, createSignal } from "solid-js";

export default function OverviewData()   {

  const {activeQuery, setActiveQuery} = useContext(QueryContext);
  const {queries, setQueries} = useContext(QueryContext);
  const [colors, setColors] = createSignal('');

  const queryArr = () => JSON.parse(activeQuery().queryHash);

  function normalTime() {
    const unixTime = activeQuery().state.dataUpdatedAt;
    if (unixTime === 0) return 'Not yet updated';
    const date = new Date(unixTime)
    return date.toLocaleTimeString()
  }
    
  function findStatus() {
    const query = queries().filter(query => query.queryHash === activeQuery().queryHash)[0];

    if (query.state.fetchStatus == 'fetching') {
      setColors("background-color:green; color:white");
      return 'fetching';
    }

    if (query.state.fetchStatus == 'paused') {
      setColors("background-color:rgb(140, 73, 235); color:white");
      return 'paused';
    }

    if (!query.isStale() && query.getObserversCount()) {
      setColors("background-color:green; color:white");
      return 'fresh';
    }

    if (query.isStale()) {
      setColors("background-color:rgb(255, 169, 8); color:black");
      return 'stale';
    }

    if (!query.observers.length) {
      setColors("background-color:gray; color:white");
      return 'inactive';
    }
  }

  return (
    <>
      <div class="detailsHeader">
        <h3>Query Details</h3>
      </div>
      <div class="queryDetailsData" style={"margin: 1em;"}>
        <div style={"display: flex; justify-content: space-between;"}>
          <div>
            <div>{'['}</div>
            <For each={queryArr()}>
              {(el, i) => {
                let comma = ',';
                if (i() === queryArr.length - 1) comma = '';
                if (typeof el === 'string') {
                  return <div style={"margin-left: 20px;" }>{`\"${el}\"${comma}`}</div>
                }
                else return <div style={"margin-left: 20px;"}>{el}{comma}</div>
              }}
            </For>
            <div style={"margin-bottom: 1em"}>{']'}</div>
          </div>
          <div style={`background-color: blue; height:100%; border-radius:2px; padding: 1em 2em; font-weight:bold; ${colors()}`}>{findStatus()}</div>
        </div>
        <div id="query-details-observers" style={"margin-bottom: 1em; display: flex; justify-content: space-between"}>
          <span>Observers:</span>
          <span>{activeQuery().observers.length}</span>
        </div>
        <div style={"display: flex; justify-content: space-between"}>
          <span>Last Updated At:</span>
          <span>{normalTime()}</span>
        </div>
      </div>
    </>
  )
}