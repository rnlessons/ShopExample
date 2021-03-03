import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Pressable, StyleSheet, View} from 'react-native';
import PublicText from './PublicText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function StackHeader({title}) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
        },
      ]}>
      <View style={styles.titleContainer}>
        <PublicText style={styles.title}>{title}</PublicText>
      </View>
      <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
        <FontAwesome name="close" size={30} color="#102F5D" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#B9D3DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginLeft: 50,
    paddingBottom: 20,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontWeight: '900',
    fontSize: 20,
    color: '#102F5D',
  },
  closeBtn: {
    width: 50,
    paddingBottom: 20,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    right: 0,
  },
});
