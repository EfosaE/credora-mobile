import { Stack } from "expo-router";
import "../global.css";
import { AppThemeProvider, useTheme } from "@/theme/ThemeProvider";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { SessionProvider, useSession } from "@/features/ctx";
import { SplashScreenController } from "@/components/Splash";
import { setBackgroundColorAsync } from "expo-system-ui";
import { Platform } from "react-native";
import React from "react";

function AppContent() {
  const { navTheme, theme } = useTheme();
  const { session } = useSession();
  React.useEffect(() => {
    if (Platform.OS === "android") {
      setBackgroundColorAsync(theme === "dark" ? "#000000" : "#ffffff");
    }
  }, [theme]);

  return (
    <NavigationThemeProvider value={navTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(protected)" />
        </Stack.Protected>

        <Stack.Protected guard={!session}>
          <Stack.Screen name="sign-in" />
        </Stack.Protected>
      </Stack>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <SessionProvider>
        <SplashScreenController />
        <AppContent />
      </SessionProvider>
    </AppThemeProvider>
  );
}
