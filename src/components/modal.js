import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {getData, setData, removeData} from '../components/common/AsyncStorage';
import Modal from 'react-native-modal';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import RadioGroup from 'react-native-radio-buttons-group';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
export default ModalProfile = ({modalHandle}) => {
  const [gender, setgender] = useState([
    {
      label: 'Male',
      color: 'green',
      value: 'nam',
    },
    {
      label: 'Female',
      color: 'green',
      value: 'nu',
    },
  ]);
  const HandleVisible = () => {
    modalHandle(false);
  };
  const selectedGender = () => {
    let selectedButton = gender.find((e) => e.selected == true);
    let selectedButtons = selectedButton
      ? selectedButton.value
      : gender[0].label;
    setgenderchoose(selectedButtons);
  };

  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [genderchoose, setgenderchoose] = useState('nam');
  const [weigh, setWeigh] = useState(null);
  const [heigt, setHeight] = useState(null);
  let profile = {
    name: name,
    gender: genderchoose,
    Weight: weigh,
    height: heigt,
    age: age,
  };
  const setInforUser = async () => {
    console.log('profile', profile);
    setData('inforUser', profile);
  };
  //console.log('profile', profile);
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Modal isVisible={true}>
        <View style={styles.header}>
          <View style={styles.boderbox}>
            <View style={{alignItems: 'center'}}>
              <Icons name="run-fast" size={50} style={{color: 'black'}} />
            </View>
            <View style={styles.textbox}>
              <View>
                <Text style={styles.Text}>Name:</Text>
              </View>
              <View>
                <TextInput
                  style={{
                    height: 40,
                    padding: 5,
                    margin: 10,
                    borderColor: 'black',
                    borderWidth: 1,
                  }}
                  placeholder="Enter your name"
                  maxLength={25}
                  placeholderTextColor="gray"
                  onChangeText={(text) => setName(text)}
                  value={name}
                />
              </View>
            </View>
            <View style={styles.textbox}>
              <View>
                <Text style={styles.Text}>Year old: </Text>
              </View>
              <View>
                <TextInput
                  onChangeText={(text) => setAge(text)}
                  value={age}
                  style={{
                    height: 40,
                    padding: 5,
                    margin: 10,
                    borderColor: 'black',
                    borderWidth: 1,
                  }}
                  keyboardType="numeric"
                  placeholder="Enter your old"
                  placeholderTextColor="gray"
                />
              </View>
            </View>
            <View style={styles.textbox}>
              <View>
                <Text style={styles.Text}>Gender: </Text>
              </View>
              <View>
                <RadioGroup
                  flexDirection="row"
                  radioButtons={gender}
                  onPress={(gender) => {
                    setgender(gender);
                    //console.log(gender);
                    selectedGender();
                  }}
                />
              </View>
            </View>
            <View style={styles.textbox}>
              <View>
                <Text style={styles.Text}>Weight: </Text>
              </View>
              <View>
                <TextInput
                  onChangeText={(text) => setWeigh(text)}
                  value={weigh}
                  style={{
                    height: 40,
                    padding: 5,
                    margin: 10,
                    borderColor: 'black',
                    borderWidth: 1,
                  }}
                  placeholder="Enter your weight"
                  placeholderTextColor="gray"
                />
              </View>
            </View>
            <View style={styles.textbox}>
              <View>
                <Text style={styles.Text}>Height: </Text>
              </View>
              <View>
                <TextInput
                  onChangeText={(text) => setHeight(text)}
                  value={heigt}
                  style={{
                    height: 40,
                    padding: 5,
                    margin: 10,
                    borderColor: 'black',
                    borderWidth: 1,
                  }}
                  placeholder="Enter your height"
                  placeholderTextColor="gray"
                />
              </View>
            </View>
            <View style={styles.buttonStyle}>
              <Button
                color="#1C1D25"
                borderRadius="50"
                title="SAVE"
                onPress={() => {
                  console.log('save infor');
                  HandleVisible();
                  setInforUser();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    flex: 1,
    alignItems: 'center',
  },
  header: {
    height: '100%',
    width: '100%',
  },
  boderbox: {
    backgroundColor: '#ffff',
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 40,
    paddingHorizontal: 15,
    marginBottom: 16,
    height: 600,
    width: '80%',
  },
  textbox: {},
  buttonStyle: {
    marginTop: 20,
  },
  errorMsg: {
    color: 'red',
    marginLeft: 10,
  },
});
