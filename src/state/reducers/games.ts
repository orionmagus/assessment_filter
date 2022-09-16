import { formatCollection,formatDate, titleCase, getIn, hasSome, identity } from '@app/utils';

import { createAction, createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityState, SliceCaseReducers,  } from '@reduxjs/toolkit';
import { normalize } from 'normalizr';
import { fakeAPI } from '../api';
import { game, Game } from '../models';

type StateGame = {
  loading: boolean;
  filter: number[]
} & EntityState<Game>

export const gamesLoad = createAsyncThunk(
  'games/load',
  async () => {
    const data = await fakeAPI.games.list();
   
    // normalize the data so reducers can responded to a predictable payload, in this case: `action.payload = { users: {}, articles: {}, comments: {} }`
    const normalized = normalize(data, [game]);
    return normalized.entities;
  },
);
const gamesAdapter = createEntityAdapter<Game>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: identity('id'),
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});
// export const filterPlatform = createAction('FILTER_PLATFORM', (platform: number) => ({ payload: { platform } }))
const gamesSlice = createSlice<StateGame, SliceCaseReducers<StateGame>, string>(
  {
    name: 'games',
    initialState: gamesAdapter.getInitialState({ loading: false, filter: [] }),
    reducers: {
      filterPlatform: (state, { payload: platform}) => {
       
        //state.filter = (state.filter.indexOf(platform)!==-1)? state.filter.filter((v)=> v!==platform) : [...state.filter, platform]
        let index = state.filter.indexOf(platform);
        if (index !== -1) {
          state.filter.splice(index, 1);
        } else {
          state.filter.push(platform);
        }
      },
    },
    extraReducers: (builder) => {
      builder.addCase(gamesLoad.fulfilled, (state, { payload }) => {
        // We use `Object.values()` being that the payload was processed with normalizr
        gamesAdapter.upsertMany(state, Object.values(payload.games || {}));
      });
      builder.addMatcher(
        (action) => action.type && action.type.endsWith === '/pending',
        (state, _action) => {
          state.loading = true;
        },
      );
    },
  },
);
export const { filterPlatform } = gamesSlice.actions;
export type GameState = ReturnType<typeof gamesSlice.getInitialState>;
const { selectIds, selectById, selectAll, selectTotal, selectEntities } =
  gamesAdapter.getSelectors(({ games }: any) => games);
const selectFilter = getIn('games.filter', [] as number[]);
const selectLoading = getIn('games.loading', false);
const formatGames = formatCollection({release_date:formatDate, title: titleCase})
export const ReduxGames = {
  byId: selectById,
  ids: selectIds,
  entities: selectEntities,
  all: selectAll,
  total: selectTotal,
  filtered: 
    createSelector([
      selectAll,
      selectFilter,
      selectLoading
    ], (games: Game[] = [], filter: number[] = [], loading: boolean = false) => {
      let gn = !!games && Array.isArray(games)
      if (!gn) {
        games = []
      } else {
        if (!loading && filter.length > 0 && games.length > 0) {
          games = games.filter(({ platforms }) => hasSome(platforms, filter));
        }
        games = formatGames(games);
      }
        
      return {
        games,
        loading,
        total: games.length,
        filter,
      };
    })
  
};  

// export const selectCommentsByArticleId = (gameId: Index) =>
//   createSelector(
//     [
//       (state: any) => selectById(state, gameId), // select the current article
//       (state: any) =>
//         state.platform.ids.map((id: Index) => state.platform.entities[id]), // this is the same as selectAllComments
//     ],
//     (games:Game, filrer: number[]) => {
//       // return the comments for the given article only\
      
//       return Object.keys(platforms)
//         .map((c: any) => getIn(c))
//         .filter((platform) => game.comments.includes(platform.id));
//     },
//   );

export default gamesSlice.reducer;
