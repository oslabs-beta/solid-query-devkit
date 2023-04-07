/* @refresh reload */
import { render } from 'solid-js/web';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'

import './index.css';
import App from './App';

const root = document.getElementById('root');

const queryClient = new QueryClient()

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

//Devtools Component will be inserted below App after importing hook/package
render(() => 
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>,
 root);
