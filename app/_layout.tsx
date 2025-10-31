import { useEffect } from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerTransparent: true,
            headerTitleStyle: {
              fontWeight: "600",
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
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

