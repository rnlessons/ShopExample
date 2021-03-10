import numeral from 'numeral';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Image, StyleSheet, View, Text, Pressable} from 'react-native';
import PublicText from './PublicText';
import ColorView from './ColorView';
// GET http://localhost:3000/commerce/orders

// "id": 16,
// "userId": 1,
// "productId": 10000,
// "zipCode": "06241",
// "address": "서울특별시 강남구 강남대로 358 (역삼동) 1111",
// "quantity": 1,
// "totalPrice": 94000,
// "createdAt": "2021-03-01T14:44:22.204Z",
// "updatedAt": null,
// "color": "green",
// "imageUrl": "http://placeimg.com/640/480",
// "productName": "Handmade Rubber Shirt",
// "price": 94000,
// "productMaterial": "Cotton",
// "product": "Bacon",
// "productDescription": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive"

const aspectRatio = 640 / 480;

const OrderListItem = ({item}) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('OrderDetailScreen', {
      id: item.id,
    });
  }, [navigation, item]);

  return (
    <Pressable onPress={onPress} style={styles.itemContainer}>
      <Image
        source={{uri: item.imageUrl}}
        resizeMode="cover"
        style={styles.productImage}
      />
      <View style={{flex: 1}}>
        <PublicText style={styles.productName}>{item.productName}</PublicText>
        <View style={styles.etcContainer}>
          <PublicText style={styles.orderQuantity}>
            {numeral(item.quantity).format('0,0')} 개
          </PublicText>
          <PublicText style={styles.productPrice}>
            {numeral(item.totalPrice).format('0,0')} 원
          </PublicText>
          <ColorView size={1} color={item.color} />
        </View>
        <PublicText style={styles.orderDate}>
          {moment(item.createdAt).format('YYYY년 MM월 DD일')}
        </PublicText>
      </View>
    </Pressable>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  productImage: {
    height: 90,
    aspectRatio,
    marginRight: 10,
    borderRadius: 10,
  },
  productName: {
    fontWeight: '500',
    fontSize: 22,
    marginBottom: 10,
  },
  productDesc: {
    fontSize: 17,
  },
  productPrice: {
    flex: 1,
    fontSize: 20,
    textAlign: 'right',
    marginRight: 20,
  },
  etcContainer: {
    flexDirection: 'row',
    marginTop: 17,
    marginBottom: 17,
    alignItems: 'center',
  },
  orderDate: {
    fontSize: 20,
    marginRight: 20,
    textAlign: 'right',
  },
  orderQuantity: {
    fontSize: 20,
  },
});
