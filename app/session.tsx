import BACMonitor from '@/components/BACMonitor';
import { StyleSheet, Pressable, Text } from 'react-native';
import Stopwatch from '@/components/Stopwatch';
import { View } from '@/components/Themed';
import { loadSession, saveSession } from '@/util/storage';
import { useSearchParams } from 'expo-router/build/hooks';
import { useEffect, useState } from 'react';

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
    <View style={styles.entireContainer}>
      <View style={styles.container}>
        <Stopwatch time={time} setTime={setTime} />
        <BACMonitor alcoholMassConsumed={alcoholMassConsumed} time={time} />
        <Pressable
          style={styles.button}
          onPress={() => setAlcoholMassConsumed((prev) => prev + 1)}
        >
          <Text style={styles.buttonText}>Drink</Text>
        </Pressable>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    gap: 30,
    maxWidth: 'auto',
    alignItems: 'center',
    fontSize: 35,
    fontWeight: 'bold'
  },
  entireContainer: {
    alignItems: 'center'
  },
  component: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 5,
    width: '100%'
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
