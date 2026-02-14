import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

type AppInputProps = TextInputProps & {
  placeholder?: string;
};

export function AppInput({ placeholder, style, ...props }: AppInputProps) {
  const { theme } = useTheme();

  const bgClass =
    theme === "dark" ? "bg-surface-dark" : "bg-surface-light";
  const textClass =
    theme === "dark" ? "text-foreground-dark" : "text-foreground-light";
  const borderClass =
    theme === "dark" ? "border-border-dark" : "border-border-light";

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={theme === "dark" ? "#9CA3AF" : "#6B7280"}
      className={`px-4 py-4 rounded-xl border ${bgClass} ${textClass} ${borderClass}`}
      {...props}
    />
  );
}
