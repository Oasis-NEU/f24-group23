import SessionControls from '@/components/SessionControls';
import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Shot Clock</Text>
        <Text style={styles.subtitle}>Drink Responsibly</Text>
      </View>
      <SessionControls />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 50,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
  },
});
