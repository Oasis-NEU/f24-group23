import { StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen() {
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

  return (
    <View style={styles.itemAlign}>
      <View style={styles.container}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Height</Text>
          <View style={styles.heightContainer}>
            <View style={styles.heightInput}>
              <TextInput
                style={styles.unitText}
                value={feet}
                onChangeText={setFeet}
                placeholder="Feet"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
              <Text style={styles.unitText}>ft</Text>
            </View>
            <View style={styles.heightInput}>
              <TextInput
                style={styles.unitText}
                value={inches}
                onChangeText={setInches}
                placeholder="Inches"
                placeholderTextColor="#666"
                keyboardType="numeric"
              />
              <Text style={styles.unitText}>in</Text>
            </View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Weight (lbs)</Text>
          <TextInput
            style={styles.unitText}
            value={weight}
            onChangeText={setWeight}
            placeholder="Weight"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Gender</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(value) => setGender(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Non-binary" value="non-binary" />
            <Picker.Item label="Prefer not to say" value="prefer not to say" />
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    maxWidth: 500
  },
  formGroup: {
    marginBottom: 70,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    color: 'white',
  },
  heightContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 10
  },
  heightInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  unitText: {
    color: 'white',
  },
  itemAlign: {
    alignItems: 'center'
  }
});
