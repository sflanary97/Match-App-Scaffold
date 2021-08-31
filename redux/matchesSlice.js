import {createSlice} from '@reduxjs/toolkit';

export const matchesSlice = createSlice({
  name: 'matches',
  initialState: {
    matches: {},
  },
  reducers: {
    pushNewMatch: (state, action) => {
      var copy = state.matches;
      copy[action.payload.id] = action.payload;
      state.matches = copy;
    },
  },
});

// Action creators are generated for each case reducer function
export const {pushNewMatch} = matchesSlice.actions;

export default matchesSlice.reducer;
