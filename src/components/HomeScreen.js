import React, {useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';
import CircularProgres from './common/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import AsyncStorage from '@react-native-community/async-storage';
import {BWR} from './common/calculateCalories';
import {CaloriesBurn} from './common/calculateCalories';
//const NUMBER_STEP_KEY = 'numberOfSteps';

const HomeScreen = () => {
  // const [isEnabled, setIsEnabled] = useState(false);
  const [award, setAward] = useState({
    distance: null,
    numberOfSteps: null,
    startDate: null,
    calories: null,
    time: null,
  });
  const [duration, setDuaration] = useState({
    numberOfSteps: null,
    endDate: null,
  });
  //  const [award, setAward] = useState({numberOfSteps: 0});
  const [curentAward, SetCurentAward] = useState({
    distance: null,
    numberOfSteps: null,
    startDate: null,
    calories: null,
    time: null,
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
        console.log('data nhan dc la', value);
        const now = new Date().getMinutes();
        const lastDay = new Date(Number(data.startDate)).getMinutes();
        setAward(data);
        SetCurentAward(data);
        if (now == lastDay) {
          console.log('VAN LA NGAY CU');
          setAward(data);
          SetCurentAward(data);
        } else {
          // setHistoryAward([...historyAward, data]);
          // setHistoryLocal(historyAward);
          setTimeout(() => {
            SetCurentAward({
              distance: 0,
              numberOfSteps: 0,
              startDate: null,
            });
          }, 250);
        }
      } else {
        console.log('data award null');
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  const setHistoryLocal = (data) => {
    setTimeout(async () => {
      await AsyncStorage.setItem('historyAwardLocal', JSON.stringify(data));
    }, 100);
  };
  const getHistoryLocal = async () => {
    const value = await AsyncStorage.getItem('historyAwardLocal');
    let data = JSON.parse(value);
    console.log('data value', data);
    // setHistoryAward(data);
    // console.log('data history', historyAward);
  };
  const pedomestorCount = () => {
    const now = new Date();
    Pedometer.startPedometerUpdatesFromDate(now.getTime(), (pedometerData) => {
      console.log(pedometerData.numberOfSteps);
      setAward({
        distance: Number(curentAward.distance) + pedometerData.distance,
        numberOfSteps:
          Number(curentAward.numberOfSteps) + pedometerData.numberOfSteps,
        startDate: pedometerData.startDate,
      });
      setDuaration({...duration, pedometerData});
    });
  };

  useEffect(() => {
    recieveData();
    getHistoryLocal();
    pedomestorCount();

    // let number = BWR('nu', 20, 70, 170);
    // console.log('BWR is', number);
    // let caloburn = CaloriesBurn(number, 3.5, 120);
    // console.log('calories Burn', Math.ceil(caloburn));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setStoreAward();
    }, 300);
    // luu lai time luc bat dau hoat dong
    if (duration.numberOfSteps == 2) {
      AsyncStorage.setItem('starTime', duration.endDate);
      console.log('time start', duration.endDate);
    }
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
