import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import React, {useCallback, useState, useEffect} from 'react';
import {View, ImageBackground, StyleSheet, ScrollView} from 'react-native';
import PublicText, {fontFamily} from '../../components/PublicText';
import ColorView from '../../components/ColorView';
import StackHeader from '../../components/StackHeader';
import {fetchOrder} from '../../libs/api';

const aspectRatio = 640 / 480;

const Row = ({children, title}) => {
  return (
    <View style={styles.row}>
      <PublicText style={styles.title}>{title}</PublicText>
      <View style={{alignItems: 'flex-end'}}>{children}</View>
    </View>
  );
};

export default function OrderDetailScren({navigation, route}) {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const init = async () => {
      const data = await fetchOrder(_.get(route, 'params.id', null));
      setOrderData(data);
    };

    init();
  }, []);

  return (
    <>
      <StackHeader title="주문 상세" />
      <ScrollView
        style={[
          styles.container,
          {
            marginBottom: 20,
          },
        ]}>
        <ImageBackground
          source={{uri: _.get(orderData, 'imageUrl', '')}}
          resizeMode="cover"
          style={styles.mainImage}>
          <PublicText style={styles.productName}>
            {_.get(orderData, 'productName', '')}
          </PublicText>
          <PublicText style={styles.productPrice}>
            &#8361; {numeral(_.get(orderData, 'price', 0)).format('0,0')}
          </PublicText>
        </ImageBackground>
        <View style={styles.contentContainer}>
          <Row title="수량">
            <PublicText style={styles.quantity}>
              {_.get(orderData, 'quantity', 0)} 개
            </PublicText>
          </Row>
          <Row title="총금액">
            <PublicText style={styles.totalPrice}>
              {' '}
              &#8361; {numeral(_.get(orderData, 'totalPrice', 0)).format('0,0')}
            </PublicText>
          </Row>
          <Row title="상품 상세 정보">
            <PublicText>
              {_.get(orderData, 'productDescription', '')}
            </PublicText>
          </Row>
          <Row title="색상">
            <ColorView size={5} color={_.get(orderData, 'color', '')} />
          </Row>
          <Row title="소재">
            <PublicText>{_.get(orderData, 'productMaterial', '')}</PublicText>
          </Row>
          <Row title="상품 종류">
            <PublicText>{_.get(orderData, 'product', '')}</PublicText>
          </Row>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  container: {
    flex: 1,
  },
  mainImage: {
    alignSelf: 'stretch',
    aspectRatio,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  row: {
    marginTop: 20,
  },
  orderBtn: {
    alignSelf: 'stretch',
    padding: 30,
    backgroundColor: '#B9D3DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderBtnText: {
    fontSize: 30,
  },
  productName: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    fontSize: 30,
    color: '#fff',
  },
  productPrice: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    fontSize: 30,
    color: '#fff',
  },
  quantity: {
    fontSize: 30,
  },
  totalPrice: {
    fontSize: 30,
  },
});
