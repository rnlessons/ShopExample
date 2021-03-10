import moment from 'moment';
import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {DotIndicator} from 'react-native-indicators';
import OrderListItem from './OrderListItem';
import ListEmptyComponent from './ListEmptyComponent';
import {fetchOrderList} from '../libs/api';
import OrderSearchTab from './OrderSearchTab';

const ProductList = () => {
  const [searchMonth, setSearchMonth] = useState(moment().format('YYYY-MM'));
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initList = async () => {
      setIsLoading(true);
      const newList = await fetchOrderList(searchMonth);
      setList(newList);
      setIsLoading(false);
    };

    initList();
  }, [setList, searchMonth]);

  const onSelect = useCallback((month) => {
    setSearchMonth(month);
  });

  return (
    <>
      <OrderSearchTab onSelect={onSelect} />
      {isLoading && <DotIndicator color="#B9D3DE" />}
      <FlatList
        data={list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(props) => <OrderListItem {...props} />}
        ListEmptyComponent={
          <ListEmptyComponent title="주문 내역이 없습니다." />
        }
        contentContainerStyle={[
          list.length > 0 ? null : {justifyContent: 'center', flex: 1},
        ]}
        style={styles.flatList}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ProductList;
