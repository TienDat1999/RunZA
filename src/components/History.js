import React, {useState, useEffect} from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {getData, setData, removeData} from '../components/common/AsyncStorage';
import { Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from 'react-native-linear-gradient';
import CircularProgres from '../components/common/CircularProgres';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import {Calendar} from 'react-native-calendars';
export const History = ({navigation}) => {
  const [history, setHistory] = useState(null);

  const finndF = () => {
    if (history) {
      const val = history.find((id) => id.product_id == '5');
      console.log('history is', val);
    } else {
      console.log('not history');
    }
  };
  useEffect(() => {
    finndF();
    getData('his').then((val) => {
      if (val) {
        setHistory(val);
      }
    });
  }, []);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    // <LinearGradient colors={[ '#000029','#000029' ]} style={{flex:1}}>
    <View  style={styles.container} >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.buttonback}>
                <Icon name="arrow-back-ios" size={30} color="#ffff" />
        </View>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
          {/* <Calendar
          style={{marginLeft:5,marginRight:5}}
          theme={{calendarBackground:'#000029',
         }}
       /> */
       <View style={{borderColor:'white', borderWidth:1,height:'75%'}}>
        <Calendar
        theme={{ backgroundColor: '#ffff',
        calendarBackground: '#0000',
        monthTextColor: 'white',
        indicatorColor: 'blue',
      }}
        style={[styles.calendar, {height: 300}]}
        dayComponent={({date, state}) => {
          return (
            <View>
              <Text style={{textAlign: 'center', color: state === 'disabled' ? 'white' : 'white'}}>
                {date.day}
              </Text>
            </View>
          );
        }}
      />
    </View>
       }
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
                        image
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
                        steps={""}
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
  // </LinearGradient>
  );
};
const styles=StyleSheet.create({
container:{
 flex:1,
 backgroundColor:'black'
},

footer:{
  marginTop:10,
  borderColor:'white',
  borderWidth:1
},
top:{
  flexDirection: 'row',
  justifyContent:'space-around',
  marginTop:'5%',
  marginBottom:5,
  borderWidth:1,
  borderColor:'white'
},
body:{
  flex:1,
},
itemicon:{
  borderWidth:1,
  borderColor:'white',
  marginTop:10
},
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
buttonback:{
  marginTop:10,
  marginLeft:10,
  marginBottom:10
}
})
