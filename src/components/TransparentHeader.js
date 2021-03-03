import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Pressable, StyleSheet, View} from 'react-native';
import PublicText from './PublicText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function TransparentHeader({title}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container]}>
      <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
        <FontAwesome name="close" size={30} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'flex-end',
  },
  closeBtn: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
