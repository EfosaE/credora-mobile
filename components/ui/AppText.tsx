import { Text as RNText, TextProps } from "react-native";
import { useTheme } from "@/theme/ThemeProvider";

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
