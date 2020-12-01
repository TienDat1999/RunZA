import * as React from 'react';
import {LoginManager} from 'react-native-fbsdk';
import Pedometer from 'react-native-pedometer-huangxt';
import {Button, ImagePickerIOS, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerContent} from '../components/DrawerContent';
import Login from '../screens/login';
import WaitLoading from '../components/common/waitLoading';
import AsyncStorage from '@react-native-community/async-storage';
import {authContext} from '../components/common/authContext';
import {History} from '../components/History';
import HomeScreen from '../components/HomeScreen'
import Rank from '../components/Rank';
import Track from '../components/Track';
import Profile from '../components/Profile';
 

// const HomeScreenEml = ({navigation}) => {
//   return <HomeScreen navigation={navigation} />;
// };

// const NotificationsScreen = ({navigation}) => {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// };
// const ProfileElm = ({navigation}) => {
//   return <Profile navigation={navigation} />;
// };

const Drawer = createDrawerNavigator();

const NavigatorDraw = () => {
  // const [login, setLogin] = useState(true);
  // const authContextvaluses = React.useMemo(() => {
  //   return {
  //     Sigin: () => {
  //       setLogin(true);
  //     },
  //     SignOut: () => {
  //       setLogin(false);
  //     },
  //   };
  // }, []);

  // useEffect(() => {
  //   checkState();
  // }, []);
  // const setStateLogin = async (status) => {
  //   await AsyncStorage.setItem('localSate', status);
  // };
  // const checkState = async () => {
  //   const value = await AsyncStorage.getItem('localSate');
  //   if (value == 'true') {
  //     setLogin(true);
  //   } else if (value == 'false') {
  //     setLogin(false);
  //   } else {
  //     console.log('loi trang thai');
  //   }
  // };
  return (
    <>
      <authContext.Provider>
        {/* {login == null ? (
          <WaitLoading />
        ) : login == false ? (
          <Login login={login} />
        ) : ( */}
         <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Track" component={Track} />
                <Drawer.Screen name="History" component={History} />
                <Drawer.Screen name="Rank" component={Rank} />
            </Drawer.Navigator>
        </NavigationContainer>
        {/* )} */}
      </authContext.Provider>
    </>
  );
};
export default NavigatorDraw;
