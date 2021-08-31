import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    profilePic: '',
    profileInfo: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    signOut: state => {
      state.user = null;
    },
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    setProfileInfo: (state, action) => {
      state.profileInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, signOut, setProfilePic, setProfileInfo} =
  authSlice.actions;

export default authSlice.reducer;
