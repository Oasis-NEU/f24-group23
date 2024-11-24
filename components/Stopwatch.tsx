import { useEffect } from 'react';
import { Text, View } from './Themed';

export default function Stopwatch({ time, setTime }: { time: number; setTime: (time: number) => void }) {
  useEffect(() => {
    const startTime = Date.now() - time * 1000;

    const intervalId = setInterval(() => {
      const now = Date.now();
      setTime(Math.floor((now - startTime) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [setTime, time]);

  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontSize: 28 }}>Drinking Duration:</Text>
      <Text
        style={{
          fontSize: 28,
          width: 125,
          textAlign: 'center',
        }}
      >
        {formatTime(time)}
      </Text>
    </View>
  );
}

/**
 * @returns Time formatted as HH:mm:ss
 */
export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formatTimeUnit = (unit: number) => unit.toString().padStart(2, '0');
  return `${formatTimeUnit(hours)}:${formatTimeUnit(minutes)}:${formatTimeUnit(seconds % 60)}`;
};
