import { act, useRef, useState } from 'react';
import { Picker, View, Text } from './Themed';
import { Alert, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { calculateAlcoholMassConsumed, calculateNumberOfDrinks } from '@/util/alcoholContent';
import { Profile } from '@/app/(tabs)/profile';
import { formatTime } from './Stopwatch';

export default function DrinkSelector({
  setAlcoholMassConsumed,
  profile,
  time,
  hardLimitExists,
}: {
  setAlcoholMassConsumed: (updater: (prevState: number) => number) => void;
  profile: Profile;
  time: number;
  hardLimitExists: boolean;
}) {
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const [selectedDrinkSize, setSelectedDrinkSize] = useState<string | null>(null);
  const [hardLimitReached, setHardLimitReached] = useState(false);
  const lastDrinkTime = useRef(0);
  const activeCooldown = lastDrinkTime.current !== 0 ? time <= lastDrinkTime.current + profile.cooldown : false;
  const disableAddDrinkButton = !selectedDrink || !selectedDrinkSize || hardLimitReached || activeCooldown;
  const ozToMilliliters = (oz: number) => oz * 29.5735;
  const { colors } = useTheme();

  const addDrink = () => {
    const getFluidQuantityMilliliters = () => {
      if (selectedDrinkSize === null) return 0;
      else return ozToMilliliters(parseFloat((selectedDrinkSize.match(/\d+(\.\d+)?/) as RegExpMatchArray)[0]));
    };
    setAlcoholMassConsumed((prevAlcoholMassConsumed) => {
      const newAlcoholMassConsumed =
        prevAlcoholMassConsumed +
        calculateAlcoholMassConsumed(
          (drinkData.find((drink) => drink.name === selectedDrink)?.abv ?? 0) / 100,
          getFluidQuantityMilliliters()
        );
      if (hardLimitExists && calculateNumberOfDrinks(newAlcoholMassConsumed) >= profile.hardLimit) {
        setHardLimitReached(true);

        Alert.alert('Hard Limit Reached', 'You have reached your hard limit. You are done drinking.');
      }
      // If the configured cooldown is 0, there is no cooldown.
      if (profile.cooldown > 0) lastDrinkTime.current = time;
      return newAlcoholMassConsumed;
    });
  };

  return (
    <View style={{ width: '100%', gap: 10, paddingHorizontal: 10 }}>
      <Picker
        value={selectedDrink}
        onValueChange={(value) => setSelectedDrink(value)}
        placeholder={{ label: 'Select Drink', value: null }}
        items={drinkData.map((drink) => {
          return {
            label: drink.name,
            value: drink.name,
          };
        })}
      ></Picker>
      <Picker
        disabled={!selectedDrink}
        value={selectedDrinkSize}
        onValueChange={(value) => setSelectedDrinkSize(value)}
        placeholder={{ label: 'Select Size', value: null }}
        items={
          drinkData
            .find((drink) => drink.name === selectedDrink)
            ?.sizes.map((size) => {
              return {
                label: size,
                value: size,
              };
            }) ?? []
        }
      ></Picker>
      <Pressable
        disabled={disableAddDrinkButton}
        style={({ pressed }) => [
          {
            backgroundColor: disableAddDrinkButton ? '#c0c0c0' : colors.border,
            opacity: disableAddDrinkButton ? 0.6 : 1,
            padding: 10,
            borderRadius: 8,
            width: '100%',
          },
          pressed && { opacity: 0.7 },
        ]}
        onPress={addDrink}
      >
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Add Drink</Text>
      </Pressable>
      {activeCooldown && (
        <Text style={{ fontSize: 24, textAlign: 'center' }}>
          Cooldown: {formatTime(lastDrinkTime.current + profile.cooldown - time)}
        </Text>
      )}
    </View>
  );
}

const drinkData = [
  { name: '80 Proof Liquor', abv: 40, sizes: ['1 oz shot', '1.5 oz shot', '2 oz shot'] },
  { name: '100 Proof Liquor', abv: 50, sizes: ['1 oz shot', '1.5 oz shot', '2 oz shot'] },
  { name: 'Beer', abv: 4.2, sizes: ['7 oz bottle', '8 oz can', '12 oz can/bottle', '16 oz can'] },

  { name: 'High Noon', abv: 4.5, sizes: ['12 oz can'] },
  { name: 'White Claw', abv: 5, sizes: ['12 oz can'] },
  { name: "Mike's Hard Lemonade", abv: 5, sizes: ['11.2 oz bottle', '12 oz can', '23.5 oz can'] },
  { name: 'Twisted Tea', abv: 5, sizes: ['12 oz can/bottle', '24 oz can'] },

  { name: 'Red Wine', abv: 13.5, sizes: ['5 oz glass'] },
  { name: 'White Wine', abv: 10, sizes: ['5 oz glass'] },
  { name: 'Sake', abv: 15, sizes: ['6 oz 1-go bottle'] },
  { name: 'Soju', abv: 20, sizes: ['12.86 oz bottle', '6.43 oz half-bottle'] },
];
