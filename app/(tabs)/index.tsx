import SessionControls from '@/components/SessionControls';
import { Text, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shot Clock</Text>
      <SessionControls />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 100,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
});
