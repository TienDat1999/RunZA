/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  StatusBar,
  Text,
  Image,
} from 'react-native';
//import Login from './src/screens/login';
import Navigator from './src/navigators/navigatorDraw';

const App = () => {
  // const [userName, setUserName] = React.useState('');
  // const [passWord, setPassWord] = React.useState('');
  // const usersCollection = firestore().collection('users');
  // const changvalue = () => {
  //   firestore()
  //     .collection('users')
  //     .doc('zYH4qienodYSAXP43ohs')
  //     .set({userName: userName, passWord: passWord})
  //     .then((data) => console.log('is sucess and data is :', data))
  //     .catch((err) => console.log('erro isss', err));
  //   setUserName('');
  //   setPassWord('');
  // };
  return (
    <>
      <Navigator />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  textinput: {
    borderWidth: 1,
    margin: 8,
    padding: 5,
    width: 200,
  },
});

export default App;
