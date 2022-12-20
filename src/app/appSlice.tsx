import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coords, UserState } from '../types';

const appInitialState = {
  isLoading: true,
  isDarkTheme: false,
  user: {} as UserState,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
      state.isLoading = action.payload.isLoading;
    },
    setDarkTheme(state, action: PayloadAction<{ isDarkTheme: boolean }>) {
      state.isDarkTheme = action.payload.isDarkTheme;
    },
    setUser(state, action: PayloadAction<{ user: UserState }>) {
      state.user = action.payload.user;
    },
    setCoords(state, action: PayloadAction<{ coords: Coords }>) {
      state.user.coords = action.payload.coords;
    },
    setId(state, action: PayloadAction<{ id: string }>) {
      state.user.id = action.payload.id;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;
