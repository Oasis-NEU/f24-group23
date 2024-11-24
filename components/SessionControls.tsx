import { deleteSession, loadProfile, sessionExists } from '@/util/storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import { View } from './Themed';
import { profileIncomplete } from '@/app/(tabs)/profile';

export default function SessionControls() {
  const [sessionExistsState, setSessionExistsState] = useState(false);

  useEffect(() => {
    const updateSessionState = async () => {
      const exists = await sessionExists();
      setSessionExistsState(exists);
    };
    updateSessionState();
  }, []);

  const startSession = (resume: 0 | 1, profile: string) => {
    router.push(`/session?resume=${resume}&profile=${profile}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Start New Session"
          onPress={() => {
            const start = async () => {
              const profile = await loadProfile();
              if (profileIncomplete(profile)) {
                Alert.alert('Profile Incomplete', 'Please fill out your profile before starting a session.', [
                  { text: 'Go to Profile', style: 'cancel', onPress: () => router.push('/profile') },
                ]);
                return;
              } else {
                setSessionExistsState(true);
                startSession(0, JSON.stringify(profile));
              }
            };
            start();
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Resume Previous Session" onPress={() => startSession(1, '{}')} disabled={!sessionExistsState} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Delete Previous Session"
          onPress={() => {
            Alert.alert('Cancel last session', 'Are you sure you want to clear your last session?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                  deleteSession();
                  setSessionExistsState(false);
                },
              },
            ]);
          }}
          disabled={!sessionExistsState}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    alignContent: 'center',
  },
  buttonContainer: {
    margin: 10,
  },
});
