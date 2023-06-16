import { Dynamic } from "solid-js/web";
import { JSX } from 'solid-js' 

type props = {
  level: number,
  key: string,
  value: any,
  type: string
}

export function Primitive(props: props): JSX.Element {

  type styleObject = {
    color: string
  }

  const style: styleObject = {
    color: 'rgba(170, 170, 170, 0.851)'
  }
  const truthy: styleObject = {
    color: 'rgba(102, 178, 255, 0.851)'
  }
  const falsey: styleObject = {
    color: 'rgba(200, 0, 120, 0.651)'
  }

  const Boolean = (props: props): JSX.Element =>  {
    const boolean: string = props.value ? 'true' : 'false'
    // const {count, setCount} = useContext(QueryContext);
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>{boolean}</span></div>
    )
  }
  const Number = (props: props): JSX.Element =>  {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>{parseInt(props.value)}</span></div>
    )
  }
  const String = (props: props): JSX.Element =>  {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>"{props.value}"</span></div>
    )
  }
  const Null = (props: props): JSX.Element => {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={falsey}>null</span></div>
    )
  }
  const Undefined = (props: props): JSX.Element => {
    return (
      <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={falsey}>undefined</span></div>
    )
  }
  
  type optionsType = {
    string: (props: props) => JSX.Element;
    boolean: (props: props) => JSX.Element;
    number: (props: props) => JSX.Element;
    undefined: (props: props) => JSX.Element;
    null: (props: props) => JSX.Element;
    [key: string]: any
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