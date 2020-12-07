import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import CircularProgres from './common/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import AsyncStorage from '@react-native-community/async-storage';
import {BWR, CaloriesBurn} from './common/calculateCalories';
//import LinearGradient from 'react-native-linear-gradient';
import {fn_DateCompare} from '../components/common/equalDate';
import {getData, setData, removeData} from '../components/common/AsyncStorage';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import moment from 'moment';
import {datahis, dayCharts} from './common/data';
const NUMBER_STEP_DIVIDE = 20;

const HomeScreen = ({navigation}) => {
  // const [isEnabled, setIsEnabled] = useState(false);
  const [award, setAward] = useState({
    distance: 0,
    numberOfSteps: 0,
    startDate: null,
    endDate: null,
    miniutes: null,
    Calories: 0,
  });
  const [dayChart, setDayChart] = useState([1, 0, 0, 0, 0, 0]);
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
  // so sanh khoang cach phut
  const getMinute = (fist, second) => {
    const miniutesNow = new Date(Number(fist)).getMinutes();
    const miniutesLast = new Date(Number(second)).getMinutes();
    const hourNow = new Date(Number(fist)).getHours();
    const hourLast = new Date(Number(second)).getHours();
    if (hourNow == hourLast) {
      return miniutesNow - miniutesLast;
    } else if (hourNow > hourLast) {
      let number = hourNow - hourLast;
      return number * 60 - hourLast + hourNow;
    } else {
      return 0;
    }
  };

  const setStoreAward = async () => {
    const value = JSON.stringify(award);
    try {
      await AsyncStorage.setItem('award', value);
    } catch (e) {
      console.log(e);
    }
  };

  const chartHandle = () => {
    getData('dayChart').then((arr) => {
      if (arr) {
        // console.log(arr);
        let number = 0;
        const arrfll = [];
        for (let i = 0; i < 24; i++) {
          // console.log(arr[i]);
          if (arr[number].type == i) {
            arrfll.push(arr[number].steps);
            if (number < arr.length - 1) {
              number = number + 1;
            }
          } else {
            arrfll.push(0);
          }
        }
        const rr = [];
        if (arrfll) {
          for (let i = 0; i < arrfll.length; i = i + 2) {
            rr.push(arrfll[i] + arrfll[i + 1]);
          }
          // console.log(rr);
          setDayChart(rr);
        }
      }
    });
  };
  // //get du lieu tu local
  const recieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('award');
      if (value != null) {
        const data = JSON.parse(value);
        const now = new Date().getTime();
        const lastDay = new Date(Number(data.startDate)).getTime();
        const nowHour = new Date().getHours();
        const lastHour = new Date(Number(data.endDate)).getHours();
        console.log('data nhan dc', data);
        if (data.startDate) {
          if (fn_DateCompare(now, lastDay) == 0) {
            setAward(data);
            if (nowHour > lastHour) {
              getData('dayChart').then((day) => {
                const type = new Date(Number(data.startDate));
                if (day) {
                  const arrnumber = day;
                  const sum = arrnumber.reduce((a, b) => a + b.steps, 0);
                  const val = data.numberOfSteps - sum;
                  const value = {steps: val, type: type.getHours()};
                  arrnumber.push(value);
                  setTimeout(() => {
                    setData('dayChart', arrnumber);
                  }, 50);
                } else {
                  const arrnumber = [
                    {
                      steps: data.numberOfSteps,
                      type: type.getHours(),
                    },
                  ];

                  setData('dayChart', arrnumber);
                }
              });
            }
            console.log('VAN LA NGAY CU');
            console.log('data nhan dc', data);
          } else {
            // console.log('di vao day');
            getData('history').then((val) => {
              console.log('val', val);
              const number = award.startDate;
              const week = moment(Number(number)).week();
              const type = new Date(Number(award.startDate));
              if (val == null) {
                // console.log('di vao history null');
                const month = [
                  {weeks: week, days: [{...award, type: type.getDate()}]},
                ];
                setData('history', month);
              } else {
                //  console.log(val[val.length - 1].weeks, 'dsfsdf', week);
                if (val[val.length - 1].weeks == week) {
                  // console.log(val[val.length - 1]);
                  const lastWeek = val[val.length - 1];
                  const tmp = {
                    ...lastWeek,
                    days: [...lastWeek.days, {...award, type: type.getDate()}],
                  };
                  // console.log(tmp);
                  // // const t = val;
                  const data = [];
                  for (var i = 0; i < val.length - 1; i++) {
                    data.push(val[i]);
                  }
                  const his = [...data, tmp];
                  setData('history', his);
                  // console.log('di vao set history', his);
                } else {
                  const his = [
                    ...val,
                    {weeks: week, days: [{...award, type: type.getDate()}]},
                  ];
                  setData('history', his);
                  //console.log('tuan moi', his);
                }
              }
            });
            removeData('dayChart');
          }
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
              //console.log('duaration', duration);
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

    //removeData('dayChart');
    // setData('dayChart', dayCharts);
    //setData('history', datahis);
    chartHandle();
    let iscount = true;
    if (iscount) {
      setTimeout(() => {
        pedomestorCount();
      }, 500);
    }
    0;

    //getData('history').then((val) => console.log('get his', val));
    return () => {
      iscount = false;
    };

    //backgroundTask();
  }, []);

  useEffect(() => {
    setStoreAward();
  }, [award.numberOfSteps]);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      {/* <LinearGradient colors={['#0000']} style={{flex: 1}}> */}
      <View style={styles.header}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View style={styles.buttonmenu}>
              <Icons name="menu" size={30} color="#ffff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.buttonshare}>
              <Icons name="share-variant" size={30} color="#ffff" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              borderColor: 'white',
              width: windowWidth - 100,
              height: windowHeight * 0.45,
              marginTop: 30,
              alignItems: 'center',
            }}>
            <View style={{position: 'absolute', top: '10%', left: '40%'}}>
              <Icons name="run-fast" size={60} style={{color: '#ffff'}} />
            </View>
            <CircularProgres
              size={windowHeight * 0.4}
              width={6}
              backgroundWidth={13}
              fill={Number(award.numberOfSteps / NUMBER_STEP_DIVIDE)}
              // fill={50}
              steps={Number(award.numberOfSteps)}
              tintColor="#4EE2EC"
              backgroundColor="#FFF"
              lineCap="round"
              rotation={0}
            />
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.icon}>
          <View style={styles.itemicon}>
            {/* calories */}
            <CircularProgres
              size={50}
              width={4}
              backgroundWidth={3}
              fill={Number(award.Calories) / NUMBER_STEP_DIVIDE}
              tintColor="#4EE2EC"
              backgroundColor="#FFF"
              lineCap="round"
              rotation={0}
            />
            <View style={{position: 'absolute', top: '15%', left: '35%'}}>
              <Image
                style={{width: 30, height: 35}}
                source={require('./image/fire.png')}
              />
            </View>
          </View>
          <View>
            <Text style={styles.text}>
              {Math.ceil(Number(award.Calories))} KCAl
            </Text>
          </View>
        </View>
        <View style={styles.icon}>
          <View style={styles.itemicon}>
            {/* distance */}
            <CircularProgres
              size={50}
              width={2}
              backgroundWidth={3}
              fill={Number(award.distance) / NUMBER_STEP_DIVIDE}
              tintColor="#00ffff"
              backgroundColor="#FFF"
              lineCap="round"
              rotation={0}
            />

            <View style={{position: 'absolute', top: '15%', left: '35%'}}>
              <Image
                style={{width: 30, height: 35}}
                source={require('./image/clock.png')}
              />
            </View>
          </View>
          <View>
            <Text style={styles.text}>
              {Math.ceil(Number(award.distance))} M
            </Text>
          </View>
        </View>
        <View style={styles.icon}>
          <View style={styles.itemicon}>
            {/* minutes */}
            <CircularProgres
              size={50}
              width={2}
              backgroundWidth={3}
              fill={Number(award.miniutes) / NUMBER_STEP_DIVIDE}
              tintColor="#00ffff"
              backgroundColor="#FFF"
              lineCap="round"
              rotation={0}
            />
            <View style={{position: 'absolute', top: '15%', left: '35%'}}>
              <Image
                style={{width: 30, height: 30}}
                source={require('./image/distance.png')}
              />
            </View>
          </View>
          <View>
            <Text style={styles.text}>
              {Math.ceil(Number(award.miniutes))} MM
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <VerticalBarGraph
          //data={[100, 15, 7, 20, 14, 12, 85, 100, 15, 7, 20, 14]}
          data={dayChart}
          labels={[
            '2',
            '4',
            '6',
            '8',
            '10',
            '12',
            '14',
            '16',
            '18',
            '20',
            '22',
            '24',
          ]}
          width={windowWidth * 0.9}
          height={windowHeight * 0.23}
          barRadius={5}
          barWidthPercentage={0.5}
          barColor="#56CCF2"
          baseConfig={{
            hasXAxisBackgroundLines: false,
            xAxisLabelStyle: {
              position: 'right',
              color: 'black',
            },
            yAxisLabelStyle: {
              color: 'black',
            },
          }}
          style={{
            borderRadius: 15,
            backgroundColor: `#ffff`,
            paddingTop: 10,
            marginBottom: 30,
            marginLeft: 15,
            marginRight: 15,
          }}
        />
      </View>
      {/* </LinearGradient> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flex: 1,
    marginTop: 10,
  },
  body: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
    borderColor: 'white',
  },
  icon: {
    flexDirection: 'column',
    width: 100,
    marginTop: 10,
    marginLeft: 10,
  },
  itemicon: {
    borderColor: '#ffff',
    position: 'relative',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    justifyContent: 'flex-end',
    borderColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonmenu: {
    flex: 1,
    marginLeft: 7,
  },
  buttonshare: {
    flex: 1,
    marginRight: 7,
  },
});
export default HomeScreen;
