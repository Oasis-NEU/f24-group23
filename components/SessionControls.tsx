import { cancelSession as deleteSession, sessionExists } from '@/util/storage';
import { Link, router } from 'expo-router';
import { forwardRef, useEffect, useState } from 'react';
import { Alert, Button, ButtonProps, StyleSheet } from 'react-native';
import { View } from './Themed';
import Dialog from 'react-native-dialog';

export default function SessionControls() {
  const [sessionExistsState, setSessionExistsState] = useState(false);
  const [dialogVisible, setDialogueVisible] = useState(false);
  const [sessionLimits, setSessionLimits] = useState({});

  useEffect(() => {
    const updateSessionState = async () => {
      const exists = await sessionExists();
      setSessionExistsState(exists);
    };
    updateSessionState();
  }, []);

  const startSession = (resume: 0 | 1) => {
    router.push(`/session?resume=${resume}`);
  };

  const showDialog = () => {
    setDialogueVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Start New Session"
          onPress={() => {
            setSessionExistsState(true);
            startSession(0);
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Resume Session"
          onPress={() => {
            startSession(1);
          }}
          disabled={!sessionExistsState}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Cancel Session"
          onPress={() => {
            Alert.alert(
              'Cancel last session',
              'Are you sure you want to clear your last session?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => {
                    deleteSession();
                    setSessionExistsState(false);
                  },
                },
              ],
              { cancelable: true }
            );
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
    alignContent: 'center'
  },
  button: {
    margin: 10
  }
});
