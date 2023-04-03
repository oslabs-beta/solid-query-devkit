export function Header(props) {

  const styles = {
    "font-weight": 'bold',
    "background-color": 'transparent',
    "margin": '0',
    "padding": '0.5em'
  }
  
  return (
    <div>
    <p style={styles}>{props.name}</p>
  </div>
  )
}