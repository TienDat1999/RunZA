import React, {useEffect, useState} from 'react';
import {Switch, View, Text, StyleSheet} from 'react-native';
import CircularProgres from './Component/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import AsyncStorage from '@react-native-community/async-storage';
import debounce from 'lodash.debounce';
import BackgroundTimer from 'react-native-background-timer';
import {color, set} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BarChart } from 'react-native-svg-charts'


//const NUMBER_STEP_KEY = 'numberOfSteps';

const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSwitchEnabled, setSwitch] = React.useState(false)
 
  const [award, setAward] = useState({
    distance: 0,
    numberOfSteps: 0,
    startDate: '',
  });
  //  const [award, setAward] = useState({numberOfSteps: 0});
  const [curentAward, SetCurentAward] = useState({
    distance: null,
    numberOfSteps: null,
  });
  
   
  
  const setStoreAward = async () => {
    try {
      const check = AsyncStorage.getItem('award');
      const now = new Date();
      const dayNow = now.getDate();
      console.log('ngay hien tai', dayNow);

      if (check == null) {
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
      if (value !== null) {
        // We have data!!
        const data = JSON.parse(value);
        SetCurentAward({
          distance: data.distance,
          numberOfSteps: data.numberOfSteps,
        });
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
      if (curentAward.numberOfSteps != null) {
        setAward({
          distance: curentAward.distance + pedometerData.distance,
          numberOfSteps:
            curentAward.numberOfSteps + pedometerData.numberOfSteps,
          startDate: pedometerData.startDate,
        });
      } else {
        setAward({
          distance: pedometerData.distance,
          numberOfSteps: pedometerData.numberOfSteps,
          startDate: pedometerData.startDate,
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
    d = new Date().toLocaleDateString();
    pedomestorCount();
  });
  useEffect(() => {
    setStoreAward();
  }, [award.numberOfSteps]);
  const fill = 'rgb(86, 204, 242)'
  const data = [50, 10, 40, 95, 4, 24, null, 85, undefined, 0, 35, 53, 53, 24, 50, 20, 10]

  return (
    <View style={styles.container}>
        <LinearGradient colors={[ '#000029','#000029' ]} style={{flex:1}}>         
        <View style={styles.header}>
          <View>
            <Text>{award.distance}</Text>
            <CircularProgres
              size={300}
              width={10}
              fill={100}
              tintColor="#ffff"
              backgroundColor="#ffff"
              steps={1000}
            /> 
            {/* <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              /> */}
          </View>
          <View style={{marginTop:10}}>   
            <Switch 
              value={isSwitchEnabled}
              onValueChange={(value) => setSwitch(value)}
            />
          </View>   
        </View>
        <View style={styles.body}>
          <View style={styles.icon}>
                <View style={styles.itemicon}>
                  <Icon name="fire"  size={40} color='#ffff'/>             
                </View> 
               <View><Text style={styles.text} >O KCAL</Text></View> 
          </View> 
          <View style={styles.icon}>
                <View style={styles.itemicon}>
                  <Icon name="map-marker-radius-outline"  size={40} color='#ffff'/>             
                </View> 
               <View><Text style={styles.text} >O KCAL</Text></View> 
          </View> 
          <View style={styles.icon}>
                <View style={styles.itemicon}>
                  <Icon name="clock-time-two-outline"  size={40} color='#ffff'/>             
                </View> 
               <View><Text style={styles.text} >O KCAL</Text></View> 
          </View>                    
        </View>
        <View style={styles.footer}>
        <BarChart style={{ height: 200 }} data={data} svg={{ fill }} contentInset={{ top:30  }}>  
            </BarChart>
        </View>
        </LinearGradient>  
  </View>
  );
}; 
const styles = StyleSheet.create({
container:{
 flex:1
},
header:{
  alignItems:'center',
  marginTop: 60
},
body:{
  flexDirection:'row',
  marginTop:10
},
icon:{
  flexDirection:'column'
},
itemicon:{
  alignItems:'center',
  justifyContent:'center',
  borderRadius:50,
  borderWidth:2,
  borderColor:'white',
  marginLeft:50,
  width:60,
  height:60,
  marginTop:10
},
text:{
  color:'white',
  marginTop:10,
  textAlign:'center',
  marginLeft: 50,
},
footer:{
  marginTop:10,
  marginLeft:20,
  marginRight:20
},
})
export default HomeScreen;
