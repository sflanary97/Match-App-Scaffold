/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text, Button, Image, SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {useSelector, useDispatch} from 'react-redux';
//Styles
import accountStyles from '../styles/AccountStyle.js';

const Messages = ({navigation}) => {
  //get uid
  const uid = useSelector(state => state.auth.user.uid);
  //get profile picture url
  const profileUrl = useSelector(state => state.auth.profilePic);
  const [imageData, setImageData] = React.useState(null);
  const reference = storage().ref('users/' + uid + '/profile.png');
  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  const handleImageUpload = image => {
    console.log('HANDLEIMAGEUPLOAD: ', image);
    const task = reference.putFile(image);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
    });
  };
  return (
    <SafeAreaView style={accountStyles.container}>
      <View style={accountStyles.imageContainer}>
        <Image style={accountStyles.profileImage} source={{uri: profileUrl}} />
        <Button
          title="Profile Image"
          onPress={e =>
            launchImageLibrary({mediaType: 'photo'}, response =>
              handleImageUpload(response.assets[0].uri),
            )
          }
        />
      </View>
      <View style={accountStyles.accountActions}>
        <Button
          title="Edit Info"
          onPress={() => navigation.navigate('User Info')}
        />
      </View>
      <View style={accountStyles.accountActions}>
        <Button title="Sign Out" onPress={() => signOut()} />
      </View>
    </SafeAreaView>
  );
};

export default Messages;
