import React from 'react';
import {View, StyleSheet} from 'react-native';

import PublicText from './PublicText';

export default function ListEmptyComponent() {
  return (
    <View style={styles.container}>
      <PublicText style={styles.text}>등록된 상품이 없습니다.</PublicText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
  },
});
