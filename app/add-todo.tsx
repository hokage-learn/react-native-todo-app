import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function AddTodoScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text }}>Add Todo Screen - Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

