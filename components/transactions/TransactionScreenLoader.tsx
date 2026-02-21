import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/cn";

interface TransactionScreenLoaderProps {
  isDark: boolean;
}

function TransactionScreenLoaderBase({ isDark }: TransactionScreenLoaderProps) {
  return (
    <SafeAreaView
      className={cn("flex-1", isDark ? "bg-[#0F0F1A]" : "bg-[#F5F5FA]")}>
      <View className="px-5 pt-4 pb-3 border-b border-[#2A2A3E]">
        <Text
          className={cn(
            "text-[22px] font-bold tracking-wide",
            isDark ? "text-[#F1F1F1]" : "text-[#1A1A2E]",
          )}>
          Transactions
        </Text>
      </View>
      <View className="flex-1 items-center justify-center gap-3">
        <ActivityIndicator
          size="large"
          color={isDark ? "#A78BFA" : "#6366F1"}
        />
        <Text className={isDark ? "text-[#9A9AB0]" : "text-gray-500"}>
          Loading transactions…
        </Text>
      </View>
    </SafeAreaView>
  );
}

export const TransactionScreenLoader = React.memo(TransactionScreenLoaderBase);
