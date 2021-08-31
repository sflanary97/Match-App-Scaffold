import {configureStore} from '@reduxjs/toolkit';
import profileSlice from './profileSlice';
import messagesSlice from './messagesSlice';
import usersSlice from './usersSlice';
import authSlice from './authSlice';
import matchesSlice from './matchesSlice';

export default configureStore({
  reducer: {
    profile: profileSlice,
    messages: messagesSlice,
    users: usersSlice,
    auth: authSlice,
    matches: matchesSlice,
  },
});
