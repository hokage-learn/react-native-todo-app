import React, { useState, useMemo, useEffect } from "react";
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
  const [connectionError, setConnectionError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Add timeout to detect if Convex is not connected
  useEffect(() => {
    const timer = setTimeout(() => {
      if (todos === undefined) {
        const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
        if (!convexUrl) {
          setConnectionError(true);
          setIsLoading(false);
        } else {
          // URL is set but query hasn't resolved - likely connection issue
          setConnectionError(true);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setConnectionError(false);
      }
    }, 5000); // Wait 5 seconds before showing error

    return () => clearTimeout(timer);
  }, [todos]);

  // Reset loading state when todos load
  useEffect(() => {
    if (todos !== undefined) {
      setIsLoading(false);
      setConnectionError(false);
    }
  }, [todos]);

  // Handle case where todos is null (shouldn't happen, but handle gracefully)
  const todoList = todos || [];

  const filteredTodos = useMemo(() => {
    if (!todoList || todoList.length === 0) return [];

    let filtered = todoList;

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
  }, [todoList, filter, searchQuery]);

  const onRefresh = async () => {
    setRefreshing(true);
    // The query will automatically refresh
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleComplete({ id: id as any });
    } catch (error) {
      // Error handled silently - user can retry
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo({ id: id as any });
    } catch (error) {
      // Error handled silently - user can retry
    }
  };

  const handleDragEnd = async ({ data }: { data: Todo[] }) => {
    const todoIds = data.map((todo) => todo._id);
    try {
      await reorderTodos({ todoIds });
    } catch (error) {
      // Error handled silently - order may not persist
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

  // Show connection error if Convex is not configured
  if (connectionError || (isLoading && todos === undefined)) {
    const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
    
    if (!convexUrl) {
      return (
        <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.errorTitle, { color: theme.colors.text }]}>
            Convex Not Configured
          </Text>
          <Text style={[styles.errorText, { color: theme.colors.textSecondary }]}>
            Please set up your Convex backend:
          </Text>
          <View style={styles.instructions}>
            <Text style={[styles.instructionText, { color: theme.colors.text }]}>
              1. Run: npx convex dev
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.text }]}>
              2. Copy the Convex URL
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.text }]}>
              3. Create .env file with:
            </Text>
            <Text style={[styles.codeText, { color: theme.colors.primary }]}>
              EXPO_PUBLIC_CONVEX_URL=your-url-here
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.text }]}>
              4. Restart the app
            </Text>
          </View>
        </View>
      );
    }
    
    // Show loading or connection error
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary, marginTop: 16, marginBottom: 8 }]}>
          {isLoading && !connectionError ? "Connecting to Convex..." : "Unable to connect to Convex"}
        </Text>
        {connectionError && (
          <View style={styles.instructions}>
            <Text style={[styles.instructionText, { color: theme.colors.textSecondary, fontSize: 12, marginTop: 16 }]}>
              Make sure:
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.textSecondary, fontSize: 12 }]}>
              • Convex dev server is running (npx convex dev)
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.textSecondary, fontSize: 12 }]}>
              • Your .env file has the correct URL
            </Text>
            <Text style={[styles.instructionText, { color: theme.colors.textSecondary, fontSize: 12 }]}>
              • You've restarted the app after setting the URL
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <ThemeToggle />
      </View>

      <FilterButtons filter={filter} setFilter={setFilter} todos={todoList} />

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
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
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
  errorTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  instructions: {
    width: "100%",
    maxWidth: 400,
  },
  instructionText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  codeText: {
    fontSize: 12,
    fontFamily: "monospace",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 8,
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
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

