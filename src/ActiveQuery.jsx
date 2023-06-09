import { OverviewData } from "./OverviewData";
import { Explorer } from "./Explorer";
import { QueryContext } from "./Context";
import { useContext } from "solid-js";
import { useQueryClient } from "@tanstack/solid-query";

export function ActiveQuery() {

  const { activeQuery, setActiveQuery } = useContext(QueryContext);

  const queryClient = useQueryClient()

  const queryFunctions = {
    refetch: () => {
      queryClient.refetchQueries({ queryKey: JSON.parse(activeQuery().queryHash) });
    },
    invalidate: async () => {
      await queryClient.invalidateQueries({
        queryKey: JSON.parse(activeQuery().queryHash),
        exact: true,
        refetchType: 'active',
      });
    },
    reset: () => {
      queryClient.resetQueries({ queryKey: JSON.parse(activeQuery().queryHash) });
    },
    remove: () => {
      const hash = JSON.parse(activeQuery().queryHash)
      setActiveQuery();
      queryClient.removeQueries({ queryKey: hash, exact: true });
    }
  }
  
  return (
    <section>
      <div id="sqd-activeQuery">
        <OverviewData />
      </div>
      <section class="queryActions">
        <div class="sqd-detailsHeader">
          <h3>Actions</h3>
        </div>
        <div class="sqd-queryActionsButtons">
          <button id="sqd-refetch" onClick={queryFunctions['refetch']}>Refetch</button>
          <button id="sqd-invalidate" onClick={queryFunctions['invalidate']}>Invalidate</button>
          <button id="sqd-reset" onClick={queryFunctions['reset']}>Reset</button>
          <button id="sqd-remove" onClick={queryFunctions['remove']}>Remove</button>
        </div>
      </section>
      <div class="dataExplorer">
        <Explorer name={'Data Explorer'} obj={activeQuery().state.data} key={'Data'} />
      </div>
      <div class="queryExplorer">
        <Explorer name={'Query Explorer'} obj={activeQuery()} key={'Query'}/>
      </div>
    </section>
  )
}