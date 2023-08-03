import { QueryClient } from 'react-query';

export function generateQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {       
        cacheTime: Infinity,        
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,//Number.MAX_SAFE_INTEGER,
      },
    },
  }
  );
}
export const queryClient = generateQueryClient();