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
import firestore from '@react-native-firebase/firestore';

const RegistrationScreen = ({navigation, route}) => {
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [bio, setBio] = React.useState('');
  const {email, password} = route.params;
  console.log('REGISTRATION EMAIL AND PASS: ', email, password);
  const dispatch = useDispatch();
  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        //dispatch(setUser(result.user._user));
        const uid = result.user._user.uid;
        setInitialUserData(uid);
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
  const setInitialUserData = uid => {
    console.log('USER ID: ', uid);
    firestore()
      .collection('Users')
      .doc(uid)
      .set({
        name: name,
        age: age,
        bio: bio,
      })
      .then(() => {
        console.log('User added!');
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
        onChangeText={setName}
        value={name}
        placeholder="Name"
      />
      <TextInput
        style={{backgroundColor: 'tomato'}}
        onChangeText={setAge}
        value={age}
        placeholder="Age"
      />
      <TextInput
        style={{backgroundColor: 'tomato'}}
        onChangeText={setBio}
        value={bio}
        placeholder="Bio"
      />
      <Button title="Register" onPress={createUser} />
    </View>
  );
};

export default RegistrationScreen;
