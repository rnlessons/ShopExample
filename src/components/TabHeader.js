import React from 'react';
import {StyleSheet, View} from 'react-native';
import PublicText from './PublicText';

export default function TabHeader({title}) {
  return (
    <View style={styles.container}>
      <PublicText style={styles.title}>{title}</PublicText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '900',
    fontSize: 20,
  },
});
