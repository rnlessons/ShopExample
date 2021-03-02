import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Image, StyleSheet, View, Pressable} from 'react-native';
import PublicText from './PublicText';

const width = 80;
const aspectRatio = 640 / 480;

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

const styles = StyleSheet.create({
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
    borderRadius: 10,
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

export default ProductListItem;
