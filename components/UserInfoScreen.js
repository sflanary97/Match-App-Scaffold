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

const UserInfoScreen = ({navigation, route}) => {
  const uid = useSelector(state => state.auth.user.uid);
  const currentName = useSelector(state => state.auth.profileInfo.name);
  const currentAge = useSelector(state => state.auth.profileInfo.age);
  const currentBio = useSelector(state => state.auth.profileInfo.bio);
  const [name, setName] = React.useState(currentName);
  const [age, setAge] = React.useState(currentAge);
  const [bio, setBio] = React.useState(currentBio);
  const dispatch = useDispatch();
  const updateUserData = () => {
    console.log('User Name Change: ', name);
    firestore()
      .collection('Users')
      .doc(uid)
      .update({
        name: name,
        age: age,
        bio: bio,
      })
      .then(() => {
        console.log('User Edited!');
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
      <Button title="Save" onPress={updateUserData} />
    </View>
  );
};

export default UserInfoScreen;
