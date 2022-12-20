import React from 'react';
import codePush from 'react-native-code-push';
export { Provider as AppStoreProvider } from 'react-redux';
export { PersistGate as AppStorePersistGate } from 'redux-persist/integration/react';
import AppNavigator from './AppNavigator';
import {
  AppStorePersistGate,
  AppStoreProvider,
  appPersistor,
  appStore,
} from './appStore';

import { AppLayoutProvider } from './AppLayoutProvider';
import { ApolloProvider, apolloClient } from '../utils/apolloClient';
import { AppInitProvider } from './AppInitProvider';

const AppContainer = () => {
  return (
    <AppStoreProvider store={appStore}>
      <AppStorePersistGate persistor={appPersistor}>
        <ApolloProvider client={apolloClient}>
          <AppInitProvider>
            <AppLayoutProvider>
              <AppNavigator></AppNavigator>
            </AppLayoutProvider>
          </AppInitProvider>
        </ApolloProvider>
      </AppStorePersistGate>
    </AppStoreProvider>
  );
};

const App = codePush(AppContainer);
export default App;
