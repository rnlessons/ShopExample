import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import screens from '../screens';
import BottomTabBar from './BottomTabBar';

const Tab = createBottomTabNavigator();

const {ProductListScreen, OrderListScreen, MyPageScreen} = screens;

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="OrderList"
      tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen name="ProductList" component={ProductListScreen} />
      <Tab.Screen name="OrderList" component={OrderListScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
