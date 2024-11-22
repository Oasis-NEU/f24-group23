import Stopwatch from '@/components/Stopwatch';
import { View } from '@/components/Themed';
import { loadSession, saveSession } from '@/util/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSearchParams } from 'expo-router/build/hooks';
import { useEffect, useState } from 'react';
import { Button } from 'react-native';

export interface SessionData {
  stopwatchTime: number | null;
}

export default function SessionScreen() {
  const resume = Number(useSearchParams().get('resume'));

  const [alcoholMassConsumed, setAlcoholMassConsumed] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await loadSession();
      // The following is a defensive check.
      // Data should never be null because the user wouldn't be able to click resume if there was no session stored.
      if (!data) return;
      setAlcoholMassConsumed(data.alcoholMassConsumed);
      setTime(data.time);
    };
    if (resume) load();
  }, []);

  // Save sessionData to AsyncStorage whenever anything changes
  useEffect(() => {
    saveSession({ alcoholMassConsumed, time });
  }, [alcoholMassConsumed, time]);

  return (
    <View>
      <Stopwatch time={time} setTime={setTime} />
      <Button title="Drink" onPress={() => setAlcoholMassConsumed((prev) => prev + 1)} />
    </View>
  );
}
