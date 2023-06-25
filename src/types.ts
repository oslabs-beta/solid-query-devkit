import { JSX } from 'solid-js'

// comments indicate import destinations for the types declared below

// Helpers.ts, Context.tsx
export type filter = {
  text: string,
  status: string
}

// Context.tsx
export type queryProvider = {
  children: JSX.Element
}

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