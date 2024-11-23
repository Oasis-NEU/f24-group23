import { useEffect } from 'react';
import { Text, View } from './Themed';
import { StyleSheet } from 'react-native';

export default function Stopwatch({ time, setTime }: { time: number; setTime: (time: number) => void }) {
  useEffect(() => {
    const startTime = Date.now() - time * 1000; // Convert seconds to ms

    const intervalId = setInterval(() => {
      const now = Date.now();
      setTime(Math.floor((now - startTime) / 1000)); // Update time every second
    }, 1000);

    return () => clearInterval(intervalId); // Clear interval when component unmounts
  }, [setTime, time]); // Dependency on `time` ensures the interval is recalculated

  // Format time as HH:mm:ss
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formatTimeUnit = (unit: number) => unit.toString().padStart(2, '0');
    return `${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds % 60)}`;
  };

  return (
    <View>
      <Text style={styles.text}>Elapsed Time: {formatTime(time)}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
})
