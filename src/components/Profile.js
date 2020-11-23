import React, {useState, useEffect} from 'react';
import {Button, View, Text} from 'react-native';
import {set} from 'react-native-reanimated';

export default Profile = ({navigation}) => {
  const [profile, setProfile] = useState({
    name: 'TienDat',
    gender: 'nam',
    Weight: 70,
    height: 170,
    age: 23,
  });
  // set du lieu thong tin nguoi dung o duoi local
  const setInforUser = async () => {
    const value = JSON.stringify(profile);
    try {
      await AsyncStorage.setItem('inforUser', value);
    } catch (e) {
      console.log(e);
    }
  };
  const getInforUser = async () => {
    const value = await AsyncStorage.getItem('inforUser');
    let data = JSON.parse(value);
    setProfile(data);
  };
  useEffect(() => {
    setInforUser();
  }, [profile]);
  useEffect(() => {
    getInforUser();
  });
  return (
    <View>
      <Text>this is profile</Text>
    </View>
  );
};
