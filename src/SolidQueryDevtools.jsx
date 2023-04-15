import Tool from "./Tool";
import { QueryProvider } from "./QueryContext";

export default function SolidQueryDevtools() {

  return (
    <QueryProvider >
      <Tool />
  </ QueryProvider>
  );
};


