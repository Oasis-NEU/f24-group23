/**
 * This allows Text and View components to be defined in a
 * way that allows optionally overriding the theme color.
 */
import { Text as DefaultText, View as DefaultView } from 'react-native';

import { DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';
import { useColorSchemeWithDefault } from '@/hooks/useColorSchemeWithDefault';
import React from 'react';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

const getThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof DarkTheme.colors & keyof typeof DefaultTheme.colors
) => {
  const colorScheme = useColorSchemeWithDefault();
  return props[colorScheme] ?? useTheme().colors[colorName];
};

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = getThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = getThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Picker(props: PickerSelectProps) {
  const theme = useTheme();
  return (
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
          borderColor: props.disabled ? 'gray' : theme.colors.border,
          borderRadius: 8,
          backgroundColor: props.disabled ? '#c0c0c0' : theme.colors.background,
          color: props.disabled ? 'darkgray' : theme.colors.text,
          opacity: props.disabled ? 0.6 : 1,
        },
        placeholder: {
          color: theme.dark ? '#A9A9A9' : '#888888',
          fontSize: 16,
        },
        iconContainer: {
          top: 10,
          right: 12,
        },
      }}
      Icon={() => <Icon name="arrow-drop-down" size={24} color={useTheme().dark ? '#FFFFFF' : '#000000'} />}
      {...props}
    />
  );
}
