import React, {useState} from 'react';
import {Button, View, Text, StyleSheet,Image,SafeAreaView, TouchableOpacity,Dimensions,FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const listTab=[
  {
    status:'Today'
  },
  {
    status:'Week'
  },
  {
    status:'Month'
  },
]
const data=[
  {
    number:'1',
    name: 'nguyenvanA',
    kilometer:'1,6km',
    status: 'Today'
  },
  {
    number:'2',
    name: 'nguyenvanB',
    kilometer:'1,6km',
    status: 'Week'
  },
  {
    number:'3',
    name: 'nguyenvanC',
    kilometer:'1,6km',
    status: 'Month'
  },
]
export default Rank = ({navigation}) => {
  const[status, setStatus] = useState('All')
  const [datalist,setDatalist] = useState(data)

  const setStatusFilter = status =>{
    if(status !=='All'){
      setDatalist([...data.filter(e => e.status === status)])
    }else{
      setDatalist(data)
    }
    setStatus(status)
  }
  const renderItem=({item, index})=>{
    return(
      <View key={index} style={styles.boderContainer}>
       <View style={styles.boder}>
         <View><Text style={{colors:'black',fontSize:18,marginLeft:20}}>{item.number}</Text></View>
         <View><Image source={require('../components/image/avatar.jpg')} style={{width:25,height:25,marginLeft:20}}/></View>
         <View><Text style={{colors:'black',fontSize:18,marginLeft:20}}>{item.name}</Text></View>
         <View><Text style={{colors:'black',fontSize:18,marginLeft:20}}>{item.kilometer}</Text></View>
       </View>
      </View>
    )
  }
    return (
      <SafeAreaView style={styles.container}>
      <LinearGradient colors={[ '#000029','#000029' ]} style={{flex:1}}>      
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <View>
                  <Text style={{fontSize:16,color:'#ffff', marginRight:30}}>2nd</Text>
                </View>
                <View style={{flexDirection:'column'}}>
                    <Image source={require('../components/image/avatar.jpg')} style={{borderRadius:50,alignItems:'center',justifyContent:'center'}} />
                    <View style={{marginTop:10}}>
                    <Text style={{fontSize:16,color:'#ffff'}}>TONY STARK</Text>
                  </View>
                </View>
                <View>
                  <Text style={{fontSize:16,color:'#ffff', marginLeft:30}}>10.000m</Text>
                </View>
              </View>       
            </View>
            <View style={styles.body}>
              <View style={styles.listTab}>
                {
                  listTab.map(e=>(
                    <TouchableOpacity style={[styles.btnTab, status === e.status && styles.btnTabActive]}
                    onPress={()=> setStatusFilter(e.status)}
                    >
                    <View>
                  <Text style={[styles.textTab, status === e.status && styles.textTabActive]}>{e.status}</Text>
                    </View>
                  </TouchableOpacity>
                  ))
                }   
              </View>   
              <FlatList
               data={datalist}
               keyExtractor={(e,i) => i.toString()}
               renderItem={renderItem}
              />
            </View>
     </LinearGradient>
    </SafeAreaView>
    );
  };
const styles=StyleSheet.create({
container:{
  flex:1,
  justifyContent:'center'
},
header:{
 flex:1,
 alignItems:'center',
 justifyContent:'space-around',
 flexDirection:'column'
},
headerTop:{
  flexDirection:'row',
  alignItems:'center',
},
headerBot:{
  marginTop:20,
  marginRight:30,
},
body:{
  backgroundColor:'white',
  flex:3,
  alignItems:'center',
},
btnTab:{
  width:Dimensions.get('window').width/3.5,
  flexDirection:'row',
  borderWidth:1,
  borderColor:'black',
  padding:10,
  justifyContent:'center',
  borderRadius:5
},
textTab:{
  fontSize:14,
   color:'black'
},
listTab:{
  flexDirection:'row',
  alignSelf:'center',
  marginBottom:20,
  alignItems:'center',
  marginTop:30,
},
btnTabActive:{
  backgroundColor:'orange',
  fontSize:30,
},
textTabActive:{
  color:'black'
},
boderContainer:{
 flex:1
},
boder:{
  borderWidth:1,
  borderRadius:20,
  width:315,
  height:40,
  flexDirection:'row',
  alignItems:'center'
}
})