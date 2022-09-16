import { gamesLoad } from './games';
import { getIn, identity, Index, Indices } from '@app/utils';

import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { fakeAPI } from '../api';
import { Platform } from '../models';


const platformsAdapter = createEntityAdapter<Platform>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: identity('id'),
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const platformsSlice = createSlice({
  name: 'platforms',
  initialState: platformsAdapter.getInitialState({ loading: false, selected:[] }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(gamesLoad.fulfilled, (state, action) => {
      // We use `Object.values()` being that the payload was processed with normalizr
      platformsAdapter.upsertMany(state, Object.values(action.payload.platforms || {}));
    });
    builder.addMatcher(
      (action) => action.type && action.type.endsWith === '/pending',
      (state, action) => {
        state.loading = true;
      },
    );
  },
});
export type PlatformState = ReturnType<typeof platformsSlice.getInitialState>;
const { selectIds, selectById, selectAll, selectTotal, selectEntities } =
  platformsAdapter.getSelectors(({ platforms }: any) => platforms);
export const ReduxPlatforms = {
  byId: selectById,
  ids: selectIds,
  entities: selectEntities,
  all: selectAll,
  total: selectTotal,
};
export default platformsSlice.reducer;