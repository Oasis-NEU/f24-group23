import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

export default function AboutButton(props: { color: string }) {
  return (
    <Link href="/about" asChild>
      <Pressable>
        {({ pressed }) => (
          <MaterialIcons
            name="info-outline"
            size={25}
            color={props.color}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );
}
