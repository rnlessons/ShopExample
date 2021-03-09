import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const fontFamily = 'THEEuropetravel';

const PublicText = ({style, children, ...props}) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily,
  },
});

export default PublicText;
