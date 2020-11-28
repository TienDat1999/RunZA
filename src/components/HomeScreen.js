import React, {useEffect, useState} from 'react';
import {Button, View, Text, Linking} from 'react-native';
import CircularProgres from './common/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import AsyncStorage from '@react-native-community/async-storage';
import {BWR} from './common/calculateCalories';
import {CaloriesBurn} from './common/calculateCalories';
import BackgroundJob from 'react-native-background-actions';
import {set} from 'react-native-reanimated';
//const NUMBER_STEP_KEY = 'numberOfSteps';

const HomeScreen = () => {
  // const [isEnabled, setIsEnabled] = useState(false);
  const [award, setAward] = useState({
    distance: null,
    numberOfSteps: null,
    startDate: null,
    endDate: null,
  });
  const [duration, setDuaration] = useState({
    numberOfSteps: null,
    startDate: null,
    timeDuaration: null,
  });
  //  const [award, setAward] = useState({numberOfSteps: 0});
  const curentAward = async () => {
    const value = await AsyncStorage.getItem('award');
    if (value != null) {
      let data = JSON.parse(value);
      return data;
    } else return null;
  };
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
        const now = new Date().getMinutes();
        const lastDay = new Date(Number(data.startDate)).getMinutes();
        if (now == lastDay) {
          console.log('VAN LA NGAY CU');
          setAward(data);
        }
      } else {
        console.log('data award null');
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  // const setHistoryLocal = (data) => {
  //   setTimeout(async () => {
  //     await AsyncStorage.setItem('historyAwardLocal', JSON.stringify(data));
  //   }, 100);
  // };
  // const getHistoryLocal = async () => {
  //   const value = await AsyncStorage.getItem('historyAwardLocal');
  //   let data = JSON.parse(value);
  //   console.log('data value', data);
  //   // setHistoryAward(data);
  //   // console.log('data history', historyAward);
  // };
  const pedomestorCount = () => {
    curentAward().then((value) => {
      const now = new Date();
      const curentDay = new Date().getMinutes();
      const lastDay = new Date(Number(value.startDate)).getMinutes();

      Pedometer.startPedometerUpdatesFromDate(
        now.getTime(),
        (pedometerData) => {
          if (curentDay == lastDay) {
            setAward({
              distance: Number(value.distance) + pedometerData.distance,
              numberOfSteps:
                Number(value.numberOfSteps) + pedometerData.numberOfSteps,
              startDate: pedometerData.startDate,
              endDate: pedometerData.endDate,
            });
          } else {
            setAward({
              distance: pedometerData.distance,
              numberOfSteps: pedometerData.numberOfSteps,
              startDate: pedometerData.startDate,
              endDate: pedometerData.endDate,
            });
          }
        },
      );
    });
  };

  const sleep = (time) =>
    new Promise((resolve) => setTimeout(() => resolve(), time));
  const taskRandom = async (taskData) => {
    if (Platform.OS === 'ios') {
      console.warn(
        'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
        'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.',
      );
    }
    await new Promise(async (resolve) => {
      // For loop with a delay
      const {delay} = taskData;
      for (let i = 0; BackgroundJob.isRunning(); i++) {
        console.log('Runned -> ', i);
        await BackgroundJob.updateNotification({
          taskDesc: 'app is running ',
          progressBar: {
            max: 50,
            value: 27,
            //indeterminate: true,
          },
        });
        await sleep(delay);
      }
    });
  };
  const options = {
    taskName: 'RuningZone',
    taskTitle: 'Tap is Running',
    taskDesc: 'ExampleTask desc',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'exampleScheme://chat/jane',
    parameters: {
      delay: 10000,
    },
  };
  const backgroundTask = async () => {
    try {
      console.log('Trying to start background service');
      await BackgroundJob.start(taskRandom, options);
      console.log('Successful start!');
    } catch (e) {
      console.log('Error', e);
    }
  };

  useEffect(() => {
    recieveData();
    //getHistoryLocal();
    setTimeout(() => {
      pedomestorCount();
    }, 3500);

    //backgroundTask();

    // let number = BWR('nu', 20, 70, 170);
    // console.log('BWR is', number);
    // let caloburn = CaloriesBurn(number, 3.5, 120);
    // console.log('calories Burn', Math.ceil(caloburn));
    return () => {
      BackgroundJob.stop();
    };
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setStoreAward();
    }, 300);
    //luu lai time luc bat dau hoat dong
    // if (duration.numberOfSteps == 1) {
    //   AsyncStorage.setItem('starTime', duration.endDate);
    //   console.log('time start', duration.endDate);
    // }
    // console.log('duaration', duration);
  }, [award.numberOfSteps]);
  // useEffect(() => {
  //   pedomestorCount();
  // });
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
