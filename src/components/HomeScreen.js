import React, {useEffect, useState} from 'react';
import {Switch, View, Text, StyleSheet, TouchableOpacity, Button,Dimensions} from 'react-native';
import CircularProgres from './Component/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import AsyncStorage from '@react-native-community/async-storage';
import debounce from 'lodash.debounce';
import BackgroundTimer from 'react-native-background-timer';
import {color, set} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import { createStackNavigator } from '@react-navigation/stack';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
//const NUMBER_STEP_KEY = 'numberOfSteps';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HomeScreen = () => {
  const fill = 'rgb(86, 204, 242)';
  const data = [50, 20, 60, 20, 30, 20, 30, 100, 50];
  const [award, setAward] = useState({
    distance: null,
    numberOfSteps: null,
    startDate: null,
  });

  const [curentAward, SetCurentAward] = useState({
    distance: null,
    numberOfSteps: null,
    startDate: null,
  });
  const setStoreAward = async () => {
    try {
      await AsyncStorage.setItem('award', JSON.stringify(award));
    } catch (e) {
      console.log(e);
    }
  };
  const recieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('award');
      if (value != null) {
        let data = JSON.parse(value);
        console.log('data nhan dc la', value);
        const now = new Date().getMinutes();
        const lastDay = new Date(Number(data.startDate)).getMinutes();
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
    // if (isEnabled) {
    const now = new Date();
    Pedometer.startPedometerUpdatesFromDate(now.getTime(), (pedometerData) => {
      setAward({
        distance: Number(curentAward.distance) + pedometerData.distance,
        numberOfSteps:
          Number(curentAward.numberOfSteps) + pedometerData.numberOfSteps,
        startDate: pedometerData.startDate,
      });
    });
  };
  useEffect(() => {
    recieveData();
    // getHistoryLocal();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setStoreAward();
    }, 300);
  }, [award.numberOfSteps]);

  useEffect(() => {
    pedomestorCount();
  });

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000029', '#000029']} style={{flex: 1}}>
        <View style={styles.header}>
          <View>
            <CircularProgres
              size={300}
              width={15}
              backgroundWidth={10}
              fill={56}
              steps={56}
              tintColor="#00ffff"
              backgroundColor="#FFF"
              lineCap="round"
              rotation={0}
            />
          </View> 
        </View>
        <View style={styles.body}>
          <View style={styles.icon}>
            <View style={styles.itemicon}>
              <Icons name="fire" size={40} color="#ffff" />
            </View>
            <View>
              <Text style={styles.text}>O KCAL</Text>
            </View>
          </View>
          <View style={styles.icon}>
            <View style={styles.itemicon}>
              <Icons name="map-marker-radius-outline" size={40} color="#ffff" />
            </View>
            <View>
              <Text style={styles.text}>O M</Text>
            </View>
          </View>
          <View style={styles.icon}>
            <View style={styles.itemicon}>
              <Icons name="clock-time-two-outline" size={40} color="#ffff" />
            </View>
            <View>
              <Text style={styles.text}>O MM</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
        <VerticalBarGraph
            data={[20, 45, 28, 80, 99, 43, 50]}
            labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
            width={Dimensions.get('window').width }
            height={200}
            barRadius={5}
            barWidthPercentage={0.65}
            barColor='#56CCF2'
            baseConfig={{
              hasXAxisBackgroundLines: false,
              xAxisLabelStyle: {
                position: 'right',
                suffix: 'km',
                color:'white'
              },      
              yAxisLabelStyle: {
                color:'white'
              },      
            }}
            style={{
              marginBottom: 30,
              paddingTop: 20,
              width: Dimensions.get('window').width ,
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  body: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent:'space-around'
  },
  icon: {
    flexDirection: 'column',
  },
  itemicon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    width: 60,
    height: 60,
    marginTop: 10,
  },
  text: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop:20,
    justifyContent:'flex-end'
  },
});
export default HomeScreen;
