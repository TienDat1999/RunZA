import React, {useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

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
        {() => <Text>{steps}</Text>}
      </AnimatedCircularProgress>
    </View>
  );
};
export default CircularProgress;
