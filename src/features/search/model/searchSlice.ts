import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@app/store/store';

export type SearchState = {
  query: string;
};

const initialState: SearchState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    clearQuery(state) {
      state.query = '';
    },
  },
});

export const { setQuery, clearQuery } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;

/* ================== SELECTORS ================== */

export const selectSearchQuery = (state: RootState): string => state.search.query;

export const selectHasQuery = (state: RootState): boolean => state.search.query.trim().length > 0;
