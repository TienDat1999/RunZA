import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import haversine from 'haversine';
const Track = () => {
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
  const [disarr, setDisarr] = useState(0);
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
                    console.log(newpoint, newtime, 111111);

                    console.log('start', newpoint[Math.floor(newtime / 2) - 1]);
                    console.log('end', newpoint[Math.floor(newtime / 2)]);
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#0b0938'}}>
      {/* {console.log(route, 2333333)} */}
      <View style={{height: 80}}></View>
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
            onDragEnd={(e) => console.log(e)}
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
            0 Kcal
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
          {distance > 1000 ? (
            <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
              {Math.round((distance / 1000) * 100) / 100} KM
            </Text>
          ) : (
            <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
              {Math.floor(distance)} M
            </Text>
          )}
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
              }}>
              <Text
                style={{textAlign: 'center', fontSize: 18, fontWeight: '700'}}>
                Stop
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Track;
