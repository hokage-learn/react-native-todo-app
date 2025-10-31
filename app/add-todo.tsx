import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { TodoForm } from "../components/TodoForm";
import { useCreateTodo } from "../hooks/useTodos";
import { CreateTodoInput } from "../types/todo";
import { showToast } from "../components/Toast";

export default function AddTodoScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const createTodo = useCreateTodo();

  const handleSubmit = async (data: CreateTodoInput) => {
    try {
      await createTodo(data);
      showToast.success("Todo created successfully!");
      router.back();
    } catch (error) {
      console.error("Failed to create todo:", error);
      showToast.error("Failed to create todo", "Please try again");
      throw error; // Re-throw to let TodoForm handle the error
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TodoForm onSubmit={handleSubmit} submitLabel="Add Todo" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
