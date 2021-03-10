import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import {useRoute, TabActions} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useCallback, useState} from 'react';
import InputSpinner from 'react-native-input-spinner';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import TransparentHeader from '../../components/TransparentHeader';
import PublicText, {fontFamily} from '../../components/PublicText';
import ColorView from '../../components/ColorView';
import {getToken, getUser} from '../../libs/auth';
import {order} from '../../libs/api';

const aspectRatio = 640 / 480;

const Row = ({children, title}) => {
  return (
    <View style={styles.row}>
      <PublicText style={styles.title}>{title}</PublicText>
      <View style={{alignItems: 'flex-end'}}>{children}</View>
    </View>
  );
};

export default function ProductDetailScreen({navigation}) {
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const [quantity, setQuantity] = useState(1);
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');

  const onOrder = useCallback(async () => {
    const user = await getUser();

    if (!user) {
      navigation.navigate('LoginScreen');
      return;
    }

    if (!address || !addressDetail || !zipCode) {
      Alert.alert('알림', '주소를 정확히 입력해주세요.');
      return;
    }

    if (quantity === 0) {
      Alert.alert('알림', '수량을 입력해주세요.');
      return;
    }

    Alert.alert('알림', '주문 하시겠습니까?', [
      {
        text: '확인',
        onPress: async () => {
          await order(
            _.get(route, 'params.item.id', ''),
            zipCode,
            `${address} ${addressDetail}`,
            quantity,
            _.get(route, 'params.item.price', 0),
          );

          Alert.alert('알림', '주문이 완료되었습니다.', [
            {
              text: '확인',
              onPress: () => {
                navigation.goBack();
                navigation.navigate('OrderList');
              },
            },
          ]);
        },
      },
      {
        text: '취소',
      },
    ]);
  }, [route, address, addressDetail, zipCode, quantity, navigation]);

  const onAddressSelect = useCallback(
    (zipNo, roadAddr) => {
      setZipCode(zipNo);
      setAddress(roadAddr);
      setAddressDetail('');
    },
    [navigation],
  );

  const onAddressSearch = useCallback(async () => {
    const user = await getUser();
    if (!user) {
      navigation.navigate('LoginScreen');
      return;
    }

    navigation.navigate('AddressSearchScreen', {
      onSelect: onAddressSelect,
    });
  }, [navigation]);

  return (
    <>
      <ScrollView
        style={[
          styles.container,
          {
            paddingBottom: insets.bottom,
            marginBottom: 20,
          },
        ]}>
        <TransparentHeader />
        <ImageBackground
          source={{uri: _.get(route, 'params.item.imageUrl', '')}}
          resizeMode="cover"
          style={styles.mainImage}>
          <PublicText style={styles.productName}>
            {_.get(route, 'params.item.productName', '')}
          </PublicText>
          <PublicText style={styles.productPrice}>
            &#8361;{' '}
            {numeral(_.get(route, 'params.item.price', 0)).format('0,0')}
          </PublicText>
        </ImageBackground>
        <View style={styles.contentContainer}>
          <Row title="상품 등록일">
            <PublicText>
              {moment(_.get(route, 'params.item.createdAt', '')).format(
                'YYYY. MM. DD',
              )}
            </PublicText>
          </Row>

          <Row title="상품 상세 정보">
            <PublicText>
              {_.get(route, 'params.item.productDescription', '')}
            </PublicText>
          </Row>
          <Row title="색상">
            <ColorView size={5} color={_.get(route, 'params.item.color', '')} />
          </Row>
          <Row title="소재">
            <PublicText>
              {_.get(route, 'params.item.productMaterial', '')}
            </PublicText>
          </Row>
          <Row title="상품 종류">
            <PublicText>{_.get(route, 'params.item.product', '')}</PublicText>
          </Row>
          <Row title="수량">
            <InputSpinner
              max={10}
              min={1}
              step={1}
              skin="square"
              value={quantity}
              onChange={(num) => {
                setQuantity(num);
              }}
            />
          </Row>
          <Row title="총금액">
            <PublicText style={styles.totalPrice}>
              {' '}
              &#8361;{' '}
              {numeral(_.get(route, 'params.item.price', 0) * quantity).format(
                '0,0',
              )}
            </PublicText>
          </Row>
          <Row title="주소">
            <TextInput
              style={styles.textInput}
              placeholder="우편번호"
              placeholderTextColor="#333"
              value={zipCode}
              onFocus={onAddressSearch}
            />
            <TextInput
              style={styles.textInput}
              placeholder="주소"
              placeholderTextColor="#333"
              value={address}
              onFocus={onAddressSearch}
            />
            <TextInput
              style={styles.textInput}
              placeholder="상세주소"
              placeholderTextColor="#333"
              value={addressDetail}
              onChangeText={setAddressDetail}
            />
          </Row>
        </View>
      </ScrollView>
      <Pressable style={styles.orderBtn} onPress={onOrder}>
        <PublicText style={styles.orderBtnText}>주문 하기</PublicText>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
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
  textInput: {
    height: 50,
    borderColor: 'gray',
    alignSelf: 'stretch',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily,
    marginBottom: 20,
  },
  totalPrice: {
    fontSize: 30,
  },
});
