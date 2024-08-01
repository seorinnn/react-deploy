import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from './api/instance';
import { AuthProvider } from './provider/Auth';
import { ServerProvider } from './provider/ServerProvider';
import { Routes } from './routes';

const App = () => {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ServerProvider>
            <Routes />
          </ServerProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

export default App;
