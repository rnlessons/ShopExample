import React from 'react';
import {Platform, Text} from 'react-native';

const defaultStyle = Platform.select({
  ios: {
    fontFamily: 'AppleSDGothicNeo-Regular',
  },
  android: {
    fontFamily: 'sans-serif',
    includeFontPadding: false,
  },
});

const PublicText = ({style, children, ...props}) => {
  return (
    <Text {...props} allowFontScaling={false} style={[defaultStyle, style]}>
      {children}
    </Text>
  );
};

export default PublicText;
