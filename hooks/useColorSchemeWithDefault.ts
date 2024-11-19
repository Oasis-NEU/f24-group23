import { useColorScheme } from "react-native";

/**
 * This just wraps useColorScheme() to have a default value of "light" so we don't need any null
 * checks.
 */
export function useColorSchemeWithDefault() {
  return useColorScheme() ?? "light";
}
