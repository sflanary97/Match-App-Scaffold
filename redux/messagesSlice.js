import {createSlice} from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [
      {
        userID: '24funwforg',
        texts: ['test1', 'test2'],
        lastMessageTime: 'June 1, 3:30 pm',
      },
      {
        userID: '243gfbeog9',
        texts: ['test3', 'test4'],
        lastMessageTime: 'June 1, 3:30 pm',
      },
      {
        userID: 'dfbk34g308',
        texts: ['test5', 'test6'],
        lastMessageTime: 'June 1, 3:30 pm',
      },
    ],
  },
  reducers: {
    pushNewMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addText: (state, action) => {
      state.messages[action.payload.index].text.push(action.payload.newText);
    },
  },
});

// Action creators are generated for each case reducer function
export const {pushNewMessage, addText} = messagesSlice.actions;

export default messagesSlice.reducer;
