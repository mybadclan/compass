import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Animated, Easing } from "react-native";

import { CompassDirection, useCompass } from "./hooks/useCompass";
import { useDirection } from "./hooks/useDirection";
import { Show } from "./components/Show";

import smartphone from "./assets/smartphone.png";
import { useEffect } from "react";

const rotate = new Animated.Value(0);

const spin = rotate.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "90deg"],
});

export default function App() {
  const { direction, degree } = useCompass();
  const screen = useDirection();

  useEffect(() => {
    Animated.timing(rotate, {
      toValue: screen === "portrait" ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, [screen]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Show when={screen !== "none"} fallback={null}>
        <Animated.Image
          style={[
            styles.smartphone,
            {
              transform: [{ rotate: spin }],
            },
          ]}
          source={smartphone}
        />
      </Show>

      <Text style={styles.direction}>{direction}</Text>
      <Text style={styles.angle}>{CompassDirection[direction]}</Text>
      <Text style={styles.angle}>{degree}º</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },

  smartphone: {
    position: "absolute",
    top: 0,
    right: 20,

    width: 40,
    resizeMode: "contain",
  },

  direction: {
    fontSize: 150,
    color: "#505050",
  },

  angle: {
    fontSize: 15,
    color: "#505050",
  },
});
