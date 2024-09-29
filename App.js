import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [inputValue, setInputValue] = useState(''); // For storing user input
  const [count, setCount] = useState(0);           // For tracking the count
  const [maxValue, setMaxValue] = useState(null);   // The max value from input

  const handleInputChange = (text) => {
    // Ensure the user only enters positive integers
    if (/^\d+$/.test(text) || text === '') {
      setInputValue(text);
    }
  };

  const startCounting = () => {
    const value = parseInt(inputValue, 10);
    if (value > 0) {
      setMaxValue(value);
      setCount(0);
    }
  };

  const incrementCount = () => {
    if (count < maxValue) {
      setCount(count + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter your hard limit</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={handleInputChange}
      />
      <Button title="Start Counting" onPress={startCounting} />
      <Text>Count: {count}</Text>
      <Button title="Increment Count" onPress={incrementCount} disabled={count >= maxValue} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    paddingHorizontal: 10,
  },
});