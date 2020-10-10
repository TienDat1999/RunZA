import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Profile from '../components/Profile';
import HomeScreen from '../components/HomeScreen';

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
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreenEml} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Profile" component={ProfileElm} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorDraw;
