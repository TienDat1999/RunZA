import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Profile from '../components/Profile';
import HomeScreen from '../components/HomeScreen';
import {DrawerContent} from '../components/DrawerContent';
import Track from '../components/Track';
import History from '../components/History';
import Rank from '../components/Rank';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Homestack=({navigation})=>{
  return(
   <Stack.Navigator 
   screenOptions={{
     headerStyle:{
        elevation:1
     },
     headerTitle:{
       fontWeight:'bold',
     }
   }}>
     <Stack.Screen 
     name="Home"
     component={HomeScreen}
     options={{headerShown:false}}
      >

     </Stack.Screen>
   </Stack.Navigator>
  )
}
const NavigatorDraw = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={Homestack} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Track" component={Track} />
        <Drawer.Screen name="History" component={History} />
        <Drawer.Screen name="Rank" component={Rank} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorDraw;
