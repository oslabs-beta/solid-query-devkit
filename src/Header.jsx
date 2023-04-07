import { QueryContext } from "./QueryContext";
import { useContext } from "solid-js";
import logo from "./assets/SquidLogo.png";

  //Style Variables for Status Backgrounds: 
  //Loading
  const noneLoading = { "background-color": "rgb(14, 46, 96)", "color": "rgb(89, 98, 109)" };
  const noneLoadingFiltered = { "background-color": "rgb(14, 46, 96)", "color": "rgb(89, 98, 109)", "border": "0.2em solid white" };
  const someLoading = { "background-color": "blue", "color": "white" };
  const someLoadingFiltered = { "background-color": "blue", "color": "white", "border": "0.5em solid white" };
  //Fresh
  const noneFresh = { "background-color": "rgb(16, 66, 53)", "color": "rgb(89, 98, 109)" };
  const noneFreshFiltered = { "background-color": "rgb(16, 66, 53)", "color": "rgb(89, 98, 109)", "border": "0.2em solid white" };
  const someFresh = { "background-color": "green", "color": "white" };
  const someFreshFiltered = { "background-color": "green", "color": "white", "border-color": "white", "border-style": "solid" };
  //Paused
  const nonePaused = { "background-color": "rgb(140, 73, 235)", "color": "white", "opacity": "0.3" };
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
  const noneInactiveFiltered = { "background-color": "rgb(35,48,67)", "border-color": "white", "border-style": "solid", "color": "rgb(89, 98, 109)" };
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

  // checker functions that are passed into the styler function
  const fresh = () => queries().filter((query) => !query.isStale() && query.getObserversCount()).length;
  const paused = () => queries().filter((query) => query.state.fetchStatus === "paused").length;
  const stale = () => queries().filter((query) => query.isStale()).length;
  const inactive = () => queries().filter((query) => !query.getObserversCount()).length;

  // function to be invoked on status button click
  const applyStatusFilter = (buttonStatus) => {
    if (statusFilters().active && statusFilters().status === buttonStatus) setStatusFilters({status: buttonStatus, active: false});
    else if (statusFilters().active && statusFilters().status !== buttonStatus) setStatusFilters({status: buttonStatus, active: true});
    else setStatusFilters({status: buttonStatus, active: true});
  }

  // styler functions to be invoked inside the style attribute of the status buttons
  const styler = (checkerFunc, buttonStatus, stylingForSome, stylingForNone, stylingForSomeFiltered, stylingForNoneFiltered) => {
    if ((checkerFunc() && statusFilters().status !== buttonStatus)
    || (checkerFunc() && statusFilters().status === buttonStatus && !statusFilters().active)) return stylingForSome;
    if ((!checkerFunc() && statusFilters().status !== buttonStatus)
    || (!checkerFunc() && statusFilters().status === buttonStatus && !statusFilters().active)) return stylingForNone;
    if (checkerFunc() && statusFilters().status === buttonStatus && statusFilters().active) return stylingForSomeFiltered;
    else return stylingForNoneFiltered;
  }

  return (
    <header style={ !activeQuery() ? fullDisplay : halfDisplay}>
      <img src={logo} width='65pxvw' height='65px' class="closeModal" onclick={() => setShowModal(false)}></img>
      <h1 class="queries">{`${queries().length}`} queries</h1>
      <div style={infoContainer}>
      <nav class="statusGrid">
        <div class="statusBtn" style={styler(fresh, 'fresh', someFresh, noneFresh, someFreshFiltered, noneFreshFiltered)} onClick={() => applyStatusFilter('fresh')}>fresh ({fresh()})</div>
        <div class="statusBtn" style={styler(loading, 'fetching', someLoading, noneLoading, someLoadingFiltered, noneLoadingFiltered)} onClick={() => applyStatusFilter('fetching')}>fetching ({loading()})</div>
        <div class="statusBtn" style={styler(paused, 'paused', somePaused, nonePaused, somePausedFiltered, nonePausedFiltered)} onClick={() => applyStatusFilter('paused')}>paused ({paused()})</div>
        <div class="statusBtn" style={styler(stale, 'stale', someStale, noneStale, someStaleFiltered, noneStaleFiltered)} onClick={() => applyStatusFilter('stale')}>stale ({stale()})</div>
        <div class="statusBtn" style={styler(inactive, 'inactive', someInactive, noneInactive, someInactiveFiltered, noneInactiveFiltered)} onClick={() => applyStatusFilter('inactive')}>inactive ({inactive()})</div>
      </nav>
      <div style={sortOptions}>
      <input type="text" placeholder="Filter queries..." style={{"border-radius": "5px", "text-indent": "0.5em"}} onChange={(e) => {setFilter(e.target.value.toLowerCase())}}></input>
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