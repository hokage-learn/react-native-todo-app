import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../context/ThemeContext";
import { CreateTodoInput, UpdateTodoInput, Todo } from "../types/todo";
import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  dueDate: z.number().optional(),
});

interface TodoFormProps {
  onSubmit: (data: CreateTodoInput | UpdateTodoInput) => Promise<void>;
  initialData?: Todo;
  submitLabel?: string;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  initialData,
  submitLabel = "Add Todo",
}) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [dueDate, setDueDate] = useState<Date | null>(
    initialData?.dueDate ? new Date(initialData.dueDate) : null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setErrors({});
      const data = {
        title: title.trim(),
        description: description.trim() || undefined,
        dueDate: dueDate ? dueDate.getTime() : undefined,
      };

      todoSchema.parse(data);

      setIsSubmitting(true);
      await onSubmit(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        Alert.alert("Error", "Failed to save todo. Please try again.");
        console.error("Form submission error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const clearDate = () => {
    setDueDate(null);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Title *</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.colors.inputBackground,
                color: theme.colors.text,
                borderColor: errors.title ? theme.colors.error : theme.colors.border,
              },
            ]}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) setErrors({ ...errors, title: "" });
            }}
            placeholder="Enter todo title"
            placeholderTextColor={theme.colors.textSecondary}
            accessibilityLabel="Todo title input"
            maxLength={100}
          />
          {errors.title && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>{errors.title}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Description</Text>
          <TextInput
            style={[
              styles.textArea,
              {
                backgroundColor: theme.colors.inputBackground,
                color: theme.colors.text,
                borderColor: errors.description ? theme.colors.error : theme.colors.border,
              },
            ]}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (errors.description) setErrors({ ...errors, description: "" });
            }}
            placeholder="Enter todo description (optional)"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            accessibilityLabel="Todo description input"
            maxLength={500}
          />
          {errors.description && (
            <Text style={[styles.errorText, { color: theme.colors.error }]}>
              {errors.description}
            </Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.colors.text }]}>Due Date</Text>
          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={[
                styles.dateButton,
                {
                  backgroundColor: theme.colors.inputBackground,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => setShowDatePicker(true)}
              accessibilityLabel="Select due date"
              accessibilityRole="button"
            >
              <Text style={{ color: theme.colors.text }}>
                {dueDate
                  ? dueDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Select date (optional)"}
              </Text>
            </TouchableOpacity>
            {dueDate && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearDate}
                accessibilityLabel="Clear due date"
                accessibilityRole="button"
              >
                <Text style={{ color: theme.colors.error }}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              backgroundColor: isSubmitting ? theme.colors.textSecondary : theme.colors.primary,
              opacity: isSubmitting ? 0.6 : 1,
            },
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
          accessibilityLabel={submitLabel}
          accessibilityRole="button"
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? "Saving..." : submitLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  clearButton: {
    padding: 8,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

