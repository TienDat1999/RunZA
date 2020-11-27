import React, {useEffect, useState} from 'react';
import {Button, View, Text, Linking} from 'react-native';
import CircularProgres from './common/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import AsyncStorage from '@react-native-community/async-storage';
import {BWR} from './common/calculateCalories';
import {CaloriesBurn} from './common/calculateCalories';
import BackgroundJob from 'react-native-background-actions';
import {LongPressGestureHandler} from 'react-native-gesture-handler';
//const NUMBER_STEP_KEY = 'numberOfSteps';

const HomeScreen = () => {
  // const [isEnabled, setIsEnabled] = useState(false);
  const [award, setAward] = useState({
    distance: null,
    endDate: null,
    numberOfSteps: 0,
    startDate: null,
  });

  const [curentAward, SetCurentAward] = useState(async () => {
    const value = await AsyncStorage.getItem('award');
    if (value != null) {
      let data = JSON.parse(value);
      console.log('curent', data);
      return data;
    } else {
      return null;
    }
  });
  //history award data
  const [historyAward, setHistoryAward] = useState([]);

  const setStoreAward = async () => {
    const value = JSON.stringify(award);
    try {
      await AsyncStorage.setItem('award', value);
    } catch (e) {
      console.log(e);
    }
  };

  // //get du lieu tu local
  const recieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('award');
      if (value != null) {
        let data = JSON.parse(value);
        console.log('data nhan dc la', data);
        setAward(data);
      } else {
        console.log('data award null');
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  const pedomestorCount = () => {
    const now = new Date();
    Pedometer.startPedometerUpdatesFromDate(now.getTime(), (pedometerData) => {
      console.log('pedometor', pedometerData.numberOfSteps);
      setAward({
        distance: Number(curentAward.distance) + pedometerData.distance,
        endDate: pedometerData.endDate,
        numberOfSteps:
          Number(curentAward.numberOfSteps) + pedometerData.numberOfSteps,
        startDate: pedometerData.startDate,
      });
    });
  };

  useEffect(() => {
    recieveData();
    setTimeout(() => {
      console.log('current award', curentAward);
    }, 1000);
    setTimeout(() => {
      pedomestorCount();
    }, 100);
    //  backgroundTask();

    // let number = BWR('nu', 20, 70, 170);
    // console.log('BWR is', number);
    // let caloburn = CaloriesBurn(number, 3.5, 120);
    // console.log('calories Burn', Math.ceil(caloburn));
    // return () => {
    //   BackgroundJob.stop();
    // };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log('di qua set store award');
      setStoreAward();
    }, 450);
    //luu lai time luc bat dau hoat dong
    // if (duration.numberOfSteps == 1) {
    //   AsyncStorage.setItem('starTime', duration.endDate);
    //   console.log('time start', duration.endDate);
    // }
    // console.log('duaration', duration);
  }, [award.numberOfSteps]);

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
