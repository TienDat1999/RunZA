import React, { Component } from 'react';
import {Image, Text, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Fonts/Entypo'
export default class LOGIN extends Component {
    render() {   
        return ( 
          <LinearGradient colors={[ '#192f6a','#4c669f' ]} style={styles.linearGradient}>
            
               <View style={styles.container}>
                 <View>
                  <Text style={styles.text}> RUNNING ZONE </Text>
                    <View style={styles.hinh}>
                      <Image  source={require('D:/capstone/RunZA/image/hinhchaybo.png')} />        
                    </View>    
                 </View>  
                 <View style={{marginTop:40}}>
                   <Text style={{color:'#ffff', fontSize:16}}>
                     Login with
                   </Text>
                   </View>   
                  <TouchableOpacity  style={styles.button1}>
                    <View style={styles.iconbutton}> 
                       <Entypo name="facebook-with-circle" size={20} color="#3B5998"></Entypo>
                    </View>
                    <View style={styles.textbutton}>
                       <Text style={{fontSize:15,color:"black"}} >connect with facebook </Text>
                    </View>
                  </TouchableOpacity> 
               </View>
         </LinearGradient>
         );
    }
  }
const styles=StyleSheet.create({ 
  container:{
    flex:1,
    alignItems: 'center',
  },
  linearGradient:{
    flex:1,
  },
  text:{
    fontSize:30,
    color: 'white',
     marginTop: 100,   
  },
  hinh:{
    textAlign:'center',
    alignItems: 'center',
    marginTop:100,
    width: 251,
    height: 148,
  },
  button1:{
    flexDirection:'row',
    backgroundColor:'#ffff',
    width:263,
    height:30,
    marginTop:30,
    borderRadius:5,
    shadowOpacity:0.1,
    elevation:4,
    shadowColor:'blue'
  },
  iconbutton:{
    justifyContent:'center',
    marginLeft:10
  },
  textbutton:{
    marginLeft:30,
    justifyContent:'center'
  },
 });

