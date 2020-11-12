import React, {useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const CircularProgress = ({
  size,
  fill,
  width,
  tintColor,
  backgroundColor,
  steps,
}) => {
  return (
    <View>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fill}
        tintColor={tintColor}
        backgroundColor={backgroundColor}>
        {() => <Text>{steps}</Text>}
      </AnimatedCircularProgress>
    </View>
  );
};
export default CircularProgress;
