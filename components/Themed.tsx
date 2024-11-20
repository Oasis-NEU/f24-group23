/**
 * The purpose of these components is to provide a way to style components in a
 * way that allows optionally overriding the theme color. If this is not
 * needed, you can use the default components from "react-native".
 */
import { Text as DefaultText, View as DefaultView } from "react-native";

import { DarkTheme, DefaultTheme, useTheme } from "@react-navigation/native";
import { useColorSchemeWithDefault } from "@/hooks/useColorSchemeWithDefault";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

const getThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof DarkTheme.colors & keyof typeof DefaultTheme.colors
) => {
  const colorScheme = useColorSchemeWithDefault();
  return props[colorScheme] ?? useTheme().colors[colorName];
};

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = getThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = getThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
