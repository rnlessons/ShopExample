import React, {useCallback} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {getUser} from '../libs/auth';
import PublicText from './PublicText';

const Icons = {
  ProductList: [
    <FontAwesome name="rocket" size={30} color="#fff" />,
    <FontAwesome name="rocket" size={30} color="#102F5D" />,
  ],
  OrderList: [
    <FontAwesome name="first-order" size={30} color="#fff" />,
    <FontAwesome name="first-order" size={30} color="#102F5D" />,
  ],
  MyPage: [
    <FontAwesome name="user" size={30} color="#fff" />,
    <FontAwesome name="user" size={30} color="#102F5D" />,
  ],
};

export default function BottomTabBar({state, descriptors, navigation}) {
  const insets = useSafeAreaInsets();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  const routeName = state.routes[state.index].name;

  // const isFocused = state.index === index;

  const onPress = useCallback(
    (name) => async () => {
      if (name === 'MyPage' || name === 'OrderList') {
        const user = await getUser();

        if (!user) {
          navigation.navigate('LoginScreen');
          return;
        }
      }

      navigation.navigate(name);
    },
    [navigation],
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
        },
      ]}>
      <Pressable style={styles.tab} onPress={onPress('ProductList')}>
        {routeName === 'ProductList'
          ? Icons.ProductList[0]
          : Icons.ProductList[1]}
        <PublicText
          style={[
            styles.tabText,
            routeName === 'ProductList' && styles.tabTextSelected,
          ]}>
          상품
        </PublicText>
      </Pressable>
      <Pressable style={styles.tab} onPress={onPress('OrderList')}>
        {routeName === 'OrderList' ? Icons.OrderList[0] : Icons.OrderList[1]}
        <PublicText
          style={[
            styles.tabText,
            routeName === 'OrderList' && styles.tabTextSelected,
          ]}>
          주문
        </PublicText>
      </Pressable>
      <Pressable style={styles.tab} onPress={onPress('MyPage')}>
        {routeName === 'MyPage' ? Icons.MyPage[0] : Icons.MyPage[1]}
        <PublicText
          style={[
            styles.tabText,
            routeName === 'MyPage' && styles.tabTextSelected,
          ]}>
          내정보
        </PublicText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#B9D3DE',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tabText: {
    paddingTop: 10,
    color: '#102F5D',
    fontSize: 15,
  },
  tabTextSelected: {
    color: '#fff',
  },
});
