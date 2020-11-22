import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LocaleConfig} from 'react-native-calendars';
import {Calendar} from 'react-native-calendars';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BarChart } from 'react-native-svg-charts';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import { Dimensions } from 'react-native';
import { color } from 'react-native-reanimated';

export default History = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
  <LinearGradient colors={[ '#000029','#000029' ]} style={{flex:1}}>
    <View  style={styles.container} >
      <View style={styles.header}>
        <View><Text style={{fontSize:20, textAlign:"center", color:'#ffff'}}> SEP, 2020 </Text></View>
         <View style={{marginTop:10}}><Text style={{fontSize:25, textAlign:"center", color:'#ffff'}}> 1.200 </Text></View>
      </View>
      <View style={styles.body}>
          <View style={styles.calender}>
          <Calendar
          style={{borderWidth:1, height:300}}
          theme={{calendarBackground:'#000029'}}
              />
          </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.top}>
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
                  <View><Text style={styles.text} >O M</Text></View> 
              </View> 
              <View style={styles.icon}>
                    <View style={styles.itemicon}>
                      <Icon name="clock-time-two-outline"  size={40} color='#ffff'/>             
                    </View> 
                  <View><Text style={styles.text} >O MM</Text></View> 
              </View> 
        </View>  
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
      </View>
  </LinearGradient>
  );
};
const styles=StyleSheet.create({
container:{
 flex:1
},
header:{
 marginTop:20
},
calender:{
 marginTop:10
},
footer:{
  marginTop:20,
},
top:{
  flexDirection: 'row',
  justifyContent:'space-around'
},

itemicon:{
  alignItems:'center',
  justifyContent:'center',
  borderRadius:50,
  borderWidth:2,
  borderColor:'white',
  width:60,
  height:60,
},
text:{
  color:'white',
  marginTop:10,
  textAlign:'center',
},
})
