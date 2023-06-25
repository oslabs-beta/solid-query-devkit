import { Dynamic } from "solid-js/web";
import { JSX } from 'solid-js' 
import type { primitiveProps, styleObject, optionsType } from './types'

export function Primitive(props: primitiveProps): JSX.Element {

  const style: styleObject = {
    color: 'rgba(170, 170, 170, 0.851)'
  }
  const truthy: styleObject = {
    color: 'rgba(102, 178, 255, 0.851)'
  }
  const falsey: styleObject = {
    color: 'rgba(200, 0, 120, 0.651)'
  }

  const Boolean = (props: primitiveProps): JSX.Element =>  {
    const boolean: string = props.value ? 'true' : 'false'
    // const {count, setCount} = useContext(QueryContext);
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>{boolean}</span></div>
    )
  }
  const Number = (props: primitiveProps): JSX.Element =>  {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>{parseInt(props.value)}</span></div>
    )
  }
  const String = (props: primitiveProps): JSX.Element =>  {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>"{props.value}"</span></div>
    )
  }
  const Null = (props: primitiveProps): JSX.Element => {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={falsey}>null</span></div>
    )
  }
  const Undefined = (props: primitiveProps): JSX.Element => {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={falsey}>undefined</span></div>
    )
  }

  const options: optionsType = {
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