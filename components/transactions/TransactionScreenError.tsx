import React from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "@/lib/cn";

interface TransactionScreenErrorProps {
  isDark: boolean;
  onRetry: () => void;
}

function TransactionScreenErrorBase({
  isDark,
  onRetry,
}: TransactionScreenErrorProps) {
  return (
    <SafeAreaView
      className={cn("flex-1", isDark ? "bg-[#0F0F1A]" : "bg-[#F5F5FA]")}>
      <View className="px-5 pt-4 pb-3">
        <Text
          className={cn(
            "text-[22px] font-bold",
            isDark ? "text-[#F1F1F1]" : "text-[#1A1A2E]",
          )}>
          Transactions
        </Text>
      </View>
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="text-red-500 text-[15px] font-semibold">
          Something went wrong.
        </Text>
        <Pressable
          onPress={onRetry}
          className="bg-indigo-500 px-6 py-2.5 rounded-xl active:opacity-70">
          <Text className="text-white font-semibold text-sm">Retry</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export const TransactionScreenError = React.memo(TransactionScreenErrorBase);