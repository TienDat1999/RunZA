import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {getData, setData, removeData} from '../components/common/AsyncStorage';
export const History = () => {
  const [history, setHistory] = useState(null);

  const finndF = () => {
    if (history) {
      const val = history.find((id) => id.product_id == '5');
      console.log('history is', val);
    } else {
      console.log('not history');
    }
  };
  useEffect(() => {
    finndF();
    getData('his').then((val) => {
      if (val) {
        setHistory(val);
      }
    });
  }, []);
  return (
    <View>
      <Text>this is profile</Text>
    </View>
  );
};
