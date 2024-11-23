import { Text, View } from '@/components/Themed';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { useColorSchemeWithDefault } from '@/hooks/useColorSchemeWithDefault';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Gender } from '@/util/alcoholContent';
import { loadProfile, saveProfile } from '@/util/storage';

export default function ProfileScreen() {
  const [gender, setGender] = useState<Profile['gender']>(null);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInches, setHeightInches] = useState(0);
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data: Profile = await loadProfile();
      if (!data) return;
      setGender(data.gender);
      setHeightFeet(data.heightFeet);
      setHeightInches(data.heightInches);
      setWeight(data.weight);
    };
    load();
  }, []);

  useEffect(() => {
    saveProfile({ gender, heightFeet, heightInches, weight });
  }, [gender, heightFeet, heightInches, weight]);

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
      </View>
    </TouchableWithoutFeedback>
  );
}

export const HeightField = ({
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
      <Text style={styles.label}>Height (ft and in)</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={[inputStyles, { width: '50%' }]}
          onChangeText={(text: string) => setHeightFeet(Number(text))}
          value={heightFeet == 0 ? undefined : heightFeet.toString()}
          placeholder="Feet"
          keyboardType="number-pad"
        />
        <TextInput
          style={[inputStyles, { width: '50%' }]}
          onChangeText={(text: string) => setHeightInches(Number(text))}
          value={heightInches == 0 ? undefined : heightInches.toString()}
          placeholder="Inches"
          keyboardType="number-pad"
        />
      </View>
    </View>
  );
};

export const WeightField = ({ weight, setWeight }: { weight: number; setWeight: (weight: number) => void }) => {
  const inputStyles = createThemedStyles()['input'];
  return (
    <View>
      <Text style={styles.label}>Weight (lbs)</Text>
      <TextInput
        style={inputStyles}
        onChangeText={(text: string) => setWeight(Number(text))}
        value={weight == 0 ? undefined : weight.toString()}
        placeholder="Weight"
        keyboardType="number-pad"
      />
    </View>
  );
};

export const GenderPicker = ({
  gender,
  setGender,
}: {
  gender: Profile['gender'];
  setGender: (gender: Profile['gender']) => void;
}) => {
  return (
    <View>
      <Text style={styles.label}>Gender</Text>
      <RNPickerSelect
        darkTheme={useColorSchemeWithDefault() === 'dark'}
        style={{
          inputIOSContainer: { pointerEvents: 'none' },
          inputIOS: {
            width: '100%',
            textAlign: 'center',
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: useTheme().colors.border,
            borderRadius: 8,
            backgroundColor: useTheme().colors.background,
            color: useTheme().colors.text,
          },
          placeholder: {
            color: useTheme().dark ? '#A9A9A9' : '#888888',
            fontSize: 16,
          },
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        onValueChange={(value: Gender) => setGender(value)}
        value={gender}
        placeholder={{ label: 'Enter Gender', value: null }}
        items={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Other', value: 'other' },
        ]}
        Icon={() => <Icon name="arrow-drop-down" size={24} color={useTheme().dark ? '#FFFFFF' : '#000000'} />}
      />
    </View>
  );
};

const createThemedStyles = () => {
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: useTheme().colors.border,
      borderRadius: 4,
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
};

export const profileIncomplete = (profile: Profile) => {
  return profile.gender === null || profile.heightFeet === 0 || profile.heightInches === 0 || profile.weight === 0;
};
