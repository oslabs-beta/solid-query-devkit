import QueryKeyList from "./QueryKeyList";
import ActiveQuery from "./ActiveQuery";
import Header from "./Header";
import {  Match, useContext } from "solid-js";
import logo from "./assets/SquidLogo.png";
import { QueryContext, QueryProvider } from "./QueryContext";

export default function Tool() {

  //Signals imported from Query Context 
  const { showModal, setShowModal, activeQuery } = useContext(QueryContext);

  // IDEA: repurpose viewWidth signal to contain either an empty string at initialization,
  // or a string with a class/id identifier (e.g., "responsive")
  // whatever that signal is will be added via brackets as an attribute on the left container div,
  // but only conditionally, based on the create effect below. 

  const viewWidth = () => activeQuery() ? 'narrow' : 'wide'

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
              <Show when={activeQuery()}>
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
          }}>
            <img src={logo} width='75pxvw' height='75px'></img>
          </button>
        </Match>
      </Switch>
    </>
  );
};


