import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "../..//context/ThemeContext";

export default function EditTodoScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text }}>Edit Todo Screen - ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

