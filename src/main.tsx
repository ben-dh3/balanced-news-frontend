import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import localforage from 'localforage';
import { QueryClient, QueryClientProvider,  } from '@tanstack/react-query';
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 12, // 12 hours
      gcTime: 1000 * 60 * 60 * 24 * 7, // One week
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: localforage,
});

persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24 * 7, // One week
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
