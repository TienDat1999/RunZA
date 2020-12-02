import React, {useEffect, useState} from 'react';
import {Switch, View, Text, StyleSheet, TouchableOpacity,Dimensions} from 'react-native';
import CircularProgres from './common/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import { BarChart } from 'react-native-svg-charts';
import AsyncStorage from '@react-native-community/async-storage';
import {BWR, CaloriesBurn} from './common/calculateCalories';
import LinearGradient from 'react-native-linear-gradient';
import {fn_DateCompare} from '../components/common/equalDate';
import {getData, setData, removeData} from '../components/common/AsyncStorage';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
//const NUMBER_STEP_KEY = 'numberOfSteps';

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
    removeData('history');
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
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      {/* <LinearGradient colors={['#0000']} style={{flex: 1}}> */}
        <View style={styles.header}>
          <View style={{flex:1,justifyContent:'space-between',flexDirection:'row'}}>
          <TouchableOpacity onPress ={() => navigation.openDrawer()}>
              <View style={styles.buttonmenu}>
                <Icons name="menu" size={30} color="#ffff" />
              </View>
              </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.buttonshare}>
              < Icons name="share-variant" size={30} color="#ffff" />
              </View>
            </TouchableOpacity>
          </View>
        <View style={{ alignItems:'center'}}>
          <View style={{borderWidth:1, borderColor:'white',width:windowWidth-100,height:windowHeight*0.45,marginTop:30,alignItems:'center'}}>
          <View style={{position:'absolute',top:"10%",left:"40%"}}><Icons name="run-fast" size={windowWidth*0.18} style={{color:"#ffff"}}/></View>
              <CircularProgres
                size={windowHeight*0.4}
                width={6}
                backgroundWidth={13}
                fill={56}
                steps={10000}
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
              <CircularProgres
                size={50}
                width={4}
                backgroundWidth={3}
                fill={50}               
                tintColor="#00ffff"
                backgroundColor="#FFF"
                lineCap="round"
                rotation={0}/> 
                <View style={{position:'absolute',top:"15%",left:"20%"}}><Icons name="fire" size={30} style={{color:"#ffff"}}/></View>
            </View>
            <View>
              <Text style={styles.text}>O KCAL</Text>
            </View>
          </View>
          <View style={styles.icon}>
            <View style={styles.itemicon}>
            <CircularProgres
                size={50}
                width={2}
                backgroundWidth={3}
                fill={10}
                tintColor="#00ffff"
                backgroundColor="#FFF"
                lineCap="round"
                rotation={0}
              />
              
              <View style={{position:'absolute',top:"15%",left:"20%"}}><Icons name="fire" size={30} style={{color:"#ffff"}}/></View>
              
            </View>
            <View>
              <Text style={styles.text}>O M</Text>
            </View>
          </View>
          <View style={styles.icon}>
            <View style={styles.itemicon}>
            <CircularProgres
                size={50}
                width={2}
                backgroundWidth={3}
                fill={10}
                tintColor="#00ffff"
                backgroundColor="#FFF"
                lineCap="round"
                rotation={0}
              />
              <View style={{position:'absolute',top:"15%",left:"20%"}}><Icons name="fire" size={30} style={{color:"#ffff"}}/></View>
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
            width={windowWidth*0.95 }
            height={windowHeight*0.26}
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
    backgroundColor:'black'
  },
  header: {
    flex:1,
    marginTop:10
  },
  body: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent:'space-around',
  },
  icon: {
    flexDirection: 'column',
  },
  itemicon: {
    borderWidth:1,
    borderColor:"#ffff",
    position:'relative'
  },
  text: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop:20,
    justifyContent:'flex-end',
    borderColor:'white',
    marginLeft:5,
    marginRight:5,
    borderWidth:1
  },
  buttonmenu:{
    flex:1,
    marginLeft:7,
  },
  buttonshare:{
    flex:1,
    marginRight:7,
  }
});
export default HomeScreen;
