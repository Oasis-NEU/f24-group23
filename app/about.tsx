import { StatusBar } from "expo-status-bar";
import { Dimensions, Platform, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import Disclaimer from "@/components/Disclaimer";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shot Clock</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text style={styles.paragraph}>
        Welcome to shot clock. This is an app made for Oasis.
      </Text>
      <Disclaimer style={styles.paragraph} />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraph: {
    marginHorizontal: Dimensions.get("window").width * 0.05,
    fontSize: 16,
    textAlign: "justify",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
