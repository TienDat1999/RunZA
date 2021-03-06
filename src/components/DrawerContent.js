import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Drawer, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import {getData, setData, removeData} from '../components/common/AsyncStorage';
export function DrawerContent(props) {
  const [profile, setProfile] = useState({
    name: null,
    gender: null,
    Weight: null,
    height: null,
    age: null,
  });
  useEffect(() => {
    getData('inforUser').then((val) => {
      if (val) {
        setProfile(val);
      }
    });
  });

  return (
    <LinearGradient colors={['#020024', '#082b1f']} style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Icon name="user" color="white" size={120} />
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                {profile.name}
              </Text>
            </View>
          </View>
          {/* <View style={styles.icon}>
              <View style={styles.itemicon}>
                <View style={{marginTop:20}}><Icons name="face" size={18} color="white"> 18 </Icons></View>
                <View style={{marginTop:20}}><Icons name="human-male-height-variant" size={18} color="white"> 180cm </Icons></View>
                <View style={{marginTop:20}}><Icons name="weight-kilogram" size={18} color="white"> 70kg </Icons></View>
              </View>
            </View>   */}
        </View>
        <View style={styles.body}></View>
        <View style={styles.footer}>
          <DrawerContentScrollView {...props}>
            <Drawer.Section>
              <DrawerItem
                icon={({color, size}) => (
                  <Icons name="home-outline" color="white" size={size} />
                )}
                label="Home"
                labelStyle={{color: 'white'}}
                onPress={() => {
                  props.navigation.navigate('Home');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icons name="smart-card-outline" color="white" size={size} />
                )}
                label="Profile"
                labelStyle={{color: 'white'}}
                onPress={() => {
                  props.navigation.navigate('Profile');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icons name="signal" color="white" size={size} />
                )}
                label="Rank"
                labelStyle={{color: 'white'}}
                onPress={() => {
                  props.navigation.navigate('Rank');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icons name="notebook-outline" color="white" size={size} />
                )}
                label="History"
                labelStyle={{color: 'white'}}
                onPress={() => {
                  props.navigation.navigate('History');
                }}
              />
              <DrawerItem
                icon={({color, size}) => (
                  <Icons
                    name="transit-connection-variant"
                    color="white"
                    size={size}
                  />
                )}
                label="Track"
                labelStyle={{color: 'white'}}
                onPress={() => {
                  props.navigation.navigate('Track');
                }}
              />
            </Drawer.Section>
          </DrawerContentScrollView>
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
  },
  itemicon: {
    marginLeft: 20,
  },
  icon: {
    marginTop: 40,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 0.3,
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
  },
  body: {
    marginTop: '10%',
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    marginLeft: 30,
    marginRight: 30,
  },
  drawerSection: {
    color: 'white',
  },
  avatar: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
});
