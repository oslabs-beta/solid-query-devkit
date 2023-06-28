import { JSX } from 'solid-js'

// comments indicate import destinations for the types declared below

// Helpers.ts, Context.tsx
export type filter = {
  text: string,
  status: string
}

// Context.tsx
export type queryProvider = any;

export type queryProviderProps = queryProvider & JSX.Element

export type sort = {
  type: string, 
  reverse: boolean
}

// Explorer.tsx
export type explorerProps = {
  name: string,
  obj: any,
  key: string
}

// ObjectComponent.tsx
export type OCProps = {
  obj: any,
  key: string,
  level: number
}

// Primitive.tsx
export type primitiveProps = {
  level: number,
  key: string,
  value: any,
  type: string
}

export type styleObject = {
  color: string
}

export type optionsType = {
  string: (props: primitiveProps) => JSX.Element;
  boolean: (props: primitiveProps) => JSX.Element;
  number: (props: primitiveProps) => JSX.Element;
  undefined: (props: primitiveProps) => JSX.Element;
  null: (props: primitiveProps) => JSX.Element;
  [key: string]: any
}

// OverviewData.tsx
export type statusStylesObj = {
  fetching: string,
  paused: string,
  fresh: string,
  stale: string,
  inactive: string,
  [key: string]: any
}

// SingleKey.tsx
export type singleKeyProps = {
  readonly key: string,
  readonly index: number
}

export type backgroundColor = {
  'background-color': string
}

type stylingObject = {
  'background-color': string,
  color: string,
  'font-weight': string
}

export type stylings = {
  fresh: stylingObject,
  inactive: stylingObject,
  stale: stylingObject,
  fetching: stylingObject,
  paused: stylingObject,
  [key: string]: any
}

// ActiveQuery.tsx
export type queryFunctions = {
  refetch: () => void,
  invalidate: () => Promise<void>,
  reset: () => void,
  remove: () => void
}

// Header.tsx
export type statusStyle = {
  'background-color': string,
  color?: string,
  border?: string,
  opacity?: string
};

export type queryStatusesType = {
  fresh: number,
  fetching: number,
  paused: number,
  stale: number,
  inactive: number,
  [key: string]: any
};

export type styler = 
(queryCount: number,
buttonStatus: string,
stylingForSome: statusStyle,
stylingForNone: statusStyle,
stylingForSomeFiltered: statusStyle,
stylingForNoneFiltered: statusStyle) => statusStyle;
