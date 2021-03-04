import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import PublicText from './PublicText';

import TabHeader from './TabHeader';
import ProductListItem from './ProductListItem';
import ListEmptyComponent from './ListEmptyComponent';
import {fetchMoreList} from '../libs/api';

let olderOffset = 0;
let newestOffset = 0;
let pageLimit = 10;

const ProductList = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 초기화
  useEffect(() => {
    const initList = async () => {
      olderOffset = 0;
      newestOffset = 0;
      setIsLoading(true);
      const initialList = await fetchMoreList(pageLimit, null);

      if (initialList.length > 0) {
        newestOffset = initialList[0].id;
        olderOffset = initialList[initialList.length - 1].id;
      }

      setList([...initialList]);
      setIsLoading(false);
    };

    initList();
  }, [setList]);

  // 이전
  const loadMoreOlderList = useCallback(async () => {
    if (isLoading === true) {
      return;
    }
    setIsLoading(true);
    const newList = await fetchMoreList(pageLimit, olderOffset);

    if (newList.length > 0) {
      olderOffset = newList[newList.length - 1].id;
    }
    setList((state) => {
      return [...state, ...newList];
    });
    setIsLoading(false);
  }, [isLoading, setList]);

  // 최근
  const loadMoreRecentList = useCallback(async () => {
    if (isLoading === true) {
      return;
    }

    setIsLoading(true);
    const newList = await fetchMoreList(pageLimit, newestOffset);
    if (newList.length > 0) {
      newestOffset = newList[0].id;
    }
    setList((state) => {
      return [...newList, ...state];
    });
    setIsLoading(false);
  }, [isLoading, setList]);

  return (
    <>
      {isLoading && <PublicText>Loading...</PublicText>}
      <FlatList
        data={list}
        onEndReached={loadMoreOlderList}
        onStartReached={loadMoreRecentList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(props) => <ProductListItem {...props} />}
        ListEmptyComponent={ListEmptyComponent}
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
