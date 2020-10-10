import React, {useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';
import CircularProgres from './Component/CircularProgres';

const HomeScreen = () => {
  const [Progress, setProgress] = useState({fill: 50});
  return (
    <View>
      <Text>this is home screen</Text>
      <CircularProgres
        size={200}
        width={10}
        fill={50}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        steps={50}
      />
    </View>
  );
};
export default HomeScreen;
