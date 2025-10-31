import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeMode, ThemeColors } from "../types/theme";
import { useColorScheme } from "react-native";

const THEME_STORAGE_KEY = "@must_do_theme";

// Light theme colors
const lightColors: ThemeColors = {
  background: "#FFFFFF",
  surface: "#F5F5F5",
  primary: "#007AFF",
  primaryDark: "#0051D5",
  secondary: "#5856D6",
  text: "#000000",
  textSecondary: "#6E6E6E",
  border: "#E5E5E5",
  error: "#FF3B30",
  success: "#34C759",
  warning: "#FF9500",
  shadow: "rgba(0, 0, 0, 0.1)",
  cardBackground: "#FFFFFF",
  inputBackground: "#F9F9F9",
};

// Dark theme colors
const darkColors: ThemeColors = {
  background: "#000000",
  surface: "#1C1C1E",
  primary: "#0A84FF",
  primaryDark: "#5AC8FA",
  secondary: "#5E5CE6",
  text: "#FFFFFF",
  textSecondary: "#98989D",
  border: "#38383A",
  error: "#FF453A",
  success: "#32D74B",
  warning: "#FF9F0A",
  shadow: "rgba(0, 0, 0, 0.3)",
  cardBackground: "#1C1C1E",
  inputBackground: "#2C2C2E",
};

const lightTheme: Theme = {
  mode: "light",
  colors: lightColors,
};

const darkTheme: Theme = {
  mode: "dark",
  colors: darkColors,
};

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("light");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved theme preference on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === "light" || savedTheme === "dark") {
          setThemeModeState(savedTheme);
        } else if (systemColorScheme) {
          // Default to system preference if no saved theme
          setThemeModeState(systemColorScheme);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTheme();
  }, [systemColorScheme]);

  // Save theme preference when it changes
  useEffect(() => {
    if (isLoaded) {
      AsyncStorage.setItem(THEME_STORAGE_KEY, themeMode).catch((error) => {
        console.error("Failed to save theme:", error);
      });
    }
  }, [themeMode, isLoaded]);

  const toggleTheme = () => {
    setThemeModeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  const value: ThemeContextType = {
    theme,
    themeMode,
    toggleTheme,
    setThemeMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

