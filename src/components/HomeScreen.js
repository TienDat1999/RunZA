import React, {useEffect, useState} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import CircularProgres from './Component/CircularProgres';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const [Progress, setProgress] = useState({fill: 50});
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
      <View ><Entypo name="menu" size={40} color="#FFFFFF"/></View>
      <View style={styles.share}><Entypo name="share" size={40} color="#FFFFFF"/></View>
      </View>
      
      <View style={styles.containertwo}>
      <View style={styles.fire}><FontAwesome5 name="running" size={100} color="#FFFFFF"/></View>
      <CircularProgres 
        size={300}
        width={15}
        fill={50}
        tintColor="#56CCF2"
        backgroundColor="#fff"
        steps={450}>
         

      </CircularProgres>
      </View>

      
      <View style={styles.containercalo}>
      <View style={styles.fire}><FontAwesome5 name="fire" size={30} color="#F3705A"/></View>
      <CircularProgres 
        size={60}
        width={2}
        fill={100}
        tintColor="#fff"
        
      />
      
      
      </View>

      <View style={styles.containerdistance}>
      <View style={styles.fire}><MaterialCommunityIcons name="map-marker-distance" size={30} color="#C7EBFF"/></View>
      <CircularProgres 
        size={60}
        width={2}
        fill={100}
        tintColor="#fff"
        
      />
      </View>

      <View style={styles.containertime}>
      <View style={styles.fire}><Entypo name="stopwatch" size={30} color="#45B8FB"/></View>
      <CircularProgres 
        size={60}
        width={2}
        fill={100}
        tintColor="#fff"
        
      />
      </View>
    </View>
    
  );
};


const styles = StyleSheet.create({
  container : {
      flex : 1,
      display : 'flex',
      backgroundColor :'#000029'
  },
  
  share:{
    marginLeft:360,
    marginTop:-30
  },

  containertwo:{
    
    marginTop:50,
    marginLeft:60
  },
  containercalo:{
    marginLeft:50,
    marginTop:50
  },

 
  containerdistance:{
    marginLeft:180,
    marginTop:-90
  },
  containertime:{
    marginLeft:310,
    marginTop:-90
  
  }
});
export default HomeScreen;
