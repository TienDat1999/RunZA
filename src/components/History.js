import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {getData, setData, removeData} from '../components/common/AsyncStorage';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import CircularProgres from '../components/common/CircularProgres';

import {Calendar} from 'react-native-calendars';
import {fn_DateCompare} from '../components/common/equalDate';
import {datahis} from './common/data';

import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';
const NUMBER_STEP_DIVIDE = 20;

export const History = ({navigation}) => {
  const [selectDay, setSelectDay] = useState('');
  const [isDateChoose, setIsDateChoose] = useState({
    Calories: 0,
    distance: 0,
    endDate: null,
    miniutes: 0,
    numberOfSteps: 0,
    startDate: null,
  });
  const [weekChart, setWeekChart] = useState([0, 0, 0, 0, 0, 0, 0]);
  // console.log(weekChart);
  useEffect(() => {
    //  setData('history', datahis);
    FindWeekNow();
  }, []);
  const findHistory = (data) => {
    getData('history').then((history) => {
      if (history) {
        //  console.log('di vao his');
        const weeks = history.find((elm) => {
          const weekchoose = moment(Number(data)).week();
          const weeklocal = elm.weeks;
          if (weekchoose == weeklocal) {
            return true;
          }
        });
        if (weeks) {
          const days = weeks.days.find((elm) => {
            const m = new Date(Number(data) + 1);
            const c = new Date(Number(elm.startDate));
            if (fn_DateCompare(m, c) == 0) {
              return true;
            }
          });
          if (days) {
            setIsDateChoose(days);
          } else {
            setIsDateChoose({
              Calories: 0,
              distance: 0,
              endDate: null,
              miniutes: 0,
              numberOfSteps: 0,
              startDate: null,
            });
          }
        } else {
          setIsDateChoose({
            Calories: 0,
            distance: 0,
            endDate: null,
            miniutes: 0,
            numberOfSteps: 0,
            startDate: null,
          });
        }
      } else {
        console.log('not history');
      }
    });
  };
  const FindWeekNow = () => {
    getData('history').then((history) => {
      //console.log(history);
      if (history) {
        const weeksNow = history.find((elm) => {
          const weekNow = moment().week();
          if (weekNow == elm.weeks) {
            return true;
          }
        });
        const weekCharts = [];
        if (weeksNow) {
          // weekCharts.push(weeksNow.days[0].numberOfSteps);
          let number = 0;
          for (let i = 0; i < 7; i++) {
            if (weeksNow.days[number].type == i) {
              weekCharts.push(weeksNow.days[number].numberOfSteps);
              number = number + 1;
            } else {
              weekCharts.push(0);
            }
          }
          console.log('week chart là', weekCharts);
          setWeekChart(weekCharts);
        }
      }
    });
  };

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    // <LinearGradient colors={[ '#000029','#000029' ]} style={{flex:1}}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.buttonback}>
            <Icon name="arrow-back-ios" size={30} color="#ffff" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
      <View style={{padding: 5}}><Text style={{fontSize:28, color:'white', textAlign:'center'}}>{isDateChoose.numberOfSteps} steps</Text></View>
        <Calendar
          style={{marginLeft: 5, marginRight: 5}}
          theme={{
            backgroundColor: '#33FF99',
            calendarBackground: '#000000',
            textSectionTitleColor: '#00CCCC',

            dayTextColor: '#FFFF',
            todayTextColor: '#00adf5',
            monthTextColor: '#00CCCC',
          }}
          onDayPress={(day) => {
            setSelectDay(day.dateString);
            findHistory(day.timestamp);
          }}
          markedDates={{
            [selectDay]: {
              selectedColor: '#00ffff',
              selected: true,
            },
          }}
        />

        <View style={styles.top}>
          <View style={styles.icon}>
            <View style={styles.itemicon}>
              {/* calories */}
              <CircularProgres
                size={50}
                width={3}
                backgroundWidth={3}
                fill={Number(isDateChoose.Calories) / NUMBER_STEP_DIVIDE}
                tintColor="#00ffff"
                backgroundColor="#FFF"
                lineCap="round"
                image
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
                {Math.ceil(Number(isDateChoose.Calories))} KCAL
              </Text>
            </View>
          </View>
          <View style={styles.icon}>
            <View style={styles.itemicon}>
              {/* minute */}
              <CircularProgres
                size={50}
                width={3}
                backgroundWidth={3}
                fill={Number(isDateChoose.miniutes) / NUMBER_STEP_DIVIDE}
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
                {Math.ceil(Number(isDateChoose.miniutes))} MM
              </Text>
            </View>
          </View>
          <View style={styles.icon}>
            <View style={styles.itemicon}>
              {/* distance */}
              <CircularProgres
                size={50}
                width={3}
                backgroundWidth={3}
                fill={Number(isDateChoose.distance) / NUMBER_STEP_DIVIDE}
                tintColor="#00ffff"
                backgroundColor="#FFF"
                lineCap="round"
                rotation={0}
              />
              <View style={{position: 'absolute', top: '15%', left: '35%'}}>
                <Image
                  style={{width: 30, height: 35}}
                  source={require('./image/distance.png')}
                />
              </View>
            </View>
            <View>
              <Text style={styles.text}>
                {Math.ceil(isDateChoose.distance)} MM
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.chart}>
          <LineChart
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: weekChart,
                },
              ],
            }}
            width={windowWidth * 0.9}
            height={windowHeight * 0.25}
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
      </View>
    </View>
    // </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  footer: {
    marginTop: 10,
    borderColor: 'white',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop:1,
    borderColor: 'white',
  },
  body: {
    flex: 1,

  },
  itemicon: {
    borderColor: 'white',
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  chart: {
    marginTop: 20,
    justifyContent: 'flex-end',
    borderColor: 'white',
    marginLeft: 5,
    marginRight: 5,
  },
  buttonback: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
  },
  icon: {
    flexDirection: 'column',
    width: 100,
    marginTop: 10,
    marginLeft: 10,
  },
});
