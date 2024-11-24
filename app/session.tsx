import BACMonitor from '@/components/BACMonitor';
import { StyleSheet, Pressable, Text } from 'react-native';
import Stopwatch from '@/components/Stopwatch';
import { View } from '@/components/Themed';
import { loadSession, saveSession } from '@/util/storage';
import { useSearchParams } from 'expo-router/build/hooks';
import { useEffect, useState } from 'react';
import { Profile } from './(tabs)/profile';
import DrinkSelector from '@/components/DrinkSelector';

export interface SessionData {
  stopwatchTime: number | null;
}

export default function SessionScreen() {
  const resume = Number(useSearchParams().get('resume'));
  const freshProfile = JSON.parse(useSearchParams().get('profile') as string);

  const [alcoholMassConsumed, setAlcoholMassConsumed] = useState(0);
  const [time, setTime] = useState(0);
  // If we are resuming, the hope is this will immediately be overwritten with the saved profile as the "freshprofile" will be {}.
  const [profile, setProfile] = useState<Profile>(freshProfile);

  useEffect(() => {
    const load = async () => {
      const data: Session = await loadSession();
      // The following is a defensive check.
      // Data should never be null because the user wouldn't be able to click resume if there was no session stored.
      if (!data) return;
      setAlcoholMassConsumed(data.alcoholMassConsumed);
      setTime(data.time);
      setProfile(data.sessionProfile);
    };
    if (resume) load();
  }, []);

  // Save sessionData to AsyncStorage whenever anything changes
  useEffect(() => {
    saveSession({ alcoholMassConsumed, time, sessionProfile: profile });
  }, [alcoholMassConsumed, time]);

  return (
    <View style={styles.container}>
      <Stopwatch time={time} setTime={setTime} />
      <BACMonitor alcoholMassConsumed={alcoholMassConsumed} time={time} profile={profile} />
      <DrinkSelector setAlcoholMassConsumed={setAlcoholMassConsumed} profile={profile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    gap: 20,
    alignItems: 'center',
  },
  component: {
    marginBottom: 20,
  },
});

type Cooldown = {
  startTime: number;
  endTime: number;
};

export type Session = {
  alcoholMassConsumed: number;
  time: number;
  sessionProfile: Profile;
};
