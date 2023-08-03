import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client'

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';

//react query
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
    <QueryClientProvider client={queryClient} contextSharing>
        <Suspense>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </Suspense>
        </QueryClientProvider>
    </React.StrictMode>
);

