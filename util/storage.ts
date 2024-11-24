import { Profile } from '@/app/(tabs)/profile';
import { Session } from '@/app/session';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sessionKey = '@session';
const profileKey = '@profile';

export const sessionExists = async () => {
  const session = await AsyncStorage.getItem(sessionKey);
  return session !== null;
};

export const loadSession = async () => {
  try {
    const storedData = await AsyncStorage.getItem(sessionKey);
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
    await AsyncStorage.setItem(sessionKey, JSON.stringify(session));
    console.info('Saved session data:', { session });
  } catch (e) {
    console.error('Failed to save session data:', e);
  }
};

export const deleteSession = async () => {
  try {
    await AsyncStorage.removeItem(sessionKey);
    console.info('Cancelled session');
  } catch (e) {
    console.error('Failed to cancel session:', e);
  }
};

export const saveProfile = async (profile: Profile) => {
  try {
    await AsyncStorage.setItem(profileKey, JSON.stringify(profile));
    console.info('Saved profile data:', { profile });
  } catch (e) {
    console.error('Failed to save profile data:', e);
  }
};

export const loadProfile = async () => {
  try {
    const storedData = await AsyncStorage.getItem(profileKey);
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
