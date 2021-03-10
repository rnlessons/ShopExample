import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    // saving error
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    return value || null;
  } catch (e) {
    // error reading value
  }
};

export const setUser = async (user) => {
  // {
  //     "id": 1,
  //     "name": "홍길동",
  //     "email": "hgd_test@gmail.com",
  //     "password": "BBTeVSBNb1zYJCFhmC0RXxCkiWE=",
  //     "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/posterjob/128.jpg",
  //     "lastestLoginAt": null,
  //     "createdAt": "2021-03-01T14:44:22.135Z",
  //     "updatedAt": null
  // }
  //   '{ \"id\": 1, \"name\": \"홍길동\"}'
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    // saving error
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
