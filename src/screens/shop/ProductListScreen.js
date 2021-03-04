import React from 'react';
import {View, Text} from 'react-native';
import ProductList from '../../components/ProductList';
import TabHeader from '../../components/TabHeader';

export default function ProductListScreen(props) {
  return (
    <>
      <TabHeader title="상품 리스트" />
      <ProductList />
    </>
  );
}
