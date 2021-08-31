import {createSlice} from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    name: '',
  },
  reducers: {},
});

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = profileSlice.actions

export default profileSlice.reducer;
