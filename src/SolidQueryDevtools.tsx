import Tool from "./Tool";
import { QueryProvider } from "./Context";
import { JSX } from 'solid-js';
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

const queryClient = new QueryClient({
  // ... any necessary configuration
});

export default function SolidQueryDevtools(): JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <QueryProvider>
        <Tool />
      </QueryProvider>
    </QueryClientProvider>
  )
};
