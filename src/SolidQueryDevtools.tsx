import Tool from "./Tool";
import { QueryProvider } from "./Context";

export default function SolidQueryDevtools() {

  return (
    <QueryProvider>
      <Tool />
    </QueryProvider>  
  );
};