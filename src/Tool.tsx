import QueryKeyList from "./QueryKeyList";
import { ActiveQuery } from "./ActiveQuery";
import { Header } from "./Header";
import { Match, Switch, useContext, JSX, Show } from "solid-js";
import logo from "./assets/SquidLogo.png";
import './index.css';
import { QueryContext } from "./Context";


export default function Tool(): JSX.Element {

  const { setShowModal, showModal, activeQuery } = useContext<any>(QueryContext);

  // IDEA: repurpose viewWidth signal to contain either an empty string at initialization,
  // or a string with a class/id identifier (e.g., "responsive")
  // whatever that signal is will be added via brackets as an attribute on the left container div,
  // but only conditionally, based on the create effect below. 

  const viewWidth = (): string => activeQuery() ? 'sqd-narrow' : 'sqd-wide'

  return (
    <>
      <Switch>
        <Match when={showModal()}>
          <section class="sqd-modal">
            {/* Header */}
            <div class="sqd-outerContainer">
              <div class="sqd-leftContainer" id={viewWidth()}>
                <Header />
                <div class="sqd-main">
                  <QueryKeyList />
                </div>
              </div>
              <Show when={activeQuery()}>
                <div class="sqd-rightContainer">
                  <section class="queryContent">
                    <ActiveQuery />
                  </section>
                </div>
              </Show>
            </div>
          </section>
        </Match>
        <Match when={showModal() === false}>
          <button id="sqd-showModal" class="toggle" onclick={() => {
            setShowModal(true);
          }}>
            <img src={logo} width='75pxvw' height='75px'></img>
          </button>
        </Match>
      </Switch>
    </>
  );
};


