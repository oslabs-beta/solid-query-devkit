export default function SingleKey(props)   {
  console.log('SingleKey props: ', props);

  return (
    <div>
      <span>{props.numOfObservers}</span>
      <span>{props.queryHash}</span>
    </div>
  );
};