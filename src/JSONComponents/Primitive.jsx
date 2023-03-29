const style = {
  color: 'rgba(170, 170, 170, 0.851)'
}
const truthy = {
  color: 'rgba(102, 178, 255, 0.851)'
}
const falsey = {
  color: 'rgba(200, 0, 120, 0.651)'
}
const Boolean = (props) =>  {
  const boolean = props.value ? 'true' : 'false'
  return (
    <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>{boolean}</span></div>
  )
}
const Number = (props) =>  {
  return (
    <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>{parseInt(props.value)}</span></div>
  )
}
const String = (props) =>  {
  return (
    <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={truthy}>"{props.value}"</span></div>
  )
}
const Null = (props) => {
  return (
    <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={falsey}>null</span></div>
  )
}
const Undefined = (props) => {
  return (
    <div style={`margin-left: ${props.level * 15}px`}><span style={style}>{props.key}: </span><span style={falsey}>undefined</span></div>
  )
}

const options = {
  string: String,
  boolean: Boolean,
  number: Number,
  undefined: Undefined,
  null: Null
}



export function Primitive(props) {
  return(
    <Dynamic component={options[props.type]} key={props.key} value={props.value} level={props.level} />
  )
}