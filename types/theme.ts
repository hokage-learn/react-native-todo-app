export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  background: string;
  surface: string;
  primary: string;
  primaryDark: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  shadow: string;
  cardBackground: string;
  inputBackground: string;
};

export type Theme = {
  mode: ThemeMode;
  colors: ThemeColors;
};

