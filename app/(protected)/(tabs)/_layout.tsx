import { useTheme } from "@/features/ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, usePathname } from "expo-router";

export default function TabLayout() {
  const { theme } = useTheme();
  const pathName = usePathname();
  // console.log("Current Path:", pathName);

  const paths = ["/transfer", "/transactions-history"];

  const isDark = theme === "dark";

  return (
    <Tabs
      screenOptions={{
        // headerShown: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: isDark ? "#1A1A22" : "#F7F7F7",
        },
        headerTintColor: isDark ? "#F5F5F5" : "#343434",
        tabBarActiveTintColor: "#3629B7",
        tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#6B7280",
        tabBarStyle: {
          backgroundColor: isDark ? "#1A1A22" : "#F7F7F7",
          borderTopColor: isDark ? "#2A2A35" : "#E5E5E5",
        },
      }}>
      {/* HOME */}
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: paths.includes(pathName) ? false : true,
          headerTitle: "CREDORA",
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color={isDark ? "#F5F5F5" : "#343434"}
              style={{ marginLeft: 16 }}
            />
          ),
          headerRight: () => (
            <Ionicons
              name="notifications-outline"
              size={24}
              color={isDark ? "#F5F5F5" : "#343434"}
              style={{ marginRight: 16 }}
            />
          ),
          headerTitleStyle: {
            fontWeight: "800",
            color: isDark ? "#F5F5F5" : "#343434",
            letterSpacing: 1,
          },
          headerTitleAlign: "center",
        }}
      />

      {/* SETTINGS */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
