import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { FilterType } from "../types/todo";

interface EmptyStateProps {
  filter?: FilterType;
  hasSearchQuery?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  filter = "all",
  hasSearchQuery = false,
}) => {
  const { theme } = useTheme();

  const getMessage = () => {
    if (hasSearchQuery) {
      return {
        emoji: "🔍",
        title: "No todos found",
        message: "Try adjusting your search query",
      };
    }

    switch (filter) {
      case "active":
        return {
          emoji: "✨",
          title: "No active todos",
          message: "All your todos are completed! Great job!",
        };
      case "completed":
        return {
          emoji: "📝",
          title: "No completed todos",
          message: "Complete a todo to see it here",
        };
      default:
        return {
          emoji: "📋",
          title: "No todos yet",
          message: "Tap the + button to add your first todo",
        };
    }
  };

  const { emoji, title, message } = getMessage();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});

