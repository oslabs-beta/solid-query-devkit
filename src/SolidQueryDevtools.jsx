import QueryKeyList from "./QueryKeyList";
import ActiveQuery from "./ActiveQuery";
import { QueryProvider } from "./QueryContext";
import { createSignal, createEffect, Match, useContext } from "solid-js";
import logo from "./assets/SquidLogo.png";
import { QueryContext } from "./QueryContext";
import { useQueryClient } from "@tanstack/solid-query";

export default function SolidQueryDevtools(props) {

  const { queries } = useContext(QueryContext);
  const { activeQuery } = useContext(QueryContext);
  const { showModal, setShowModal } = useContext(QueryContext);
  const { showData, setShowData } = useContext(QueryContext);
  const { loading, isLoading } = useContext(QueryContext);


  const [viewWidth, setViewWidth] = createSignal('100vw');


  //Style Variables for Status Backgrounds 

  //Loading
  const noneLoading = { "background-color": "red" }
  const someLoading = { "background-color": "green" }


  createEffect(() => {
    //if Modal is open and Query Content is being shown, change the style width to be 50vw
    if (showData() === true && showModal() === true) {
      setViewWidth('50vw');
    }
    if (showData() === false && showModal() === true) {
      setViewWidth('100vw');
    }
  });


  //Fresh vs. Stale Status Functionality (STILL NEEDS WORK)
  //fresh and stale array
  const freshArray = [];
  const staleArray = [];

  function QueryStatus(queryHash) {
    this.queryId = queryHash;
  }

  QueryStatus.prototype.staleTimer = function (queryHash, time) {
    setTimeout(() => {
      const queryIndex = () => {
        for (let i = 0; i < freshArray.length; i++) {
          if (freshArray[i][queryId] === queryHash) return [i, freshArray[i][queryId]];
        }
      }
      let x = queryIndex();
      freshArray.splice(x[0], 1);
      staleArray.push(x[1]);
      console.log(staleArray);
    }, time);
  }

  function newQuery(queryHash, timer) {
    //instantiate a new Query 
    let newQuery = new QueryStatus(queryHash);
    //push the new Query with its identifier, onto the freshArray
    freshArray.push(newQuery);
    //call the new Query's staleTimer function, which will run when the staleTime value on the query Object expires 
    newQuery.staleTimer(queryHash, timer);
  }

  createEffect(() => {
    let queryArrayIndex = query().length - 1;
    newQuery(query()[queryArrayIndex].queryHash, query()[queryArrayIndex].options.staleTime ? query()[queryArrayIndex].options.staleTime : 0);
  })



  return (

    <>
      <Switch>
        <Match when={showModal() === true}>
          <section class="modal">
            {/* Header */}
            <div class="outerContainer">
              <div class="leftContainer" style={{
                'width': viewWidth()
              }}>
                <header>
                  <img src={logo} width='65pxvw' height='65px'></img>
                  <h1 class="queries">Queries ({`${queries().length}`})</h1>
                  <nav class="statusGrid">
                    <div id="fresh" >fresh</div>
                    <div id="fetching" style={loading() ? someLoading : noneLoading}>fetching{loading()}</div>
                    <div id="stale" >stale</div>
                    <div id="inactive" >inactive</div>
                  </nav>
                  <button class="closeModal" onclick={() => setShowModal(false)}>Close</button>
                </header>

                {/* Query List  */}
                <div class="main">
                  <QueryKeyList />
                </div>
              </div>
              <Show when={showData() === true}>
                <div class="rightContainer">
                  <section class="queryContent">
                    <ActiveQuery />
                  </section>
                </div>
              </Show>
            </div>
          </section>
        </Match>
        <Match when={showModal() === false}>
          <button id="showModal" class="toggle" onclick={() => {
            setShowModal(true);
            console.log("THE MODAL HAS BEEN CHANGED TO:", showModal());
          }
          }><img src={logo} width='45pxvw' height='45px'></img></button>
        </Match>
      </Switch>
    </>
  );
};


