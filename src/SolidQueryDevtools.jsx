import QueryKeyList from "./QueryKeyList";
import ActiveQuery from "./ActiveQuery";
import Header from "./Header";
import { createSignal, createEffect, Match, useContext } from "solid-js";
import logo from "./assets/SquidLogo.png";
import { QueryContext } from "./QueryContext";

export default function SolidQueryDevtools(props) {

  //Signals imported from Query Context 
  const { queries } = useContext(QueryContext);
  const { showModal, setShowModal } = useContext(QueryContext);
  const { showData } = useContext(QueryContext);

  // IDEA: repurpose viewWidth signal to contain either an empty string at initialization,
  // or a string with a class/id identifier (e.g., "responsive")
  // whatever that signal is will be added via brackets as an attribute on the left container div,
  // but only conditionally, based on the create effect below. 

  const [viewWidth, setViewWidth] = createSignal('wide');

  //Modal Controls:
  createEffect(() => {
    //if Modal is open and Query Content is being shown, change the style width to be 50vw
    if (showData() === true && showModal() === true) {
      setViewWidth('narrow');
    }
    if (showData() === false && showModal() === true) {
      setViewWidth('wide');
    }
  });

  return (

    <>
      <Switch>
        <Match when={showModal() === true}>
          <section class="modal">
            {/* Header */}
            <div class="outerContainer">
              <div class="leftContainer" id={viewWidth()}>
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


