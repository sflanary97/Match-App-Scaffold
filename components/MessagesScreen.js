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
  Button,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {pushNewMessage, addText} from '../redux/messagesSlice';
import homeStyles from '../styles/HomeStyle.js';

const Messages = ({navigation}) => {
  const matches = useSelector(state => state.matches.matches);
  const messages = useSelector(state => state.messages.messages);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={homeStyles.container}>
      <ScrollView style={{width: '100%'}}>
        {Object.keys(matches).map((key, index) => (
          <Button
            key={key}
            title={matches[key].name}
            onPress={() => navigation.navigate('Chat Details', {index: key})}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Messages;
