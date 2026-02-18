import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

type Theme = "light" | "dark";

const ThemeContext = createContext({
  theme: "light" as Theme,
  toggleTheme: () => {},
  navTheme: DefaultTheme,
});

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = Appearance.getColorScheme();
  const { setColorScheme } = useNativeWindColorScheme();

  const [theme, setTheme] = useState<Theme>(
    systemScheme === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    setColorScheme(theme);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const navTheme = theme === "dark" ? DarkTheme : DefaultTheme;

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, navTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
