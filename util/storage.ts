import AsyncStorage from '@react-native-async-storage/async-storage';

export const sessionExists = async () => {
  const sessionKey = await AsyncStorage.getItem('@session');
  return sessionKey !== null;
};

export const loadSession = async () => {
  try {
    const storedData = await AsyncStorage.getItem('@session');
    if (storedData) {
      const data = storedData ? JSON.parse(storedData) : null;
      console.info('Loaded session data:', data);
      return data;
    } else {
      console.info('No session data found');
      return null;
    }
  } catch (e) {
    console.error('Failed to load session data:', e);
  }
};

export const saveSession = async (session: any) => {
  try {
    await AsyncStorage.setItem('@session', JSON.stringify(session));
    console.info('Saved session data:', { session });
  } catch (e) {
    console.error('Failed to save session data:', e);
  }
};

export const cancelSession = async () => {
  try {
    await AsyncStorage.removeItem('@session');
    console.info('Cancelled session');
  } catch (e) {
    console.error('Failed to cancel session:', e);
  }
};

export const clearStorage = async () => {
  console.warn('CLEARING STORAGE');
  await AsyncStorage.clear();
};
