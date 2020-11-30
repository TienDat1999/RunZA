import React, {useEffect, useState} from 'react';
import {Switch, View, Image, SafeAreaView, Text} from 'react-native';
import CircularProgres from './Component/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import AsyncStorage from '@react-native-community/async-storage';
import debounce from 'lodash.debounce';
import BackgroundTimer from 'react-native-background-timer';
import {set} from 'react-native-reanimated';
import MapView from 'react-native-maps';
//const NUMBER_STEP_KEY = 'numberOfSteps';

const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const [award, setAward] = useState({
    distance: 0,
    numberOfSteps: 0,
    startDate: '',
  });

  //  const [award, setAward] = useState({numberOfSteps: 0});
  const [curentAward, SetCurentAward] = useState({
    distance: null,
    numberOfSteps: null,
  });

  const setStoreAward = async () => {
    try {
      const check = AsyncStorage.getItem('award');
      const now = new Date();
      const dayNow = now.getDate();
      console.log('ngay hien tai', dayNow);

      if (check == null) {
        return await AsyncStorage.setItem('award', JSON.stringify(award));
      } else {
        return await AsyncStorage.mergeItem('award', JSON.stringify(award));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // //get du lieu tu local
  const recieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('award');
      if (value !== null) {
        // We have data!!
        const data = JSON.parse(value);
        SetCurentAward({
          distance: data.distance,
          numberOfSteps: data.numberOfSteps,
        });
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  const pedomestorCount = () => {
    // if (isEnabled) {
    const now = new Date();
    Pedometer.startPedometerUpdatesFromDate(now.getTime(), (pedometerData) => {
      //console.log(pedometerData);
      if (curentAward.numberOfSteps != null) {
        setAward({
          distance: curentAward.distance + pedometerData.distance,
          numberOfSteps:
            curentAward.numberOfSteps + pedometerData.numberOfSteps,
          startDate: pedometerData.startDate,
        });
      } else {
        setAward({
          distance: pedometerData.distance,
          numberOfSteps: pedometerData.numberOfSteps,
          startDate: pedometerData.startDate,
        });
      }
    });
    // } else {
    //   Pedometer.stopPedometerUpdates();
    // }
  };
  useEffect(() => {
    recieveData();
  }, []);
  useEffect(() => {
    d = new Date().toLocaleDateString();
    pedomestorCount();
  });
  useEffect(() => {
    setStoreAward();
  }, [award.numberOfSteps]);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#0b0938'}}>
        {/* <Text>{award.distance}</Text>
      <CircularProgres
        size={200}
        width={10}
        fill={Number(award.numberOfSteps)}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        steps={Number(award.numberOfSteps)}
      /> */}
        {/* <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        /> */}

        <View style={{flex: 1}}>
          {/* <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          /> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 30,
          }}>
          <View>
            <View
              style={{
                borderWidth: 2,
                borderColor: 'white',
                height: 60,
                width: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('./../asset/images/kcal.png')} />
            </View>
            <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
              0 Kcal
            </Text>
          </View>
          <View>
            <View
              style={{
                borderWidth: 2,
                borderColor: 'white',
                height: 60,
                width: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('./../asset/images/location.png')} />
            </View>
            <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
              0 M
            </Text>
          </View>
          <View>
            <View
              style={{
                borderWidth: 2,
                borderColor: 'white',
                height: 60,
                width: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={require('./../asset/images/clock.png')} />
            </View>
            <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
              00:00
            </Text>
          </View>
        </View>

        <View
          style={{
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: 70,
              width: 70,
              borderRadius: 35,
              justifyContent: 'center',
              backgroundColor: 'white',
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 18, fontWeight: '700'}}>
              Start
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default HomeScreen;
