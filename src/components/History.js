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
import CircularProgres from './Component/CircularProgres';

export default History = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
  <LinearGradient colors={[ '#000029','#000029' ]} style={{flex:1}}>
    <View  style={styles.container} >
      <View style={styles.header}>
        <View><Text style={{fontSize:20, textAlign:"center", color:'#ffff'}}> SEP, 2020 </Text></View>
         <View style={{marginTop:5}}><Text style={{fontSize:25, textAlign:"center", color:'#ffff'}}> 1.200 </Text></View>
      </View>
      <View style={styles.body}>
          <Calendar
          style={{marginLeft:5,marginRight:5}}
          theme={{calendarBackground:'#000029',
         }}
       />
        <View style={styles.top}>
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
                    </View> 
                  <View><Text style={styles.text} >O KCAL</Text></View> 
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
                    </View> 
                  <View><Text style={styles.text} >O M</Text></View> 
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
                    </View> 
                  <View><Text style={styles.text} >O MM</Text></View> 
              </View> 
        </View> 

      </View>
      <View style={styles.footer}>
        <View style={styles.chart}>
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
              paddingTop: 10,
            }}
          />
        </View>  
        </View>   
      </View>
  </LinearGradient>
  );
};
const styles=StyleSheet.create({
container:{
 flex:1
},

footer:{
  marginTop:10,
},
top:{
  flexDirection: 'row',
  justifyContent:'space-around',
  marginTop:5,
  marginBottom:5
},
body:{
  flex:1,
},
// itemicon:{
//   alignItems:'center',
//   justifyContent:'center',
//   borderRadius:50,
//   borderWidth:2,
//   borderColor:'white',
//   width:60,
//   height:60,
// },
text:{
  color:'white',
  marginTop:5,
  textAlign:'center',
},
chart: {
  marginTop:20,
  justifyContent:'flex-end',
  borderColor:'white',
  marginLeft:5,
  marginRight:5,
  borderWidth:1
},
})
