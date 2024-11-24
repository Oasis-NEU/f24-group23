import { Picker, Text, View } from '@/components/Themed';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';

import { Gender } from '@/util/alcoholContent';
import { loadProfile, saveProfile } from '@/util/storage';
import { useTheme } from '@react-navigation/native';

export default function ProfileScreen() {
  const [gender, setGender] = useState<Profile['gender']>(null);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  // Weight is in pounds.
  const [weight, setWeight] = useState(0);
  // Hard limit is in standard drinks.
  const [hardLimit, setHardLimit] = useState(0);
  // Cooldown is in seconds.
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data: Profile = await loadProfile();
      if (!data) return;
      setGender(data.gender);
      setHeightFeet(data.heightFeet);
      setHeightInches(data.heightInches);
      setWeight(data.weight);
      setHardLimit(data.hardLimit);
      setCooldown(data.cooldown);
    };
    load();
  }, []);

  useEffect(() => {
    saveProfile({ gender, heightFeet, heightInches, weight, hardLimit, cooldown });
  }, [gender, heightFeet, heightInches, weight, hardLimit, cooldown]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <GenderPicker gender={gender} setGender={setGender} />
        <HeightField
          heightFeet={heightFeet}
          setHeightFeet={setHeightFeet}
          heightInches={heightInches}
          setHeightInches={setHeightInches}
        />
        <WeightField weight={weight} setWeight={setWeight} />
        <HardLimitField hardLimit={hardLimit} setHardLimit={setHardLimit} />
        <CooldownPicker cooldown={cooldown} setCooldown={setCooldown} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const HeightField = ({
  heightFeet,
  setHeightFeet,
  heightInches,
  setHeightInches,
}: {
  heightFeet: number;
  setHeightFeet: (heightFeet: number) => void;
  heightInches: number;
  setHeightInches: (heightInches: number) => void;
}) => {
  const inputStyles = createThemedStyles()['input'];
  return (
    <View>
      <Text style={styles.label}>Height (ft and in)*</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={[inputStyles, { width: '50%' }]}
          onChangeText={(text: string) => setHeightFeet(Number(text))}
          value={heightFeet == 0 ? undefined : heightFeet.toString()}
          placeholder="Enter Feet"
          keyboardType="number-pad"
        />
        <TextInput
          style={[inputStyles, { width: '50%' }]}
          onChangeText={(text: string) => setHeightInches(Number(text))}
          value={heightInches == 0 ? undefined : heightInches.toString()}
          placeholder="Enter Inches"
          keyboardType="number-pad"
        />
      </View>
    </View>
  );
};

const WeightField = ({ weight, setWeight }: { weight: number; setWeight: (weight: number) => void }) => {
  const inputStyles = createThemedStyles()['input'];
  return (
    <View>
      <Text style={styles.label}>Weight (lbs)*</Text>
      <TextInput
        style={inputStyles}
        onChangeText={(text: string) => setWeight(Number(text))}
        value={weight == 0 ? undefined : weight.toString()}
        placeholder="Enter Weight"
        keyboardType="number-pad"
      />
    </View>
  );
};

const HardLimitField = ({
  hardLimit,
  setHardLimit,
}: {
  hardLimit: number;
  setHardLimit: (hardLimit: number) => void;
}) => {
  const inputStyles = createThemedStyles()['input'];
  return (
    <View>
      <Text style={styles.label}>Hard Limit (in standard drinks)</Text>
      <TextInput
        style={inputStyles}
        onChangeText={(text: string) => setHardLimit(Number(text))}
        value={hardLimit == 0 ? undefined : hardLimit.toString()}
        placeholder="Enter Hard Limit"
        keyboardType="number-pad"
      />
    </View>
  );
};

const CooldownPicker = ({ cooldown, setCooldown }: { cooldown: number; setCooldown: (cooldown: number) => void }) => {
  return (
    <View>
      <Text style={styles.label}>Cooldown</Text>
      <Picker
        value={cooldown}
        onValueChange={(value: number) => setCooldown(value)}
        placeholder={{ label: 'Select Cooldown', value: 0 }}
        items={[
          { label: 'None', value: 0 },
          { label: '10 seconds', value: 10 },
          { label: '15 minutes', value: 15 * 60 },
          { label: '30 minutes', value: 30 * 60 },
          { label: '45 minutes', value: 45 * 60 },
          { label: '1 hour', value: 60 * 60 },
          { label: '1 hour 15 minutes', value: 75 * 60 },
          { label: '1 hour 30 minutes', value: 90 * 60 },
          { label: '1 hour 45 minutes', value: 105 * 60 },
          { label: '2 hours', value: 120 * 60 },
        ]}
      />
    </View>
  );
};

const GenderPicker = ({
  gender,
  setGender,
}: {
  gender: Profile['gender'];
  setGender: (gender: Profile['gender']) => void;
}) => {
  return (
    <View>
      <Text style={styles.label}>Gender*</Text>
      <Picker
        value={gender}
        onValueChange={(value: Gender) => setGender(value)}
        placeholder={{ label: 'Enter Gender', value: null }}
        items={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Other', value: 'other' },
        ]}
      />
    </View>
  );
};

const createThemedStyles = () => {
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: useTheme().colors.border,
      borderRadius: 8,
      color: useTheme().colors.text,
      padding: 12,
    },
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    rowGap: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
});

export type Profile = {
  gender: Gender | null;
  heightFeet: number;
  heightInches: number;
  weight: number;
  hardLimit: number;
  cooldown: number;
};

export const profileIncomplete = (profile: Profile) => {
  return profile.gender === null || profile.heightFeet === 0 || profile.heightInches === 0 || profile.weight === 0;
};
