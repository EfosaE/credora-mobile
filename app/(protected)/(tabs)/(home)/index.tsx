import { ActivityIndicator, Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { AppScreen } from "@/components/ui/AppScreen";
import { AppText } from "@/components/ui/AppText";
import { useTheme } from "@/features/ThemeProvider";
import { useSession } from "@/features/ctx";
import { Link } from "expo-router";

import type { Href } from "expo-router";
import { userClient } from "@/http-client/user/client";
import { useQuery } from "@tanstack/react-query";

type QuickAction = {
  label: string;
  icon: string;
  url?: Href;
};

export default function Index() {
  const { theme } = useTheme();
  const { user } = useSession();
  const isDark = theme === "dark";
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user-balance"],
    queryFn: async () => {
      const res = await userClient.getUserBalance();
      return res?.data;
    },
  });

  const accounts = data?.accounts ?? [];

  const handleCopy = async (accountNumber: string, id: string) => {
    await Clipboard.setStringAsync(accountNumber);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const quickActions: QuickAction[] = [
    { label: "Account\nand Card", icon: "card-outline" },
    { label: "Transfer", icon: "swap-horizontal-outline", url: "/transfer" },
    { label: "Withdraw", icon: "download-outline" },
    { label: "Mobile\nprepaid", icon: "phone-portrait-outline" },
    { label: "Pay the\nbill", icon: "receipt-outline" },
    { label: "Save\nonline", icon: "wallet-outline" },
    { label: "Credit\ncard", icon: "card" },
    {
      label: "Transaction\nhistory",
      icon: "document-text-outline",
      url: "/transactions-history",
    },
    { label: "Beneficiary", icon: "people-outline" },
  ];

  return (
    <AppScreen padded={false} className="justify">
      {/* ACCOUNTS SUMMARY */}
      <View className="mx-5 mt-10 rounded-3xl overflow-hidden bg-primary p-6">
        <View className="mb-4">
          <AppText className="text-white text-lg font-semibold">
            {user?.fullName || "User Name Not Found"}
          </AppText>
        </View>

        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : error ? (
          <AppText className="text-red-300 text-base font-medium">
            Failed to load
          </AppText>
        ) : (
          accounts.map((acct, idx) => (
            <View key={acct.id}>
              <View className="flex-row items-center justify-between py-3">
                <View>
                  <AppText className="text-white text-xs opacity-70 mb-1">
                    {acct.bankName}
                  </AppText>

                  <Pressable
                    onPress={() => handleCopy(acct.accountNumber, acct.id)}
                    className="flex-row items-center"
                    hitSlop={8}>
                    <AppText className="text-white tracking-widest text-sm mr-2">
                      {acct.accountNumber}
                    </AppText>
                    <Ionicons
                      name={
                        copiedId === acct.id
                          ? "checkmark-outline"
                          : "copy-outline"
                      }
                      size={14}
                      color="#ffffff"
                    />
                  </Pressable>
                </View>

                <AppText className="text-white text-xl font-bold">
                  {acct?.currency} {acct.balance}
                </AppText>
              </View>

              {idx < accounts.length - 1 && (
                <View className="h-[1px] bg-white/20 my-1" />
              )}
            </View>
          ))
        )}
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

            if (item.url) {
              return (
                <Link key={index} href={item.url} asChild>
                  <Pressable className={TileClasses}>{Inner}</Pressable>
                </Link>
              );
            }

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
