import { calculateBloodAlcoholContent } from '@/util/alcoholContent';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import getBacZone from '@/util/bloodAlcoholZones';

export default function BACMonitor({ alcoholMassConsumed, time }: { alcoholMassConsumed: number; time: number }) {
  const timeHours = time / 3600;
  const bloodAlcoholContent = calculateBloodAlcoholContent('male', alcoholMassConsumed, 100, 2, timeHours);

  const BacZone = getBacZone(bloodAlcoholContent);

  return (
    <View style={[styles.container, { backgroundColor: BacZone?.color }]}>
      <Text style={styles.BigText}>{BacZone?.name}</Text>
      <Text style={styles.text}>BAC: {bloodAlcoholContent.toFixed(3)}%</Text>
      <Text style={styles.text}>{BacZone?.description}</Text>
      {bloodAlcoholContent > 0.08 && <Text style={styles.SubText}>You will fail a breathalyzer test.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    width: 1000,
    borderRadius: 10
  },
  text: {
    fontSize: 20
  },
  BigText: {
    fontWeight: 'bold',
    fontSize: 30
  },
  SubText: {
    fontWeight: 'bold',
    fontSize: 20
  }
});
