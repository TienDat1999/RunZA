import React, {useEffect, useState} from 'react';
import {Switch, View, Text, StyleSheet} from 'react-native';
import CircularProgres from './Component/CircularProgres';
import Pedometer from 'react-native-pedometer-huangxt';
import AsyncStorage from '@react-native-community/async-storage';
import debounce from 'lodash.debounce';
import BackgroundTimer from 'react-native-background-timer';
import {color, set} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BarChart} from 'react-native-svg-charts';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

//const NUMBER_STEP_KEY = 'numberOfSteps';

const HomeScreen = () => {
  const fill = 'rgb(86, 204, 242)';
  const data = [50, 20, 60, 20, 30, 20, 30, 100, 50];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000029', '#000029']} style={{flex: 1}}>
        <View style={styles.header}>
          <View>
            <CircularProgres
              size={300}
              width={15}
              backgroundWidth={10}
              fill={40}
              tintColor="#2EFE2E"
              backgroundColor="#FFF"
              lineCap="round"
              rotation={0}
              steps={<Text style={styles.texCircle}>500</Text>}
            />
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.icon}>
            <View style={styles.itemicon}>
              <Icon name="fire" size={40} color="#ffff" />
            </View>
            <View>
              <Text style={styles.text}>O KCAL</Text>
            </View>
          </View>
          <View style={styles.icon}>
            <View style={styles.itemicon}>
              <Icon name="map-marker-radius-outline" size={40} color="#ffff" />
            </View>
            <View>
              <Text style={styles.text}>O KCAL</Text>
            </View>
          </View>
          <View style={styles.icon}>
            <View style={styles.itemicon}>
              <Icon name="clock-time-two-outline" size={40} color="#ffff" />
            </View>
            <View>
              <Text style={styles.text}>O KCAL</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <BarChart
            style={{height: 200}}
            data={data}
            svg={{fill}}
            contentInset={{top: 30}}></BarChart>
        </View>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  texCircle: {
    color: 'white',
    fontSize: 50,
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  body: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    flexDirection: 'column',
  },
  itemicon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginLeft: 50,
    width: 60,
    height: 60,
    marginTop: 10,
  },
  text: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
    marginLeft: 50,
  },
  footer: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});
export default HomeScreen;
