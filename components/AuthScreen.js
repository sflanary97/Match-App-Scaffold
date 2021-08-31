/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';
//firebase
import auth from '@react-native-firebase/auth';
//Redux
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../redux/authSlice';

const Auth = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [creating, setCreate] = React.useState(false);
  const dispatch = useDispatch();
  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        //dispatch(setUser(result.user._user));
        console.log('User account created & signed in! Result:', result);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  const signInUser = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        //dispatch(setUser(result.user._user));
        console.log('User account created & signed in! Result:', result);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}>
      <TextInput
        style={{backgroundColor: 'tomato'}}
        onChangeText={setEmail}
        value={email}
        placeholder="email"
      />
      <TextInput
        style={{backgroundColor: 'tomato'}}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
      />
      <Button
        title={creating ? 'Next' : 'Sign In'}
        onPress={
          creating
            ? () =>
                navigation.navigate('Registration', {
                  email: email,
                  password: password,
                })
            : () => signInUser()
        }
      />
      <Button
        title={
          creating ? 'Already Have An Account?' : "Don't Have An Account Yet?"
        }
        onPress={() => setCreate(!creating)}
      />
    </View>
  );
};

export default Auth;
