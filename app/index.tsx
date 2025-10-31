import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { useTodos, useToggleComplete, useDeleteTodo, useReorderTodos } from "../hooks/useTodos";
import { Todo } from "../types/todo";
import { FilterType } from "../types/todo";
import { ThemeToggle } from "../components/ThemeToggle";
import { TodoItem } from "../components/TodoItem";
import { SearchBar } from "../components/SearchBar";
import { FilterButtons } from "../components/FilterButtons";
import { EmptyState } from "../components/EmptyState";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const todos = useTodos();
  const toggleComplete = useToggleComplete();
  const deleteTodo = useDeleteTodo();
  const reorderTodos = useReorderTodos();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [refreshing, setRefreshing] = useState(false);

  const filteredTodos = useMemo(() => {
    if (!todos) return [];

    let filtered = todos;

    // Apply filter
    if (filter === "active") {
      filtered = filtered.filter((todo) => !todo.completed);
    } else if (filter === "completed") {
      filtered = filtered.filter((todo) => todo.completed);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          todo.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [todos, filter, searchQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    // The query will automatically refresh
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleComplete({ id: id as any });
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo({ id: id as any });
      // Toast will be shown via gesture handler animation
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleDragEnd = async ({ data }: { data: Todo[] }) => {
    const todoIds = data.map((todo) => todo._id);
    try {
      await reorderTodos({ todoIds });
    } catch (error) {
      console.error("Failed to reorder todos:", error);
    }
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.todoItem,
            {
              backgroundColor: theme.colors.cardBackground,
              borderColor: theme.colors.border,
              opacity: isActive ? 0.8 : 1,
            },
          ]}
        >
          <TodoItem
            item={item}
            onToggle={() => handleToggle(item._id)}
            onDelete={() => handleDelete(item._id)}
            onEdit={() => router.push(`/edit-todo/${item._id}`)}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  if (todos === undefined) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <ThemeToggle />
      </View>

      <FilterButtons filter={filter} setFilter={setFilter} />

      {filteredTodos.length === 0 ? (
        <EmptyState filter={filter} hasSearchQuery={!!searchQuery.trim()} />
      ) : (
        <DraggableFlatList
          data={filteredTodos}
          onDragEnd={handleDragEnd}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
        />
      )}

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push("/add-todo")}
        accessibilityLabel="Add new todo"
        accessibilityRole="button"
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    gap: 12,
  },
  todoItem: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

