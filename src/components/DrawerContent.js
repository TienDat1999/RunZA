import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import{
    Avatar,
    Title,
    Caption,
    Drawer,
    Paragraph,
    Text,
    TouchableRipple,
    Switch 
} from 'react-native-paper';
import{
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

export function DrawerContent(props){
    return(
      <LinearGradient colors={[ '#000029','#000029' ]} style={{flex:1}}>
         <View style={styles.container}>
           <View style={styles.header}>
            <View style={styles.avatar}>
              <View>
                  <Image source={require('../components/image/avatar.jpg')} style={{  borderWidth: 30,borderRadius:50,marginTop:40, marginLeft:20}} />              
              </View>      
              <View>   
                <Text style={{fontSize:20, color:'white', marginTop:20, marginLeft:20}}> TONY STARK </Text>
              </View>  
              </View>
            <View style={styles.icon}>
              <View style={styles.itemicon}>
                <View style={{marginTop:20}}><Icon name="face" size={18} color="white"> 18 </Icon></View>
                <View style={{marginTop:20}}><Icon name="human-male-height-variant" size={18} color="white"> 180cm </Icon></View>
                <View style={{marginTop:20}}><Icon name="weight-kilogram" size={18} color="white"> 70kg </Icon></View>
              </View>
            </View>  
          </View>  
            <View style={styles.body}></View>
            <View style={styles.footer}>
            <DrawerContentScrollView {...props}>
              <Drawer.Section>
                <DrawerItem 
                    icon={({color, size}) => (
                    <Icon 
                        name="home-outline" 
                        color= "white"
                        size={size}
                        />
                        )}
                        label="Home"
                        labelStyle={{color:"white"}}
                        onPress={() => {props.navigation.navigate('Home')}}
                        />
                   <DrawerItem 
                      icon={({color, size}) => (
                          <Icon 
                          name="smart-card-outline" 
                          color= "white"
                          size={size}
                          />
                          )}
                          label="Profile"
                          labelStyle={{color:"white"}}
                          onPress={() => {props.navigation.navigate('Profile')}}
                        />               
                   <DrawerItem 
                      icon={({color, size}) => (
                          <Icon 
                          name="signal" 
                          color= "white"
                          size={size}
                          />
                          )}
                          label="Rank"
                          labelStyle={{color:"white"}}
                          onPress={() => {props.navigation.navigate('Rank')}}
                        /> 
                        <DrawerItem 
                      icon={({color, size}) => (
                          <Icon 
                          name="notebook-outline" 
                          color= "white"
                          size={size}
                          />
                          )}
                          label="History"
                          labelStyle={{color:"white"}}
                          onPress={() => {props.navigation.navigate('History')}}
                        /> 
                <DrawerItem 
                      icon={({color, size}) => (
                          <Icon 
                          name="transit-connection-variant" 
                          color= "white"
                          size={size}
                          />
                          )}
                          label="Track"
                          labelStyle={{color:"white"}}
                          onPress={() => {props.navigation.navigate('Track')}}
                        />  
                  <DrawerItem 
                      icon={({color, size}) => (
                          <Icon 
                          name="bell-outline" 
                          color= "white"
                          size={size}
                          />
                          )}
                          label="Notifications"
                          labelStyle={{color:"white"}}
                          onPress={() => {props.navigation.navigate('Notifications')}}
                        />
                                   
              </Drawer.Section>
            </DrawerContentScrollView>
              <Drawer.Section>
                <DrawerItem 
                          icon={({color, size,marginTop}) => (
                              <Icon 
                              name="logout" 
                              color= "white"
                              size={size}
                              marginTop={30}
                              />
                              )}
                              label="Logout"
                              labelStyle={{color:"white"}}
                              onPress={() => {props.navigation.navigate('Home')}}
                            />                                      
              </Drawer.Section>
         </View>
       </View>
      </LinearGradient>   
    );
}
const styles = StyleSheet.create({
container:{
  flex:1,
  textAlign:'center',
},
itemicon:{
  marginLeft:20,
},
icon:{
  marginTop:40,
  flexDirection:'column'
},
header:{
  flexDirection:'row'
},
footer:{
  flex:1
},
body:{
  marginTop:10,
  borderBottomWidth:2,
  borderBottomColor:'#FFFFFF',
  marginLeft:30,
  marginRight:30,
},
drawerSection:{
 color:'white'
}
});