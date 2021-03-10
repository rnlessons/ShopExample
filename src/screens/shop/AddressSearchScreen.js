import _ from 'lodash';
import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import ProductList from '../../components/ProductList';
import TabHeader from '../../components/TabHeader';
import PublicText, {fontFamily} from '../../components/PublicText';
import {useCallback} from 'react';
import {searchAddress} from '../../libs/api';
import {useEffect} from 'react';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import TransparentHeader from '../../components/TransparentHeader';

function ListItem({item, onPress}) {
  return (
    <Pressable style={styles.item} onPress={onPress(item.zipNo, item.roadAddr)}>
      <PublicText style={styles.zipNo}>{item.zipNo}</PublicText>
      <PublicText style={styles.roadAddr}>{item.roadAddr}</PublicText>
    </Pressable>
  );
}

export default function AddressSearchScreen({navigation}) {
  const route = useRoute();
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    async function search() {
      const response = await searchAddress(1, 10, keyword);
      setList(response);
    }
    search();
  }, [keyword, setList]);

  const onPress = useCallback(
    (zipNo, roadAddr) => () => {
      const onSelect = _.get(route, 'params.onSelect', () => {});
      onSelect(zipNo, roadAddr);
      navigation.goBack();
    },
    [route],
  );

  return (
    <>
      <TransparentHeader />
      <TabHeader title="주소 검색" />
      <TextInput
        style={styles.textInput}
        placeholder="검색어"
        placeholderTextColor="#333"
        value={keyword}
        onChangeText={setKeyword}
      />
      <FlatList
        data={list}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(props) => <ListItem {...props} onPress={onPress} />}
        ListEmptyComponent={
          <ListEmptyComponent title="검색된 주소가 없습니다" />
        }
        contentContainerStyle={[
          list.length > 0 ? null : {justifyContent: 'center', flex: 1},
        ]}
        style={styles.flatList}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInput: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    fontFamily,
  },
  item: {
    padding: 10,
  },
  zipNo: {
    fontSize: 20,
  },
  roadAddr: {
    fontSize: 20,
  },
});
