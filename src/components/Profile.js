import React, {useState, useEffect} from 'react';
import {getData, setData, removeData} from '../components/common/AsyncStorage';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
export default Profile = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('Male');
  const defautvalue = {
    name: 'user',
    gender: 'nam',
    Weight: 56,
    height: 170,
    age: 18,
  };
  const [profile, setProfile] = useState({
    name: null,
    gender: null,
    Weight: null,
    height: null,
    age: null,
  });
  // set du lieu thong tin nguoi dung o duoi local
  const setInforUser = async () => {
    setData('inforUser', profile);
  };
  const getInforUser = async () => {
    getData('inforUser').then((val) => {
      if (val != null) {
        setProfile(val);
      } else {
        setProfile(defautvalue);
      }
    });
  };
  useEffect(() => {
    getInforUser();
  }, []);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.buttonback}>
            <Icons name="arrow-back-ios" size={25} color="#ffff" />
          </View>
        </TouchableOpacity>
        <View style={styles.profile}>
          <View style={{width: '30%', alignItems: 'center'}}>
            <Icon name="face" color="white" size={100} />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: 20, color: 'white'}}>{profile.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        <View
          style={{
            marginTop: '7%',
            height: '100%',
            width: '90%',
            alignItems: 'center',
          }}>
          <View style={styles.boderprofile}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.icon}>
                <View style={styles.icons}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('./image/age.png')}
                  />
                </View>
                <View style={styles.icons}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('./image/height.png')}
                  />
                </View>
                <View style={styles.icons}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('./image/weight.png')}
                  />
                </View>
                <View style={styles.icons}>
                  <Image
                    style={{width: 35, height: 35}}
                    source={require('./image/sex.png')}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'column'}}>
                <TouchableOpacity
                  onPress={() => {
                    setProfile({...profile, age: profile.age - 1});
                  }}>
                  <View style={styles.minusbuttons}>
                    <Entypo name="minus" color="white" size={20} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setProfile({...profile, height: profile.height - 1});
                  }}>
                  <View style={styles.minusbuttons}>
                    <Entypo name="minus" color="white" size={20} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setProfile({...profile, Weight: profile.Weight - 1});
                  }}>
                  <View style={styles.minusbuttons}>
                    <Entypo name="minus" color="white" size={20} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.text}>
                <View>
                  <Text style={styles.texts}>{profile.age}</Text>
                </View>
                <View>
                  <Text style={styles.texts}>{profile.height}</Text>
                </View>
                <View>
                  <Text style={styles.texts}>{profile.Weight}</Text>
                </View>
                <View
                  style={{
                    borderColor: 'white',
                    borderWidth: 1,
                    flex: 1,
                    marginTop: '25%',
                    width: '120%',
                    marginLeft: '20%',
                  }}>
                  <Picker
                    selectedValue={selectedValue}
                    style={{
                      height: '5%',
                      width: '100%',
                      alignItems: 'center',
                      flex: 1,
                    }}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedValue(itemValue)
                    }>
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                  </Picker>
                </View>
              </View>
              <View style={styles.plusbutton}>
                <TouchableOpacity
                  onPress={() => {
                    setProfile({...profile, age: profile.age + 1});
                  }}>
                  <View style={styles.plusbuttons}>
                    <Entypo name="plus" size={20} color="white" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setProfile({...profile, height: profile.height + 1});
                  }}>
                  <View style={styles.plusbuttons}>
                    <Entypo name="plus" size={20} color="white" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setProfile({...profile, Weight: profile.Weight + 1});
                  }}>
                  <View style={styles.plusbuttons}>
                    <Entypo name="plus" size={20} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttonStyle}>
              <Button
                color="#1C1D25"
                borderRadius="50"
                title="SAVE"
                onPress={() => {
                  console.log('save infor');
                  setInforUser();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  profile: {
    alignItems: 'center',
    flexDirection: 'column',
    height: '20%',
  },
  body: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  boderprofile: {
    backgroundColor: '#ffff',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 40,
    paddingHorizontal: 15,
    marginBottom: 16,
    height: '70%',
    width: '80%',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'green',
    shadowOpacity: 0.1,
    elevation: 50,
    borderWidth: 1,
    borderColor: '#71B7B7',
  },
  buttonback: {
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  icon: {
    flexDirection: 'column',
  },
  icons: {
    marginTop: '30%',
    marginLeft: '1%',
    marginRight: '10%',
    alignItems: 'center',
  },
  minusbuttons: {
    marginTop: '90%',
    marginRight: '1%',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 70,
  },
  plusbuttons: {
    marginTop: '90%',
    marginRight: '1%',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    backgroundColor: '#33DCFF',
    borderRadius: 100,
  },
  buttonStyle: {
    marginTop: '10%',
    marginLeft: '20%',
    marginRight: '20%',
  },
  texts: {
    marginTop: '29%',
    marginLeft: '15%',
    marginRight: '10%',
    fontSize: 20,
    textAlign: 'center',
  },
});
