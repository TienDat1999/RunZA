import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Profile from '../components/Profile';
import HomeScreen from '../components/HomeScreen';
import {DrawerContent} from '../components/DrawerContent';
import Track from '../components/Track';
import History from '../components/History';
import Rank from '../components/Rank';
const HomeScreenEml = ({navigation}) => {
  return <HomeScreen navigation={navigation} />;
};

const ProfileElm = ({navigation}) => {
  return <Profile navigation={navigation} />;
};
const TrackElm = ({navigation}) => {
  return <Track navigation={navigation} />;
};

const HistoryElm = ({navigation}) => {
  return <History navigation={navigation} />;
};
const RankElm = ({navigation}) => {
  return <Rank navigation={navigation} />;
};
const Drawer = createDrawerNavigator();

const NavigatorDraw = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreenEml} />
        <Drawer.Screen name="Profile" component={ProfileElm} />
        <Drawer.Screen name="Track" component={TrackElm} />
        <Drawer.Screen name="History" component={HistoryElm} />
        <Drawer.Screen name="Rank" component={RankElm} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorDraw;
