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
import LinearGradient from 'react-native-linear-gradient';
import CircularProgres from '../components/common/CircularProgres';
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import {Calendar} from 'react-native-calendars';
import {fn_DateCompare} from '../components/common/equalDate';
import {datahis} from './common/data';
import moment from 'moment';
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
  const [weekChart, setWeekChart] = useState([1, 0, 0, 0, 0, 0, 0]);
  // console.log(weekChart);
  useEffect(() => {
    //  setData('history', datahis);
    FindWeekNow();
  }, []);
  const findHistory = (data) => {
    getData('history').then((history) => {
      if (history) {
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
          // console.log('week chart là', weekCharts);
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
            //console.log(day.timestamp);
            setSelectDay(day.dateString);
            const week = moment(Number(day.timestamp)).week();
            console.log(week);
            // findHistory(day.timestamp);
            // console.log(day.timestamp);
          }}
          markedDates={{
            [selectDay]: {
              selectedColor: '#FF9900',
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
                width={2}
                backgroundWidth={3}
                fill={Number(isDateChoose.Calories)}
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
                {' '}
                {Math.ceil(Number(isDateChoose.Calories))}
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
                fill={Number(isDateChoose.distance)}
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
                {' '}
                {Math.ceil(Number(isDateChoose.distance))}MM
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
                fill={Number(isDateChoose.miniutes)}
                tintColor="#00ffff"
                backgroundColor="#FFF"
                lineCap="round"
                rotation={0}
              />
              <View style={{position: 'absolute', top: '15%', left: '35%'}}>
                <Image
                  style={{width: 30, height: 30}}
                  source={require('./image/location.png')}
                />
              </View>
            </View>
            <View>
              <Text style={styles.text}>{isDateChoose.miniutes}MM</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.chart}>
          <VerticalBarGraph
            data={weekChart}
            labels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
            width={windowWidth * 0.95}
            height={windowHeight * 0.26}
            barRadius={5}
            barWidthPercentage={0.65}
            barColor="#56CCF2"
            baseConfig={{
              hasXAxisBackgroundLines: false,
              xAxisLabelStyle: {
                position: 'right',
                color: 'white',
              },
              yAxisLabelStyle: {
                color: 'white',
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  footer: {
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '5%',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  body: {
    flex: 1,
  },
  itemicon: {
    borderWidth: 1,
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
    borderWidth: 1,
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
