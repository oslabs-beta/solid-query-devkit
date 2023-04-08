import { QueryContext } from "./QueryContext";
import { useContext } from "solid-js";
import logo from "./assets/SquidLogo.png";
import { getQueryStatus } from './Helpers';

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
  const noneInactiveFiltered = { "background-color": "rgb(35,48,67)", "border-color": "white", "border-style": "solid", "color": "rgb(89, 98, 109)" };
  const someInactive = { "background-color": "rgb(63, 78, 96)", "color": "white" };
  const someInactiveFiltered = { "background-color": "rgb(63, 78, 96)", "color": "white", "border-color": "white", "border-style": "solid" };


  //Styles for Heading display
  const fullDisplay = {"display": "flex", "align-items": "center"}
  const halfDisplay = {"display": "flex", "justify-content": "space-between", "align-items": "center"}
  const infoContainer = {"display": "flex", "flex-direction": "column", "align-items": "center", "justify-content": "space-between"}
  const sortOptions = {"display": "flex", "justify-content": "space-around", "width": "100%", "margin": "0.5em 0"}


export  default function Header() {
  const { queries } = useContext(QueryContext);
  const { sort, setSort } = useContext(QueryContext);
  const { filter, setFilter } = useContext(QueryContext);
  const { setShowModal } = useContext(QueryContext);
  const { activeQuery } = useContext(QueryContext);

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
    if (checkerFunc && filter().status === buttonStatus) { console.log('should be here'); return stylingForSomeFiltered;}
    else return stylingForNoneFiltered;
  }

  return (
    <header style={ !activeQuery() ? fullDisplay : halfDisplay}>
      <img src={logo} width='65pxvw' height='65px' class="closeModal" onclick={() => setShowModal(false)}></img>
      <h1 class="queries">{`${queries().length}`} queries</h1>
      <div style={infoContainer}>
      <nav class="statusGrid">
        <div class="statusBtn" style={styler(queryStatuses()['fresh'], 'fresh', someFresh, noneFresh, someFreshFiltered, noneFreshFiltered)} onClick={() => applyStatusFilter('fresh')}>fresh ({queryStatuses()['fresh']})</div>
        <div class="statusBtn" style={styler(queryStatuses()['fetching'], 'fetching', someLoading, noneLoading, someLoadingFiltered, noneLoadingFiltered)} onClick={() => applyStatusFilter('fetching')}>fetching ({queryStatuses()['fetching']})</div>
        <div class="statusBtn" style={styler(queryStatuses()['paused'], 'paused', somePaused, nonePaused, somePausedFiltered, nonePausedFiltered)} onClick={() => applyStatusFilter('paused')}>paused ({queryStatuses()['paused']})</div>
        <div class="statusBtn" style={styler(queryStatuses()['stale'], 'stale', someStale, noneStale, someStaleFiltered, noneStaleFiltered)} onClick={() => applyStatusFilter('stale')}>stale ({queryStatuses()['stale']})</div>
        <div class="statusBtn" style={styler(queryStatuses()['inactive'], 'inactive', someInactive, noneInactive, someInactiveFiltered, noneInactiveFiltered)} onClick={() => applyStatusFilter('inactive')}>inactive ({queryStatuses()['inactive']})</div>
      </nav>
      <div style={sortOptions}>
      <input type="text" placeholder="Filter queries..." style={{"border-radius": "5px", "text-indent": "0.5em"}} onChange={(e) => {setFilter({text: e.target.value.toLowerCase()})}}></input>
      <select name="sort" id="sort" style={{"border-radius": "5px"}} onChange={(e) => setSort(e.target.value)}>
        <option value="last-updated" selected>Sort by Last Updated</option>
        <option value="hash">Sort by Query Hash</option>
      </select>
      <button id="ascBtn" onClick={() =>setSort({...sort(),reverse: !sort().reverse})}>{ sort().reverse ? '\u2191 Asc' : '\u2193 Dec'}</button>
      </div>
      </div>
     
      <button class="closeModal" onclick={() => setShowModal(false)}>Close</button>
    </header>
  )
}