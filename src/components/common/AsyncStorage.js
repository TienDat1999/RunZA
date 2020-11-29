import AsyncStorage from '@react-native-community/async-storage';

export const getData = async (name) => {
  const value = await AsyncStorage.getItem(name);
  if (value != null) {
    const data = JSON.parse(value);
    return data;
  } else {
    return null;
  }
};
export const setData = async (name, value) => {
  const data = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(name, data);
  } catch (e) {
    console.log(e);
  }
};
export const removeData = (name) => {
  AsyncStorage.removeItem(name);
};
