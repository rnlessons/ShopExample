import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import screens from '../screens';

const Tab = createBottomTabNavigator();

const {ProductListScreen, OrderListScreen, MyPageScreen} = screens;

const Icons = {
  ProductList: [
    <FontAwesome name="rocket" size={20} color="#000" />,
    <FontAwesome name="rocket" size={20} color="#900" />,
  ],
  OrderList: [
    <FontAwesome name="first-order" size={20} color="#000" />,
    <FontAwesome name="first-order" size={20} color="#900" />,
  ],
  MyPage: [
    <FontAwesome name="user" size={20} color="#000" />,
    <FontAwesome name="user" size={20} color="#900" />,
  ],
};

export default function TabNavigator(props) {
  return (
    <Tab.Navigator
      initialRouteName="ProductList"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          // You can return any component that you like here!
          return Icons[route.name][focused ? 1 : 0];
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="ProductList" component={ProductListScreen} />
      <Tab.Screen name="OrderList" component={OrderListScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
