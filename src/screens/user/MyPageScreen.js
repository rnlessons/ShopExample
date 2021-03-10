import _ from 'lodash';
import moment from 'moment';
import React, {useEffect, useState, useCallback} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import PublicText from '../../components/PublicText';
import TabHeader from '../../components/TabHeader';
import {getUser, setUser, setToken} from '../../libs/auth';

const Row = ({label, value}) => {
  return (
    <View style={styles.row}>
      <PublicText style={styles.label}>{label}</PublicText>
      <PublicText style={styles.value}>{value}</PublicText>
    </View>
  );
};

const DEFAULT_IMAGE = require('../../assets/images/avataaars.png');

export default function ProductListScreen({navigation}) {
  const [profile, setProfile] = useState({});
  const [profileImage, setProfileImage] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    async function init() {
      const data = await getUser();
      setProfileImage({uri: _.get(data, 'avatar', '')});
      setProfile(data);
    }
    init();
  }, []);

  const onImageError = useCallback(() => {
    setProfileImage(DEFAULT_IMAGE);
  }, []);

  const onLogout = useCallback(async () => {
    await setToken(null);
    await setUser(null);
    navigation.navigate('ProductList');
  });

  return (
    <>
      <TabHeader title="내 정보" />
      <View style={styles.itemContainer}>
        <Image
          source={profileImage}
          resizeMode="cover"
          style={styles.profileImage}
          onError={onImageError}
        />
        <View style={{flex: 1}}>
          <Row label="이름" value={_.get(profile, 'name', '')} />
          <Row label="이메일" value={_.get(profile, 'email', '')} />
          <Row
            label="회원 등록일"
            value={moment(
              _.get(profile, 'createdAt', new Date().toISOString()),
            ).format('YYYY년 MM월 DD일')}
          />
        </View>
      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
        <PublicText style={styles.logoutBtnText}>로그아웃</PublicText>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  profileImage: {
    height: 90,
    width: 90,
    marginRight: 30,
    marginLeft: 20,
    borderRadius: 10,
  },
  row: {
    marginTop: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
  },
  value: {
    fontSize: 20,
    marginBottom: 20,
  },
  logoutBtn: {
    marginTop: 30,
    padding: 20,
    marginLeft: 20,
    marginRight: 30,
    backgroundColor: '#4678B2',
    alignItems: 'center',
    borderRadius: 10,
  },
  logoutBtnText: {
    fontSize: 15,
    color: '#fff',
  },
});
