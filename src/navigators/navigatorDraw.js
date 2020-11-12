import React, {useEffect, useState} from 'react';
import {LoginManager} from 'react-native-fbsdk';
import Pedometer from 'react-native-pedometer-huangxt';
import {Button, ImagePickerIOS, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Profile from '../components/Profile';
import HomeScreen from '../components/HomeScreen';
import Login from '../screens/login';
import WaitLoading from '../components/common/waitLoading';
import AsyncStorage from '@react-native-community/async-storage';
import {authContext} from '../components/common/authContext';
const HomeScreenEml = ({navigation}) => {
  return <HomeScreen navigation={navigation} />;
};

const NotificationsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
};
const ProfileElm = ({navigation}) => {
  return <Profile navigation={navigation} />;
};

const Drawer = createDrawerNavigator();

const NavigatorDraw = () => {
  const [login, setLogin] = useState(null);
  const authContextvaluses = React.useMemo(() => {
    return {
      Sigin: () => {
        setLogin(true);
      },
      SignOut: () => {
        setLogin(false);
      },
    };
  }, []);

  useEffect(() => {
    checkState();
  }, []);
  const setStateLogin = async (status) => {
    await AsyncStorage.setItem('localSate', status);
  };
  const checkState = async () => {
    const value = await AsyncStorage.getItem('localSate');
    if (value === 'true') {
      setLogin(true);
    } else if (value === 'false') {
      setLogin(false);
    } else {
      console.log('loi trang thai');
    }
  };
  return (
    <>
      <authContext.Provider value={authContextvaluses}>
        {login == null ? (
          <WaitLoading />
        ) : login == false ? (
          <Login login={login} />
        ) : (
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen name="Home" component={HomeScreenEml} />
              <Drawer.Screen
                name="Notifications"
                component={NotificationsScreen}
              />
              <Drawer.Screen name="Profile" component={ProfileElm} />
            </Drawer.Navigator>
            <Button
              title="Logout facebook"
              onPress={() => {
                setTimeout(() => {
                  setStateLogin('false');
                }, 300);
                // phai stop pedometer tai day
                Pedometer.stopPedometerUpdates();
              }}
            />
          </NavigationContainer>
        )}
      </authContext.Provider>
    </>
  );
};

export default NavigatorDraw;
