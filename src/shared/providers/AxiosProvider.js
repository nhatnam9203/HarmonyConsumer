import { axios } from '@shared/services/axiosClient';
import React, { createContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

// provide the default query function to your app via the query client
const queryClient = new QueryClient();

export const AxiosContext = createContext({});

export const AxiosProvider = ({ children }) => {

  // React useEffect
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React render
  return (
    <AxiosContext.Provider value={{}}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AxiosContext.Provider>
  );
};
