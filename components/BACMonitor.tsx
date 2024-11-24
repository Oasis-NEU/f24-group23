import { Gender, calculateBloodAlcoholContent, calculateNumberOfDrinks } from '@/util/alcoholContent';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import getBacZone from '@/util/bloodAlcoholZones';
import { Profile } from '@/app/(tabs)/profile';

type BACMonitorProps = {
  alcoholMassConsumed: number;
  time: number;
  profile: Profile;
  hardLimitExists: boolean;
};

export default function BACMonitor({ alcoholMassConsumed, time, profile, hardLimitExists }: BACMonitorProps) {
  const timeHours = time / 3600;
  const heightMeters = (profile.heightFeet * 12 + profile.heightInches) * 0.0254;
  const weightKg = profile.weight * 0.453592;
  const bloodAlcoholContent = calculateBloodAlcoholContent(
    profile.gender as Gender,
    alcoholMassConsumed,
    weightKg,
    heightMeters,
    timeHours
  );
  const numberOfDrinks = calculateNumberOfDrinks(alcoholMassConsumed);
  const warningStyle = hardLimitExists && numberOfDrinks >= profile.hardLimit ? { color: 'red' } : {};

  const BacZone = getBacZone(bloodAlcoholContent);

  return (
    <View style={[styles.container, { backgroundColor: BacZone?.color }]}>
      <Text style={styles.title}>{BacZone?.name}</Text>
      <Text style={styles.text}>BAC: {bloodAlcoholContent.toFixed(3)}%</Text>
      <Text style={[styles.text, warningStyle]}>
        {numberOfDrinks.toFixed(1)} standard drinks {hardLimitExists ? `(Hard limit: ${profile.hardLimit})` : ''}
      </Text>
      <Text style={styles.text}>{BacZone?.description}</Text>
      {bloodAlcoholContent > 0.08 && (
        <Text style={[styles.text, { fontWeight: 'bold' }]}>You will fail a breathalyzer test.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    width: '100%',
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
  },
});
