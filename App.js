import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import healthInfo from './health_info';

export default function App() {
  const [inputValue, setInputValue] = useState(''); // For storing user input
  const [count, setCount] = useState(0);           // For tracking the count
  const [maxValue, setMaxValue] = useState(null);   // The max value from input

  // Add a new state variable for health info
  const [healthData, setHealthData] = useState(null);

  useEffect(() => {
    // Load health data when the component mounts
    setHealthData(healthInfo);
  }, []);

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

  useEffect(() => {
    if (count === maxValue && maxValue !== null) {
      Alert.alert('Limit Reached', `The count has reached the maximum value of ${maxValue}.`);
    }
  }, [count, maxValue]);


  return (
    <View style={styles.container}>
      {/* Add health info bar */}
      {healthData && (
        <View style={styles.healthBar}>
          <Text style={styles.healthText}>Health Info:</Text>
          <Text>Height: {healthData.height} cm</Text>
          <Text>Weight: {healthData.weight} kg</Text>
          <Text>Gender: {healthData.gender}</Text>
        </View>
      )}

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
  healthBar: {
    backgroundColor: '#e6f3ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
  },
  healthText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});