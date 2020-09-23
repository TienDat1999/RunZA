/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  StatusBar,
} from 'react-native';

const getUser = async () => {
  const userDocument = await firestore()
    .collection('users')
    .doc('zYH4qienodYSAXP43ohs')
    .get();
  console.log(userDocument);
};

const App = () => {
  const [userName, setUserName] = React.useState('');
  const [passWord, setPassWord] = React.useState('');
  // const usersCollection = firestore().collection('users');
  const changvalue = () => {
    firestore()
      .collection('users')
      .doc('zYH4qienodYSAXP43ohs')
      .set({userName: userName, passWord: passWord})
      .then((data) => console.log('is sucess and data is :', data))
      .catch((err) => console.log('erro isss', err));
    setUserName('');
    setPassWord('');
  };
  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => setUserName(text)}
          placeholder="user name"
          value={userName}
        />
        <TextInput
          style={{height: 40, width: 300, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => setPassWord(text)}
          placeholder="pass word"
          value={passWord}
        />
        <Button title="Press me" onPress={() => changvalue()} />
        <Button title="logdata" onPress={() => getUser()} />
      </View>
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
