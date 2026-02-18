import { Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { useTheme } from "@/features/ThemeProvider";
import { useSession } from "@/features/ctx";
import { Link } from "expo-router";

import type { Href } from "expo-router";

type QuickAction = {
  label: string;
  icon: string;
  url?: Href;
};

export default function Index() {
  const { theme } = useTheme();
  const { user } = useSession();
  const isDark = theme === "dark";

  const quickActions: QuickAction[] = [
    { label: "Account\nand Card", icon: "card-outline" },
    { label: "Transfer", icon: "swap-horizontal-outline", url: "/transfer" },
    { label: "Withdraw", icon: "download-outline" },
    { label: "Mobile\nprepaid", icon: "phone-portrait-outline" },
    { label: "Pay the\nbill", icon: "receipt-outline" },
    { label: "Save\nonline", icon: "wallet-outline" },
    { label: "Credit\ncard", icon: "card" },
    { label: "Transaction\nreport", icon: "document-text-outline" },
    { label: "Beneficiary", icon: "people-outline" },
  ];

  return (
    <AppScreen padded={false} className="justify">
      {/* CARD */}
      <View className="mx-5 mt-10 rounded-3xl overflow-hidden bg-primary p-6">
        <View className="mb-6">
          <AppText className="text-white text-lg font-semibold">
            {user?.fullName || "User Name Not Found"}
          </AppText>

          <AppText className="text-white text-xs opacity-80 mt-1">
            Amazon Platinium
          </AppText>
        </View>

        <View className="mb-4">
          <AppText className="text-white tracking-widest">
            4756 •••• •••• 9018
          </AppText>
        </View>

        <View className="flex-row items-center justify-between">
          <AppText className="text-white text-2xl font-bold">
            {user?.currency} {user?.balance || "Balance Not Available"}
          </AppText>

          <AppText className="text-white font-bold">VISA</AppText>
        </View>
      </View>

      {/* QUICK ACTION GRID */}
      <View className="mx-5 mt-8">
        <View className="flex-row flex-wrap justify-between">
          {quickActions.map((item, index) => {
            const TileClasses = `
        w-[30%]
        mb-5
        aspect-square
        rounded-2xl
        border
        items-center
        justify-center
        bg-surface-light
        dark:bg-surface-dark
        border-border-light
        dark:border-border-dark
      `;

            const Inner = (
              <>
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={isDark ? "#F5F5F5" : "#343434"}
                />

                <AppText
                  className="
              text-center
              text-xs
              mt-2
              text-foreground-light
              dark:text-foreground-dark
            ">
                  {item.label}
                </AppText>
              </>
            );

            // Clickable tile
            if (item.url) {
              return (
                <Link key={index} href={item.url} asChild>
                  <Pressable className={TileClasses}>{Inner}</Pressable>
                </Link>
              );
            }

            // Static tile
            return (
              <View key={index} className={TileClasses}>
                {Inner}
              </View>
            );
          })}
        </View>
      </View>
    </AppScreen>
  );
}
