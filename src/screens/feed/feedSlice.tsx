import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeedCardProps, FeedState } from '../../types';

const appInitialState = {
  feeds: [] as FeedState[],
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState: appInitialState,
  reducers: {
    setFeed(state, action: PayloadAction<{ feeds: FeedState[] }>) {
      state.feeds = action.payload.feeds;
    },
    addFeedPage(state, action: PayloadAction<{ feeds: FeedCardProps[] }>) {
      state.feeds = [...state.feeds, ...action.payload.feeds];
    },
  },
});

export const feedActions = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
