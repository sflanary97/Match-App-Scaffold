import {createSlice} from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    currentUserIndex: 0,
    matches: [1],
    users: {},
    currentUserKey: null,
  },
  reducers: {
    getNextUser: state => {
      var keys = Object.keys(state.users);
      console.log('GET NEXT USER KEYS: ', keys);
      var nextKey = keys[state.currentUserIndex + 1];
      console.log('GET NEXT USER NEXT KEY: ', nextKey);
      state.currentUserIndex += 1;
      state.currentUserKey = nextKey;
    },
    pushNewUser: (state, action) => {
      if (state.currentUserKey === null) {
        state.currentUserKey = action.payload.id;
      }
      var copy = state.users;
      copy[action.payload.id] = action.payload;
      state.users = copy;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getNextUser,
  getPreviousUser,
  pushNewUser,
  multipleTest,
  sendResponse,
} = usersSlice.actions;

export default usersSlice.reducer;
