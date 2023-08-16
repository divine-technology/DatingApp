import React from 'react';
import {Routes} from './src/navigation/Routes';
import {AuthProvider} from './src/providers/context/Auth';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {api} from './src/services/api';
import {QueryClient, QueryClientProvider} from 'react-query';
import {openApi} from './src/services/openApi';

export const App: React.FC = () => {
  api.init();
  const queryClient = new QueryClient();
  openApi.init();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
