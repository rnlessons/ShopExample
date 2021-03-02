import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import screens from '../screens';
import BottomTabBar from './BottomTabBar';

const Tab = createBottomTabNavigator();

const {ProductListScreen, OrderListScreen, MyPageScreen} = screens;

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="ProductList"
      // screenOptions={({route}) => ({
      //   tabBarIcon: ({focused, color, size}) => {
      //     // You can return any component that you like here!
      //     return Icons[route.name][focused ? 1 : 0];
      //   },
      // })}
      // tabBarOptions={{
      //   activeTintColor: 'tomato',
      //   inactiveTintColor: 'gray',
      // }}
      tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="ProductList" component={ProductListScreen} />
      <Tab.Screen name="OrderList" component={OrderListScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
