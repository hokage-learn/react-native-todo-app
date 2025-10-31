import React from "react";
import { View, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "../context/ThemeContext";

export const ToastProvider: React.FC = () => {
  const { theme } = useTheme();

  const toastConfig = {
    success: ({ text1, text2 }: any) => (
      <View
        style={{
          height: 60,
          width: "90%",
          backgroundColor: theme.colors.success,
          borderRadius: 8,
          padding: 16,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>{text1}</Text>
        {text2 && (
          <Text style={{ color: "#FFFFFF", fontSize: 14, marginTop: 4 }}>{text2}</Text>
        )}
      </View>
    ),
    error: ({ text1, text2 }: any) => (
      <View
        style={{
          height: 60,
          width: "90%",
          backgroundColor: theme.colors.error,
          borderRadius: 8,
          padding: 16,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>{text1}</Text>
        {text2 && (
          <Text style={{ color: "#FFFFFF", fontSize: 14, marginTop: 4 }}>{text2}</Text>
        )}
      </View>
    ),
  };

  return <Toast config={toastConfig} />;
};

// Helper function to show toast messages
export const showToast = {
  success: (message: string, subMessage?: string) => {
    Toast.show({
      type: "success",
      text1: message,
      text2: subMessage,
      position: "top",
      visibilityTime: 3000,
    });
  },
  error: (message: string, subMessage?: string) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: subMessage,
      position: "top",
      visibilityTime: 3000,
    });
  },
};

