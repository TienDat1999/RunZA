import React, {useState, useEffect} from 'react';
import Pedometer from 'react-native-pedometer-huangxt';
import AsyncStorage from '@react-native-community/async-storage';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import haversine from 'haversine';
import {BWR, CaloriesBurn} from './common/calculateCalories';
import {getData, setData, removeData} from '../components/common/AsyncStorage';
const Track = ({navigation}) => {
  const [timerun, setTimerun] = useState(0);
  const [run, setRun] = useState(false);
  const [loop, setLoop] = useState();
  const [region, setRegion] = useState({
    latitude: 21.0221062,
    longitude: 105.8537014,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [distance, setDistance] = useState(0);
  const [route, setRoute] = useState([]);
  const [award, setAward] = useState({
    distance: 0,
    numberOfSteps: 0,
    Calories: 0,
  });

  const setStoreAward = async () => {
    const value = JSON.stringify(award);
    console.log('award', value);
    try {
      await AsyncStorage.setItem('awardTrack', value);
    } catch (e) {
      console.log(e);
    }
  };
  const curentAward = async () => {
    const value = await AsyncStorage.getItem('awardTrack');
    if (value != null) {
      let data = JSON.parse(value);
      return data;
    } else {
      console.log('lay du lieu tu local null');
      return null;
    }
  };
  const PedomestorCount = () => {
    // do something with pedometer data
    curentAward().then((value) => {
      getData('inforUser').then((val) => {
        if (val != null) {
          let number = BWR(val.gender, val.age, val.Weight, val.height);
          const nows = new Date();
          if (timerun === 0) {
            Pedometer.startPedometerUpdatesFromDate(
              nows.getTime(),
              (pedometerData) => {
                setAward({
                  distance: pedometerData.distance,
                  numberOfSteps: pedometerData.numberOfSteps,
                  Calories: CaloriesBurn(number, 3.5, timerun / 60),
                });
              },
            );
          } else {
            Pedometer.startPedometerUpdatesFromDate(
              nows.getTime(),
              (pedometerData) => {
                setAward({
                  distance: Number(value.distance) + pedometerData.distance,
                  numberOfSteps:
                    Number(value.numberOfSteps) + pedometerData.numberOfSteps,
                  Calories: CaloriesBurn(number, 3.5, timerun / 60),
                });
              },
            );
          }

          // console.log('calories Burn', Math.ceil(caloburn));
        } else {
          console.log('da di vao null');
        }
      });
    });
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App',
          message:
            'are you sure you want to share your location with the app ?',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            let newregion = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
              coordinate: new AnimatedRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0,
              }),
            };
            setRegion(newregion);
          },
          (error) => {
            Alert.alert('GPS permission denied');

            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    setStoreAward();
  }, [award.numberOfSteps]);

  useEffect(() => {
    requestPermission();
    setDistance(0);
    setRoute([]);
  }, []);

  useEffect(() => {
    if (run === true) {
      let newtime = timerun;
      let newroute = [...route];
      let dis = distance;

      requestPermission();

      setLoop(
        setInterval(async () => {
          if (newtime % 2 === 0) {
            try {
              await Geolocation.getCurrentPosition(
                async (position) => {
                  let newpoint = newroute.concat({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });

                  await setRoute(newpoint);
                  if (newtime >= 2) {
                    // undefine cho nay
                    // console.log(newpoint, newtime, 111111);

                    // console.log('start', newpoint[Math.floor(newtime / 2) - 1]);
                    // console.log('end', newpoint[Math.floor(newtime / 2)]);
                    if (
                      newpoint[Math.floor(newtime / 2)] != undefined &&
                      newpoint[Math.floor(newtime / 2) - 1] != undefined
                    ) {
                      dis += haversine(
                        newpoint[Math.floor(newtime / 2 - 1)],
                        newpoint[Math.floor(newtime / 2)],
                        {unit: 'meter'},
                      );
                      setDistance(dis);
                    }
                  }
                },

                (error) => {
                  Alert.alert('');

                  console.log(error);
                },
                {
                  enableHighAccuracy: true,
                  timeout: 20000,
                  maximumAge: 1000,
                },
              );
            } catch (error) {
              console.log(error);
            }
          }
          newtime++;
          setTimerun(newtime);
        }, 1000),
      );
    }
    if (run === false) {
      clearInterval(loop);
    }
    return () => {
      clearInterval(loop);
    };
  }, [run, timerun]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      {/* {console.log(route, 2333333)} */}
      <View style={{height: 80}}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.buttonback}>
            <Icons name="arrow-back-ios" size={25} color="#ffff" />
          </View>
        </TouchableOpacity>
        <View style={{padding: 5}}>
          <Text style={{fontSize: 28, color: 'white', textAlign: 'center'}}>
            {award.numberOfSteps} steps
          </Text>
        </View>
      </View>
      <View style={{flex: 1, marginBottom: 20}}>
        <MapView
          style={{flex: 1}}
          region={region}
          provider={PROVIDER_GOOGLE}
          showUserLocation={true}
          followUserLocation
          loadingEnabled>
          <Marker
            coordinate={region}
            title={'Vi Tri Hien Tai Cua Ban'}
            // onDragEnd={(e) => console.log(e)}
            image={require('./../asset/images/running.png')}
          />
          <Polyline
            coordinates={route}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={2}
          />
        </MapView>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 30,
        }}>
        <View>
          <View
            style={{
              borderWidth: 2,
              borderColor: 'white',
              height: 60,
              width: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('./../asset/images/kcal.png')} />
          </View>
          <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
            {Math.ceil(award.Calories)}
          </Text>
        </View>
        <View>
          <View
            style={{
              borderWidth: 2,
              borderColor: 'white',
              height: 60,
              width: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('./../asset/images/location.png')} />
          </View>
          {/* {distance > 1000 ? (
            <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
              {Math.round((distance / 1000) * 100) / 100} KM
            </Text>
          ) : (
            <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
              {Math.floor(distance)} M
            </Text>
          )} */}
          <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
            {Math.ceil(award.distance)} M
          </Text>
        </View>
        <View>
          <View
            style={{
              borderWidth: 2,
              borderColor: 'white',
              height: 60,
              width: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('./../asset/images/clock.png')} />
          </View>
          <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
            {`${Math.floor(timerun / 60)}:${timerun % 60}`}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!run &&
          (timerun === 0 ? (
            <TouchableOpacity
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                justifyContent: 'center',
                backgroundColor: 'white',
              }}
              onPress={async () => {
                await setRun(!run);
                PedomestorCount();
              }}>
              <Text
                style={{textAlign: 'center', fontSize: 18, fontWeight: '700'}}>
                Start
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}
                onPress={() => {
                  PedomestorCount();
                  setRun(!run);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  Continue
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  marginLeft: 40,
                }}
                onPress={() => {
                  setTimerun(0);
                  setDistance(0);
                  setRoute([]);
                  Pedometer.stopPedometerUpdates();
                  removeData('awardTrack');
                  setAward({distance: 0, numberOfSteps: 0, Calories: 0});
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  Reset
                </Text>
              </TouchableOpacity>
            </View>
          ))}

        {run && (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                justifyContent: 'center',
                backgroundColor: 'white',
              }}
              onPress={() => {
                setRun(!run);
                Pedometer.stopPedometerUpdates();
              }}>
              <Text
                style={{textAlign: 'center', fontSize: 18, fontWeight: '700'}}>
                Pause
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  buttonback: {
    marginTop: 10,
    marginLeft: 10,
  },
});
export default Track;
