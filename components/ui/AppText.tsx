import { useTheme } from "@/features/ThemeProvider";
import { Text as RNText, TextProps } from "react-native";

type AppTextProps = TextProps & {
  children: React.ReactNode;
  className?: string;
};

export function AppText({ children, className = "", ...props }: AppTextProps) {
  const { theme } = useTheme();

  const colorClass =
    theme === "dark" ? "text-foreground-dark" : "text-foreground-light";

  return (
    <RNText className={`${colorClass} ${className}`} {...props}>
      {children}
    </RNText>
  );
}
