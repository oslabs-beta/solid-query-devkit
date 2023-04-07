export function sortQueries(queries, sortMethod) {
  //sort queries by last updated
  if (sortMethod === 'last-updated') {
    return queries.sort((a, b) => {
      const nameA = a.state.dataUpdatedAt
      const nameB = b.state.dataUpdatedAt
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
    })
  } else {
  //sort queries by query hash
    return queries.sort((a, b) => {
      const nameA = a.queryHash.toUpperCase()
      const nameB = b.queryHash.toUpperCase()
      if (nameA > nameB) return 1;
      if (nameA < nameB) return -1;
    })
  }
}

export function getQueryStatus(query) {
  if (query.state.fetchStatus == 'fetching') return 'fetching'
  if (query.state.fetchStatus == 'paused') return 'paused'
  if (!query.isStale() && query.getObserversCount()) return 'fresh';
  if (query.isStale()) return 'stale'
  if (!query.observers.length) return 'inactive'
}

export function filterQueries(queries, filterText, statusFilters) {
  return queries.filter((query) =>  {
    if (statusFilters.active) {
      return query.queryHash.toLowerCase().includes(filterText) && getQueryStatus(query) === statusFilters.status
    } else {
      return query.queryHash.toLowerCase().includes(filterText)
    }
  })
}

