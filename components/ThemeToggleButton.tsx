import { AppButton } from "@/components/ui/AppButton";
import { useTheme } from "@/features/ThemeProvider";

export function ThemeToggleButton() {
  const { toggleTheme, theme } = useTheme();

  return (
    <AppButton
      onPress={toggleTheme}
      title={theme === "dark" ? "Light Mode" : "Dark Mode"}
    />
  );
}
