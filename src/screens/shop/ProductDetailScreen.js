import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import TransparentHeader from '../../components/TransparentHeader';
import PublicText from '../../components/PublicText';
import ColorView from '../../components/ColorView';

const aspectRatio = 640 / 480;

const Row = ({children, title}) => {
  return (
    <View style={styles.row}>
      <PublicText style={styles.title}>{title}</PublicText>
      {children}
    </View>
  );
};

// const formatter = new Intl.NumberFormat('ko-KR', {
//   style: 'currency',
//   currency: 'WON',
// });

export default function ProductDetail() {
  const route = useRoute();
  const insets = useSafeAreaInsets();

  return (
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
        <PublicText
          style={{
            position: 'absolute',
            bottom: 50,
            right: 20,
            fontSize: 30,
            color: '#fff',
          }}>
          {_.get(route, 'params.item.productName', '')}
        </PublicText>
        <PublicText
          style={{
            position: 'absolute',
            bottom: 10,
            right: 20,
            fontSize: 30,
            color: '#fff',
          }}>
          &#8361; {numeral(_.get(route, 'params.item.price', 0)).format('0,0')}
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
      </View>
    </ScrollView>
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
    marginBottom: 10,
  },
  row: {
    marginTop: 20,
  },
});
