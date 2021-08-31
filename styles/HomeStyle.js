import React from 'react';
import {StyleSheet} from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
  },
  bioSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageText: {
    color: 'tomato',
    fontSize: 24,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 10,
    margin: 10,
  },
  profileName: {
    color: 'tomato',
    fontSize: 48,
  },
  profileNameSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
  },
  card: {
    justifyContent: 'center',
    //alignItems: 'center',
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowColor: 'grey',
  },
  profileSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  swipeActionsSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
    backgroundColor: 'tomato',
    padding: 15,
    borderRadius: 10,
  },
  dislike: {
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default homeStyles;
