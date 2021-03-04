import numeral from 'numeral';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Image, StyleSheet, View, Text, Pressable} from 'react-native';
import PublicText from './PublicText';
import ColorView from './ColorView';
// GET http://localhost:3000/commerce/products?limit=10&offset=1
// "id": 9,
// "imageUrl":
// "color": "salmon",
// "productName": "Refined Soft Fish",
// "price": 657000,
// "productMaterial": "Cotton",
// "product": "Table",
// "productDescription": "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles",
// "createdAt": "2021-03-01T09:48:20.559Z",
// "updatedAt": null

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
    <Pressable onPress={onPress} style={styles.itemContainer}>
      <Image
        source={{uri: item.imageUrl}}
        resizeMode="cover"
        style={styles.productImage}
      />
      <View style={{flex: 1}}>
        <PublicText style={styles.productName}>{item.productName}</PublicText>
        <PublicText style={styles.productDesc} numberOfLines={2}>
          {item.productDescription}
        </PublicText>
        <View style={styles.etcContainer}>
          <PublicText style={styles.productPrice}>
            &#8361; {numeral(item.price).format('0,0')}
          </PublicText>
          <ColorView size={1} color={item.color} />
        </View>
      </View>
    </Pressable>
  );
};

export default ProductListItem;

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
    alignItems: 'center',
  },
});
