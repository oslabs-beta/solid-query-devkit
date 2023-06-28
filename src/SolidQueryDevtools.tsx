import Tool from "./Tool";
import { QueryProvider } from "./Context";
import { JSX } from 'solid-js';

export default function SolidQueryDevtools(): JSX.Element {

  return (
    <QueryProvider>
      <Tool />
    </QueryProvider>  
  );
};