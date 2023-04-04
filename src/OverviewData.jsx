import { QueryContext } from "./QueryContext";
import { useContext, For } from "solid-js";

export default function OverviewData()   {

    const {activeQuery, setActiveQuery} = useContext(QueryContext);
    const queryArr = () => JSON.parse(activeQuery().queryHash);

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
            <div class="queryDetailsData">
                <div style={"margin-left: 5px;"}>{'['}</div>
                <For each={queryArr}>
                    {(el, i) => {
                        let comma = ',';
                        if (i() === queryArr.length - 1) comma = '';
                        if (typeof el === 'string') {
                            return <div style={"margin-left: 20px;"}>{`\"${el}\"${comma}`}</div>
                        }
                        else return <div style={"margin-left: 20px;"}>{el}{comma}</div>
                    }}
                </For>
                <div style={"margin-left: 5px;"}>{']'}</div>
                <div id="query-details-observers">
                    <span>Observers:</span>
                    <span>{activeQuery().observers.length}</span>
                </div>
                <div>
                    <span>Last Updated At:</span>
                    <span>{normalTime()}</span>
                </div>
            </div>
        </>
    )
}