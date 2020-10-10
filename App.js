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
import NavigatorDraw from './src/navigators/navigatorDraw';
// import {NavigationContainer} from '@react-navigation/native';

// const getUser = async () => {
//   const userDocument = await firestore()
//     .collection('users')
//     .doc('zYH4qienodYSAXP43ohs')
//     .get();
//   console.log(userDocument);
// };
// const LoginButton = () => {
//   const [login, setLogin] = useState(false);
//   const [profile, setProfile] = useState(null);
//   if (login) {
//     return (
//       <View>
//         <InforUser profile={profile} />
//         <Button
//           title="Logout facebook"
//           onPress={() => {
//             LoginManager.logOut;
//             setLogin(false);
//             console.log('application is log out');
//           }}
//         />
//       </View>
//     );
//   } else {
//     return (
//       <Button
//         title="Login facebook"
//         onPress={() => {
//           LoginManager.logInWithPermissions(['public_profile'])
//             .then((result) => {
//               if (result.isCancelled) {
//                 return Promise.reject(
//                   new Error('The user cancelled the request'),
//                 );
//               } else {
//                 console.log(
//                   `log sucess with permission :${result.grantedPermissions.toString()}`,
//                 );
//                 //get access token
//                 setLogin(true);

//                 return AccessToken.getCurrentAccessToken();
//               }
//             })
//             .then((data) => {
//               const credential = firebase.auth.FacebookAuthProvider.credential(
//                 data.accessToken,
//               );
//               return firebase.auth().signInWithCredential(credential);
//             })
//             .then((curentUser) => {
//               const profile = curentUser.additionalUserInfo.profile;
//               setProfile(profile);
//             })
//             .catch((error) => {
//               console.log('facebook login fail with error: ', error);
//             });
//         }}
//       />
//     );
//   }
// };
// const InforUser = ({profile}) => {
//   const myName = profile.name;
//   return (
//     <>
//       <Text>{myName}</Text>
//     </>
//   );
// };
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
      <NavigatorDraw />
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
