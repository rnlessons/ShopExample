import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, FlatList} from 'react-native';

import TabHeader from './TabHeader';
import ProductListItem from './ProductListItem';
import {fetchMoreList} from '../libs/api';

let olderOffset = 0;
let newestOffset = 0;
let pageLimit = 10;

const ProductList = () => {
  const [list, setList] = useState([]);

  // 초기화
  useEffect(() => {
    const initList = async () => {
      olderOffset = 0;
      newestOffset = 0;
      const initialList = await fetchMoreList(pageLimit, null);

      if (initialList.length > 0) {
        newestOffset = initialList[0].id;
        olderOffset = initialList[initialList.length - 1].id;
      }

      setList([...initialList]);
    };

    initList();
  }, [setList]);

  // 이전
  const loadMoreOlderList = useCallback(async () => {
    const newList = await fetchMoreList(pageLimit, olderOffset);

    if (newList.length > 0) {
      olderOffset = newList[newList.length - 1].id;
    }
    setList((state) => {
      return [...state, ...newList];
    });
  }, [setList]);

  // 최근
  const loadMoreRecentList = useCallback(async () => {
    const newList = await fetchMoreList(pageLimit, newestOffset);
    if (newList.length > 0) {
      newestOffset = newList[0].id;
    }
    setList((state) => {
      return [...newList, ...state];
    });
  }, [setList]);

  return (
    <>
      <TabHeader title="상품 리스트" />
      <FlatList
        data={list}
        onEndReached={loadMoreOlderList}
        onStartReached={loadMoreRecentList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(props) => <ProductListItem {...props} />}
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
    backgroundColor: '#fff',
  },
});

export default ProductList;
