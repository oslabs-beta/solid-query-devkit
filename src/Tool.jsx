import { Match, createSignal, Switch, For } from "solid-js";
import logo from "./assets/SquidLogo.png";
import { useQueryClient } from "@tanstack/solid-query";
import {sortQueries, filterQueries, getQueryStatus} from './Helpers'
import './index.css';

const [activeQuery, setActiveQuery] = createSignal();
const [queries, setQueries] = createSignal([]);
const [sort, setSort] = createSignal({type: 'last-updated', reverse: false});
const [filter, setFilter] = createSignal({text: '', status: ''});
const [showModal, setShowModal] = createSignal(false);

let queryClient;

function Primitive(props) {

  const style = {
    color: 'rgba(170, 170, 170, 0.851)'
  }
  const truthy = {
    color: 'rgba(102, 178, 255, 0.851)'
  }
  const falsey = {
    color: 'rgba(200, 0, 120, 0.651)'
  }
  const Boolean = (props) =>  {
    const boolean = props.value ? 'true' : 'false'
    // const {count, setCount} = useContext(QueryContext);
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>{boolean}</span></div>
    )
  }
  const Number = (props) =>  {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>{parseInt(props.value)}</span></div>
    )
  }
  const String = (props) =>  {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>"{props.value}"</span></div>
    )
  }
  const Null = (props) => {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={falsey}>null</span></div>
    )
  }
  const Undefined = (props) => {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={falsey}>undefined</span></div>
    )
  }
  
  const options = {
    string: String,
    boolean: Boolean,
    number: Number,
    undefined: Undefined,
    null: Null
  }
  return(
    <Dynamic component={options[props.type]} key={props.key} value={props.value} level={props.level} />
  )
}

function ObjectComponent(props) {
  const [enabled, setEnabled] = createSignal(false)

  return (
    <>
    <div style = { `margin-left: ${props.level * 15}px; color: white; cursor: pointer; width: fit-content;`} >
      <span onClick={() => setEnabled(!enabled())}>
        <span style={'font-weight: bold'}>{!enabled() ? '\u25B6' : '\u25BC'} {props.key} </span>
        <Show when={!enabled()}>
          <span style={'font-size: 75%'}>{Array.isArray(props.obj) ? `[${props.obj.length} items]` : `{${Object.keys(props.obj).length} item${Object.keys(props.obj).length > 1 ? 's' : ''}}`}</span>
        </Show>
      </span>
    </div>

    <Show when={enabled()}>
      <For each={Object.keys(props.obj)}>
      {(key) => 
        <Switch>
          <Match when={props.obj[key] === null || props.obj[key] === undefined || typeof props.obj[key] !== 'object'} >
              <Primitive level={props.level + 1} key={key} value={props.obj[key]} type={props.obj[key] === null ? 'null' : props.obj[key] === undefined ? 'undefined' : typeof props.obj[key]} />
          </Match>
          <Match when={typeof props.obj[key] === 'object'}>
                <ObjectComponent key={key} obj={props.obj[key]} level={props.level + 1}/>
          </Match>
        </Switch>
        }
      </For>
    </Show>
    
    </>
  )
}


function Header() {

    //Style Variables for Status Backgrounds: 
  //Loading
  const noneLoading = { "background-color": "rgb(14, 46, 96)", "color": "rgb(89, 98, 109)" };
  const noneLoadingFiltered = { "background-color": "rgb(14, 46, 96)", "color": "rgb(89, 98, 109)", "border": "0.2em solid white" };
  const someLoading = { "background-color": "blue", "color": "white" };
  const someLoadingFiltered = { "background-color": "blue", "color": "white", "border": "0.2em solid white" };
  //Fresh
  const noneFresh = { "background-color": "rgb(16, 66, 53)", "color": "rgb(89, 98, 109)" };
  const noneFreshFiltered = { "background-color": "rgb(16, 66, 53)", "color": "rgb(89, 98, 109)", "border": "0.2em solid white" };
  const someFresh = { "background-color": "green", "color": "white" };
  const someFreshFiltered = { "background-color": "green", "color": "white", "border": "0.2em solid white" };
  //Paused
  const nonePaused = { "background-color": "rgba(60,46,109)", "color": "white", "opacity": "0.3" };
  const nonePausedFiltered = { "background-color": "rgba(60,46,109)", "color": "rgb(89, 98, 109)", "border": "0.2em solid white" };
  const somePaused = { "background-color": "rgb(140, 73, 235)", "color": "white" };
  const somePausedFiltered = { "background-color": "rgb(140, 73, 235)", "color": "white", "border": "0.2em solid white" };
  //Stale
  const noneStale = { "background-color": "rgb(204, 150, 49)", "color": "rgb(89, 98, 109)" };
  const noneStaleFiltered = { "background-color": "rgb(204, 150, 49)", "color": "rgb(89, 98, 109)", "border": "0.2em solid white" };
  const someStale = { "background-color": "rgb(255, 169, 8)", "color": "black" };
  const someStaleFiltered = { "background-color": "rgb(255, 169, 8)", "color": "black", "border": "0.2em solid white" };
  //Inactive
  const noneInactive = { "background-color": "rgb(63, 78, 96)", "opacity": "0.3" };
  const noneInactiveFiltered = { "background-color": "rgb(35,48,67)", "border": "0.2em solid white", "color": "rgb(89, 98, 109)" };
  const someInactive = { "background-color": "rgb(63, 78, 96)", "color": "white" };
  const someInactiveFiltered = { "background-color": "rgb(63, 78, 96)", "color": "white", "border": "0.2em solid white" };


  //Styles for Heading display
  const fullDisplay = {"display": "flex", "align-items": "center"}
  const halfDisplay = {"display": "flex", "justify-content": "space-between", "align-items": "center"}
  const infoContainer = {"display": "flex", "flex-direction": "column", "align-items": "center", "justify-content": "space-between"}
  const sortOptions = {"display": "flex", "justify-content": "space-around", "width": "100%", "margin": "0.5em 0"}

  // checker functions that are passed into the styler function

  const queryStatuses = () => {
    const statuses = {
    fresh: 0,
    fetching: 0,
    paused: 0,
    stale: 0,
    inactive: 0
  }
  queries().forEach((query) => {
    const status = getQueryStatus(query);
    statuses[status]++
  })

  return statuses
  }

  // function to be invoked on status button click
  const applyStatusFilter = (buttonStatus) => {
    if (filter().status === buttonStatus) setFilter({...filter(), status: ''});
    else if (filter().status !== buttonStatus) setFilter({...filter(), status: buttonStatus});
  }

  // styler functions to be invoked inside the style attribute of the status buttons
  const styler = (checkerFunc, buttonStatus, stylingForSome, stylingForNone, stylingForSomeFiltered, stylingForNoneFiltered) => {
    if (checkerFunc && filter().status !== buttonStatus) return stylingForSome;
    if (!checkerFunc && filter().status !== buttonStatus) return stylingForNone;
    if (checkerFunc && filter().status === buttonStatus) { return stylingForSomeFiltered;}
    else return stylingForNoneFiltered;
  }

  return (
    <header class='sqd-header' style={ !activeQuery() ? fullDisplay : halfDisplay}>
      <img src={logo} width='65pxvw' height='65px' class="sqd-closeModal" onclick={() => setShowModal(false)}></img>
      <h1 class="sqd-queries">{`${queries().length}`} queries</h1>
      <div style={infoContainer}>
      <nav class="sqd-statusGrid">
        <div class="sqd-statusBtn" style={styler(queryStatuses()['fresh'], 'fresh', someFresh, noneFresh, someFreshFiltered, noneFreshFiltered)} onClick={() => applyStatusFilter('fresh')}>fresh ({queryStatuses()['fresh']})</div>
        <div class="sqd-statusBtn" style={styler(queryStatuses()['fetching'], 'fetching', someLoading, noneLoading, someLoadingFiltered, noneLoadingFiltered)} onClick={() => applyStatusFilter('fetching')}>fetching ({queryStatuses()['fetching']})</div>
        <div class="sqd-statusBtn" style={styler(queryStatuses()['paused'], 'paused', somePaused, nonePaused, somePausedFiltered, nonePausedFiltered)} onClick={() => applyStatusFilter('paused')}>paused ({queryStatuses()['paused']})</div>
        <div class="sqd-statusBtn" style={styler(queryStatuses()['stale'], 'stale', someStale, noneStale, someStaleFiltered, noneStaleFiltered)} onClick={() => applyStatusFilter('stale')}>stale ({queryStatuses()['stale']})</div>
        <div class="sqd-statusBtn" style={styler(queryStatuses()['inactive'], 'inactive', someInactive, noneInactive, someInactiveFiltered, noneInactiveFiltered)} onClick={() => applyStatusFilter('inactive')}>inactive ({queryStatuses()['inactive']})</div>
      </nav>
      <div style={sortOptions}>
      <input type="text" placeholder="Filter queries..." style={{"border-radius": "5px", "text-indent": "0.5em", "color": "black"}} onChange={(e) => {setFilter({text: e.target.value.toLowerCase()})}}></input>
      <select name="sort" id="sort" style={{"border-radius": "5px", "color": "black"}} onChange={(e) => setSort({...sort(), type: e.target.value})}>
        <option value="last-updated" selected>Sort by Last Updated</option>
        <option value="hash">Sort by Query Hash</option>
      </select>
      <button class="sqd-ascBtn" onClick={() =>setSort({...sort(),reverse: !sort().reverse})}>{ sort().reverse ? '\u2191 Asc' : '\u2193 Dec'}</button>
      </div>
      </div>
    
      <button class="sqd-ascBtn" onclick={() => setShowModal(false)}>Close</button>
    </header>
  )
}

function QueryKeyList(props) {

  const derivedQueries = () => {
    return sort().reverse ? 
    filterQueries(sortQueries(queries(), sort().type), filter()).reverse()
    : filterQueries(sortQueries(queries(), sort().type), filter())
  }

  return (
    <div>
      {/* For each query, render a SingleKey component, passing down the necessary information from the query cache as props */}
      <For each={derivedQueries()}>
        {(query, i) => {
          return <SingleKey
            key={query.queryHash}
            index={i()}
          />
        }}
      </For>
    </div>
  );
};

function Explorer(props)   {
  return (
      <>
      <div class="sqd-detailsHeader">
          <h3>{props.name}</h3>
      </div>
      <div class="sqd-object-component">
      <ObjectComponent obj={props.obj || {}} key={props.key} level={1}/>
      </div>
      </>
  )

}


function ActiveQuery() {



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

function OverviewData()   {

  const queryStatus = () => getQueryStatus(queries().find(query => query.queryHash === activeQuery().queryHash));
  const queryArr = () => JSON.parse(activeQuery().queryHash);

  const statusStyles = {
    fetching: "background-color:blue; color:white",
    paused: "background-color:rgb(140, 73, 235); color:white",
    fresh: "background-color:green; color:white",
    stale: "background-color:rgb(255, 169, 8); color:black",
    inactive: "background-color:gray; color:white",
  }

  function normalTime() {
    const unixTime = activeQuery().state.dataUpdatedAt;
    if (unixTime === 0) return 'Not yet updated';
    const date = new Date(unixTime)
    return date.toLocaleTimeString()
  }

  return (
    <>
      <div class="sqd-detailsHeader">
        <h3>Query Details</h3>
      </div>
      <div class="queryDetailsData" style={"margin: 1em;"}>
        <div style={"display: flex; justify-content: space-between;"}>
          <div>
            <div>{'['}</div>
            <For each={queryArr()}>
              {(el, i) => {
                let comma = ',';
                if (i() === queryArr().length - 1) comma = '';
                if (typeof el === 'string') {
                  return <div style={"margin-left: 20px;" }>{`\"${el}\"${comma}`}</div>
                }
                else return <div style={"margin-left: 20px;"}>{el}{comma}</div>
              }}
            </For>
            <div style={"margin-bottom: 1em"}>{']'}</div>
          </div>
          <div style={`background-color: blue; height:100%; border-radius:2px; padding: 1em 2em; font-weight:bold; ${statusStyles[queryStatus()]}`}>{queryStatus()}</div>
        </div>
        <div id="query-details-observers" style={"margin-bottom: 1em; display: flex; justify-content: space-between"}>
          <span>Observers:</span>
          <span>{activeQuery().observers.length}</span>
        </div>
        <div style={"display: flex; justify-content: space-between"}>
          <span>Last Updated At:</span>
          <span>{normalTime()}</span>
        </div>
      </div>
    </>
  )
}

function SingleKey(props) {

  //Styles for observers box
  const stylings = {
    fresh: {"background-color": "green", "color": "white", "font-weight": "bold"},
    inactive: {"background-color": "rgb(63, 78, 96)", "color": "white", "font-weight": "bold"},
    stale: {"background-color": "rgb(255, 169, 8)", "color": "black", "font-weight": "bold"},
    fetching: {"background-color": "blue", "color": "white", "font-weight": "bold"},
    paused: {"background-color": "rgb(150, 71, 166)", "color": "white", "font-weight": "bold"},
  }


  //signal to set style:
  const [backgroundColor, setBackgroundColor] = createSignal('');

  const query = () => {
    return queries().find((query) => query.queryHash === props.key);
  }

  return (
    <section class="sqd-queryKey">
      <div class="sqd-observers" style={stylings[getQueryStatus(query())]}>{query().observers.length}</div>
      <div id="sqd-singleKey" style={backgroundColor()} onClick={() => {
        setBackgroundColor({
          "background-color": 'rgba(13, 21, 32, 0.5)'
        });
        if (activeQuery() == undefined || activeQuery().queryHash !== props.key)  {
          setActiveQuery(query());
        } else {
          setActiveQuery(undefined);
        }
      }
      }>
        <span id="queryColor">{query().queryHash}</span>
      </div>
    </section>
  );
};

export default function Tool(props) {

queryClient = useQueryClient(props.queryClient);

//subscribing to the query cache, which runs the function every time the queryCache updates 
queryClient.queryCache.subscribe(() => {
  setQueries(() => [...queryClient.queryCache.queries]);
  if (activeQuery()) {
    setActiveQuery({...queries().filter((query) => query.queryHash == activeQuery().queryHash)[0]});
  };
});

  // IDEA: repurpose viewWidth signal to contain either an empty string at initialization,
  // or a string with a class/id identifier (e.g., "responsive")
  // whatever that signal is will be added via brackets as an attribute on the left container div,
  // but only conditionally, based on the create effect below. 

  const viewWidth = () => activeQuery() ? 'sqd-narrow' : 'sqd-wide'

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


