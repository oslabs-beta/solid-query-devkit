import { QueryContext } from "./Context";
import { useContext, For, JSX } from "solid-js";
import { getQueryStatus } from "./Helpers";
import type { Query } from "@tanstack/solid-query";
import type { statusStylesObj } from './types';

export function OverviewData(): JSX.Element {

  const { activeQuery, queries } = useContext<any>(QueryContext);
  

  const queryStatus = (): string => getQueryStatus(queries().find((query: Query): boolean => query.queryHash === activeQuery().queryHash));
  const queryArr = (): any => JSON.parse(activeQuery().queryHash);
  
  const statusStyles: statusStylesObj = {
    fetching: "background-color:blue; color:white",
    paused: "background-color:rgb(140, 73, 235); color:white",
    fresh: "background-color:green; color:white",
    stale: "background-color:rgb(255, 169, 8); color:black",
    inactive: "background-color:gray; color:white",
  }
  
  function normalTime(): string {
    const unixTime: any = activeQuery().state.dataUpdatedAt;
    if (unixTime === 0) return 'Not yet updated';
    const date: Date = new Date(unixTime)
    return date.toLocaleTimeString()
  }
  
  return (
    <>
      <div class="sqd-detailsHeader">
        <h3>Query Details</h3>
      </div>
      <div class="queryDetailsData" style={"margin: 1em;"}>
        <div style={"display: flex; justify-content: space-between;"}>
          <div>
            <div>{'['}</div>
            <For each={queryArr()}>
              {(el, i) => {
                let comma = ',';
                if (i() === queryArr().length - 1) comma = '';
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