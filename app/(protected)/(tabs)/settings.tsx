import { AppText } from "@/components/ui/AppText";
import { useSession } from "@/features/ctx";
import { useTheme } from "@/features/ThemeProvider";
import { View, Switch } from "react-native";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { signOut } = useSession();

  const isDark = theme === "dark";

  return (
    <View className="flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
      <AppText className="text-lg font-semibold mb-4">Settings Page</AppText>

      <AppText
        className="text-lg font-semibold text-red-500 m-4"
        onPress={() => {
          // The guard in `AppCintent` redirects back to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </AppText>

      <Switch value={isDark} onValueChange={toggleTheme} />
    </View>
  );
}
