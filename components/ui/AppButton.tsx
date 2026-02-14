import { Pressable, Text } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

export function AppButton({
  title,
  onPress,
}: {
  title: string;
  onPress?: () => void;
}) {
  const { theme } = useTheme();

  const bgClass = theme === "dark" ? "bg-primaryDark" : "bg-primary";

  return (
    <Pressable
      onPress={onPress}
      className={`${bgClass} active:opacity-80 rounded-2xl py-4 px-6 items-center`}>
      <Text className="text-white font-semibold text-base">{title}</Text>
    </Pressable>
  );
}
