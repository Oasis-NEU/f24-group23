import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HealthInfoForm = () => {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = () => {
    console.log('Submitting:', { heightFeet, heightInches, weight, gender });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.title}>Health Information</Text>
        <View style={styles.formContainer}>
          <View style={styles.heightContainer}>
            <TextInput
              style={[styles.input, styles.heightInput]}
              placeholder="Feet"
              value={heightFeet}
              onChangeText={setHeightFeet}
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.heightInput]}
              placeholder="Inches"
              value={heightInches}
              onChangeText={setHeightInches}
              keyboardType="numeric"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <View style={{ width: '100%' }}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={{ width: '100%' }}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Non-binary" value="non-binary" />
              <Picker.Item label="Prefer not to say" value="not-specified" />
            </Picker>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  formWrapper: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  heightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  heightInput: {
    width: '48%',
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
  },
  picker: {
    height: 40,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default HealthInfoForm;
