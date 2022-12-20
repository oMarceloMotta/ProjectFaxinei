import { useEffect } from 'react';
import { requestPermission } from '../geolocation/requestPermission';
import { getCoords } from '../geolocation/getCoords';
import { watchGeolocation } from '../geolocation/watchGeolocation';
import { Loader } from '../components/Loader/Loader';
import { useAppDispatch, useAppSelector, appActions } from './appStore';
import { delay } from '../utils/delay';
import { Coords } from '../types';
import React from 'react';

export type AppInitProviderProps = {
  children: React.ReactNode;
};

async function init() {
  while ((await requestPermission()) === false) {}
  while (true) {
    const coords = await getCoords();
    if (coords !== undefined) {
      return { coords };
    }
    await delay(1000);
  }
}

export function AppInitProvider({ children }: AppInitProviderProps) {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.app.isLoading);
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);

  useEffect(() => {
    init().then(({ coords }) => {
      dispatch(appActions.setCoords({ coords: coords }));
      dispatch(appActions.setLoading({ isLoading: false }));
    });
  }, []);

  if (isLoading) {
    return <Loader dark={isDarkTheme} />;
  }

  return <AfterLoad>{children}</AfterLoad>;
}

function AfterLoad({ children }: AppInitProviderProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.app.user);
  useEffect(() => {
    if (Number(user.id) === 0) {
      dispatch(appActions.setId({ id: '1' }));
    }

    const { clearWatchId } = watchGeolocation({
      onPositionChange(coords: any) {
        dispatch(appActions.setCoords({ coords: coords }));
      },
    });

    return clearWatchId;
  }, []);

  return <>{children}</>;
}
