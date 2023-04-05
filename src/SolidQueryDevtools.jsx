import QueryKeyList from "./QueryKeyList";
import ActiveQuery from "./ActiveQuery";
import Header from "./Header";
import { QueryProvider } from "./QueryContext";
import { createSignal, createEffect, Match, useContext } from "solid-js";
import logo from "./assets/SquidLogo.png";
import { QueryContext } from "./QueryContext";

export default function SolidQueryDevtools(props) {

  //Signals imported from Query Context 
  const { queries } = useContext(QueryContext);
  const { showModal, setShowModal } = useContext(QueryContext);
  const { showData } = useContext(QueryContext);


  const [viewWidth, setViewWidth] = createSignal('100vw');

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
                <Header />
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


