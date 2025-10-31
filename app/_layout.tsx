import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { ConvexProvider } from "../utils/convex";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import "react-native-reanimated";

function ThemedStack() {
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={theme.mode === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: "600",
            color: theme.colors.text,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "My Todos",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="add-todo"
          options={{
            title: "Add Todo",
            presentation: "modal",
          }}
        />
        <Stack.Screen
          name="edit-todo/[id]"
          options={{
            title: "Edit Todo",
            presentation: "modal",
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const { convexClient } = require("../utils/convex");

  return (
    <GestureHandlerRootView style={styles.container}>
      <ConvexProvider client={convexClient}>
        <ThemeProvider>
          <ThemedStack />
        </ThemeProvider>
      </ConvexProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

