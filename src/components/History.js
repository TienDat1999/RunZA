import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LocaleConfig} from 'react-native-calendars';
import {Calendar} from 'react-native-calendars';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BarChart } from 'react-native-svg-charts'

export default History = ({navigation}) => {
  const fill = 'rgb(86, 204, 242)'
  const data = [50, 10, 40, 95, 4, 24, null, 85, undefined, 0, 35, 53, 53, 24, 50, 20, 10]
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
                  <View><Text style={styles.text} >O KCAL</Text></View> 
              </View> 
              <View style={styles.icon}>
                    <View style={styles.itemicon}>
                      <Icon name="clock-time-two-outline"  size={40} color='#ffff'/>             
                    </View> 
                  <View><Text style={styles.text} >O KCAL</Text></View> 
              </View> 
        </View>  
            <BarChart style={{ height: 200, marginTop:20,marginBottom:20 }} data={data} svg={{ fill }} contentInset={{ top:30  }}>  
            </BarChart>
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
  flexDirection:'row'
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
})
