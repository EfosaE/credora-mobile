import {
  Pressable,
  Text,
  PressableProps,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@/features/ThemeProvider";

type AppButtonProps = PressableProps & {
  title: string;
  loading?: boolean;
};

export function AppButton({
  title,
  loading = false,
  disabled,
  onPress,
  className,
  ...pressableProps
}: AppButtonProps) {
  const { theme } = useTheme();

  const bgClass = theme === "dark" ? "bg-primaryDark" : "bg-primary";

  const disabledClass =
    disabled || loading ? "opacity-50" : "active:opacity-80";

  return (
    <Pressable
      {...pressableProps}
      onPress={onPress}
      disabled={disabled || loading}
      className={`${bgClass} ${disabledClass} rounded-2xl py-4 px-6 items-center ${className ?? ""}`}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white font-semibold text-base">{title}</Text>
      )}
    </Pressable>
  );
}
