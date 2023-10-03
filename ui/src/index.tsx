import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { store } from './main/store/store';
import App from './App';
import './resources/index.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement,
);
root.render(
   // <React.StrictMode>
   <Provider store={store}>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
         <ReactQueryDevtools />
      </QueryClientProvider>
   </Provider>,
   // </React.StrictMode>,
);
