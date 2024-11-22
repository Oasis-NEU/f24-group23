import { StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { useState } from 'react';
import { Text, View } from '@/components/Themed';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';

export default function ProfileScreen() {
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const { colors } = useTheme();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.itemAlign}>
        <View style={styles.container}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Height</Text>
            <View style={styles.heightContainer}>
              <View style={styles.heightInput}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={feet}
                  onChangeText={setFeet}
                  placeholder="Feet"
                  placeholderTextColor={colors.text + '80'}
                  keyboardType="numeric"
                />
                <Text>ft</Text>
              </View>
              <View style={styles.heightInput}>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={inches}
                  onChangeText={setInches}
                  placeholder="Inches"
                  placeholderTextColor={colors.text + '80'}
                  keyboardType="numeric"
                />
                <Text>in</Text>
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Weight (lbs)</Text>
            <TextInput
              style={[styles.input, { color: colors.text }]}
              value={weight}
              onChangeText={setWeight}
              placeholder="Weight"
              placeholderTextColor={colors.text + '80'}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={[styles.pickerContainer, { borderColor: colors.border }]}>
              {Platform.OS === 'ios' ? (
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={[styles.picker, { color: colors.text }]}
                >
                  <Picker.Item label="Select gender" value="" color={colors.text} />
                  <Picker.Item label="Male" value="male" color={colors.text} />
                  <Picker.Item label="Female" value="female" color={colors.text} />
                  <Picker.Item label="Non-binary" value="non-binary" color={colors.text} />
                  <Picker.Item label="Prefer not to say" value="prefer-not-to-say" color={colors.text} />
                </Picker>
              ) : (
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  style={[styles.picker, { color: colors.text }]}
                  dropdownIconColor={colors.text}
                >
                  <Picker.Item label="Select gender" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Non-binary" value="non-binary" />
                  <Picker.Item label="Prefer not to say" value="prefer-not-to-say" />
                </Picker>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 500,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    flex: 1,
    minHeight: 45,
  },
  heightContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  heightInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: Platform.OS === 'ios' ? 150 : 45,
  },
  itemAlign: {
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
});