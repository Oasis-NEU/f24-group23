import { Text, View } from '@/components/Themed';
import React, { useState } from 'react';
import { Keyboard, Platform, StyleSheet, TextInput, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { useTheme } from '@react-navigation/native';
import { useColorSchemeWithDefault } from '@/hooks/useColorSchemeWithDefault';

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
    <GenderPicker />
    // <TouchableWithoutFeedback onPress={dismissKeyboard}>
    //   <View style={styles.itemAlign}>
    //     <View style={styles.container}>
    //       <View style={styles.formGroup}>
    //         <Text style={styles.label}>Height</Text>
    //         <View style={styles.heightContainer}>
    //           <View style={styles.heightInput}>
    //             <TextInput
    //               style={[styles.input, { color: colors.text }]}
    //               value={feet}
    //               onChangeText={setFeet}
    //               placeholder="Feet"
    //               keyboardType="numeric"
    //             />
    //             <Text>ft</Text>
    //           </View>
    //           <View style={styles.heightInput}>
    //             <TextInput
    //               style={[styles.input, { color: colors.text }]}
    //               value={inches}
    //               onChangeText={setInches}
    //               placeholder="Inches"
    //               keyboardType="numeric"
    //             />
    //             <Text>in</Text>
    //           </View>
    //         </View>
    //       </View>

    //       <View style={styles.formGroup}>
    //         <Text style={styles.label}>Weight (lbs)</Text>
    //         <TextInput
    //           style={[styles.input, { color: colors.text }]}
    //           value={weight}
    //           onChangeText={setWeight}
    //           placeholder="Weight"
    //           placeholderTextColor={colors.text + '80'}
    //           keyboardType="numeric"
    //         />
    //       </View>
    //       <View style={styles.formGroup}>
    //         <Text style={styles.label}>Gender</Text>
    //         <GenderPicker />
    //       </View>
    //     </View>
    //   </View>
    // </TouchableWithoutFeedback>
  );
}
export const GenderPicker = () => {
  return (
    <RNPickerSelect
      darkTheme={useColorSchemeWithDefault() === 'dark'}
      style={{
        inputIOSContainer: { pointerEvents: 'none' },
      }}
      onValueChange={(value: number) => console.log(value)}
      placeholder={{ label: 'Enter Gender', value: null }}
      items={[
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
      ]}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
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
