import { useContext, createSignal } from "solid-js";
import { QueryContext } from "./QueryContext";
import { useQueryClient } from "@tanstack/solid-query";


export default function SingleKey(props) {
  const queryClient = useQueryClient();
  const { activeQuery, setActiveQuery } = useContext(QueryContext);
  const { queries, setQueries } = useContext(QueryContext);
  const { showData, setShowData } = useContext(QueryContext);

  //signal to set style:
  const [backgroundColor, setBackgroundColor] = createSignal('');

  const query = () =>  {
    // console.log('QUERY UPDATED')
    return queries().filter((query) => query.queryHash === props.key)[0];
  }

  //onClick, the button will set the activeQuery to query
  //the setShowData signal will also be activated, opening the side modal

  return (
    <section class="queryKey">
      <div class="observers">{query().observers.length}</div>
      <div id="singleKey" style={backgroundColor()} onClick={() => {
        setActiveQuery(query());
        setShowData(!showData());
        setBackgroundColor({
          "background-color": 'rgba(13, 21, 32, 0.5)'
        });
        console.log("THIS IS THE Active Query ", activeQuery());
      }}>
        <span id="queryColor">{query().queryHash}{query().state.status || 'undefined'}</span>
      </div>
    </section>
  );
};