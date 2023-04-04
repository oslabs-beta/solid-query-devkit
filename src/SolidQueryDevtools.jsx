import QueryKeyList from "./QueryKeyList";
import ActiveQuery from "./ActiveQuery";
import { QueryProvider } from "./QueryContext";
import { createSignal, createEffect, Match, useContext } from "solid-js";
import logo from "./assets/SquidLogo.png";
import { QueryContext } from "./QueryContext";

export default function SolidQueryDevtools(props) {

  //Signals imported from Query Context 
  const { queries } = useContext(QueryContext);
  const { activeQuery } = useContext(QueryContext);
  const { showModal, setShowModal } = useContext(QueryContext);
  const { showData, setShowData } = useContext(QueryContext);
  const { loading, isLoading } = useContext(QueryContext);
  const { setSort } = useContext(QueryContext);
  const { sortReverse, setSortReverse } = useContext(QueryContext);
  const { filter, setFilter } = useContext(QueryContext);


  

  //Signals accessible in this Component 
  const [fresh, setFresh] = createSignal(0);
  const [stale, setStale] = createSignal(0);
  const [inactive, setInactive] = createSignal(0);


  const [viewWidth, setViewWidth] = createSignal('100vw');


  //Style Variables for Status Backgrounds: 
  //Loading
  const noneLoading = { "background-color": "rgb(14, 46, 96)", "color": "rgb(89, 98, 109)" };
  const someLoading = { "background-color": "blue", "color": "white" };
  //Fresh
  const noneFresh = { "background-color": "rgb(16, 66, 53)", "color": "rgb(89, 98, 109)" };
  const someFresh = { "background-color": "green", "color": "white" };
  //Stale
  const noneStale = { "background-color": "rgb(204, 150, 49)", "color": "rgb(89, 98, 109)" };
  const someStale = { "background-color": "rgb(255, 169, 8)", "color": "black" };
  //Inactive
  const noneInactive = { "background-color": "gray", "color": "rgb(89, 98, 109)" };
  const someInactive = { "background-color": "gray", "color": "white" };

  //Status Values:
  //Fresh, Stale, & Inactive (loading is stored in a Signal on the Query Context and imported on this component)
  createEffect(() => {
    setFresh(() => queries().filter((query) => !query.isStale() && query.getObserversCount()).length);
    setStale(() => queries().filter((query) => query.isStale()).length);
    setInactive(() => queries().filter((query) => !query.getObserversCount()).length);
  })

  //Modal Controls:
  createEffect(() => {
    //if Modal is open and Query Content is being shown, change the style width to be 50vw
    if (showData() === true && showModal() === true) {
      setViewWidth('50vw');
    }
    if (showData() === false && showModal() === true) {
      setViewWidth('100vw');
    }
  });



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
                    <div id="fresh" style={fresh()? someFresh : noneFresh}>fresh ({fresh()})</div>
                    <div id="fetching" style={loading() ? someLoading : noneLoading}>fetching ({loading()})</div>
                    <div id="stale" style={stale() ? someStale : noneStale}>stale ({stale()})</div>
                    <div id="inactive" style={inactive() ? someInactive : noneInactive}>inactive ({inactive()})</div>
                  </nav>
                  <input type="text" onChange={(e) => {setFilter(e.target.value)}}></input>
                  <select name="sort" id="sort" onChange={(e) => setSort(e.target.value)}>
                    <option value="last-updated" selected>Sort by Last Updated</option>
                    <option value="hash">Sort by Query Hash</option>
                  </select>
                  <button onClick={() => setSortReverse(!sortReverse())}>{ sortReverse() ? '\u2191 Asc' : '\u2193 Dec'}</button>
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


