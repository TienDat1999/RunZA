import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
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
    },
    {
      label: 'Female',
      color: 'green',
    },
  ]);
  const HandleVisible = () => {
    modalHandle(false);
  };
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
                />
              </View>
            </View>
            <View style={styles.textbox}>
              <View>
                <Text style={styles.Text}>Year old: </Text>
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
                  keyboardType="numeric"
                  placeholder="Enter your old"
                  placeholderTextColor="gray"
                />
              </View>
            </View>
            <View style={styles.textbox}>
              <View>
                <Text style={styles.Text}>Sex: </Text>
              </View>
              <View>
                <RadioGroup
                  flexDirection="row"
                  radioButtons={gender}
                  onPress={(gender) => {
                    setgender({gender});
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
