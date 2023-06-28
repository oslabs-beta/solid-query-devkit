import { QueryContext } from "./Context";
import { useContext, JSX } from "solid-js";
import logo from "./assets/SquidLogo.png";
import { getQueryStatus } from "./Helpers";
import type { Query } from '@tanstack/solid-query';
import type { statusStyle, queryStatusesType, styler } from './types';

export function Header(): JSX.Element {

  const { queries, filter, setFilter, sort, setSort, setShowModal, activeQuery } = useContext<any>(QueryContext);

  //Style Variables for Status Backgrounds: 
  //Loading
  const noneLoading: statusStyle = { "background-color": "rgb(14, 46, 96)", "color": "rgb(89, 98, 109)" };
  const noneLoadingFiltered: statusStyle = { "background-color": "rgb(14, 46, 96)", "color": "rgb(89, 98, 109)", "border": "0.2em solid white" };
  const someLoading: statusStyle = { "background-color": "blue", "color": "white" };
  const someLoadingFiltered: statusStyle = { "background-color": "blue", "color": "white", "border": "0.2em solid white" };
  //Fresh
  const noneFresh: statusStyle = { "background-color": "rgb(16, 66, 53)", "color": "rgb(89, 98, 109)" };
  const noneFreshFiltered: statusStyle = { "background-color": "rgb(16, 66, 53)", "color": "rgb(89, 98, 109)", "border": "0.2em solid white" };
  const someFresh: statusStyle = { "background-color": "green", "color": "white" };
  const someFreshFiltered: statusStyle = { "background-color": "green", "color": "white", "border": "0.2em solid white" };
  //Paused
  const nonePaused: statusStyle = { "background-color": "rgba(60,46,109)", "color": "white", "opacity": "0.3" };
  const nonePausedFiltered: statusStyle = { "background-color": "rgba(60,46,109)", "color": "rgb(89, 98, 109)", "border": "0.2em solid white" };
  const somePaused: statusStyle = { "background-color": "rgb(140, 73, 235)", "color": "white" };
  const somePausedFiltered: statusStyle = { "background-color": "rgb(140, 73, 235)", "color": "white", "border": "0.2em solid white" };
  //Stale
  const noneStale: statusStyle = { "background-color": "rgb(204, 150, 49)", "color": "rgb(89, 98, 109)" };
  const noneStaleFiltered: statusStyle = { "background-color": "rgb(204, 150, 49)", "color": "rgb(89, 98, 109)", "border": "0.2em solid white" };
  const someStale: statusStyle = { "background-color": "rgb(255, 169, 8)", "color": "black" };
  const someStaleFiltered: statusStyle = { "background-color": "rgb(255, 169, 8)", "color": "black", "border": "0.2em solid white" };
  //Inactive
  const noneInactive: statusStyle = { "background-color": "rgb(63, 78, 96)", "opacity": "0.3" };
  const noneInactiveFiltered: statusStyle = { "background-color": "rgb(35,48,67)", "border": "0.2em solid white", "color": "rgb(89, 98, 109)" };
  const someInactive: statusStyle = { "background-color": "rgb(63, 78, 96)", "color": "white" };
  const someInactiveFiltered: statusStyle = { "background-color": "rgb(63, 78, 96)", "color": "white", "border": "0.2em solid white" };

  //Styles for Heading display
  const fullDisplay = {"display": "flex", "align-items": "center"}
  const halfDisplay = {"display": "flex", "justify-content": "space-between", "align-items": "center"}
  const infoContainer: any = {"display": "flex", "flex-direction": "column", "align-items": "center", "justify-content": "space-between"}
  const sortOptions = {"display": "flex", "justify-content": "space-around", "width": "100%", "margin": "0.5em 0"}

  // checker functions that are passed into the styler function
  const queryStatuses = () => {
    const statuses: queryStatusesType = {
    fresh: 0,
    fetching: 0,
    paused: 0,
    stale: 0,
    inactive: 0
    }

    queries().forEach((query: Query) => {
      const status: string = getQueryStatus(query);
      statuses[status]++
    })

    return statuses
  }

  // function to be invoked on status button click
  const applyStatusFilter = (buttonStatus: string): void => {
    if (filter().status === buttonStatus) setFilter({...filter(), status: ''});
    else if (filter().status !== buttonStatus) setFilter({...filter(), status: buttonStatus});
  }

  // styler functions to be invoked inside the style attribute of the status buttons
  const styler: styler = (queryCount, buttonStatus, stylingForSome, stylingForNone, stylingForSomeFiltered, stylingForNoneFiltered) => {
    if (queryCount && filter().status !== buttonStatus) return stylingForSome;
    if (!queryCount && filter().status !== buttonStatus) return stylingForNone;
    if (queryCount && filter().status === buttonStatus) { return stylingForSomeFiltered;}
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
      <button class="sqd-ascBtn" onClick={() => setSort({...sort(),reverse: !sort().reverse})}>{ sort().reverse ? '\u2191 Asc' : '\u2193 Dec'}</button>
      </div>
      </div>
    
      <button class="sqd-ascBtn" onclick={() => setShowModal(false)}>Close</button>
    </header>
  )
}