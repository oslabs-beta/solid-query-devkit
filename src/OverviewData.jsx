import { QueryContext } from "./QueryContext";
import { useContext, For, createSignal } from "solid-js";
import { getQueryStatus } from './Helpers'

export default function OverviewData()   {

  const {activeQuery, queries} = useContext(QueryContext);

  const queryStatus = () => getQueryStatus(queries().find(query => query.queryHash === activeQuery().queryHash));
  const queryArr = JSON.parse(activeQuery().queryHash);

  const statusStyles = {
    fetching: "background-color:blue; color:white",
    paused: "background-color:rgb(140, 73, 235); color:white",
    fresh: "background-color:green; color:white",
    stale: "background-color:rgb(255, 169, 8); color:black",
    inactive: "background-color:gray; color:white",
  }


  function normalTime() {
    const unixTime = activeQuery().state.dataUpdatedAt;
    if (unixTime === 0) return 'Not yet updated';
    const date = new Date(unixTime)
    return date.toLocaleTimeString()
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
            <For each={queryArr}>
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
          <div style={`background-color: blue; height:100%; border-radius:2px; padding: 1em 2em; font-weight:bold; ${statusStyles[queryStatus()]}`}>{queryStatus()}</div>
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