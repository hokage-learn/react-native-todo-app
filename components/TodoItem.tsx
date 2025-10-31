import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useTheme } from "../context/ThemeContext";
import { Todo } from "../types/todo";

interface TodoItemProps {
  item: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const SWIPE_THRESHOLD = -100;

export const TodoItem: React.FC<TodoItemProps> = ({ item, onToggle, onDelete, onEdit }) => {
  const { theme } = useTheme();
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationX < 0) {
        translateX.value = e.translationX;
      }
    })
    .onEnd((e) => {
      if (e.translationX < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-200, {}, () => {
          runOnJS(onDelete)();
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== new Date().getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.todoCard,
            {
              backgroundColor: theme.colors.cardBackground,
              borderColor: theme.colors.border,
            },
            animatedStyle,
          ]}
        >
          <TouchableOpacity
            style={styles.content}
            onPress={onToggle}
            accessibilityLabel={item.completed ? "Mark as incomplete" : "Mark as complete"}
            accessibilityRole="button"
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: item.completed ? theme.colors.success : theme.colors.border,
                  backgroundColor: item.completed ? theme.colors.success : "transparent",
                },
              ]}
            >
              {item.completed && (
                <Text style={styles.checkmark} accessibilityLabel="Completed">
                  ✓
                </Text>
              )}
            </View>

            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color: theme.colors.text,
                    textDecorationLine: item.completed ? "line-through" : "none",
                    opacity: item.completed ? 0.6 : 1,
                  },
                ]}
              >
                {item.title}
              </Text>
              {item.description && (
                <Text
                  style={[
                    styles.description,
                    {
                      color: theme.colors.textSecondary,
                      opacity: item.completed ? 0.5 : 1,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
              )}
              {item.dueDate && (
                <Text
                  style={[
                    styles.date,
                    {
                      color:
                        item.dueDate < Date.now() && !item.completed
                          ? theme.colors.error
                          : theme.colors.textSecondary,
                    },
                  ]}
                >
                  📅 {formatDate(item.dueDate)}
                </Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.editButton}
            onPress={onEdit}
            accessibilityLabel="Edit todo"
            accessibilityRole="button"
          >
            <Text style={{ color: theme.colors.primary }}>✏️</Text>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>

      <View
        style={[
          styles.deleteBackground,
          {
            backgroundColor: theme.colors.error,
          },
        ]}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    position: "relative",
    overflow: "visible",
  },
  todoCard: {
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    marginTop: 4,
  },
  editButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteBackground: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    width: 100,
    borderRadius: 12,
    zIndex: -1,
  },
  deleteText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});

