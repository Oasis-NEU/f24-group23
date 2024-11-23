import { Profile } from '@/app/(tabs)/profile';
import { Session } from '@/app/session';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sessionExists = async () => {
  const sessionKey = await AsyncStorage.getItem('@session');
  return sessionKey !== null;
};

export const loadSession = async () => {
  try {
    const storedData = await AsyncStorage.getItem('@session');
    if (storedData) {
      const data = JSON.parse(storedData);
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

export const saveSession = async (session: Session) => {
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

export const saveProfile = async (profile: Profile) => {
  try {
    await AsyncStorage.setItem('@profile', JSON.stringify(profile));
    console.info('Saved profile data:', { profile });
  } catch (e) {
    console.error('Failed to save profile data:', e);
  }
};

export const loadProfile = async () => {
  try {
    const storedData = await AsyncStorage.getItem('@profile');
    if (storedData) {
      const data = JSON.parse(storedData);
      console.info('Loaded profile data:', data);
      return data;
    } else {
      console.info('No profile data found');
      return null;
    }
  } catch (e) {
    console.error('Failed to load profile data:', e);
  }
};

export const clearStorage = async () => {
  console.warn('CLEARING STORAGE');
  await AsyncStorage.clear();
};
