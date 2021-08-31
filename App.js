/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {View, Button, Text} from 'react-native';
import HomeScreen from './components/HomeScreen';
import MessagesScreen from './components/MessagesScreen';
import AccountScreen from './components/AccountScreen';
import UserInfoScreen from './components/UserInfoScreen';
import ChatDetails from './components/ChatDetails';
import AuthScreen from './components/AuthScreen';
import RegistrationScreen from './components/RegistrationScreen';
import store from './redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
//Icon Import
import Ionicons from 'react-native-vector-icons/Ionicons';
//firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import {
  setUser,
  signOut,
  setProfilePic,
  setProfileInfo,
} from './redux/authSlice';
import {pushNewUser} from './redux/usersSlice';
import {pushNewMatch} from './redux/matchesSlice';

const Tabs = createBottomTabNavigator();
const Messages = createStackNavigator();
const Auth = createStackNavigator();
const Account = createStackNavigator();

const MessagesStack = () => {
  return (
    <Messages.Navigator>
      <Messages.Screen name="Messages" component={MessagesScreen} />
      <Messages.Screen name="Chat Details" component={ChatDetails} />
    </Messages.Navigator>
  );
};

const AccountStack = () => {
  return (
    <Account.Navigator>
      <Account.Screen name="Account" component={AccountScreen} />
      <Account.Screen name="User Info" component={UserInfoScreen} />
    </Account.Navigator>
  );
};

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  // Handle user state changes
  function onAuthStateChanged(user) {
    if (user === null) {
      store.dispatch(signOut());
      setSignedIn(false);
    } else {
      store.dispatch(setUser(user._user));
      userDocListener(user._user.uid);
      matchesListener(user._user.uid);
      profilesListener(user._user.uid);
      setSignedIn(true);
    }
    if (initializing) {
      setInitializing(false);
    }
  }

  async function userDocListener(uid) {
    const url = await storage()
      .ref('users/' + uid + '/profile.png')
      .getDownloadURL();
    store.dispatch(setProfilePic(url));
    firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(doc => {
        console.log('Current document: ', doc);
        console.log('Current data: ', doc.data());
        store.dispatch(setProfileInfo(doc.data()));
      });
  }

  async function profilesListener(uid) {
    firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (doc.id !== uid) {
            store.dispatch(
              pushNewUser({
                ...doc.data(),
                id: doc.id,
              }),
            );
          }
        });
      });
  }

  async function matchesListener(uid) {
    firestore()
      .collection('Users')
      .doc(uid)
      .collection('Matches')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log('User ID: ', doc.id, doc.data());
          if (doc.id !== uid) {
            store.dispatch(
              pushNewMatch({
                ...doc.data(),
                id: doc.id,
              }),
            );
          }
        });
      });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        {!signedIn && (
          <Auth.Navigator>
            <Auth.Screen name="Welcome" component={AuthScreen} />
            <Auth.Screen name="Registration" component={RegistrationScreen} />
          </Auth.Navigator>
        )}
        {signedIn && (
          <Tabs.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === 'Home') {
                  iconName = focused ? 'heart-circle-outline' : 'heart-circle';
                } else if (route.name === 'Messages') {
                  iconName = focused ? 'chatbox' : 'chatbox-outline';
                } else if (route.name === 'Account') {
                  iconName = focused
                    ? 'person-circle'
                    : 'person-circle-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}>
            <Tabs.Screen name="Home" component={HomeScreen} />
            <Tabs.Screen name="Messages" component={MessagesStack} />
            <Tabs.Screen name="Account" component={AccountStack} />
          </Tabs.Navigator>
        )}
      </Provider>
    </NavigationContainer>
  );
};

export default App;
