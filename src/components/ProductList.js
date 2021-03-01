import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from 'react-native';
import PublicText from './PublicText';
import TabHeader from './TabHeader';

// GET http://localhost:3000/commerce/products?limit=10&offset=1
// "id": 9,
// "color": "salmon",
// "productName": "Refined Soft Fish",
// "price": 657000,
// "productMaterial": "Cotton",
// "product": "Table",
// "productDescription": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
// "createdAt": "2021-03-01T09:48:20.559Z",
// "updatedAt": null

let olderOffset = 0;
let newestOffset = 0;
let pageLimit = 10;

const fetchMoreList = async (limit, offset) => {
  try {
    let response = await fetch(
      `http://192.168.0.9:3000/commerce/products?limit=${limit}${
        offset ? `&offset=${offset}` : ''
      }`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    let json = await response.json();
    return json.rows;
  } catch (error) {
    console.error(error);
  }
};

const width = 80;
const aspectRatio = 640 / 480;
const ProductListItem = ({item}) => {
  const navigation = useNavigation();
  const onPress = useCallback(() => {
    navigation.navigate('ProductDetailScreen', {
      item,
    });
  }, [navigation, item]);

  return (
    <Pressable style={styles.itemContainer} onPress={onPress}>
      <Image
        source={{uri: item.imageUrl}}
        resizeMode="cover"
        style={styles.productImage}
      />
      <View style={{flex: 1}}>
        <PublicText style={styles.productName}>{item.productName}</PublicText>
        <PublicText numberOfLines={2} style={styles.productDesc}>
          {item.productDescription}
        </PublicText>
      </View>
    </Pressable>
  );
};

const ProductList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    // When app is opened, we are going to render 50 List on screen.
    // Generally this is where you connect to chat server and query first batch of List.
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

  // Add 10 more List to end of the list.
  // In real chat application, this is where you have your pagination logic.
  const loadMoreOlderList = useCallback(async () => {
    const newList = await fetchMoreList(pageLimit, olderOffset);

    if (newList.length > 0) {
      olderOffset = newList[newList.length - 1].id;
    }
    setList((state) => {
      return [...state, ...newList];
    });
  }, [setList]);

  // Add 10 more List to beginning of the list.
  // In real chat application, this is where you have your pagination logic.
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
    <SafeAreaView style={styles.container}>
      <TabHeader title="상품 리스트" />
      <FlatList
        data={list}
        onEndReached={loadMoreOlderList}
        onStartReached={loadMoreRecentList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(props) => <ProductListItem {...props} />}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    // borderWidth: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  productImage: {
    width,
    aspectRatio,
    marginRight: 10,
  },
  productDesc: {
    fontSize: 12,
  },
  productName: {
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 10,
  },
});

export default ProductList;
