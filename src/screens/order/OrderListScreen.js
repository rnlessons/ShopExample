import React from 'react';
import {View, Text} from 'react-native';
import OrderList from '../../components/OrderList';
import TabHeader from '../../components/TabHeader';

export default function OrderListScreen(props) {
  return (
    <>
      <TabHeader title="주문 목록" />
      <OrderList />
    </>
  );
}
