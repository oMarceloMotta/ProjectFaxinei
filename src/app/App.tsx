import { NavigationContainer } from '@react-navigation/native';

import React, { useEffect, useRef, useState } from 'react';
import { getCoords } from '../geolocation/getCoords';
import { requestPermission } from '../geolocation/requestPermission';
import { AppContext, initialAppState } from './AppContext';
import { AppState, ClientState } from '../types';
import AppNavigator from './AppNavigator';
import { AppStorage } from './AppStorage';
import { watchGeolocation } from '../geolocation/watchGeolocation';
import { ClientStorage } from './ClientStorage';
async function init(): Promise<AppState> {
  const isPermissionGranted = await requestPermission();
  const coords = await getCoords();
  const storage = await AppStorage.getStorage();
  const isLoading = !isPermissionGranted;
  const user = {
    ...storage.user,
    coords: coords ?? storage.user.coords,
  };
  const appState = {
    ...storage,
    user,
    isLoading,
  };

  await AppStorage.setStorage(appState);

  return appState;
}

const App = () => {
  const [appState, setAppState] = useState(initialAppState);
  const [clientState, setClientState] = useState<Array<ClientState>>([]);
  const clearWatchIdRef = useRef(() => {});
  const clearWatchId = clearWatchIdRef.current;

  useEffect(() => {
    init().then(appState => {
      ClientStorage.getStorage().then(clients => setClientState(clients));
      setAppState(appState);
      const watchResults = watchGeolocation({
        onPositionChange(coords: any) {
          setAppState({
            ...appState,
            user: {
              ...appState.user,
              coords,
            },
          });
        },
      });

      clearWatchIdRef.current = watchResults.clearWatchId;
    });

    return () => {
      clearWatchId();
    };
  }, []);

  return (
    <NavigationContainer>
      <AppContext.Provider value={{ appState, setAppState }}>
        <AppNavigator></AppNavigator>
      </AppContext.Provider>
    </NavigationContainer>
  );
};
export default App;
