import React, { Component } from 'react'
import {Text, View, Button,StyleSheet,Image, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
export default class Profile extends Component {
  render() {
    return (
      <LinearGradient colors={[ '#192f6a','#4c669f' ]} style={{flex:1}}>
        <View style={styles.phantren} >
          <View style={{}}>
            <Image source={require('../components/Image/avatar.jpg')} style={{borderRadius:50,alignItems:'center'}} />
            <View style={{marginTop:20, marginBottom:10}} >
              <Text style={{fontSize:20, color:'white'}}>TONY STARK </Text>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor:'white', flex:1, alignItems:'center',justifyContent:'center'}}>
          <View style={{ backgroundColor: '#ffff',
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
        }}>
            <View style={{flexDirection: 'row',justifyContent:"space-around"}}>
              <View style={{marginRight:20, marginBottom:10}}><Icon name="face" size={30} color="black"/></View>
               <TouchableOpacity>
               <View style={styles.minusbutton}> 
                       <Entypo name="minus" size={20} color="#3B5998"></Entypo>
               </View>
                 </TouchableOpacity> 
                 <View><Text>18</Text></View>
                 <TouchableOpacity>
               <View style={styles.minusbutton}> 
                       <Entypo name="plus" size={20} color="#3B5998"></Entypo>
               </View>
                 </TouchableOpacity>
            </View>
              <View style={{flexDirection:'row', justifyContent:"space-around"}}>
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
            <View style={{justifyContent:'center',marginTop:40, marginRight:20, marginLeft:20, backgroundColor:'red'}}>
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
phantren:{
 alignItems:"center",
 marginTop:40
}
});

