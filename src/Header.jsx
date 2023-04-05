import { QueryContext } from "./QueryContext";
import { useContext } from "solid-js";
import logo from "./assets/SquidLogo.png";

  //Style Variables for Status Backgrounds: 
  //Loading
  const noneLoading = { "background-color": "rgb(14, 46, 96)", "color": "rgb(89, 98, 109)" };
  const someLoading = { "background-color": "blue", "color": "white" };
  //Fresh
  const noneFresh = { "background-color": "rgb(16, 66, 53)", "color": "rgb(89, 98, 109)" };
  const someFresh = { "background-color": "green", "color": "white" };
  //Stale
  const noneStale = { "background-color": "rgb(204, 150, 49)", "color": "rgb(89, 98, 109)" };
  const someStale = { "background-color": "rgb(255, 169, 8)", "color": "black" };
  //Inactive
  const noneInactive = { "background-color": "gray", "color": "rgb(89, 98, 109)" };
  const someInactive = { "background-color": "gray", "color": "white" };

  //Styles for Heading display
  const fullDisplay = {"display": "flex"}
  const halfDisplay = {"display": "flex", "width": "50%", "justify-content": "space-between"}
  const infoContainer = {"display": "flex", "flex-direction": "column", "align-items": "center", "justify-content": "space-between"}
  const sortOptions = {"display": "flex", "justify-content": "space-between", "width": "100%"}


export  default function Header(props) {
  const { queries } = useContext(QueryContext);
  const { setSort } = useContext(QueryContext);
  const { sortReverse, setSortReverse } = useContext(QueryContext);
  const { setFilter } = useContext(QueryContext);
  const { setShowModal } = useContext(QueryContext);
  const { activeQuery } = useContext(QueryContext);
  const { loading } = useContext(QueryContext);

  const fresh = () => queries().filter((query) => !query.isStale() && query.getObserversCount()).length;
  const stale = () => queries().filter((query) => query.isStale()).length;
  const inactive = () => queries().filter((query) => !query.getObserversCount()).length;

  return (
    <header style={ !activeQuery() ? fullDisplay : halfDisplay}>
      <img src={logo} width='65pxvw' height='65px'></img>
      <h1 class="queries">Queries ({`${queries().length}`})</h1>
      <div style={infoContainer}>
      <nav class="statusGrid">
        <div id="fresh" style={fresh()? someFresh : noneFresh}>fresh ({fresh()})</div>
        <div id="fetching" style={loading() ? someLoading : noneLoading}>fetching ({loading()})</div>
        <div id="stale" style={stale() ? someStale : noneStale}>stale ({stale()})</div>
        <div id="inactive" style={inactive() ? someInactive : noneInactive}>inactive ({inactive()})</div>
        <div id="paused" style={inactive() ? someInactive : noneInactive}>Paused ({inactive()})</div>
      </nav>
      <div style={sortOptions}>
      <input type="text" placeholder="Filter queries..." onChange={(e) => {setFilter(e.target.value)}}></input>
      <select name="sort" id="sort" onChange={(e) => setSort(e.target.value)}>
        <option value="last-updated" selected>Sort by Last Updated</option>
        <option value="hash">Sort by Query Hash</option>
      </select>
      <button onClick={() => setSortReverse(!sortReverse())}>{ sortReverse() ? '\u2191 Asc' : '\u2193 Dec'}</button>
      </div>
      </div>
     
      <button class="closeModal" onclick={() => setShowModal(false)}>Close</button>
    </header>
  )
}