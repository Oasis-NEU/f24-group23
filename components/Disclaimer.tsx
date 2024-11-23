import React from 'react';
import { Text, TextProps, View } from './Themed';

export default function Disclaimer({ style }: TextProps) {
  return (
    <View>
      <Text style={style}>
        Always keep in mind, the BAC and BrAC calculations are estimates! A major factor that can affect the accuracy of
        the results is the alcohol metabolization rate. This number can vary among people due to genetics, age, gender,
        alcohol tolerance, whether you have eaten food, and other factors. This program uses a reasonable estimate of
        0.015 g/100mL/hour. It also assumes that 100% of consumed alcohol is absorbed instantly, which, considering the
        same aforementioned factors, is not always accurate. The results should be an overestimate which, in ensuring
        safety, is preferable to an underestimate.
      </Text>
      <Text style={style}></Text>
    </View>
  );
}
