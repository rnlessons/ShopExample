import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';
import PublicText from './PublicText';

export default function TabHeader({title}) {
  const insets = useSafeAreaInsets();
  console.log(insets);
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: 20 + insets.top,
          paddingBottom: 20,
        },
      ]}>
      <PublicText style={styles.title}>{title}</PublicText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B9D3DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '900',
    fontSize: 20,
    color: '#102F5D',
  },
});
