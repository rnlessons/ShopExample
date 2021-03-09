import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    // saving error
  }
};

export const getToken = async (token) => {
  try {
    const value = await AsyncStorage.getItem('token');
    return value || null;
  } catch (e) {
    // error reading value
  }
};

export const setUser = async (user) => {
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
