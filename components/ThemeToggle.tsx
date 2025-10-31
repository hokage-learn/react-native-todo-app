import React from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { useTheme } from "../context/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { themeMode, toggleTheme, theme } = useTheme();
  const [animatedValue] = React.useState(new Animated.Value(themeMode === "dark" ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: themeMode === "dark" ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [themeMode, animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.primary, theme.colors.secondary],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
      onPress={toggleTheme}
      accessibilityLabel={themeMode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.toggleCircle,
          {
            backgroundColor,
            transform: [{ translateX }],
          },
        ]}
      />
      <Animated.Text
        style={[
          styles.emoji,
          {
            opacity: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        ☀️
      </Animated.Text>
      <Animated.Text
        style={[
          styles.emoji,
          {
            opacity: animatedValue,
          },
        ]}
      >
        🌙
      </Animated.Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,
    position: "relative",
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: "absolute",
    zIndex: 1,
  },
  emoji: {
    fontSize: 16,
    position: "absolute",
    zIndex: 0,
  },
});

