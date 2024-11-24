import BACMonitor from '@/components/BACMonitor';
import DrinkSelector from '@/components/DrinkSelector';
import Stopwatch from '@/components/Stopwatch';
import { Text, View } from '@/components/Themed';
import { loadSession, saveSession } from '@/util/storage';
import { useSearchParams } from 'expo-router/build/hooks';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Profile } from './(tabs)/profile';

export default function SessionScreen() {
  const resume = Number(useSearchParams().get('resume'));
  const freshProfile = JSON.parse(useSearchParams().get('profile') as string);

  const [alcoholMassConsumed, setAlcoholMassConsumed] = useState(0);
  const [time, setTime] = useState(0);
  // If we are resuming, the hope is this will immediately be overwritten with the saved profile and the "freshprofile" will be {}.
  const [profile, setProfile] = useState<Profile>(freshProfile);
  const hardLimitExists = profile.hardLimit !== 0;

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

  const makeCall = () => {
    // const args = {
    //   number: '6173733333', // Replace with the desired phone number
    //   prompt: true, // Optional: Show the prompt before calling
    // };
    // call(args).catch(console.error); // Call the number
  };

  return (
    <View style={styles.container}>
      <Stopwatch time={time} setTime={setTime} />
      <BACMonitor
        alcoholMassConsumed={alcoholMassConsumed}
        time={time}
        profile={profile}
        hardLimitExists={hardLimitExists}
      />
      <DrinkSelector
        setAlcoholMassConsumed={setAlcoholMassConsumed}
        time={time}
        profile={profile}
        hardLimitExists={hardLimitExists}
      />
      <Pressable onPress={makeCall} style={styles.callButton}>
        <Text style={styles.callButtonText}>Call Northeastern Police Department</Text>
      </Pressable>
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
  callButton: {
    backgroundColor: '#8B0000',
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
  },
  callButtonText: {
    color: 'white',
    textAlign: 'center',
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export type Session = {
  alcoholMassConsumed: number;
  time: number;
  sessionProfile: Profile;
};
