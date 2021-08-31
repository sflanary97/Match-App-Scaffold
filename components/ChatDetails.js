/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {View, Button, Text, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {pushNewMessage, addText} from '../redux/messagesSlice';
import firestore from '@react-native-firebase/firestore';

const ChatDetails = ({navigation, route}) => {
  const [text, setText] = useState('');
  const currentUserUid = useSelector(state => state.auth.user.uid);
  const matchID = useSelector(
    state => state.matches.matches[route.params.index].id,
  );
  const messages = useSelector(
    state => state.matches.matches[route.params.index].messages,
  );
  const dispatch = useDispatch();
  const sendMessage = () => {
    firestore()
      .collection('Users')
      .doc(matchID)
      .collection('Matches')
      .doc(currentUserUid)
      .update({
        messages: firestore.FieldValue.arrayUnion({
          text: text,
          user: currentUserUid,
        }),
      })
      .then(() => {
        console.log('Message Sent!');
      });
    firestore()
      .collection('Users')
      .doc(currentUserUid)
      .collection('Matches')
      .doc(matchID)
      .update({
        messages: firestore.FieldValue.arrayUnion({
          text: text,
          user: currentUserUid,
        }),
      })
      .then(() => {
        console.log('Message Sent!');
      });
    setText('');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
        }}>
        {messages.map((message, index) => (
          <View
            style={{
              margin: 10,
              padding: 10,
              backgroundColor:
                message.user === currentUserUid ? 'tomato' : 'grey',
              borderRadius: 5,
              alignSelf:
                message.user === currentUserUid ? 'flex-end' : 'flex-start',
            }}>
            <Text key={index}>{message.text}</Text>
          </View>
        ))}
      </View>

      <View style={{width: '100%', padding: 10, alignItems: 'center'}}>
        <TextInput
          onChangeText={setText}
          value={text}
          placeholder="send a message!"
        />
        <Button onPress={sendMessage} title="send" />
      </View>
    </View>
  );
};

export default ChatDetails;
