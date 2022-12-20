import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientState } from '../types';

const appInitialState = {
  clients: [] as ClientState[],
};

export const clientSlice = createSlice({
  name: 'clients',
  initialState: appInitialState,
  reducers: {
    setClients(state, action: PayloadAction<{ clients: ClientState[] }>) {
      state.clients = action.payload.clients;
    },
  },
});

export const clientActions = clientSlice.actions;
export const clientReducer = clientSlice.reducer;
