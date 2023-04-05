import { QueryContext } from "./QueryContext";
import { useContext, For } from "solid-js";

export default function OverviewData()   {
    const stylings = {
        fresh: {"background-color": "green", "color": "white", "font-weight": "bold"},
        inactive: {"background-color": "gray", "color": "white", "font-weight": "bold"},
        stale: {"background-color": "rgb(204, 150, 49)", "color": "white", "font-weight": "bold"},
        fetching: {"background-color": "blue", "color": "white", "font-weight": "bold"},
        paused: {"background-color": "rgb(150, 71, 166)", "color": "white", "font-weight": "bold"},
      }

    const {activeQuery, setActiveQuery} = useContext(QueryContext);
    const queryArr = () => JSON.parse(activeQuery().queryHash);

    function normalTime() {
       const unixTime = activeQuery().state.dataUpdatedAt;
       if (unixTime === 0) return 'Not yet updated';
       const date = new Date(unixTime)
       return date.toLocaleTimeString()
    }
    // function findStatus(query) {
    //     if (query.state.fetchStatus == 'fetching') return 'fetching'
    //     if (query.state.fetchStatus == 'paused') return 'paused'
    //     if (!query.isStale() && query.getObserversCount()) return 'fresh';
    //     if (query.isStale()) return 'stale'
    //     if (!query.observers.length) return 'inactive'
    //   }

    //   const status = () => findStatus(activeQuery())




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
                <div style={"background-color: blue; height:100%; width:20%"}>{status()}</div>
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