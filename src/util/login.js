export const getToken = async (nameToken) => {
  const value = await AsyncStorage.getItem(nameToken);
  return value;
  // try {
  //   if (value != null) {
  //     setToken(true);
  //   } else {
  //     setToken(false);
  //   }
  // } catch (e) {
  //   console.log(e);
  // }
};
