import { QueryContext } from "./QueryContext";
import { useContext } from "solid-js";
import logo from "./assets/SquidLogo.png";

  //Style Variables for Status Backgrounds: 
  //Loading
  const noneLoading = { "background-color": "rgb(14, 46, 96)", "color": "rgb(89, 98, 109)" };
  const noneLoadingFiltered = { "background-color": "rgb(14, 46, 96)", "color": "rgb(89, 98, 109)", "border-color": "white", "border-style": "solid" };
  const someLoading = { "background-color": "blue", "color": "white" };
  const someLoadingFiltered = { "background-color": "blue", "color": "white", "border-color": "white", "border-style": "solid" };
  //Fresh
  const noneFresh = { "background-color": "rgb(16, 66, 53)", "color": "rgb(89, 98, 109)" };
  const noneFreshFiltered = { "background-color": "rgb(16, 66, 53)", "color": "rgb(89, 98, 109)", "border-color": "white", "border-style": "solid" };
  const someFresh = { "background-color": "green", "color": "white" };
  const someFreshFiltered = { "background-color": "green", "color": "white", "border-color": "white", "border-style": "solid" };
  //Paused
  const nonePaused = { "background-color": "rgb(140, 73, 235)", "color": "white", "opacity": "0.3" };
  const nonePausedFiltered = { "background-color": "rgba(60,46,109)", "color": "rgb(89, 98, 109)", "border-color": "white", "border-style": "solid" };
  const somePaused = { "background-color": "rgb(140, 73, 235)", "color": "white" };
  const somePausedFiltered = { "background-color": "rgb(140, 73, 235)", "color": "white", "border-color": "white", "border-style": "solid" };
  //Stale
  const noneStale = { "background-color": "rgb(204, 150, 49)", "color": "rgb(89, 98, 109)" };
  const noneStaleFiltered = { "background-color": "rgb(204, 150, 49)", "color": "rgb(89, 98, 109)", "border-color": "white", "border-style": "solid" };
  const someStale = { "background-color": "rgb(255, 169, 8)", "color": "black" };
  const someStaleFiltered = { "background-color": "rgb(255, 169, 8)", "color": "black", "border-color": "white", "border-style": "solid" };
  //Inactive
  const noneInactive = { "background-color": "rgb(63, 78, 96)", "opacity": "0.3" };
  const noneInactiveFiltered = { "background-color": "rgb(63, 78, 96)", "opacity": "0.3", "border-color": "white", "border-style": "solid" };
  const someInactive = { "background-color": "rgb(63, 78, 96)", "color": "white" };
  const someInactiveFiltered = { "background-color": "rgb(63, 78, 96)", "color": "white", "border-color": "white", "border-style": "solid" };


  //Styles for Heading display
  const fullDisplay = {"display": "flex", "align-items": "center"}
  const halfDisplay = {"display": "flex", "justify-content": "space-between", "align-items": "center"}
  const infoContainer = {"display": "flex", "flex-direction": "column", "align-items": "center", "justify-content": "space-between"}
  const sortOptions = {"display": "flex", "justify-content": "space-around", "width": "100%", "margin": "0.5em 0"}


export  default function Header(props) {
  const { queries } = useContext(QueryContext);
  const { setSort } = useContext(QueryContext);
  const { sortReverse, setSortReverse } = useContext(QueryContext);
  const { setFilter } = useContext(QueryContext);
  const { setShowModal } = useContext(QueryContext);
  const { activeQuery } = useContext(QueryContext);
  const { loading } = useContext(QueryContext);
  const { statusFilters, setStatusFilters } = useContext(QueryContext);

  const fresh = () => queries().filter((query) => !query.isStale() && query.getObserversCount()).length;
  const paused = () => queries().filter((query) => query.state.fetchStatus === "paused").length;
  const stale = () => queries().filter((query) => query.isStale()).length;
  const inactive = () => queries().filter((query) => !query.getObserversCount()).length;

  const setFresh = () => {
    if (statusFilters().active && statusFilters().status === 'fresh') setStatusFilters({status: 'fresh', active: false});
    else if (statusFilters().active && statusFilters().status !== 'fresh') setStatusFilters({status: 'fresh', active: true});
    else setStatusFilters({status: 'fresh', active: true});
    console.log('hey', statusFilters());
  };

  const setFetching = () => {
    if (statusFilters().active && statusFilters().status === 'fetching') setStatusFilters({status: 'fetching', active: false});
    else if (statusFilters().active && statusFilters().status !== 'fetching') setStatusFilters({status: 'fetching', active: true});
    else setStatusFilters({status: 'fetching', active: true});
    console.log(statusFilters());
  };

  const setPaused = () => {
    if (statusFilters().active && statusFilters().status === 'paused') setStatusFilters({status: 'paused', active: false});
    else if (statusFilters().active && statusFilters().status !== 'paused') setStatusFilters({status: 'paused', active: true});
    else setStatusFilters({status: 'paused', active: true});
    console.log(statusFilters());
  };

  const setStale = () => {
    if (statusFilters().active && statusFilters().status === 'stale') setStatusFilters({status: 'stale', active: false});
    else if (statusFilters().active && statusFilters().status !== 'stale') setStatusFilters({status: 'stale', active: true});
    else setStatusFilters({status: 'stale', active: true});
    console.log(statusFilters());
  };

  const setInactive = () => {
    if (statusFilters().active && statusFilters().status === 'inactive') setStatusFilters({status: 'inactive', active: false});
    else if (statusFilters().active && statusFilters().status !== 'inactive') setStatusFilters({status: 'inactive', active: true});
    else setStatusFilters({status: 'inactive', active: true});
    console.log(statusFilters());
  };

  const styler = (check, status, some, none, someFiltered, noneFiltered) => {
    if ((check() && statusFilters().status !== status)
    || (check() && statusFilters().status === status && !statusFilters().active)) return some;
    if ((!check() && statusFilters().status !== status)
    || (!check() && statusFilters().status === status && !statusFilters().active)) return none;
    if (check() && statusFilters().status === status && statusFilters().active) return someFiltered;
    else return noneFiltered;
  }

  return (
    <header style={ !activeQuery() ? fullDisplay : halfDisplay}>
      <img src={logo} width='65pxvw' height='65px' class="closeModal" onclick={() => setShowModal(false)}></img>
      <h1 class="queries">{`${queries().length}`} queries</h1>
      <div style={infoContainer}>
      <nav class="statusGrid">
        <div class="statusBtn" style={styler('fresh', fresh, someFresh, noneFresh, someFreshFiltered, noneFreshFiltered)} onClick={setFresh}>fresh ({fresh()})</div>
        <div class="statusBtn" style={styler('fetching', someLoading, noneLoading, someLoadingFiltered, noneLoadingFiltered)} onClick={setFetching}>fetching ({loading()})</div>
        <div class="statusBtn" style={styler('paused', paused, somePaused, nonePaused, somePausedFiltered, nonePausedFiltered)} onClick={setPaused}>paused ({paused()})</div>
        <div class="statusBtn" style={styler('stale', stale, someStale, noneStale, someStaleFiltered, noneStaleFiltered)} onClick={setStale}>stale ({stale()})</div>
        <div class="statusBtn" style={inactive() ? someInactive : noneInactive} onClick={setInactive}>inactive ({inactive()})</div>
      </nav>
      <div style={sortOptions}>
      <input type="text" placeholder="Filter queries..." style={{"border-radius": "5px", "text-indent": "0.5em"}} onChange={(e) => {setFilter(e.target.value)}}></input>
      <select name="sort" id="sort" style={{"border-radius": "5px"}} onChange={(e) => setSort(e.target.value)}>
        <option value="last-updated" selected>Sort by Last Updated</option>
        <option value="hash">Sort by Query Hash</option>
      </select>
      <button id="ascBtn" onClick={() => setSortReverse(!sortReverse())}>{ sortReverse() ? '\u2191 Asc' : '\u2193 Dec'}</button>
      </div>
      </div>
     
      <button class="closeModal" onclick={() => setShowModal(false)}>Close</button>
    </header>
  )
}