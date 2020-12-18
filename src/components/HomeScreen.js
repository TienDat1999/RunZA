import React, {useEffect, useState, useRef, useMemo} from 'react';
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
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-community/async-storage';
import {BWR, CaloriesBurn} from './common/calculateCalories';
//import LinearGradient from 'react-native-linear-gradient';
import {fn_DateCompare} from '../components/common/equalDate';
import {getData, setData, removeData} from '../components/common/AsyncStorage';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';
import {datahis, dayCharts} from './common/data';
import {backgroundTask} from './common/backGroundTask';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import ModalProfile from './modal';
const NUMBER_STEP_DIVIDE = 20;

const HomeScreen = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const ref = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [award, setAward] = useState({
    distance: 0,
    numberOfSteps: 0,
    startDate: null,
    endDate: null,
    miniutes: null,
    Calories: 0,
  });
  const [dayChart, setDayChart] = useState([0]);

  const handleShareAward = async (uir) => {
    const shareOption = {
      mesage: 'this is test',
      url: uir,
    };
    try {
      const ShareRespone = Share.open(shareOption);
      console.log(JSON.stringify(ShareRespone));
    } catch (error) {
      console.log(error);
    }
  };

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
      return number * 60 - miniutesLast + miniutesNow;
    } else {
      return 0;
    }
  };

  const getSecondsHandle = (fist, second) => {
    const secondsNow = new Date(Number(fist)).getSeconds();
    const secondsLast = new Date(Number(second)).getSeconds();
    const minutesNow = new Date(Number(fist)).getMinutes();
    const minutesLast = new Date(Number(second)).getMinutes();
    // console.log(
    //   'giay dau',
    //   secondsNow,
    //   'gay cuooi',
    //   secondsLast,
    //   'phut dau',
    //   minutesNow,
    //   'phut cuoi',
    //   minutesLast,
    // );
    if (minutesNow == minutesLast) {
      return secondsNow - secondsLast;
    } else if (minutesNow > minutesLast) {
      let number = minutesNow - minutesLast;
      return number * 60 - secondsLast + secondsNow;
    } else {
      console.log('di vao khong');
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
              const weekNow = moment().week();
              const week = moment(Number(number)).week();
              const type = new Date(Number(award.startDate));
              if (val == null) {
                // console.log('di vao history null');
                const month = [
                  {weeks: weekNow, days: [{...award, type: type.getDate()}]},
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
          let timesDurations = null;
          let reMunite = 0;
          let duarationMinute = [];
          let miniutesStamp = [];
          let duarationNUmber = 0;
          let duration = 0;
          Pedometer.startPedometerUpdatesFromDate(
            nows.getTime(),
            (pedometerData) => {
              if (miniutesStamp.length != 0) {
                // console.log('time', miniutesStamp);
                if (miniutesStamp.length >= 2) {
                  let seconds = getSecondsHandle(
                    miniutesStamp[1],
                    miniutesStamp[0],
                  );
                  //   console.log('seconds', seconds);
                  if (seconds >= 10) {
                    timesDurations = pedometerData.endDate;
                    let timeStime = miniutesStamp[miniutesStamp.length - 1];
                    miniutesStamp = [timeStime];
                    console.log('vao remove khi giay lon hon 10');
                  } else {
                    //  console.log('di vao set lai');
                    duration = getMinute(
                      pedometerData.endDate,
                      (timesDurations =
                        timesDurations || pedometerData.startDate),
                    );
                    miniutesStamp = [
                      miniutesStamp[miniutesStamp.length - 1],
                      pedometerData.endDate,
                    ];
                  }
                } else {
                  let arr = [...miniutesStamp, pedometerData.endDate];
                  miniutesStamp = arr;
                }
              } else {
                miniutesStamp.push(pedometerData.endDate);
              }

              console.log('duration', duration);
              //neu ma duaration > reMunite thi push
              if (duration == reMunite + 1) {
                reMunite = duration;
                console.log('re munite', reMunite);
              } else if (duration < reMunite) {
                duarationMinute.push(reMunite);
                reMunite = 0;
              }
              // console.log('mang', duarationMinute);
              let sum = duarationMinute.reduce((a, b) => a + b, 0);
              if (sum != 0) {
                duarationNUmber = sum;
              }
              //  console.log('duarationNUmber', duarationNUmber);
              setAward({
                distance: Number(value.distance) + pedometerData.distance,
                numberOfSteps:
                  Number(value.numberOfSteps) + pedometerData.numberOfSteps,
                startDate: pedometerData.startDate,
                endDate: pedometerData.endDate,
                miniutes: Number(value.miniutes) + duarationNUmber,
                Calories: CaloriesBurn(
                  number,
                  3.5,
                  Number(value.miniutes) + duarationNUmber,
                ),
              });
            },
          );
        }
      });
    });
  };
  const modalHandle = (val) => {
    // console.log('da goi toi');
    setVisible(val);
  };
  useEffect(() => {
    recieveData();

    //removeData('inforUser');
    // setData('dayChart', dayCharts);
    //setData('history', datahis);
    chartHandle();
    if (isEnabled == true) {
      backgroundTask();
      setTimeout(() => {
        pedomestorCount();
      }, 500);
    }
    getData('inforUser').then((val) => {
      if (val) {
        setVisible(false);
      }
    });
    removeData('timeDuaration');
    //getData('history').then((val) => console.log('get his', val));
    return () => {
      setIsEnabled(false);
    };
  }, []);

  useEffect(() => {
    setStoreAward();
  }, [award.numberOfSteps]);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <ViewShot
      style={styles.container}
      ref={ref}
      options={{format: 'jpg', quality: 0.9}}>
      {visible ? <ModalProfile modalHandle={() => modalHandle()} /> : null}

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
          <TouchableOpacity
            onPress={() => {
              ref.current.capture().then((uri) => {
                handleShareAward(uri);
              });
            }}>
            <View style={styles.buttonshare}>
              <Icons name="share-variant" size={30} color="#ffff" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 25}}>
              {moment().format('LL')}
            </Text>
          </View>
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
        <LineChart
          data={{
            labels: [
              '0',
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
            ],
            datasets: [
              {
                data: dayChart,
              },
            ],
          }}
          width={windowWidth * 0.93}
          height={windowHeight * 0.23}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          withShadow
          chartConfig={{
            backgroundColor: '#FFFF',
            backgroundGradientFrom: '#fFFF',
            backgroundGradientTo: '#B4CFEC',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '2',
              strokeWidth: '1',
              stroke: '#000',
            },
          }}
          bezier
          style={{
            marginBottom: 30,
            paddingTop: 20,
            marginLeft: 20,
            marginRight: 10,
            borderRadius: 15,
            borderRadius: 16,
          }}
        />
      </View>
    </ViewShot>
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
    marginLeft: 10,
  },
  buttonshare: {
    flex: 1,
    marginRight: 10,
  },
});
export default HomeScreen;
