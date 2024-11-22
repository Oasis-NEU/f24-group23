import { cancelSession, sessionExists } from '@/util/storage';
import { Link } from 'expo-router';
import { forwardRef, useEffect, useState } from 'react';
import { Button, ButtonProps, StyleSheet } from 'react-native';
import { View } from './Themed';

export default function SessionControls() {
  const [sessionExistsState, setSessionExistsState] = useState(false);

  useEffect(() => {
    const updateSessionState = async () => {
      const exists = await sessionExists();
      setSessionExistsState(exists);
    };
    updateSessionState();
  }, []);

  return (
    <View style={styles.container}>
      <Link href={{ pathname: '/session', params: { resume: 0 } }} asChild>
        <SessionButton
          title="Start New Session"
          onPress={() => {
            setSessionExistsState(true);
          }}
        />
      </Link>
      <Link href={{ pathname: '/session', params: { resume: 1 } }} asChild>
        <SessionButton title="Resume Session" onPress={() => {}} disabled={!sessionExistsState} />
      </Link>
      <SessionButton
        title="Cancel Session"
        onPress={() => {
          cancelSession();
          setSessionExistsState(false);
        }}
        disabled={!sessionExistsState}
      />
    </View>
  );
}

const SessionButton = forwardRef(({ title, onPress, disabled }: ButtonProps, ref) => {
  return (
    <View style={styles.container}>
      <Button title={title} onPress={onPress} disabled={disabled} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});
