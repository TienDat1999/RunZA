import React, { Component } from 'react';
import {ImageBackground ,Image, View, Text, StyleSheet, Platform, AppRegistry, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import imageBackground from "./bg.png"
export default class LOGIN extends Component {
    render() {
        return (
        
            <View style={styles.container} >
                <ImageBackground source={imageBackground} style={styles.imgbackground}> 
                    <View style={styles.logo}>
                        <Image source={require('./logo.png')} />
                    </View>

                    <View style={styles.anhlogo}>
                        <Image source={require('./anhnen.png')} />
                    </View>
                    <View style={styles.anhlogo}>
                        <Image source={require('./text1.png')} />
                    </View>
                    <TouchableOpacity style={styles.loginfb} onPress={() => { }}> 
                    <Image style={styles.loginfb} source={require('./lgfb.png')}></Image>
                    </TouchableOpacity>
                    
                </ImageBackground>
            </View>
       
            
        ) 
    } 
}
const styles=StyleSheet.create({
    
container:{
  flex:1
},
imgbackground:{    
    flex:1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center',
},
logo:{
    alignItems: 'center',
    margin:50,
  },
anhlogo:{
    marginTop:10,
    alignItems: 'center',
    margin:10,
  },
loginwith:{
    marginTop:30,
    alignItems: 'center',
 
  },
  loginfb:{
    alignItems: 'center',
    marginTop:20,
  }

})