import React, {useEffect, useState} from 'react';
import {Button, View, Text, Linking} from 'react-native';
import CircularProgres from './common/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import AsyncStorage from '@react-native-community/async-storage';
import {BWR, CaloriesBurn} from './common/calculateCalories';
import {fn_DateCompare} from '../components/common/equalDate';
import {getData, setData, removeData} from '../components/common/AsyncStorage';

//const NUMBER_STEP_KEY = 'numberOfSteps';

const HomeScreen = () => {
  // const [isEnabled, setIsEnabled] = useState(false);
  const [award, setAward] = useState({
    distance: null,
    numberOfSteps: null,
    startDate: null,
    endDate: null,
    miniutes: null,
    Calories: null,
  });

  //  lay du lieu tu local
  const curentAward = async () => {
    const value = await AsyncStorage.getItem('award');
    if (value != null) {
      let data = JSON.parse(value);
      return data;
    } else {
      console.log('lay du lieu tu local null');
      return null;
    }
  };
  //history award data
  const [historyAward, setHistoryAward] = useState([]);
  const getMinute = (fist, second) => {
    const miniutesNow = new Date(Number(fist)).getMinutes();
    const miniutesLast = new Date(Number(second)).getMinutes();

    return miniutesNow - miniutesLast;
  };

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
        const data = JSON.parse(value);
        const now = new Date().getTime();
        const lastDay = new Date(Number(data.startDate)).getTime();
        // const miniutesNow = new Date(Number(now)).getMinutes();
        // const miniutesLast = new Date(Number(lastDay)).getMinutes();
        //console.log('hien nay ' + miniutesNow + ' ngay cu ' + miniutesLast);

        if (fn_DateCompare(now, lastDay) == 0) {
          console.log('VAN LA NGAY CU');
          console.log('data nhan dc', data);
          setAward(data);
        } else {
          getData('history').then((val) => {
            if (val == null) {
              setData('history', award);
            } else {
              console.log('di vao set history', val);
              const his = [...val, award];
              setData('history', his);
            }
          });
        }
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  const pedomestorCount = () => {
    curentAward().then((value) => {
      getData('inforUser').then((val) => {
        if (val != null) {
          let number = BWR(val.gender, val.age, val.Weight, val.height);
          // console.log('calories Burn', Math.ceil(caloburn));
          const nows = new Date();
          Pedometer.startPedometerUpdatesFromDate(
            nows.getTime(),
            (pedometerData) => {
              const duration = getMinute(
                pedometerData.endDate,
                pedometerData.startDate,
              );
              console.log('duaration', duration);
              setAward({
                distance: Number(value.distance) + pedometerData.distance,
                numberOfSteps:
                  Number(value.numberOfSteps) + pedometerData.numberOfSteps,
                startDate: pedometerData.startDate,
                endDate: pedometerData.endDate,
                miniutes: Number(value.miniutes) + duration,
                Calories: CaloriesBurn(
                  number,
                  3.5,
                  Number(value.miniutes) + duration,
                ),
              });
            },
          );
        }
      });
    });
  };

  useEffect(() => {
    recieveData();
    setTimeout(() => {
      pedomestorCount();
    }, 400);

    //backgroundTask();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setStoreAward();
    }, 200);
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
