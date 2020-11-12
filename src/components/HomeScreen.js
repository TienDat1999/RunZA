import React, {useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';
import CircularProgres from './common/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import AsyncStorage from '@react-native-community/async-storage';
import debounce from 'lodash.debounce';
import BackgroundTimer from 'react-native-background-timer';
import {set} from 'react-native-reanimated';

//const NUMBER_STEP_KEY = 'numberOfSteps';

const HomeScreen = ({navigate}) => {
  // const [isEnabled, setIsEnabled] = useState(false);
  const [award, setAward] = useState({
    distance: 0,
    numberOfSteps: 0,
    startDate: null,
  });

  //  const [award, setAward] = useState({numberOfSteps: 0});
  const [curentAward, SetCurentAward] = useState({
    distance: null,
    numberOfSteps: null,
    startDate: null,
  });

  const setStoreAward = async () => {
    try {
      const value = await AsyncStorage.getItem('award');
      if (value == null) {
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
      if (value != null) {
        // We have data!!
        const data = await JSON.parse(value);
        console.log('data recieve: ', data);
        if (data.startDate !== null) {
          const now = new Date().getMinutes();
          const lastDay = new Date(Number(data.startDate)).getMinutes();
          if (now == lastDay) {
            console.log('VAN LA NGAY CU ');
            SetCurentAward({
              distance: data.distance,
              numberOfSteps: data.numberOfSteps,
              startDate: data.startDate,
            });
            setAward({
              distance: data.distance,
              numberOfSteps: data.numberOfSteps,
            });
          } else {
            console.log('DA QUA NGAY MOI ROI ');
            SetCurentAward({
              distance: null,
              numberOfSteps: null,
              startDate: null,
            });
          }
        }
      } else {
        console.log('loi phan recieve');
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
      if (award.numberOfSteps == null) {
        console.log('number of steps nulll');
        setAward({
          distance: pedometerData.distance,
          numberOfSteps: pedometerData.numberOfSteps,
          startDate: pedometerData.startDate
            ? pedometerData.startDate
            : curentAward.startDate,
        });
      } else {
        console.log('number of steps khac nulll');
        setAward({
          distance: curentAward.distance + pedometerData.distance,
          numberOfSteps:
            curentAward.numberOfSteps + pedometerData.numberOfSteps,
          startDate: pedometerData.startDate
            ? pedometerData.startDate
            : curentAward.startDate,
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
    setStoreAward();
  }, [award.numberOfSteps]);

  useEffect(() => {
    pedomestorCount();
  });

  return (
    <View>
      <Text>{award.distance}</Text>
      <CircularProgres
        size={200}
        width={10}
        fill={Number(award.numberOfSteps)}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        steps={Number(award.numberOfSteps)}
      />
    </View>
  );
};
export default HomeScreen;
