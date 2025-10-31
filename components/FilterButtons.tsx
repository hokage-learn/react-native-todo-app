import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { FilterType } from "../types/todo";
import { Todo } from "../types/todo";

interface FilterButtonsProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  todos?: Todo[];
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter, todos = [] }) => {
  const { theme } = useTheme();

  // Calculate counts for each filter
  const counts = {
    all: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };

  const filters: { label: string; value: FilterType; count: number }[] = [
    { label: "All", value: "all", count: counts.all },
    { label: "Active", value: "active", count: counts.active },
    { label: "Completed", value: "completed", count: counts.completed },
  ];

  return (
    <View style={styles.container}>
      {filters.map(({ label, value, count }) => {
        const isActive = filter === value;
        return (
          <TouchableOpacity
            key={value}
            style={[
              styles.button,
              {
                backgroundColor: isActive ? theme.colors.primary : theme.colors.surface,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => setFilter(value)}
            accessibilityLabel={`Filter by ${label.toLowerCase()}, ${count} items`}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: isActive ? "#FFFFFF" : theme.colors.text,
                  fontWeight: isActive ? "600" : "400",
                },
              ]}
            >
              {label} ({count})
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
  },
});

