import React, {useState} from 'react';
import {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PublicText, {fontFamily} from '../../components/PublicText';
import TransparentHeader from '../../components/TransparentHeader';
import {login, me} from '../../libs/api';
import {setToken, setUser} from '../../libs/auth';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('hgd_test@gmail.com');
  const [password, setPassword] = useState('1111');

  const onLogin = useCallback(async () => {
    if (!email || !password) {
      Alert.alert('알림', '이메일과 패스워드를 입력하세요.');
      return;
    }

    const {success, token} = await login(email, password);

    if (success === false) {
      Alert.alert('알림', '이메일과 패스워드가 일치하지 않습니다.');
      setPassword('');
      return;
    }

    console.log(token);
    await setToken(token);
    const myInfo = await me();
    await setUser(myInfo);
    navigation.goBack();
  });

  return (
    <LinearGradient colors={['#c2e59c', '#64b3f4']} style={styles.container}>
      <TransparentHeader />
      <View style={styles.loginContainer}>
        <TextInput
          style={[styles.textInput, {marginBottom: 20}]}
          onChangeText={(text) => setEmail(text)}
          placeholder="이메일"
          placeholderTextColor="#333"
          value={email}
        />
        <TextInput
          style={styles.textInput}
          placeholder="패스워드"
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#333"
          secureTextEntry
          value={password}
        />
      </View>
      <Pressable onPress={onLogin} style={styles.loginBtn}>
        <PublicText style={styles.loginBtnText}>로그인</PublicText>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '80%',
    padding: 30,
    borderRadius: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily,
    borderRadius: 10,
  },
  loginBtn: {
    marginTop: 30,
    padding: 20,
    width: '80%',
    backgroundColor: '#4678B2',
    alignItems: 'center',
    borderRadius: 10,
  },
  loginBtnText: {
    fontSize: 15,
    color: '#fff',
  },
});
