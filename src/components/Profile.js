import React, { Component } from 'react'
import {Text, View, Button,StyleSheet,Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
export default class Profile extends Component {
  render() {
    return (
      <LinearGradient colors={[ '#000029','#000029' ]} style={{flex:1}}>
        <View style={styles.header} >
          <View>
            <Image source={require('../components/image/avatar.jpg')} style={{borderRadius:50,alignItems:'center'}} />
            <View style={{ marginTop:10}} >
              <Text style={{fontSize:20, color:'white'}}>TONY STARK </Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.boderprofile }>
            <View style={styles.itemprofile}>
              <View style={{marginRight:20, marginBottom:10}}><Icon name="face" size={30} color="black"/></View>
               <TouchableOpacity>
               <View style={styles.minusbutton}> 
                       <Entypo name="minus" size={20} color="#3B5998"></Entypo>
               </View>
                 </TouchableOpacity> 
                 <View><Text style={{marginLeft:20}}>18</Text></View>
                 <TouchableOpacity>
                <View style={styles.plusbutton}> 
                        <Entypo name="plus" size={20} color="#3B5998"></Entypo>
                </View>
                  </TouchableOpacity>
              </View>
                <View style={styles.itemprofile}>
                  <View style={{marginTop:10}}><Icon name="human-male-height-variant" size={30} color="black"/></View>
                <TouchableOpacity>
                  <View style={{marginLeft:40, marginRight:20}}>
                    <Entypo name="minus" size={20} color="#3B5998"></Entypo>
                  </View>
                </TouchableOpacity>
                <View><Text>180cm</Text></View>
                <View style={styles.plusbutton}>
                  <Entypo name="plus" size={20} color="#3B5998"></Entypo>
                </View>
              </View>
            <View style={styles.buttonStyle}>
                 <Button
                  buttonStyle=""
                   title="SAVE"
                    onPress={() =>('')}
                  />
                 </View>
          </View>
        </View>
      </LinearGradient>
      
    );
  }
}
const styles = StyleSheet.create({
container:{
  flex:1,
  },
header:{
 alignItems:"center",
 marginTop:40,
 flexDirection:'column'
},
body:{
  backgroundColor:'white', 
  flex:1,
  alignItems:'center',
  justifyContent:'center',
},
boderprofile:{
  backgroundColor: '#ffff',
  marginHorizontal: 10,
  marginVertical: 10,
  borderRadius: 8,
  paddingVertical: 40,
  paddingHorizontal: 15,
  marginBottom: 16,
  height: 400,
  width:307,
  shadowOffset: { width: 0, height: 0 },
  shadowColor: 'green',
  shadowOpacity: 0.1,
  elevation: 50,
  borderWidth: 1,
  borderColor: '#71B7B7'
},
itemprofile:{
  flexDirection:'row',
  alignItems:'center',
  marginLeft:20,
  marginRight:20,
  textAlign:'center'
},
minusbutton:{
  marginLeft:20,
  marginRight:25,
},
plusbutton:{
  marginLeft:50,
  marginRight:50,
},
buttonStyle:{
  justifyContent:'center',
  marginTop:40, 
  marginRight:20, 
  marginLeft:20,
}
});

