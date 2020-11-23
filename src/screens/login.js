/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
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
import Pedometer from 'react-native-pedometer-huangxt';
import NavigatorDraw from '../navigators/navigatorDraw';
import AsyncStorage from '@react-native-community/async-storage';
import {authContext} from '../components/common/authContext';
import react from 'react';
const Login = () => {
  const {Sigin} = react.useContext(authContext);

  const setStateLogin = async (status) => {
    await AsyncStorage.setItem('localSate', status);
  };
  const LoginFB = () => {
    LoginManager.logInWithPermissions(['public_profile'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject(new Error('The user cancelled the request'));
        } else {
          console.log(
            `log sucess with permission :${result.grantedPermissions.toString()}`,
          );
          setStateLogin('true');
          return AccessToken.getCurrentAccessToken();
        }
      })
      .then((data) => {
        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken,
        );
        return firebase.auth().signInWithCredential(credential);
      })
      .then((curentUser) => {
        const profile = curentUser.additionalUserInfo.profile;
        // setProfile(profile);
      })
      .then(() => {
        Sigin();
      })
      .catch((error) => {
        console.log('facebook login fail with error: ', error);
      });
  };
  return (
    <>
      <Button title="Login facebook" onPress={LoginFB} />
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

export default Login;
