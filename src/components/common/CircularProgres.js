import React, {useEffect, useState} from 'react';
import {Button, View, Text, StyleSheet, Image} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;


const CircularProgress = ({
  size,
  fill,
  width,
  backgroundWidth,
  tintColor,
  backgroundColor,
  steps,
  rotation,
  lineCap,
}) => {
  return (
    <View>
      <AnimatedCircularProgress
        size={size}
        width={width}
        backgroundWidth={backgroundWidth}
        fill={fill}
        tintColor={tintColor}
        backgroundColor={backgroundColor}
        rotation={rotation}
        lineCap={lineCap}>
        {() =>
            <Text style={styles.texCircle}>{steps}</Text>
             }
      </AnimatedCircularProgress>
    </View>
  );
};
const styles = StyleSheet.create({
  texCircle: {
    color: 'white',
    fontSize: windowWidth * 0.2,
  },
});

export default CircularProgress;