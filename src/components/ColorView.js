import React from 'react';
import {View} from 'react-native';

const ColorView = ({size, color}) => {
  const width = size * 10;
  const height = size * 10;
  const borderRadius = size * 10;

  return (
    <View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: color,
      }}
    />
  );
};

export default ColorView;
