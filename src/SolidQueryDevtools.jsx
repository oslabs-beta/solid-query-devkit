import QueryKeyList from "./QueryKeyList";
import ActiveQuery from "./ActiveQuery";
import { QueryProvider } from "./QueryContext";
import { createSignal, createEffect, Match, useContext } from "solid-js";
import logo from "./assets/SquidLogo.png";
import { QueryContext } from "./QueryContext";

export default function SolidQueryDevtools(props) {
  console.log(useContext(QueryContext))

  const { queries } = useContext(QueryContext);
  const { activeQuery} = useContext(QueryContext);

  const [showModal, setShowModal] = createSignal(false);
  const [showData, setShowData] = createSignal(false);
  const [viewWidth, setViewWidth] = createSignal('100vw');

  //add a style signal 


  //have an additional class that we could manipualte it's value, and in our CSS, if its of a certain class do X styling, if its of another class do Y styling 

  createEffect(() => {
    //if Modal is open and Query Content is being shown, change the style width to be 50vw
    if (showData() === true && showModal() === true) {
      setViewWidth('50vw');
    }
    if (showData() === false && showModal() === true) {
      setViewWidth('100vw');
    }
  });


  //we will eventually need an "X" button to close the modal which will setShowModal to false once more 
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
                    <button id="fresh" disabled>fresh</button>
                    <button id="fetching" disabled>fetching</button>
                    <button id="stale" disabled>stale</button>
                    <button id="inactive" disabled>inactive</button>
                  </nav>
                  <button class="closeModal" onclick={() => setShowModal(false)}>Close</button>
                </header>
                <QueryKeyList />
                {/* Query List  */}
                <div class="main">
                  <button id="showAQ" onclick={() => setShowData(!showData())}>Query 1</button>
                  <button>Query 2</button>
                  <button>Query 3</button>
                </div>
              </div>
              {/* <button id="showAQ" onclick={() => setShowData(!showData())}>Show Active Query</button> */}
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
          <button id="showModal" class="toggle" onclick={() => setShowModal(true)}><img src={logo} width='45pxvw' height='45px'></img></button>
        </Match>
      </Switch>
    </>
  );
};



