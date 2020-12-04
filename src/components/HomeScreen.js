import React, {useEffect, useState} from 'react';
import {
  Switch,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CircularProgres from './common/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import {BarChart} from 'react-native-svg-charts';
import AsyncStorage from '@react-native-community/async-storage';
import {BWR, CaloriesBurn} from './common/calculateCalories';
//import LinearGradient from 'react-native-linear-gradient';
import {fn_DateCompare} from '../components/common/equalDate';
import {getData, setData, removeData} from '../components/common/AsyncStorage';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import moment from 'moment';

const NUMBER_STEP_DIVIDE = 10;

const HomeScreen = ({navigation}) => {
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
  // so sanh khoang cach phut
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
        if (fn_DateCompare(now, lastDay) == 0) {
          setAward(data);

          // console.log('VAN LA NGAY CU');
          // console.log('data nhan dc', data);
        } else {
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
    // recieveData();
    //removeData('history');
    setTimeout(() => {
      pedomestorCount();
    }, 500);
    // getData('history').then((val) => console.log('get his', val));
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
              borderWidth: 1,
              borderColor: 'white',
              width: windowWidth - 100,
              height: windowHeight * 0.45,
              marginTop: 30,
              alignItems: 'center',
            }}>
            <View style={{position: 'absolute', top: '10%', left: '40%'}}>
              <Icons name="run-fast" size={70} style={{color: '#ffff'}} />
            </View>
            <CircularProgres
              size={windowHeight * 0.4}
              width={6}
              backgroundWidth={13}
              fill={Number(award.numberOfSteps / NUMBER_STEP_DIVIDE)}
              steps={Number(award.numberOfSteps)}
              tintColor="#00ffff"
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
              fill={Number(award.Calories)}
              tintColor="#00ffff"
              backgroundColor="#FFF"
              lineCap="round"
              rotation={0}
            />
            <View style={{position: 'absolute', top: '15%', left: '20%'}}>
              <Icons name="fire" size={30} style={{color: '#ffff'}} />
            </View>
          </View>
          <View>
            <Text style={styles.text}>
              {Math.ceil(Number(award.Calories))}KCAl
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
              fill={Number(award.distance)}
              tintColor="#00ffff"
              backgroundColor="#FFF"
              lineCap="round"
              rotation={0}
            />

            <View style={{position: 'absolute', top: '15%', left: '20%'}}>
              <Icons name="fire" size={30} style={{color: '#ffff'}} />
            </View>
          </View>
          <View>
            <Text style={styles.text}>
              {Math.ceil(Number(award.distance))}M
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
              fill={Number(award.miniutes)}
              tintColor="#00ffff"
              backgroundColor="#FFF"
              lineCap="round"
              rotation={0}
            />
            <View style={{position: 'absolute', top: '15%', left: '20%'}}>
              <Icons name="fire" size={30} style={{color: '#ffff'}} />
            </View>
          </View>
          <View>
            <Text style={styles.text}>
              {Math.ceil(Number(award.miniutes))}MM
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <VerticalBarGraph
          data={[20, 45, 28, 80, 99, 43, 50, 28, 80, 99, 43, 50]}
          labels={[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
          ]}
          width={windowWidth * 0.95}
          height={windowHeight * 0.26}
          barRadius={5}
          barWidthPercentage={0.65}
          barColor="#56CCF2"
          baseConfig={{
            hasXAxisBackgroundLines: false,
            xAxisLabelStyle: {
              position: 'right',
              suffix: 'km',
              color: 'white',
            },
            yAxisLabelStyle: {
              color: 'white',
            },
          }}
          style={{
            marginBottom: 20,
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
  },
  icon: {
    flexDirection: 'column',
  },
  itemicon: {
    borderWidth: 1,
    borderColor: '#ffff',
    position: 'relative',
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
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
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
