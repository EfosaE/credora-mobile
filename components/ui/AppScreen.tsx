import { useTheme } from "@/features/ThemeProvider";
import { cn } from "@/lib/cn";
import React from "react";
import { ScrollView, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AppScreenProps = ViewProps & {
  children: React.ReactNode;
  scrollable?: boolean;
  padded?: boolean;
  className?: string;
};

export function AppScreen({
  children,
  scrollable = false,
  padded = true,
  className = "",
  ...props
}: AppScreenProps) {
  const { theme } = useTheme();

  const Container = scrollable ? ScrollView : View;

  const bgClass =
    theme === "dark" ? "bg-background-dark" : "bg-background-light";

  return (
    <SafeAreaView className={cn("flex-1", bgClass)}>
      <Container
        className={cn("flex-1", padded && "px-6", className)}
        contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        {...props}>
        {children}
      </Container>
    </SafeAreaView>
  );
}
