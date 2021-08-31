/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Button,
  Text,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getNextUser,
  getPreviousUser,
  pushNewUser,
  sendResponse,
} from '../redux/usersSlice';
import homeStyles from '../styles/HomeStyle.js';
//Icon Import
import Ionicons from 'react-native-vector-icons/Ionicons';
//Firebase
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation}) => {
  const [expanded, setExpanded] = React.useState(false);
  const currentUserUid = useSelector(state => state.auth.user.uid);
  const currentUserBio = useSelector(state => state.auth.profileInfo.bio);
  const currentUserName = useSelector(state => state.auth.profileInfo.name);
  const currentUserAge = useSelector(state => state.auth.profileInfo.age);
  const likes = useSelector(state => state.auth.profileInfo.likes);
  const index = useSelector(state => state.users.currentUserIndex);
  const userKey = useSelector(state => state.users.currentUserKey);
  const user = useSelector(state => state.users.users[userKey]);
  var userName = '';
  var bio = '';
  var age = 0;
  var profileUid = null;
  if (user) {
    userName = user.name;
    bio = user.bio;
    age = user.age;
    profileUid = user.id;
  }
  const dispatch = useDispatch();
  const likeUser = () => {
    if (likes.includes(profileUid)) {
      console.log('SHOULD BE A MATCH HERE');
      firestore()
        .collection('Users')
        .doc(profileUid)
        .collection('Matches')
        .doc(currentUserUid)
        .update({
          id: currentUserUid,
          bio: currentUserBio,
          name: currentUserName,
          age: currentUserAge,
        })
        .then(() => {
          console.log('Profile updated!');
        });
      firestore()
        .collection('Users')
        .doc(currentUserUid)
        .collection('Matches')
        .doc(profileUid)
        .update({
          id: profileUid,
          bio: bio,
          name: userName,
          age: age,
        })
        .then(() => {
          console.log('Current User updated!');
        });
      Alert.alert(
        'Congrats New Match!',
        'Go to messages to start a conversation',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    } else {
      firestore()
        .collection('Users')
        .doc(profileUid)
        .update({
          likes: firestore.FieldValue.arrayUnion(currentUserUid),
        })
        .then(() => {
          console.log('User updated!');
        });
    }
    dispatch(getNextUser());
  };
  const dislikeUser = () => {
    dispatch(getNextUser());
  };
  return (
    <SafeAreaView style={homeStyles.container}>
      {user && (
        <>
          <View style={homeStyles.profileSection}>
            <View style={homeStyles.card}>
              <View style={homeStyles.imageContainer}>
                <Image
                  resizeMode="contain"
                  style={homeStyles.image}
                  source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                />
              </View>
              <View style={homeStyles.profileNameSection}>
                <Text style={homeStyles.profileName}>{userName}</Text>
              </View>
              <View style={homeStyles.ageSection}>
                <Text style={homeStyles.ageText}>{age}</Text>
              </View>
              <View style={homeStyles.bioSection}>
                <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color="tomato"
                  />
                </TouchableOpacity>
              </View>
              {expanded && (
                <View style={homeStyles.bioSection}>
                  <Text>{bio}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={homeStyles.swipeActionsSection}>
            <TouchableOpacity style={homeStyles.button} onPress={likeUser}>
              <Text>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[homeStyles.button, homeStyles.dislike]}
              onPress={dislikeUser}>
              <Text>Dislike</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {!user && <Text> All out of Profiles</Text>}
    </SafeAreaView>
  );
};

export default HomeScreen;
