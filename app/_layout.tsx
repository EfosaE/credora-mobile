import { SplashScreenController } from "@/components/Splash";
import { SessionProvider, useSession } from "@/features/ctx";
import { AppThemeProvider, useTheme } from "@/features/ThemeProvider";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { setBackgroundColorAsync } from "expo-system-ui";
import React from "react";
import { Platform } from "react-native";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setLogoutHandler } from "@/features/authBridge";

export const queryClient = new QueryClient();

function AppContent() {
  const { navTheme, theme } = useTheme();
  const { session, isLoading, signOut } = useSession();
  React.useEffect(() => {
    if (Platform.OS === "android") {
      setBackgroundColorAsync(theme === "dark" ? "#000000" : "#ffffff");
    }
  }, [theme]);
  React.useEffect(() => {
    setLogoutHandler(signOut);
  }, [signOut]);
  if (isLoading) {
    return <SplashScreenController />;
  }

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
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <SessionProvider>
          <SplashScreenController />
          <AppContent />
        </SessionProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}
