import Tool from "./Tool";

export default function SolidQueryDevtools(props) {

  return (
      <Tool queryClient={props.queryClient} />
  );
};