import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
export { Provider as AppStoreProvider } from 'react-redux';
export { PersistGate as AppStorePersistGate } from 'redux-persist/integration/react';
export { appActions } from './appSlice';
import { appReducer } from './appSlice';
import { feedReducer } from '../screens/feed/feedSlice';
import { clientReducer } from './clientSlice';

const persistConfig = {
  storage: AsyncStorage,
};

const persistedAppReducer = persistReducer(
  {
    ...persistConfig,
    key: 'app',
    blacklist: ['isLoading'],
  },
  appReducer,
);

const persistedClientsReducer = persistReducer(
  {
    ...persistConfig,
    key: 'clients',
  },
  clientReducer,
);

const persistedFeedReducer = persistReducer(
  {
    ...persistConfig,
    key: 'feed',
  },
  feedReducer,
);

export const appStore = configureStore({
  reducer: {
    app: persistedAppReducer,
    clients: persistedClientsReducer,
    feed: persistedFeedReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const appPersistor = persistStore(appStore);

export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;
export const useAppDispatch: () => typeof appStore.dispatch = useDispatch;

export type AppStore = ReturnType<typeof appStore.getState>;
