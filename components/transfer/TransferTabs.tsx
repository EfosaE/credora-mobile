import { AppText } from "@/components/ui/AppText";
import { TransferType } from "@/features/hooks/useTransfer";
import { useTheme } from "@/features/ThemeProvider";
import { TouchableOpacity, View } from "react-native";

type Props = {
  value: TransferType;
  onChange: (type: TransferType) => void;
};

export function TransferTabs({ value, onChange }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerBg = isDark ? "bg-zinc-800" : "bg-gray-100";
  const activeBg = isDark ? "bg-zinc-700" : "bg-white";
  const inactiveText = isDark ? "text-zinc-400" : "opacity-60";
  const activeText = isDark ? "text-white font-semibold" : "font-semibold";

  return (
    <View className="mb-6">
      <View className={`flex-row rounded-xl p-1 ${containerBg}`}>
        {(["external", "internal"] as TransferType[]).map((type) => {
          const active = value === type;

          return (
            <TouchableOpacity
              key={type}
              onPress={() => onChange(type)}
              className={`flex-1 py-3 rounded-lg items-center ${
                active ? activeBg : ""
              }`}>
              <AppText className={active ? activeText : inactiveText}>
                {type === "external" ? "Other Banks" : "Credora"}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
