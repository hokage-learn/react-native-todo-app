import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { TodoForm } from "../../components/TodoForm";
import { useUpdateTodo } from "../../hooks/useTodos";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { UpdateTodoInput } from "../../types/todo";
import { Id } from "convex/values";

export default function EditTodoScreen() {
  const { theme } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const updateTodo = useUpdateTodo();

  const todo = useQuery(api.getTodo.getTodo, { id: id as Id<"todos"> });

  const handleSubmit = async (data: UpdateTodoInput) => {
    try {
      await updateTodo({
        id: id as Id<"todos">,
        ...data,
      });
      router.back();
    } catch (error) {
      console.error("Failed to update todo:", error);
      throw error; // Re-throw to let TodoForm handle the error
    }
  };

  if (todo === undefined) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (todo === null) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.error }}>Todo not found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TodoForm onSubmit={handleSubmit} initialData={todo} submitLabel="Update Todo" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
